import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // First, update the session
  const response = await updateSession(request)
  
  // Get the pathname
  const pathname = request.nextUrl.pathname
  
  // Define protected and auth routes
  const protectedPaths = ['/projects', '/profile', '/dashboard']
  const authPaths = ['/login', '/register', '/verify-email', '/forgot-password']
  
  const isProtectedPath = protectedPaths.some(path => 
    pathname.startsWith(path)
  )
  
  const isAuthPath = authPaths.some(path => 
    pathname.startsWith(path)
  )
  
  // Skip middleware for public routes
  if (!isProtectedPath && !isAuthPath) {
    return response
  }
  
  try {
    // Create a Supabase client for middleware
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )
    
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser()
    
    // Redirect to login if accessing protected route without session
    if (isProtectedPath && !user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/login'
      redirectUrl.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(redirectUrl)
    }
    
    // Redirect to projects if accessing auth route with session
    if (isAuthPath && user) {
      return NextResponse.redirect(new URL('/projects', request.url))
    }
  } catch (error) {
    console.error('Middleware error:', error)
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - api routes (to avoid double middleware execution)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}