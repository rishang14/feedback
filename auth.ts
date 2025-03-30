import NextAuth, { User as NextAuthUser } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import User from "@/mongoose/user.schema"
import connectDB from "./lib/db.connect";
import { loginSchema } from "@/app/types/schema";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";
import authConfig from "./lib/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/signin"
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user; // Attach user info to token
      return token;
    },
    async session({ session, token ,user}) { 
          if(token){ 
            console.log(token,"token")  
            //@ts-ignore
            session.user.name=token.user.username;  
            // @ts-ignore
            session.user.userId=token.user._id
          }
      return session;
    },
    async signIn({ user }) {
      const users = await User.findOne({ _id: user.id });
      if (users) return true;
      return false;
    }
  }
})