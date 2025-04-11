import axios from "axios";
import { create } from "zustand";

export const useGetSpace = create((set) => ({
  spaces: [], 
  spaceReviewDetail:{},
  getspace: async () => {
    try {
      const res = await axios.get("/api/getspace", { withCredentials: true });
      const data = res.data.spaces;
      set({ spaces: data });
    } catch (error) {
      console.log(error);
    }
  }, 
  getspaceReviewForm:async (spacename :string)=>{ 
    console.log("got space name",spacename)
     try {
      const res= await axios.get(`/api/reviewformdetails/${spacename}`,) 
      console.log(res,":question")
     } catch (error) {
       console.log(error)
     }
  }
}));
