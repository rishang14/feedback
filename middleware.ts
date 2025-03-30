import authConfig from "./lib/auth.config"
import NextAuth from "next-auth"  
import { NextRequest ,NextResponse} from "next/server"; 



const { auth } = NextAuth(authConfig);  

const protectedRoutes = ['/dashboard','/dashboard/:path*','dashborad/space/:path*']
const publicRoutes = ['/', '/signin,signup','/']

export default auth(async function middleware(req: NextRequest) {
  const session=  await auth(); 
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

    console.log(session,"session")
  }) 




 export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  }