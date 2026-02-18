import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

export const ContactsList = () => {
  const { allContacts, getAllContacts, isUsersLoading, setSelectedUser, selectedUser } = useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!allContacts || allContacts.length === 0) {
    return <p className="text-slate-400 text-center mt-4">No contacts found</p>;
  }

  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-full">
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          onClick={() => setSelectedUser(contact)}
          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
            selectedUser?._id === contact._id 
              ? 'bg-cyan-600/20 border border-cyan-500/50' 
              : 'hover:bg-slate-800'
          }`}
        >
          <div className="relative">
            <img
              src={contact?.profilePicture || "/default-profilepic.webp"}
              alt={contact?.username || "User"}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-700"></div>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-white font-medium">{contact?.username || "Unknown User"}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
