import { v4 as uuidv4 } from "uuid";
import connectDB from "./db.connect";
import User from "@/mongoose/user.schema";

type prop = "verifyemail" | "forgotpassword";
const tokenFieldMap = {
  verifyemail: "emailToken",
  forgotpassword: "forgotPasswordToken",
} as const;

const expiryFieldMap = {
  verifyemail: "verifyTokenExpiry",
  forgotpassword: "forgotpasswordTokenExpiry",
} as const;

export const getVerificationTokenByEmail = async (
  email: string,
  emailtype: prop
) => {
  await connectDB();
  const token = tokenFieldMap[emailtype]; 
  console.log([token],"token ")
  try {
    if (!email) {
      console.error("No email found");
      return;
    }
    const tokentype = await User.findOne({ email: email }).select(`+${[token]}`);
    console.log(tokentype[token], "token available");
    return tokentype[token];
  } catch (error) {
    console.error("Error fetching verification token by email", error);
    return null;
  }
};

export const generateVerificationToken = async (
  email: string,
  emailtype: prop
) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const tokentype = tokenFieldMap[emailtype];
  const tokenexpiry = expiryFieldMap[emailtype];
  const existingToken = await getVerificationTokenByEmail(email, emailtype);
  if (existingToken) {
    await User.updateOne(
      { email },
      { $set: { [tokentype]: "", [tokenexpiry]: "" } }
    );
  }
  const TokenGenerated = await User.updateOne(
    { email },
    {
      $set: {
        [tokentype]: token,
        [tokenexpiry]: expires,
      },
    }
  );
  console.log(TokenGenerated, "Token generated");
  // return verifyEmailToken
};
