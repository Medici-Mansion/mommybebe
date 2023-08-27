import { pgTable, text } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { CoreModel } from './core.model'
import { Category } from './category.model'
export const Image = pgTable('image', {
  ...CoreModel,
  word: text('word').notNull(),
  originalUrl: text('original_url').notNull(),
  reviewUrl: text('review_url'),
  categoryId: text('category_id'),
})

export const ImageRelations = relations(Image, ({ one }) => ({
  category: one(Category, {
    fields: [Image.categoryId],
    references: [Category.id],
  }),
}))
