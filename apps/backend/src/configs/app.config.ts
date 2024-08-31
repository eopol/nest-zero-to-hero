import { PKG_GROUP_NAME } from '@nest-zero-to-hero/metas'
import { z } from 'zod'
import {
  DEFAULT_APP_GLOBAL_API_PREFIX,
  DEFAULT_APP_LOCALE,
  DEFAULT_APP_LOGGER_MAX_FILES,
  DEFAULT_APP_LOGGER_MAX_SIZE,
  DEFAULT_APP_PORT,
  DEFAULT_LOG_LEVEL,
} from '../constants'
import { DEFAULT_LOGGER_LEVELS } from '../modules/log/constants'

export const appConfigSchema = z.object({
  APP_NAME: z.string().trim().optional().default(PKG_GROUP_NAME),
  APP_PORT: z.coerce.number().optional().default(DEFAULT_APP_PORT),
  APP_GLOBAL_PREFIX: z.string().trim().default(DEFAULT_APP_GLOBAL_API_PREFIX),
  APP_LOCALE: z.string().trim().optional().default(DEFAULT_APP_LOCALE),
  APP_LOGGER_LEVEL: z
    .nativeEnum(DEFAULT_LOGGER_LEVELS)
    .default(DEFAULT_LOG_LEVEL),
  APP_LOGGER_MAX_FILES: z
    .string()
    .optional()
    .default(DEFAULT_APP_LOGGER_MAX_FILES),
  APP_LOGGER_MAX_SIZE: z.coerce
    .number()
    .optional()
    .default(DEFAULT_APP_LOGGER_MAX_SIZE),
})

export type AppConfigSchema = z.infer<typeof appConfigSchema>
