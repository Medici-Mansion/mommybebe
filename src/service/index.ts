import CategoryApi from '@/service/category'
import { FetchQueryOptions } from '@tanstack/react-query'

import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
})

type QueryType<T> = FetchQueryOptions<T, unknown, T, readonly string[]>

export { CategoryApi }
export type { QueryType }
