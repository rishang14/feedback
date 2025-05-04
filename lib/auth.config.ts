
import type { NextAuthConfig, User as UserType } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "./db.connect";
import { getUserByEmail } from "./helper";



export default {
    providers: [
        credentials({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<UserType | null > {
                await connectDB();
                 try {
                    const user = await getUserByEmail(credentials.email as string);
                    if (!user) throw new Error("User not found");
                    const isValid = await bcrypt.compare(
                        credentials.password as string,
                        user.password as string
                    );
                    if (!isValid) throw new Error("Invalid credentials");
                    return user as UserType ;
                 } catch (error) { 
                    //@ts-ignore
                    throw new Error(error)
                 }
            },
        }),
    ],
} satisfies NextAuthConfig;