import * as z from 'zod'

export const postImageBody = z.object({
  categoryName: z.string(),
  words: z.array(z.string()).max(10, 'too many words'),
})

export const insertImage = z.object({
  word: z.string(),
  originalUrl: z.string(),
  categoryId: z.string(),
})

export const completeLearn = z.object({
  categoryName: z.string(),
  words: z.array(z.object({ id: z.string(), isCorrect: z.boolean() })),
})

export const variationImage = z.object({
  categoryName: z.string(),
  images: z.array(z.string()),
})
