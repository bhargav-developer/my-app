import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(req) {
 const path = req.nextUrl.pathname;
 const publicPaths = path === "/login" || path === "/signup"
 const token = req.cookies.get("token")?.value || "";
 if(publicPaths && token){
    return NextResponse.redirect(new URL('/', req.url))
 }
 if(!publicPaths && !token){
    return NextResponse.redirect(new URL('/login', req.url))
 }


}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/profile/:path*'
  ],
}