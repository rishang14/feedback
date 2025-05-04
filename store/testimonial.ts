import axios from "axios";
import { create } from "zustand";

export const UseTestimonial = create((set) => ({
  addtag: async (id: string, tagname: string) => {
    try {
      const res = await axios.patch(
        `/api/${id}/testimonialAddTag`,
        { tag: tagname },
        { withCredentials: true }
      );
      if ((res.statusText = "OK")) return { success: true };
    } catch (error: any) {
      return { success: false, error: "Something Went Wrong" };
    }
  },
  reovetag: async (id: string, tagname: string) => {
    try {
      const res = await axios.patch(
        `/api/${id}/testimonialRemoveTag`,
        { tag: tagname },
        { withCredentials: true }
      );
      if ((res.statusText = "OK")) return { success: true };
    } catch (error: any) {
      return { success: false, error: "Something Went Wrong" };
    }
  },
  archive: async (id: string) => {
    try {
      const res = await axios.patch(`/api/${id}/archiveTestimonial`, {
        withCredentials: true,
      });
      if ((res.statusText = "OK")) return { success: true };
    } catch (error: any) {
      return { success: false, error: "Something Went Wrong" };
    }
  },
  unarchive: async (id: string) => {
    try {
      const res = await axios.patch(`/api/${id}/unarchivedTestimonial`, {
        withCredentials: true,
      });
      if ((res.statusText = "OK")) return { success: true };
    } catch (error: any) {
      return { success: false, error: "Something Went Wrong" };
    }
  },
  deleteTestimonial: async (id: string) => {
    try {
      const res = await axios.delete(`/api/${id}/deleteTestimonial`, {
        withCredentials: true,
      });
      if (res.statusText === "OK") return { success: true };
    } catch (error: any) {
      return { success: false, error: "Something went wrong" };
    }
  },
}));
