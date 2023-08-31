import { getImageByCategoryResponse } from '@/@types/api'
import { QueryType } from '..'
import WordsService from './service'

const WordsQueries = {
  queries: {
    getCategories(category: string) {
      return {
        queryKey: ['categories', category],
        //@ts-ignore
        queryFn: () => WordsService.getImageByCategory(category),
      } satisfies QueryType<getImageByCategoryResponse>
    },
  },
}

export default WordsQueries
