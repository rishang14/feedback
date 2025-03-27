// import { NextRequestWithAuth} from 'next-auth/middleware';
import { NextResponse, NextRequest } from 'next/server';  
// import { getToken } from 'next-auth/jwt';

// export const withAuth=async (req:NextRequestWithAuth)=>{
 
//     const token = await getToken({req});   
//     console.log(token,"token")

//     if (!token) { 
//         return NextResponse.redirect(new URL('/auth/login', req.url));
//       }  

//       return NextResponse.next();
// }
  
// export async function middleware(request: NextRequestWithAuth) { 
//     // const token =  await getToken({req : request});  
//     const url=request.nextUrl; 

//     if(token && 
//      (
//         url.pathname.startsWith("/signin")
//      )
//     ){
//         return NextResponse.redirect(new URL('/dashboard',request.url))
//     }

//     return ;
//   }
  

//   export const config={
//     matcher: ['/signin','/dashboard/space/:path*','/dashboard' ], 
  
// } 

 

