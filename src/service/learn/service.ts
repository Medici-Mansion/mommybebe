import { instance } from '..'
import { getLearndByCategoryResponse } from '@/@types/api'

const getLearndByCategory = async (category: string) => {
  const response = await instance.get<getLearndByCategoryResponse>(
    '/api/learn',
    {
      params: { category },
    },
  )

  return response.data
}

const learnService = { getLearndByCategory }

export default learnService
