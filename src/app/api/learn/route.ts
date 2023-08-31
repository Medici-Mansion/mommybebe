import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { checkAndSafeParseToBody, handler } from '@/lib/utils'
import { Category } from '@/schema/models/category.model'
import { Image } from '@/schema/models/image.model'
import { completeLearn } from '@/validation/image.validation'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { validate, data } = await checkAndSafeParseToBody(req, completeLearn)

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
    const date = new Date()
    const updatePromises = words.map((word) =>
      db
        .update(Image)
        .set({
          isCorrect: word.isCorrect,
          isLearned: date
            .toLocaleDateString()
            .replaceAll('.', '')
            .replaceAll(' ', '-'),
        })
        .where(eq(Image.id, word.id))
        .returning({
          word: Image.word,
          learnDate: Image.isLearned,
        })
        .then((r) => r[0]),
    )

    const response = await Promise.all(updatePromises)

    return NextResponse.json(
      handler({
        data: response,
      }),
    )
  } catch (err) {
    return NextResponse.json(
      handler({
        error: {
          message: '학습정보 저장에 실패했어요.',
        },
      }),
    )
  }
}
