import {create} from "zustand";
import {axiosInstance} from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        try {
            set({isSigningUp: true});
            const res = await axiosInstance.post("/auth/signup", formData);
            set({authUser: res.data});
        } catch (error) {
            console.log("Error in signup:", error);
        } finally {
            set({isSigningUp: false});
        }
    },
}));