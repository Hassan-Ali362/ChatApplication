import {create} from 'zustand';
import {axiosInstance} from '../lib/axios';
import { toast } from 'react-hot-toast';

export const useChatStore = create((set) => ({
    conversations: [],
    isLoadingConversations: false,

    fetchConversations: async () => {
        set({ isLoadingConversations: true });
        try {
            const response = await axiosInstance.get("/conversations");
            set({ conversations: response.data });
            toast.success("Conversations loaded successfully!");
        }
        catch (error) {
            toast.error("Failed to load conversations!");
            console.log("Error in fetching conversations:", error);
            set({ conversations: [] });
        }
        finally {
            set({ isLoadingConversations: false });
        }
    },

    createConversation: async (data) => {
        try {
            const response = await axiosInstance.post("/conversations", data);
            set((state) => ({ conversations: [...state.conversations, response.data] }));
            toast.success("Conversation created successfully!");
        }
        catch (error) {
            toast.error("Failed to create conversation!");
            console.log("Error in creating conversation:", error);
        }
    },

    deleteConversation: async (conversationId) => {
        try {
            await axiosInstance.delete(`/conversations/${conversationId}`);
            set((state) => ({ conversations: state.conversations.filter(c => c.id !== conversationId) }));
            toast.success("Conversation deleted successfully!");
        }
        catch (error) {
            toast.error("Failed to delete conversation!");
            console.log("Error in deleting conversation:", error);
        }
    },
}));
