import mongoose, { Schema, Types, model } from "mongoose"; 
import { boolean } from "zod";


interface Testimnoailstype {
  _id: Types.ObjectId;
  spaceId: Types.ObjectId; 
  name:string; 
  email:string; 
  rating?:number; 
  text:string; 
  walloflove?:boolean ;
  archeived?:boolean; 
  consent:boolean;
  tags?:Array<string>;
}

const TestimonialsSchema= new Schema<Testimnoailstype>({
 spaceId:{
    type: Schema.Types.ObjectId,
    ref: "Space",
 }, 
 name:{
    type: String, 
     required:[true," name is required" ]
 }, 
 email:{
    type: String, 
    required:[true,"email is required"]
 },
 rating:{
    type:Number
 }, 
 text:{
    type:String, 
    required:[true, 'text is required']
 },
  walloflove:{
    type:Boolean,  
    default:false
  }, 
  archeived:{
    type:Boolean ,
    default:false,
  }, 
  consent:{
    type:Boolean, 
    required:[true,'consent is required']
  } ,
  tags:[{ type: String,default: []  }], 

  
}) 



const Testimnoails= mongoose.models?.Testimonial ||   model<Testimnoailstype>("Testimonial",TestimonialsSchema ) 


export default Testimnoails; 