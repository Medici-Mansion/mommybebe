import { db } from '@/db'
import { getImageFromDallE } from '@/external/dall-e'
import { eq } from 'drizzle-orm'
import { checkAndSafeParseToBody, handler } from '@/lib/utils'
import { Category } from '@/schema/models/category.model'
import { Image } from '@/schema/models/image.model'
import { postImageBody } from '@/validation/image.validation'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category') || ''
    const foundCategory = (
      await db.select().from(Category).where(eq(Category.name, category))
    )[0]
    if (!foundCategory) throw Error()
    const result = await db
      .select()
      .from(Image)
      .where(eq(Image.categoryId, foundCategory.id))

    return NextResponse.json(handler({ data: result }))
  } catch (err) {
    return NextResponse.json(
      handler({
        error: {
          message: '이미지를 찾지 못했어요. 잠시 후 다시 시도해주세요.',
        },
      }),
    )
  }
}

export async function POST(req: NextRequest) {
  const { validate, data } = await checkAndSafeParseToBody(req, postImageBody)

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
    const { categoryName, words } = data
    const foundCategory = await db
      .select()
      .from(Category)
      .where(eq(Category.name, categoryName))
    if (!foundCategory.length) throw Error()
    const response = await getImageFromDallE(words)

    await db.insert(Image).values(
      response.map((item) => ({
        word: item.keyword,
        categoryId: foundCategory[0].id,
        originalUrl: item.url,
      })),
    )

    return NextResponse.json(
      handler({ data: { category: categoryName, images: response } }),
    )
  } catch (err) {
    return NextResponse.json(
      handler({
        error: {
          message: '이미지를 생성하지 못했어요. 잠시 후 다시 시도해주세요.',
        },
      }),
    )
  }
}
