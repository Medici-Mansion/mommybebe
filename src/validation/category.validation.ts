import * as z from 'zod'

export const insertCategory = z.object({
  name: z.string(),
})
