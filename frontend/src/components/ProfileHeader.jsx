import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { LogOutIcon, Volume2Icon, VolumeOffIcon } from "lucide-react";

const mouseClickSound = new Audio("/sounds/mouseClickSound.mp3");

export const ProfileHeader = () => {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = async () => {
        setSelectedImg(reader.result);
        updateProfile({ profilePic: reader.result });
      };
    }
  };

  return (
    <>
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="avatar online">
              <button
                onClick={handleImageClick}
                className="size-14 rounded-full overflow-hidden relative group"
              >
                <img
                  src={selectedImg || authUser.ProfilePic || "/avatar.png"}
                  alt="User Avatar"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-white text-sm">Change</span>
                </div>
              </button>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            {/* username and status */}
            <div>
              <h2 className="text-lg font-semibold">{authUser.username}</h2>
              <p className="text-xs text-slate-400">Online</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 items-center">

            {/* logout button */}
            <button
              onClick={logout}
              className="text-slate-400 hover:text-slate-200 py-2 rounded-md text-sm"
            >
              <LogOutIcon className="w-5 h-5" />
            </button>

            {/* sound toggle button */}
            <button
              className="text-slate-400 hover:text-slate-200 transition-colors"
              onClick={() => {
                mouseClickSound.currentTime = 0;
                mouseClickSound.play().catch((error) => {
                  console.log("Error playing sound:", error);
                });
                toggleSound();
              }}
            >
              {isSoundEnabled ? (
                <Volume2Icon className="w-5 h-5" />
              ) : (
                <VolumeOffIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
