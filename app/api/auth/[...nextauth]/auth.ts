import connectDB from "../../../../lib/db.connect";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/mongoose/user.schema"; 

const bcrypt = require("bcrypt");

export const authOptions:NextAuthOptions = {    
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
       emial:{label:"email" , type:"text"}, 
       password:{label:"password" ,type:"passwowrd"}
      },
       async authorize(credentials: any): Promise<any> {  

        console.log(credentials,"started")  
        await connectDB()
        try { 

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Please provide both email and password");
          }
          const user = await User.findOne({ email: credentials?.email });
          if (!user) {
            console.error("User not found:", credentials?.email)
          throw new Error("No user found with this email")
          }
          const passcheck = await bcrypt.compare(
            credentials?.password,
            user.password
          );
          if (!passcheck) {
            console.log(passcheck) 
            throw new Error("Invalid credentials");
          }else{
            return {
              id: user._id.toString(),
              email: user.email,
              username: user.username
              // add any other user properties you need
            };
          }

        } catch (error: any) {
          console.log("auth error", error.message);
          throw new Error(error.message);
        }
      },
    }),
  ], 
  callbacks:{
     async jwt({token ,user}) {
         if(user){
          token._id=user?._id?.toString(), 
          token.username=user?.username
         } 

         return token
     }, 
     async  session({session,token})  { 
        if(token){
         session.user._id=token._id ,
         session.user.username=token.username
        }
       return session;
     }
  } , 
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  secret:process.env.AUTH_SECRET,
};
