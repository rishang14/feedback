import {v4 as uuidv4} from "uuid"
import connectDB from "./db.connect"; 
import User from "@/mongoose/user.schema";


export const getVerificationTokenByEmail = async (email: string) => { 
    await connectDB()
    try {
        if (!email) {
            console.warn("No email found")
            return;
        }
        const user = await User.findOne({email:email}).select('verifyToken'); 
        console.log(user.verifyToken,"verifytoken")
        return user.verifyToken;
    } catch (error) {
        console.error("Error fetching verification token by email", error)
        return null;
    }
}




export const generateVerificationToken= async(email:string)=>{
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);  

    const existingToken= await  getVerificationTokenByEmail(email); 

    if(existingToken){
        await User.updateOne(
            { email},
            { $set: {verifyToken : '' } }
          );      
    } 
    const verifyEmailToken= await User.updateOne({email}, {$set : {
        verifyToken: token, 
        verifyTokenExpiry:expires
    },})
    console.log(verifyEmailToken,"Token generated")
    // return verifyEmailToken
}