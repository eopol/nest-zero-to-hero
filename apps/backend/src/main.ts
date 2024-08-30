/* eslint-disable @typescript-eslint/consistent-type-imports */
import cluster from 'node:cluster'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { fastifyApp } from './framework/adapters'
import { AppModule } from './app.module'
import { name } from '../package.json'
import { isMainProcess } from './utils'
import { ConfigSchema } from './configs'
import { DEFAULT_PUBLIC_PATH } from './constants'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyApp,
    {
      bufferLogs: true,
      snapshot: true,
    },
  )

  const configService = app.get(ConfigService)
  const APP_GLOBAL_PREFIX =
    configService.get<ConfigSchema['APP_GLOBAL_PREFIX']>('APP_GLOBAL_PREFIX')!

  app.enableCors({ origin: '*', credentials: true })
  app.setGlobalPrefix(APP_GLOBAL_PREFIX) // TODO: SSR INDEX.HTML
  app.useStaticAssets({ root: DEFAULT_PUBLIC_PATH })

  // isDev && app.useGlobalInterceptors(new LoggingInterceptor())
  // app.useWebSocketAdapter(new RedisIoAdapter(app))
  // const trpc = app.get(TRPCService)
  // trpc.applyMiddleware(app)
  // setupSwagger(app, configService)

  await app.listen(3000, '0.0.0.0', async () => {
    const url = await app.getUrl()
    const pid = process.pid
    const prefix = cluster.isPrimary ? 'P' : 'W'

    if (!isMainProcess) return

    const logger = new Logger(`🚀 ${name} 🚀`)
    logger.log(`[${prefix + pid}] Server running on ${url}`)

    // logger.log(`[${prefix + pid}] Trpc: ${url}/api/trpc-playground`);
    // if (isDev) logger.log(`[${prefix + pid}] OpenAPI: ${url}/api-docs`);
  })

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
