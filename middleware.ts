


// const { auth } = NextAuth(authConfig);  

// const protectedRoutes = ['/dashboard','/dashboard/:path*','dashboard/space/:path*']
// const publicRoutes = ['/', '/signin,signup','/'] 

// export default auth(async function middleware(req: NextRequest) {
//   const session=  await auth(); 
//   console.log(session,"session")
//   const path = req.nextUrl.pathname; 
//   const isProtectedRoute = protectedRoutes.includes(path);
//   const isPublicRoute = publicRoutes.includes(path); 


//   if (isProtectedRoute && !session?.user?.email) {
//     return NextResponse.redirect(new URL('/signin', req.nextUrl))
//   }
 
//   if (
//     isPublicRoute &&
//     session?.user?.email &&
//     !req.nextUrl.pathname.startsWith('/dashboard')
//   ) {
//     return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
//   }
 
//   return NextResponse.next()
//   }) 




//  export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
//   } 

//   import { NextRequest, NextResponse } from 'next/server';
// import { jwtVerify } from 'jose';

// const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET); // same secret from NextAuth config

// async function getToken(req: NextRequest) {
//   const token = req.cookies.get('next-auth.session-token')?.value
//     || req.cookies.get('__Secure-next-auth.session-token')?.value;

//   if (!token) return null;

//   try {
//     const { payload } = await jwtVerify(token, secret);
//     return payload;
//   } catch (err) {
//     return null;
//   }
// }
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";

const protectedRoutes = ['/dashboard','/dashboard/:path*','dashboard/space/:path*','profile']
const publicRoutes = ['/', '/signin,signup','reviewform/:path*'] 

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const session = await getToken({
    req,
    secret:process.env.NEXTAUTH_SECRET,
  //  secureCookie: true
  }); 
   const cookie = req.cookies.get("__Secure-authjs.session-token")?.value 
              || req.cookies.get("authjs.session-token")?.value;
  console.log("🍪 COOKIE:", cookie);
  
  console.log(session,"sesion")
  const isProtected = protectedRoutes.some(route => path.startsWith(route));
  const isPublic = publicRoutes.includes(path);
  // @ts-ignore
   if (isProtected && !session?.user?.email) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl))
  }
  if (
    isPublic &&
    //  @ts-ignore
    session?.user?.email &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }
 


  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
