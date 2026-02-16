import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { UserLoadingSkeleton } from "./UserLoadingSkeleton";
import { NoChatsFound } from "../components/NoChatsFounds"

export const ChatsList = () => {

  const {getMyChatPartners, chats, isUsersLoading, setSelectedUser} = useChatStore();

  useEffect(()=>{
    getMyChatPartners()
  }, [getMyChatPartners])

  if(isUsersLoading) return <UserLoadingSkeleton/>
  if(chats.length == 0) return <NoChatsFound />

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-slate-400">No conversation selected</p>
    </div>
  );
};
