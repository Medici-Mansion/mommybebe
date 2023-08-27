import * as z from 'zod'

export const postImageBody = z.object({
  categoryName: z.string(),
  words: z.array(z.string().optional()).length(10, 'too many words'),
})

export const insertImage = z.object({
  word: z.string(),
  originalUrl: z.string(),
  categoryId: z.string(),
})
