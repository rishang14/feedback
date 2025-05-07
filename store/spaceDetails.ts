import axios from "axios"; 
import z from "zod"
import { create } from "zustand"; 
import { EditFormSchema } from "@/app/types/schema";


type prop= z.infer<typeof EditFormSchema>
export const useSpaceDetails = create((set) => ({
  questions: {},
  testimonials:[], 
  tags:[],
  getSpaceDetails: async (id: string) => {
    try {
      const res = await axios.get(`/api/space/${id}`, {
        withCredentials: true,
      }); 
      const data = await res.data.Questions; 
      const testimonial= await res.data.Testimonial; 
      const Tags= await res.data.Tags;  
      set({ questions: data , testimonials:testimonial ,tags:Tags});
    } catch (error) {
      console.log(error);
    }
  }, 
  editSpaceForm: async(changeditems:prop, spaceid:string)=>{
   try {
    const res= await axios.patch(
      `/api/editspace/editreviewform/${spaceid}`,
      JSON.stringify(changeditems),
      { withCredentials: true }
    ); 
    if(res.data){
      return {success:true}
    }
   } catch (error) {
    return {success:false,error}
   }
  } ,
  addtag:async (spacId:string , tagname:string)=>{  
   try {
    const res= await axios.patch(`/api/editspace/spacename/${spacId}/addtag`,{tags:tagname},{withCredentials:true});  
    if( res.status === 200) {
      return {success:true};
    }
   } catch (error:any) {
    return  {success:false,error:"Something Went Wrong"}
   }
  },
  removeTag:async (spacId:string , tagname:string)=>{  
    try {
     const res= await axios.patch(`/api/editspace/spacename/${spacId}/deletetag`,{tag:tagname},{withCredentials:true});  
     if( res.status === 200) {
       return {success:true};
     } 
     console.log(res)
    } catch (error:any) { 
      console.log(error)
     return  {success:false,error:"Something Went Wrong"}
    }
   }
}));
