import { instance } from '..'
import { getImageByCategoryResponse } from '@/@types/api'

const getImageByCategory = async (category: string) => {
  const response = await instance.get<getImageByCategoryResponse>(
    '/api/image',
    {
      params: { category },
    },
  )

  return response.data
}

const CategoryService = { getImageByCategory }

export default CategoryService
