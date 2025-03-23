import { Session } from 'inspector/promises';
import connectDB from './db.connect';
import CredentialsProvider from 'next-auth/providers/credentials'; 
import User from '@/mongoose/user.schema';
import { NextAuthOptions } from 'next-auth';
import { sign } from 'crypto';



connectDB(); 

const bcrypt = require("bcrypt"); 


export const authOptions={
    Session:{
     strategy: "jwt",
    } ,  

    pages:{
        signIn:"/auth/signin"
    },

    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              email: { label: 'email', type: 'text', placeholder: '' },
              password: { label: 'password', type: 'password', placeholder: '' },
            },
            async authorize(credentials:any,res){ 

                const  user= await User.findOne({email:credentials?.email});  
          
                console.log("credentials", credentials);
                const passwordcheck= bcrypt.compare(user.password, credentials?.password); 
                if(passwordcheck){
                  return  {
                        id: user.id,
                        email: user.email, 
                        username:user.username
                      };
                }
            
              return null;
            }
        }),
    ],
//@ts-ignore
} 