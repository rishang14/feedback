import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import connectDB from "@/lib/db.connect"; 
import { NextRequest ,NextResponse} from "next/server";



const { auth } = NextAuth(authConfig); 


export async function POST(req:NextRequest, context:any){
   const session = await auth();
   if (!session?.user?.email) {
     return NextResponse.json(
       { error: "You are not allowed to access this api route" },
       { status: 400 }
     );
   } 
  await connectDB()
    try {
        const {id} = context.params; 

        console.log(id,"here is the id")
    } catch (error) {
        console.log(error) 
    }
}