import { instance } from '..'
import { GetCategoriesResponse } from '@/@types/api'

const getCategories = async () => {
  const response = await instance.get<GetCategoriesResponse>('/api/category')

  return response.data
}

const CategoryService = { getCategories }

export default CategoryService
