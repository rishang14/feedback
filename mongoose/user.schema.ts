import  mongoose, { Schema, Types, model } from  "mongoose";  

interface UserDocument{
    _id: Types.ObjectId;
    email: string;
    password: string;
    username: string;
    phone: string;
    image: string; 
    isVerified:boolean 
    verifyToken:string 
    verifyTokenExpiry:Date
    frogotPasswordToken:string,
    forgotpasswordTokenExpiry:Date
    createdAt: Date;
    updatedAt: Date;
  }

const UserSchema = new Schema<UserDocument>({
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: [true, "Name is required"]
    }, 
    isVerified:{
      type:Boolean,
      default:false
    } ,
    verifyToken:{
      type:String
    },
    verifyTokenExpiry:{
      type:Date
    },
    frogotPasswordToken:{
      type:String
    },
    forgotpasswordTokenExpiry:{
      type:Date
    }

  },
  {
    timestamps: true,
  }
); 

const  User  =  mongoose.models?.User  ||  model<UserDocument>('User', UserSchema);

export  default  User;