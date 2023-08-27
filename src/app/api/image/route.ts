import { checkAndSafeParseToBody, handler } from '@/lib/utils'
import { postImageBody } from '@/validation/image.validation'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest,
  res: { params: { category: string } },
) {
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

  return NextResponse.json(handler({ data }))
}
