import { z } from 'zod'

export const dataBaseSchema = z.object({
  DATABASE_URL: z.string().trim().url(),
})

export type DataBaseSchema = z.infer<typeof dataBaseSchema>
