import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Route matcher for admin routes
const isAdminRoute = createRouteMatcher(['/admin(.*)'])
// Route matcher for protected routes
const isProtectedRoute = createRouteMatcher(['/checkout(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Protect all routes starting with `/admin` for admin role only
  const user = await auth()
  if (isAdminRoute(req)) {
    if (user.sessionClaims?.metadata?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Protect all routes starting with `/checkout` for any logged-in user
  if (isProtectedRoute(req)) {
    if (!user.userId) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}