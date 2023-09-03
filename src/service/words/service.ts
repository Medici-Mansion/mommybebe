import { z } from 'zod'
import { instance } from '..'
import { getImageByCategoryResponse, makeVariationResponse } from '@/@types/api'
import { variationImage } from '@/validation/image.validation'

const getImageByCategory = async (category: string) => {
  const response = await instance.get<getImageByCategoryResponse>(
    '/api/image',
    {
      params: { category },
    },
  )

  return response.data
}

interface VariationResponse {
  id: string
  createdAt: Date | null
  word: string
  originalUrl: string
  reviewUrl: string | null
  categoryId: string | null
  isLearned: string | null
  isCorrect: boolean | null
}

const getReviewImageByCategory = async (
  body: z.infer<typeof variationImage>,
) => {
  const response = await instance.post<makeVariationResponse>(
    '/api/image/variation',
    body,
  )
  return response.data
}

const CategoryService = { getImageByCategory, getReviewImageByCategory }

export default CategoryService
