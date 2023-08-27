import { Client } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { schema } from '@/schema'

const client = new Client({
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
})

client.connect()

export const db = drizzle(client, {
  schema,
  logger: process.env.NODE_ENV === 'development',
})

export type DB = typeof db
