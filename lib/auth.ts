import connectDB from "./db.connect";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/mongoose/user.schema";
import type  { NextAuthOptions } from "next-auth"; 
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"
import  { getServerSession } from "next-auth"


connectDB();

const bcrypt = require("bcrypt");

export const config = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
      },
      async authorize(credentials: any, res) {
        try {
          const user = await User.findOne({ email: credentials?.email });
          if (!user) throw new Error("user not exists");
          const passcheck = await bcrypt.compare(
            credentials?.password,
            user.password
          );
          if (!passcheck) throw new Error("invalid credentials");

          return {
            id: user._id,
            username: user.username,
            email: user.email,
          };
        } catch (error: any) {
          console.log("auth error", error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],
}satisfies NextAuthOptions ; 


export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config)
}

