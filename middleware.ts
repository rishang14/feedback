export const runtime = 'nodejs'

import { NextRequest ,NextResponse} from "next/server";  
import { auth } from "./auth";


// const { auth } = NextAuth(authConfig);  

const protectedRoutes = ['/dashboard','/dashboard/:path*','dashboard/space/:path*']
const publicRoutes = ['/', '/signin,signup','/'] 

export default auth(async function middleware(req: NextRequest) {
  const session=  await auth(); 
  console.log(session,"session")
  const path = req.nextUrl.pathname; 
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path); 


  if (isProtectedRoute && !session?.user?.email) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl))
  }
 
  if (
    isPublicRoute &&
    session?.user?.email &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }
 
  return NextResponse.next()
  }) 




 export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  }