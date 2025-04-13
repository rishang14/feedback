
import  mongoose, { Schema, model ,Types } from  "mongoose";  

interface SpacecDocument{
    _id: Types.ObjectId; 
    userId: Types.ObjectId 
    spacename:string, 
    reviewFormLink: string; 
    tags?:Array<string>;
    createdAt: Date;
    updatedAt: Date;
  }
 
  const SpaceSchema = new Schema<SpacecDocument>({
      userId: {
        type: Schema.Types.ObjectId, 
        ref:"User"
      },
      spacename: {
        type: String, 
        trim:true, 
        unique:true,
        required: [true, "spacename is required"]
      },
      reviewFormLink: {
        type: String,
      }, 
      tags:[{ type: String,default: []  }],
    },
    {
      timestamps: true,
    }
  ); 
  
  const  Space  =  mongoose.models?.Space  ||  model<SpacecDocument>('Space', SpaceSchema);
  
  export  default  Space;




