import { NextRequest, NextResponse } from 'next/server'
import * as z from 'zod'
type ResponseArgs<T = unknown> = Partial<{ data: T; error: any; ok: boolean }>

interface ResponseHandler<T = unknown> {
  ok: boolean
  data: T
  error?: any
}

export function handler({
  ok,
  data,
  error = null,
}: ResponseArgs): ResponseHandler<typeof data> {
  return {
    ok: ok ?? (!!data || !error),
    data,
    error,
  }
}

export async function checkAndSafeParseToBody<T extends z.ZodRawShape>(
  req: NextRequest,
  validate: z.ZodObject<T>,
) {
  const validation = validate.safeParse(await req.json())
  if (!validation.success) {
    return {
      validate: validation.success,
      data: validation.error,
    }
  } else {
    return {
      validate: validation.success,
      data: validation.data,
    }
  }
}
