/* eslint-disable @typescript-eslint/consistent-type-imports */
import { ConsoleLogger, ConsoleLoggerOptions, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  Logger as WinstonLogger,
  config,
  createLogger,
  format,
  transports,
} from 'winston'
import 'winston-daily-rotate-file'
import { ConfigSchema } from '../../configs'
import { DEFAULT_LOGGER_LEVELS } from './constants'
import { isDev } from '../../utils'

@Injectable()
export class Logger extends ConsoleLogger {
  private winstonLogger: WinstonLogger

  constructor(
    context: string,
    options: ConsoleLoggerOptions,
    private configService: ConfigService,
  ) {
    super(context, options)
    this.initWinston()
  }

  protected get level() {
    return this.configService.get<ConfigSchema['APP_LOGGER_LEVEL']>(
      'APP_LOGGER_LEVEL',
    )!
  }

  protected get maxFiles() {
    return this.configService.get<ConfigSchema['APP_LOGGER_MAX_FILES']>(
      'APP_LOGGER_MAX_FILES',
    )!
  }

  protected get maxSize() {
    return this.configService.get<ConfigSchema['APP_LOGGER_MAX_SIZE']>(
      'APP_LOGGER_MAX_SIZE',
    )!
  }

  protected initWinston(): void {
    this.winstonLogger = createLogger({
      levels: config.npm.levels,
      format: format.combine(
        format.errors({ stack: true }),
        format.timestamp(),
        format.json(),
      ),
      transports: [
        ...(isDev
          ? [
              new transports.Console({
                level: 'info',
                format: format.combine(
                  format.simple(),
                  format.colorize({ all: true }),
                ),
              }),
            ]
          : []),
        ...(this.level !== DEFAULT_LOGGER_LEVELS.ERROR
          ? [
              new transports.DailyRotateFile({
                level: this.level,
                filename: `logs/app.${this.level}.%DATE%.log`,
                datePattern: 'YYYY-MM-DD',
                maxFiles: this.maxFiles,
                maxSize: this.maxSize,
                format: format.combine(format.timestamp(), format.json()),
                auditFile: `logs/.audit/app.${this.level}.json`,
                zippedArchive: true,
              }),
            ]
          : []),
        new transports.DailyRotateFile({
          level: DEFAULT_LOGGER_LEVELS.ERROR,
          filename: 'logs/app.error.%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: this.maxFiles,
          maxSize: this.maxSize,
          format: format.combine(format.timestamp(), format.json()),
          auditFile: 'logs/.audit/app.error.json',
          zippedArchive: true,
        }),
      ],
    })
  }

  verbose(message: any, context?: string): void {
    super.verbose.apply(this, [message, context])

    this.winstonLogger.log(DEFAULT_LOGGER_LEVELS.VERBOSE, message, { context })
  }

  debug(message: any, context?: string): void {
    super.debug.apply(this, [message, context])

    this.winstonLogger.log(DEFAULT_LOGGER_LEVELS.DEBUG, message, { context })
  }

  log(message: any, context?: string): void {
    super.log.apply(this, [message, context])

    this.winstonLogger.log(DEFAULT_LOGGER_LEVELS.INFO, message, { context })
  }

  warn(message: any, context?: string): void {
    super.warn.apply(this, [message, context])

    this.winstonLogger.log(DEFAULT_LOGGER_LEVELS.WARN, message)
  }

  error(message: any, stack?: string, context?: string): void {
    super.error.apply(this, [message, stack, context])

    const hasStack = !!context
    this.winstonLogger.log(DEFAULT_LOGGER_LEVELS.ERROR, {
      context: hasStack ? context : stack,
      message: hasStack ? new Error(message) : message,
    })
  }
}
