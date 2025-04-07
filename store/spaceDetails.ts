import axios from "axios";
import { create } from "zustand";

export const useSpaceDetails = create((set) => ({
  SpaceQuestion: {},
  getSpaceDetails: async (id: string) => {
    try {
      const res = await axios.get(`/api/space/${id}`, {
        withCredentials: true,
      });
      const questions = await res.data.Questions;
      set({ SpaceQuestion: questions });
    } catch (error) {
      console.log(error);
    }
  },
}));
