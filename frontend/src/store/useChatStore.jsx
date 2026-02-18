import {create} from 'zustand';
import {axiosInstance} from '../lib/axios';
import { toast } from 'react-hot-toast';

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: {},
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true ? true : false,

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
        set({ isSoundEnabled: !get().isSoundEnabled });
    },

    setActiveTab: (tab) => set({ activeTab: tab }),

    setSelectedUser: (user) => set({ selectedUser: user }),

    getAllContacts: async () => {
        set({ isUsersLoading: true });
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
            set({ isUsersLoading: false });
        }
    },

    getMyChatPartners: async () => {
        try {
           const response = await axiosInstance.get("/messages/chats");
           const data = response.data;
           set({ chats: data });
        } 
        catch (error) {
            console.log("Error in fetching my partners:", error);
            toast.error("Failed to fetch my partners!");
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: { ...get().messages, [userId]: response.data } });
        } catch (error) {
            console.log("Error in fetching messages:", error);
            toast.error("Failed to fetch messages!");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (userId, messageData) => {
        try {
            const response = await axiosInstance.post(`/messages/send/${userId}`, messageData);
            const newMessage = response.data;
            
            // Update messages for this user
            const currentMessages = get().messages[userId] || [];
            set({ 
                messages: { 
                    ...get().messages, 
                    [userId]: [...currentMessages, newMessage] 
                } 
            });

            // Play sound if enabled
            if (get().isSoundEnabled) {
                const audio = new Audio('/sounds/mouseClickSound.mp3');
                audio.play().catch(err => console.log("Audio play failed:", err));
            }
        } catch (error) {
            console.log("Error in sending message:", error);
            toast.error("Failed to send message!");
        }
    },

    deleteMessage: async (userId, messageId) => {
        try {
            // Optimistically update UI
            const currentMessages = get().messages[userId] || [];
            const updatedMessages = currentMessages.filter(msg => msg._id !== messageId);
            set({ 
                messages: { 
                    ...get().messages, 
                    [userId]: updatedMessages 
                } 
            });
            
            // Note: Backend endpoint for delete would be needed
            // await axiosInstance.delete(`/messages/${messageId}`);
            toast.success("Message deleted!");
        } catch (error) {
            console.log("Error in deleting message:", error);
            toast.error("Failed to delete message!");
            // Revert on error
            get().getMessages(userId);
        }
    },

    searchMessages: (userId, searchTerm) => {
        const userMessages = get().messages[userId] || [];
        if (!searchTerm) return userMessages;
        
        return userMessages.filter(msg => 
            msg.text?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
}));