import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

export const ContactsList = () => {
  const { allContacts, getAllContacts, isUsersLoading } = useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) {
    return <p className="text-slate-400 text-center mt-4">Loading contacts...</p>;
  }

  if (!allContacts || allContacts.length === 0) {
    return <p className="text-slate-400 text-center mt-4">No contacts found</p>;
  }

  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-full">
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-slate-800 transition"
        >
          <img
            src={contact?.profilePicture || "/avatar.png"}
            alt={contact?.username || "User"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-white font-medium">{contact?.username || "Unknown User"}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
