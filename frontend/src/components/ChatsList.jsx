import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { UserLoadingSkeleton } from "./UserLoadingSkeleton";
import NoChatsFound from "../components/NoChatsFound"

export const ChatsList = () => {
  const {
    getMyChatPartners,
    chats,
    isUsersLoading,
    setSelectedUser,
    selectedUser,
    messages,
  } = useChatStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  const getLastMessage = (chatUserId) => {
    const userMessages = messages[chatUserId] || [];
    if (userMessages.length === 0) return "No messages yet";
    
    const lastMsg = userMessages[userMessages.length - 1];
    if (lastMsg.image && !lastMsg.text) return "📷 Image";
    return lastMsg.text?.substring(0, 30) + (lastMsg.text?.length > 30 ? "..." : "");
  };

  if (isUsersLoading) {
    return <UserLoadingSkeleton />;
  }

  if (!Array.isArray(chats) || chats.length === 0) {
    return <NoChatsFound />;
  }

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => setSelectedUser(chat)}
          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
            selectedUser?._id === chat._id 
              ? 'bg-cyan-600/20 border border-cyan-500/50' 
              : 'hover:bg-slate-800'
          }`}
        >
          <div className="relative">
            <img
              src={chat?.profilePicture || "/default-profilepic.webp"}
              alt={chat?.username || "User"}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-700"></div>
          </div>

          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-white font-medium truncate">
              {chat?.username || "Unknown User"}
            </span>
            <span className="text-slate-400 text-sm truncate">
              {getLastMessage(chat._id)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
