import axios from "axios";
import { create } from "zustand";

export const useProfile = create((set) => ({
  userdetails: {},
  editusername: async (id: string, newname: string) => {
    try {
      const res = await axios.patch(
        "/api/editusername",
        {
          uid: id,
          username: newname,
        },
        { withCredentials: true }
      );
   console.log(res,"res")
      if (res.status === 200)
        return { success: true, message: "Username Changed" };
    } catch (error) {
      return { success: false, message: "something went wrong" };
    }
  },
  getuserdetails: async (id: string) => {
    try {
      const res = await axios.get("/api/getuser", { withCredentials: true });
       set({userdetails: res.data.user[0]});
    } catch (error) {}
  }, 

  deleteUser :async()=>{
     try {
        const res= await axios.delete("/api/deleteprofile",{withCredentials:true}); 
         if(res.status=== 200) return {success:true}
     } catch ( error:any
     ) {
       console.log(error)
     }
  }
}));
