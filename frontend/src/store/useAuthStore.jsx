import { create } from 'zustand';
import {axiosInstance} from '../lib/axios';
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null, // Initial dummy user data
    isCheckingAuth: false,
    isSigningUp: false,
    isLoggingIn: false,

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
    },

    login: async (data) => {
        set({ isLoggingIn: true }); 
        try {
            const response = await axiosInstance.post("/auth/login", data);
            set({ authUser: response.data });

            toast.success("Login successfully!"); 
        } 
        catch (error) {
            toast.error(error.response?.data?.message || "Login failed!");
            console.log("Error in login:", error);
            set({ authUser: null });
        }
        finally{
            set({ isLoggingIn: false });
        }   
    }
}));
      