import { Session } from "inspector/promises";
import connectDB from "./db.connect";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/mongoose/user.schema";
import { NextAuthOptions } from "next-auth";
import { sign } from "crypto";
import { error } from "console";

connectDB();

const bcrypt = require("bcrypt");

export const authOptions = {
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
  //@ts-ignore
};
