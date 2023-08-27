import { Image } from './models/image.model'
import { Category } from './models/category.model'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'

export const schema = { Category, Image }
export type DBMoudle = NodePgDatabase<typeof schema>
