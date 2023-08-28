import { Category } from '@/schema/models/category.model'
import { InferSelectModel } from 'drizzle-orm'

interface Response<T> {
  ok: boolean
  error?: any
  data: T
}

export type GetCategoriesResponse = Response<
  Pick<InferSelectModel<typeof Category, { dbColumnNames: true }>, 'name'>[]
>
