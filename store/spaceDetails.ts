import axios from "axios";
import { create } from "zustand";

export const useSpaceDetails = create((set) => ({
  questions: {},
  testimonials:[],
  getSpaceDetails: async (id: string) => {
    try {
      const res = await axios.get(`/api/space/${id}`, {
        withCredentials: true,
      }); 
      const data = await res.data.Questions; 
      const testimonial= await res.data.Testimonial
      set({ questions: data , testimonials:testimonial });
    } catch (error) {
      console.log(error);
    }
  },
}));
