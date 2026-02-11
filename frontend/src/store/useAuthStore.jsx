import { create } from 'zustand';
import {axiosInstance} from '../lib/axios';
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null, // Initial dummy user data
    isCheckingAuth: false,
    isSigningUp: false,

    checkAuth: async () => {
        set({ isCheckingAuth: true }); 

        try {
            const response = await axiosInstance.get("/auth/check")
            set({ authUser: response.data });
        } 
        catch (error) {
            console.log("Error in checking auth:", error);
            set({ authUser: null });
        }
        finally{
            set({ isCheckingAuth: false });
        }   
    },

    signup: async (data) => {
        set({ isSigningUp: true }); 
        try {
            const response = await axiosInstance.post("/auth/signup", data);
            set({ authUser: response.data });

            toast.success("Signup successfully!"); 
        } 
        catch (error) {
            toast.error(error.response?.data?.message || "Signup failed!");
            console.log("Error in signup:", error);
            set({ authUser: null });
        }
        finally{
            set({ isSigningUp: false });
        }   
    }
}));
      