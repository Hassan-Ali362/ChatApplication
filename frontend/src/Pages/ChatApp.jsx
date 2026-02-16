import { BorderAnimatedContainer } from "../components/BorderAnimatedContainer";
import { useChatStore } from "../store/useChatStore";
import { ProfileHeader } from "../components/ProfileHeader";
import { ActiveTabSwitch } from "../components/ActiveTabSwitch";
import { ChatsList } from "../components/ChatsList";
import { ContactsList } from "../components/ContactsList";
import { ChatContainer } from "../components/ChatContainer";
import { NoConversationPlaceHolder } from "../components/NoConversationPlaceHolder";

export const ChatApp = () => {

  const {activeTab, selectedUser} = useChatStore();

  return ( 
    <div className='relative w-full max-w-6xl h-200'>   
      <BorderAnimatedContainer>
      
      {/* left side */}
      <div className="sm:w-80 bg-slate-700/50 backdrop-blur-sm flex flex-col w-50">
        <ProfileHeader/>
        <ActiveTabSwitch className="w-full"/>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">    {/* flex-1 is important to make this div take the remaining height and make it scrollable */}
          {activeTab === "Chats" ? <ChatsList/> : <ContactsList/>}
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex flex-col bg-slate-800/50 backdrop-blur-sm">
        {selectedUser ? <ChatContainer/> : <NoConversationPlaceHolder/>}
      </div>

      </BorderAnimatedContainer>

    </div>
  )
}