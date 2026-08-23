import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-sanity-webhook-secret')

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json(
      { message: 'Yetkisiz' },
      { status: 401 }
    )
  }

  revalidateTag('articles')
  
  return NextResponse.json(
    { revalidated: true, now: Date.now() },
    { status: 200 }
  )
}
