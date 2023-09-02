import { db } from '@/db'
import { getImageVariation } from '@/external/dall-e'
import { eq, inArray, isNull } from 'drizzle-orm'
import {
  checkAndSafeParseToBody,
  handler,
  imageToBufferFromCDN,
} from '@/lib/utils'
import { Category } from '@/schema/models/category.model'
import { Image } from '@/schema/models/image.model'
import { variationImage } from '@/validation/image.validation'
import { NextRequest, NextResponse } from 'next/server'
import { uploadImage } from '@/external/upload-image'

export async function POST(req: NextRequest) {
  const { validate, data } = await checkAndSafeParseToBody(req, variationImage)

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
    const { categoryName, images } = data
    const foundCategory = await db
      .select()
      .from(Category)
      .where(eq(Category.name, categoryName))
    if (!foundCategory.length) throw Error()

    const foundImages = await db
      .select()
      .from(Image)
      .where(eq(Image.categoryId, foundCategory[0].id))
      .where(isNull(Image.reviewUrl))
      .where(inArray(Image.id, images))

    const genBufferPromises = foundImages.map((foundImage) =>
      imageToBufferFromCDN(foundImage.originalUrl).then(async (buffer) =>
        uploadImage(
          await getImageVariation({
            id: foundImage.id,
            image: buffer,
            word: foundImage.word,
          }),
        ),
      ),
    )

    const changedImage = await Promise.all(genBufferPromises)

    const updatePromises = changedImage.map((imageObject) =>
      db
        .update(Image)
        .set({
          reviewUrl: imageObject.url,
        })
        .where(eq(Image.id, imageObject.id!))
        .returning({
          word: Image.word,
          reviewUrl: Image.reviewUrl,
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
          message: '이미지를 생성하지 못했어요. 잠시 후 다시 시도해주세요.',
          cause: err,
        },
      }),
    )
  }
}
