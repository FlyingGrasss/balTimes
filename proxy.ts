// proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  const pathname = request.nextUrl.pathname

  // Immediately drop requests from known scanner User-Agents
  if (
    userAgent.toLowerCase().includes('gobuster') ||
    userAgent.toLowerCase().includes('dirbuster') ||
    userAgent.toLowerCase().includes('python-requests') ||
    userAgent.toLowerCase().includes('sqlmap')
  ) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // Block common vulnerability scan target extensions instantly
  if (
    pathname.endsWith('.env') ||
    pathname.endsWith('.php') ||
    pathname.endsWith('.bak') ||
    pathname.endsWith('.sql')
  ) {
    return new NextResponse('Not Found', { status: 404 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}

