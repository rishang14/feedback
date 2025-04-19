import axios from "axios";
import { create } from "zustand"; 



export const useSpace = create((set) => ({
  spaces: [], 
  spaceReviewDetail:{},
  getspace: async () => {
    try {
      const res = await axios.get("/api/getspace", { withCredentials: true });
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
     } catch (error) {
       console.log(error)
     }
  } ,
  // editSpaceName:async (spaceid:string,newName:string)=>{ 
  //   console.log(spaceid,'received in usespace')
  //    try {
  //      const res=await axios.patch(`/api/editspace/spacename/${spaceid}/edit`,JSON.stringify(newName),{withCredentials:true});
  //      console.log(res)
  //    } catch (error) {
  //      console.log(error)
  //    } 
  // } 
}));
