import axios from "axios";
import { create } from "zustand";  

 export const useProfile=create((set)=> ({
editusername: async(id:string, newname:string)=>{
   try {
    const res=  await axios.patch("/api/editusername",{
        uid:id, 
        username:newname
    },{withCredentials:true});  

     if(res.statusText === "OK"
     ) return {success:true ,message:"Username Changed"}
   } catch (error) {
    return {success:false ,message:"something went wrong"}
   }
}


}))