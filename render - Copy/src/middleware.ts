import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of paths that require authentication
const protectedPaths = ['/dashboard', '/service']

// List of paths that should be excluded from middleware
const publicPaths = ['/login', '/signup', '/api/auth']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if the path should be protected
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))
  
  // If it's a public path, allow access
  if (isPublicPath || !isProtectedPath) {
    return NextResponse.next()
  }
  
  // For protected paths, check for auth token
  const token = request.cookies.get('token')
  
  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // If we have a token, allow access
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}