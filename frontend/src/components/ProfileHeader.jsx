import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { LogOutIcon, Volume2Icon, VolumeOffIcon } from "lucide-react";

const mouseClickSound = new Audio("/sounds/mouseClickSound.mp3");  // Creates an audio instance, Preload the sound and keep it ready to play. This is browser JavaScript, not React-specific.

export const ProfileHeader = () => {
  const { logout, authUser, updateProfile } = useAuthStore();  // authUser is the current authenticated user, logout is a function to log out the user, and updateProfile is a function to update the user's profile information. These are all provided by the useAuthStore hook, which manages authentication state and actions in the application.
  const { isSoundEnabled, toggleSound } = useChatStore();  
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);  // This creates a reference to the file input element --> <input type="file" />., allowing us to programmatically trigger a click on it when the user clicks the avatar button.

  const handleImageClick = () => {    // fileInputRef.current will point to the actual DOM element. When we call fileInputRef.current.click(), it simulates a click on the hidden file input, which opens the file picker dialog for the user to select an image.
    fileInputRef.current.click();
  };
 
  const handleImageUpload = (e) => {
    const file = e.target.files[0];    // Gets selected file from input. e.target.files[0], which gives us the first file in the list of selected files (since we only allow one file to be selected with accept="image/*"). 
    if (file) {
      const reader = new FileReader();  // Creates a new FileReader instance to read the selected file. The FileReader API allows us to read the contents of files stored on the user's computer asynchronously, without blocking the main thread. In this case, we use it to read the selected image file as a data URL, which can be used to display the image in the UI and send it to the server for updating the user's profile picture.
      reader.readAsDataURL(file);  // Reads the selected file as a data URL (base64 encoded string). This allows us to display the image immediately in the UI and also send it to the server for updating the user's profile picture.

      reader.onloadend = async () => {
        setSelectedImg(reader.result);
        updateProfile({ profilePic: reader.result });
      };
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
