// app/api/revalidate/route.ts
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

  // Revalidate all pages with articles tag
  revalidateTag('articles', "max")
  
  return NextResponse.json(
    { revalidated: true, now: Date.now() },
    { status: 200 }
  )
}