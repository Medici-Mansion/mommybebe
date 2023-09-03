import { z } from 'zod'
import { instance } from '..'
import { getImageByCategoryResponse } from '@/@types/api'
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

const getReviewImageByCategory = async (
  body: z.infer<typeof variationImage>,
) => {
  const response = await instance.post('/api/image/variation', body)
  return response.data
}

const CategoryService = { getImageByCategory, getReviewImageByCategory }

export default CategoryService
