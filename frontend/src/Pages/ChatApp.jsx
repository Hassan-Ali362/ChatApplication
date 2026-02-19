import { BorderAnimatedContainer } from "../components/BorderAnimatedContainer";
import { useChatStore } from "../store/useChatStore";
import { ProfileHeader } from "../components/ProfileHeader";
import { ActiveTabSwitch } from "../components/ActiveTabSwitch";
import { ChatsList } from "../components/ChatsList";
import { ContactsList } from "../components/ContactsList";
import { ChatContainer } from "../components/ChatContainer";
import { NoConversationPlaceHolder } from "../components/NoConversationPlaceHolder";

export const ChatApp = () => {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full flex justify-center items-center bg-slate-900 p-4">
      <div className="relative w-full max-w-6xl flex h-145">
        <BorderAnimatedContainer>
          {/* Left Sidebar - Hidden on mobile when chat is selected */}
          <div className={`sm:w-80 w-full bg-slate-700/50 backdrop-blur-sm flex flex-col h-full ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === "chats" ? <ChatsList /> : <ContactsList />}
            </div>
          </div>

          <div className={`flex-1 flex flex-col bg-slate-800/50 backdrop-blur-sm h-full ${selectedUser ? 'flex' : 'hidden md:flex'}`}>
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceHolder />}
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};
