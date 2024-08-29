import { appConfigSchema } from './app.config'
import { dataBaseSchema } from './database.config'
import type { z } from 'zod'

export const configSchema = appConfigSchema.merge(dataBaseSchema)

export type ConfigSchema = z.infer<typeof configSchema>

// export * from './app.config'
// export * from './database.config'
// export * from './redis.config'
// export * from './security.config'
// export * from './sms.config'
// export * from './smtp.config'
// export * from './upload.config'
