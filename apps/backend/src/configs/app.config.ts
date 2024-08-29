import { PKG_GROUP_NAME } from '@nest-zero-to-hero/metas'
import { z } from 'zod'
import {
  DEFAULT_APP_LOCALE,
  DEFAULT_APP_LOGGER_MAX_FILES,
  DEFAULT_APP_PORT,
  DEFAULT_LOGGER_LEVEL,
  DEFAULT_LOGGER_LEVELS,
} from '../constants'

export const appConfigSchema = z.object({
  APP_NAME: z.string().default(PKG_GROUP_NAME),
  APP_PORT: z
    .preprocess((val) => Number(val), z.number())
    .default(DEFAULT_APP_PORT),
  APP_GLOBAL_PREFIX: z.string(),
  APP_LOCALE: z.string().default(DEFAULT_APP_LOCALE),
  APP_LOGGER_LEVEL: z
    .nativeEnum(DEFAULT_LOGGER_LEVELS)
    .default(DEFAULT_LOGGER_LEVEL),
  APP_LOGGER_MAX_FILES: z
    .preprocess((val) => Number(val), z.number())
    .default(DEFAULT_APP_LOGGER_MAX_FILES),
})

export type AppConfigSchema = z.infer<typeof appConfigSchema>
