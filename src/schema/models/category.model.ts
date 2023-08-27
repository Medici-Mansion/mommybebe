import { pgTable, text } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { CoreModel } from './core.model'
import { Image } from './image.model'
export const Category = pgTable('category', {
  ...CoreModel,
  name: text('image').notNull().unique(),
})

export const CategoryRelations = relations(Category, ({ many }) => ({
  images: many(Image),
}))
