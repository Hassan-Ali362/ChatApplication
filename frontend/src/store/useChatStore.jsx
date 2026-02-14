import {create} from 'zustand';
import {axiosInstance} from '../lib/axios';
import { toast } from 'react-hot-toast';

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: {},
    activeTab: "Chats",
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true ? true : false,

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
        set({ isSoundEnabled: !get().isSoundEnabled });
    },

    setActiveTab: (tab) => set({ activeTab: tab }),

    setSelectedUser: (user) => set({ selectedUser: user }),

    getAllContacts: async () => {
        set({ isUserLoading: true });
        try {
            const response = await axiosInstance.get("/messages/contacts");
            const data = response.data;
            set({ allContacts: data });
            toast.success("Contacts fetched successfully!");
        }
        catch (error) {
            console.log("Error in fetching contacts:", error);
            toast.error("Failed to fetch contacts!");
        }
        finally {
            set({ isUserLoading: false });
        }
    },

    getMyChatPartners: async () => {
        try {
           const response = await axiosInstance.get("/api/chats");
           const data = response.data;
           set({ chats: data });
           toast.success("My partners fetched successfully!");
        } 
        catch (error) {
            console.log("Error in fetching my partners:", error);
            toast.error("Failed to fetch my partners!");
        }
    }
}));