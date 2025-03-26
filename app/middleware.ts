import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse, NextRequest } from 'next/server';  
import { getToken } from 'next-auth/jwt';


export const config={
    matcher: ['/dashboard/space/:path*','/dashboard' ], 
  
} 


export const withAuth=async (req:NextRequestWithAuth)=>{
 
    const token = await getToken({req});   
    console.log(token,"token")

    if (!token) { 
        NextResponse.redirect("/auth/login");
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
      }  

      return NextResponse.next();
}
  
export async function middleware(req: NextRequestWithAuth) {
    return await withAuth(req);
  }
  

  export default withAuth;

