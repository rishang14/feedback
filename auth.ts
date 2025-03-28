import NextAuth from "next-auth" 
import Credentials from "next-auth/providers/credentials" 
import User from "@/mongoose/user.schema" 
import connectDB from "./lib/db.connect" 
import { loginSchema } from "@/app/types/schema" 
import { ZodError } from "zod" 



const bcrypt = require("bcrypt");
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [ 
    Credentials({ 
        id:"credentials",
        name:"credentials", 
        credentials: {
            email: { label:"Email", type:"email"},
            password: {label:"Password",type:"password"},
          }, 
            async authorize (c): Promise<any> { 
            await  connectDB(); 
            console.log("hello inside signin auth")
           try { 
              // const {email,password} = loginSchema.parse(c);  
              // if(!csrftoken) throw new Error("missing csrf token") 

              const user= await  User.findOne({eamil:c.email}); 

              if(!user) throw new Error("No useer available with this email ") 
 
              const passcheck=await bcrypt.compare(c.password,user.password)  

              if(!passcheck){
                throw new Error("Invalid Credentials"); 
              }else{
                return {
                    id:user._id, 
                    username:user.username, 
                    email:user.email
                }
              }

           } catch (error) {
            console.log(error)
           }

            // return null;
          }
    })
  ],  
  pages:{
    signIn:"/signin"
  },
  session:{
    strategy:"jwt",
  },  
  callbacks:{
    async jwt({ token, user }) {
        if (user) token.user = user; // Attach user info to token
        return token;
      },
      async session({ session, token }) {
        return session;
      }, 
      async signIn({user}){
          const users=await User.findOne({_id:user.id}); 
          if(users) return  true;  
          return false;
      }

  },
 
  
//   adapter:
})