import axios from "axios";
import { create } from "zustand"; 



export const useSpace = create((set) => ({
  spaces: [], 
  spaceReviewDetail:{},
  getspace: async () => {
    try {
      const res = await axios.get("/api/getspace",{ adapter: 'fetch', fetchOptions: { priority: 'high' },  withCredentials: true } );
      const data =await res.data.spaces;
      set({ spaces: data });
    } catch (error) {
      console.log(error);
    }
  }, 
  getspaceReviewForm:async (spacename :string)=>{ 
     try {
      const res= await axios.get(`/api/reviewformdetails/${spacename}`,) 
      const data=await res.data.question[0]; 
      set({spaceReviewDetail:data}); 
      return {success:true}
     } catch (error) {
       console.log(error) 
       return {success:false}
     }
  } ,
  deleteSpace:async (spaceid:string)=>{ 
    console.log(spaceid,'received in usespace')
     try {
       const res=await axios.delete(`/api/editspace/spacename/${spaceid}/delete`,{withCredentials:true}); 
       console.log(res)
       return {success:true,}
     } catch (error) {
       console.log(error) 
       return {success:false}
     } 
  } , 
  copyspaceReviewForm: async(spacename : string)=>{
     const url = "https://feedbackvault.vercel.app/reviewform/";
        try {
          await navigator.clipboard.writeText(`${url}${spacename}`);
          return { success: true };
        } catch (error) {
           return {success:false,error}
        }
  }
  
}));
