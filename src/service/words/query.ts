import { getImageByCategoryResponse } from '@/@types/api'
import { QueryType } from '..'
import WordsService from './service'

const WordsQueries = {
  queries: {
    getImageByCategory(category: string) {
      return {
        queryKey: ['images', category],
        //@ts-ignore
        queryFn: () => WordsService.getImageByCategory(category),
      } satisfies QueryType<getImageByCategoryResponse>
    },
    getReviewImageByCategory(category: string) {
      return {
        queryKey: ['images', 'review', category],
        //@ts-ignore
        queryFn: async () => {
          const imagesByCategory =
            await WordsService.getImageByCategory(category)

          return WordsService.getReviewImageByCategory({
            categoryName: category,
            images: imagesByCategory.data.images.map((i) => i.id),
          })
        },
      } satisfies QueryType<getImageByCategoryResponse>
    },
  },
}

export default WordsQueries
