import { Category } from '@/schema/models/category.model'
import { Image } from '@/schema/models/image.model'
import { InferSelectModel } from 'drizzle-orm'

interface Response<T> {
  ok: boolean
  error?: any
  data: T
}

export type GetCategoriesResponse = Response<
  Pick<InferSelectModel<typeof Category, { dbColumnNames: true }>, 'name'>[]
>

export type ImageByCategory = Omit<
  InferSelectModel<typeof Image, { dbColumnNames: true }>,
  'category_id'
>

export type LearnedByCategory = Pick<
  InferSelectModel<typeof Image, { dbColumnNames: true }>,
  'id' | 'is_correct' | 'word' | 'createdAt'
>

export type getImageByCategoryResponse = Response<
  InferSelectModel<typeof Category, { dbColumnNames: true }> & {
    images: ImageByCategory[]
  }
>

export type getLearndByCategoryResponse = Response<
  InferSelectModel<typeof Category, { dbColumnNames: true }> & {
    images: LearnedByCategory[]
  }
>

export type makeVariationResponse = Response<InferSelectModel<typeof Image>[]>
