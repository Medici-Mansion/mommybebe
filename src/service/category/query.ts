import { GetCategoriesResponse } from '@/@types/api'
import { QueryType } from '..'
import CategoryService from './service'

const CategoryQueries = {
  queries: {
    getCategories: {
      queryKey: ['categories'],
      queryFn: CategoryService.getCategories,
    } satisfies QueryType<GetCategoriesResponse>,
  },
}

export default CategoryQueries
