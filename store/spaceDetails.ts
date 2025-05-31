import axios from "axios"; 
import z from "zod"
import { create } from "zustand"; 
import { EditFormSchema } from "@/app/types/schema";
import { error } from "console";


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
      const Tags= await res.data.Tags;  
      set({ questions: data  ,tags:Tags}); 
      return {success:true };
    } catch (error) {
      return {success : false};
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
    const res= await axios.patch(`/api/editspace/spacename/${spacId}/addtag`,{tag:tagname},{withCredentials:true});  
    if( res.status === 200) {
      return {success:true};
    }
   } catch (error:any) { 
    if(error.status === 402){
      return {success:false,error:"Tags with This name Already Exists", status:402}
    }
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
   },  
   getreviews: async(spaceid:string,tab:string)=>{ 
    if(tab==="liked")tab="walloflove"
     try {
       const res= await axios.get("/api/gettestimonial",{
    params: {
    spaceid,
    tab
    }, 
    withCredentials:true
  });   
    const review= await res.data.review; 
    set({testimonials:review})
     } catch (error) {
      
     }
   }, 
   embedReviews:async(sId:string,style:string)=>{
      try {
         const res= await axios.get("/api/embedtestimonial",{
          params:{
            sId,
            style,
          },
          withCredentials:true
         }) 

         return { review :res.data.review ,error:false}
      } catch (error:any) {
         return {errormsg:error.response.data.error,error:true}
      }
   }
}));
