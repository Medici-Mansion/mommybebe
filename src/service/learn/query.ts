import {
  getImageByCategoryResponse,
  getLearndByCategoryResponse,
} from '@/@types/api'
import { QueryType } from '..'
import learnService from './service'

const LearnQueries = {
  queries: {
    getLearndByCategory(category: string) {
      return {
        queryKey: ['learn', 'score', category],
        //@ts-ignore
        queryFn: () => learnService.getLearndByCategory(category),
      } satisfies QueryType<getLearndByCategoryResponse>
    },
  },
}

export default LearnQueries
