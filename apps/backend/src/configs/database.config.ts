import { z } from 'zod'

export const dataBaseSchema = z.object({
  DATABASE_URL: z.string(),
})

export type DataBaseSchema = z.infer<typeof dataBaseSchema>
