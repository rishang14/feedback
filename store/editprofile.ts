import axios from "axios";
import { create } from "zustand";  

 export const useProfile=create((set)=> ({
editusername: async(id:string, newname:string)=>{
   try {
    const res= axios.patch("/api/editusername",{
        uid:id, 
        username:newname
    },{withCredentials:true}); 
    console.log(res)
   } catch (error) {
    
   }
}


}))