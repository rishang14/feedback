import NextAuth from "next-auth" 
import { config } from "@/lib/auth";

 // @ts-ignore
const handler=NextAuth(config); 


export {handler as GET ,handler as POST
} 