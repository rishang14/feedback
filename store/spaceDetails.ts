import axios from "axios";
import { create } from "zustand";

export const useSpaceDetails = create((set) => ({
  questions: {},
  getSpaceDetails: async (id: string) => {
    try {
      const res = await axios.get(`/api/space/${id}`, {
        withCredentials: true,
      });
      const data = await res.data.Questions;
      set({ questions: data });
    } catch (error) {
      console.log(error);
    }
  },
}));
