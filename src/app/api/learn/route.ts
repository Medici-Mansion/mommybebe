import { db } from '@/db'
import { eq, isNotNull, sql } from 'drizzle-orm'
import { checkAndSafeParseToBody, handler } from '@/lib/utils'
import { Category } from '@/schema/models/category.model'
import { Image } from '@/schema/models/image.model'
import { completeLearn } from '@/validation/image.validation'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category') || ''
    const response =
      (
        await db.execute(sql`
    select 
      *
    , (select
      coalesce(json_agg(jsonb_build_object(
        'id',             "images"."id", 
        'createdAt',      "images"."createdAt",
      'word',             "images"."word",
      'is_correct',       "images"."is_correct",
      'is_learned',       "images"."is_learned"
          )),
      '[]') images
    from
      (
      select
        *
      from
        (
        select
          row_number() over (partition by word
        order by
          "i"."createdAt" desc) as ROWNUM,
          "i"."id",
          "i"."createdAt",
          "i"."word",
          "i"."is_correct",
          "i"."is_learned",
          "i"."category_id"
        from
          "image" "i"
        where
          "i".category_id = c.id
        and
          "i".is_learned is not null
          ) as "image_with_rownum"
      where
        "image_with_rownum".ROWNUM = 1  limit 5) images)
    from category c  where c.name = ${category} limit 1`)
      ).rows?.[0] || undefined
    return NextResponse.json(handler({ data: response }))
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      handler({
        error: {
          message: '이미지를 찾지 못했어요. 잠시 후 다시 시도해주세요.',
        },
      }),
      { status: 400 },
    )
  }
}

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
          isCorrect: Image.isCorrect,
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
