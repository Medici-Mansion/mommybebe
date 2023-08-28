import { Image, ImageRelations } from './models/image.model'
import { Category, CategoryRelations } from './models/category.model'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'

export const schema = { Category, Image, CategoryRelations, ImageRelations }
export type DBMoudle = NodePgDatabase<typeof schema>
