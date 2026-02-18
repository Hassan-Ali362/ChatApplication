import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { X, Send, Image as ImageIcon, ArrowLeft, Trash2, Copy } from "lucide-react";
import { toast } from "react-hot-toast";
import { EmojiPicker } from "./EmojiPicker";
import { SearchBar } from "./SearchBar";

export const ChatContainer = () => {
  const { selectedUser, getMessages, messages, isMessagesLoading, sendMessage, setSelectedUser, deleteMessage } = useChatStore();
  const { authUser } = useAuthStore();
  const [messageText, setMessageText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!messageText.trim() && !imagePreview) {
      return;
    }

    const messageData = {
      text: messageText.trim(),
      image: imagePreview || undefined
    };

    await sendMessage(selectedUser._id, messageData);
    
    setMessageText("");
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessageText(prev => prev + emoji);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredMessages = searchTerm 
    ? userMessages.filter(msg => 
        msg.text?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : userMessages;

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Message copied!");
  };

  const handleDeleteMessage = async (messageId) => {
    if (deleteMessage) {
      await deleteMessage(selectedUser._id, messageId);
    }
  };

  const userMessages = messages[selectedUser?._id] || [];

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-slate-700/50 bg-slate-800/30">
        {/* Back button for mobile */}
        <button
          onClick={() => setSelectedUser(null)}
          className="md:hidden text-slate-400 hover:text-white transition"
        >
          <ArrowLeft size={24} />
        </button>
        
        <img
          src={selectedUser?.profilePicture || "/default-profilepic.webp"}
          alt={selectedUser?.username}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-white font-medium">{selectedUser?.username}</h3>
          <p className="text-slate-400 text-sm">
            {selectedUser?.email}
          </p>
        </div>
        
        <SearchBar onSearch={handleSearch} placeholder="Search messages" />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isMessagesLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-400">
              {searchTerm ? "No messages found" : "No messages yet. Start the conversation!"}
            </p>
          </div>
        ) : (
          filteredMessages.map((message) => {
            const isMyMessage = message.senderId === authUser._id;
            return (
              <div
                key={message._id}
                className={`flex ${isMyMessage ? "justify-end" : "justify-start"} group`}
                onMouseEnter={() => setHoveredMessageId(message._id)}
                onMouseLeave={() => setHoveredMessageId(null)}
              >
                <div className="relative">
                  <div
                    className={`max-w-[70%] sm:max-w-md rounded-lg p-3 ${
                      isMyMessage
                        ? "bg-cyan-600 text-white"
                        : "bg-slate-700 text-slate-100"
                    }`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="attachment"
                        className="rounded-lg mb-2 max-w-full h-auto cursor-pointer hover:opacity-90 transition"
                        onClick={() => window.open(message.image, '_blank')}
                      />
                    )}
                    {message.text && <p className="break-words">{message.text}</p>}
                    <span className="text-xs opacity-70 mt-1 block">
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  </div>
                  
                  {/* Message Actions */}
                  {hoveredMessageId === message._id && (
                    <div className={`absolute top-0 ${isMyMessage ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} flex gap-1 px-2`}>
                      {message.text && (
                        <button
                          onClick={() => handleCopyMessage(message.text)}
                          className="p-1 bg-slate-600 hover:bg-slate-500 rounded text-white transition"
                          title="Copy message"
                        >
                          <Copy size={14} />
                        </button>
                      )}
                      {isMyMessage && deleteMessage && (
                        <button
                          onClick={() => handleDeleteMessage(message._id)}
                          className="p-1 bg-red-600 hover:bg-red-500 rounded text-white transition"
                          title="Delete message"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="preview"
              className="w-20 h-20 object-cover rounded-lg"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700/50 bg-slate-800/30">
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />
          
          <EmojiPicker onEmojiSelect={handleEmojiSelect} />
          
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-slate-400 hover:text-cyan-400 transition"
            title="Attach image"
          >
            <ImageIcon size={20} />
          </button>
          
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          
          <button
            type="submit"
            disabled={!messageText.trim() && !imagePreview}
            className="p-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            title="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};
