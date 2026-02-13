import { create } from 'zustand';
import {axiosInstance} from '../lib/axios';
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,   // Initial dummy user data
    isCheckingAuth: false,
    isSigningUp: false,
    isLoggingIn: false,

    checkAuth: async () => {
        set({ isCheckingAuth: true }); 

        try {
            const response = await axiosInstance.get("/auth/check")
            set({ authUser: response.data?.id ? response.data : null });    // only  set({ authUser: response.data }); is not good because sometimes the backend returns an empty object {} or some data that doesn’t actually mean the user is logged in. In JavaScript, any object is “truthy”, even if it’s empty. So we need to check if the response contains valid user data (e.g., an id) before setting authUser, otherwise set it to null. 
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
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logout successfully!");
        } catch (error) {
            toast.error("Logout failed!");
            console.log("Error in logout:", error);
        }
    },

    updateProfile: async (data) => {
        try {
            const response = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: response.data });
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Failed to update profile!");
            console.log("Error in updating profile:", error.response?.data || error);
        }
    }
}));
      