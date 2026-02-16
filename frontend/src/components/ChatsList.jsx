import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { UserLoadingSkeleton } from "./UserLoadingSkeleton";
import { NoChatsFound } from "../components/noChatsFound";

export const ChatsList = () => {
  const {
    getMyChatPartners,
    chats,
    isUsersLoading,
    setSelectedUser,
  } = useChatStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  // ✅ Loading State
  if (isUsersLoading) {
    return <UserLoadingSkeleton />;
  }

  // ✅ Safety Guard (Prevents Crash)
  if (!Array.isArray(chats) || chats.length === 0) {
    return <NoChatsFound />;
  }

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => setSelectedUser(chat)}
          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-slate-800 transition"
        >
          <img
            src={chat?.profilePicture || "/avatar.png"}
            alt={chat?.username || "User"}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex flex-col">
            <span className="text-white font-medium">
              {chat?.username || "Unknown User"}
            </span>
            <span className="text-slate-400 text-sm">
              Click to start chatting
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
