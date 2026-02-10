import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    authUser: { name: "hassan", _id: 123, age: 30 }, // Initial dummy user data
    isLoggedIn: false,
    isLoading: false,

    Login: () => {
        console.log("We just Logged In");
        set({ isLoggedIn: true, isLoading: true });
    } 
}));
      