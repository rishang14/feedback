

import NextAuth, { User as NextAuthUser } from "next-auth";
import User from "@/mongoose/user.schema"
import authConfig from "./lib/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/signin"
  },
  session: {
    strategy: "jwt",
  }, 
  secret:process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user; // Attach user info to token
      return token;
    },
    async session({ session, token ,user}) { 
          if(token){ 
          
            //@ts-ignore
            session.user.name=token.user.username;  
            // @ts-ignore
            session.user.userId=token.user._id; 
            // @ts-ignore
            session.user.isVerified=token.user.isVerified
          }
      return session;
    },
    async signIn({ user }) {
      const users = await User.findOne({ _id: user.id });
      if (!users?.isVerified) return false;
      return true;
    }
  }
})