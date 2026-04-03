import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define Public Routes
const isPublicRoute = createRouteMatcher([
  "/", 
  "/sign-in(.*)", 
  "/sign-up(.*)", 
  "/api/inngest(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect all routes except the public ones
  if (!isPublicRoute(req)) {
      await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes, except Inngest
    '/(api(?!/inngest)|trpc)(.*)',
  ],
}
