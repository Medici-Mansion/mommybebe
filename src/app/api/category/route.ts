import { db } from '@/db'
import { checkAndSafeParseToBody, handler } from '@/lib/utils'
import { Category } from '@/schema/models/category.model'
import { insertCategory } from '@/validation/category.validation'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const categories = await db.select().from(Category)

  return NextResponse.json(handler({ data: categories }))
}

export async function POST(req: NextRequest) {
  const { data, validate } = await checkAndSafeParseToBody(req, insertCategory)

  if (!validate) {
    return NextResponse.json(
      handler({
        error: {
          message: 'error',
          detail: data,
        },
      }),
      {
        status: 400,
      },
    )
  }

  try {
    await db.insert(Category).values(data)

    return NextResponse.json(handler({ ok: true }))
  } catch (err) {
    return NextResponse.json(
      handler({
        error: {
          message: 'Category is already exist,',
        },
      }),
      { status: 400 },
    )
  }
}
