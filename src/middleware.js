import { NextResponse } from 'next/server'
 

export async function middleware(req) {
 const path = await req.nextUrl.pathname;
 const publicPaths = path === "/login" || path === "/signup"
 const token = await req.cookies.get("token")?.value || "";
 if(publicPaths && token){
    return NextResponse.redirect(new URL('/', req.url))
 }
 if(!publicPaths && !token){
    return NextResponse.redirect(new URL('/login', req.url))
 }


}
 
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/profile/:path*'
  ],
}