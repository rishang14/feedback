import axios from "axios";
import { create } from "zustand";

export const useGetSpace = create((set) => ({
  spaces: [],
  getspace: async () => {
    try {
      const res = await axios.get("/api/getspace", { withCredentials: true });
      console.log(res);
      const data = res.data.spaces;
      set({ spaces: data });
    } catch (error) {
      console.log(error);
    }
  },
}));
