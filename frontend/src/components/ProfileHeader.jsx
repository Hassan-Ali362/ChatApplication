import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { LogOutIcon, Volume2Icon, VolumeOffIcon, Volume1Icon} from "lucide-react";
import defaultavatar from "../assets/default-profilepic.webp"

export const ProfileHeader = () => {
  const { logout, authUser, updateProfile } = useAuthStore();  // authUser is the current authenticated user, logout is a function to log out the user, and updateProfile is a function to update the user's profile information. These are all provided by the useAuthStore hook, which manages authentication state and actions in the application.
  const { isSoundEnabled, toggleSound } = useChatStore();  
  const [selectedImg, setSelectedImg] = useState(null);
  const [uploading, setUploading] = useState(false);


  const fileInputRef = useRef(null);  
  // This creates a reference to the file input element --> <input type="file" />., allowing us to programmatically trigger a click on it when the user clicks the avatar button.

  const soundRef = useRef(new Audio("/sounds/mouseClickSound.mp3"));

  const handleImageClick = () => {    // fileInputRef.current will point to the actual DOM element. When we call fileInputRef.current.click(), it simulates a click on the hidden file input, which opens the file picker dialog for the user to select an image.
    fileInputRef.current.click();
  };
 
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview instantly
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedImg(reader.result);
    };

    try {
      setUploading(true);

      // Send file to backend (which uploads to Cloudinary)
      const formData = new FormData();
      formData.append("profilePicture", file);

      // Call updateProfile in useAuthStore (it handles multipart/form-data)
      await updateProfile(formData);

      setUploading(false);
    } 
    catch (err) {
      console.error("Upload failed:", err);
      setUploading(false);
    }
  };

  return (
    <>
      <div className="p-6 border-b border-slate-500/50">
        <div className="flex items-center justify-between md:flex-row flex-col">
          <div className="flex items-center gap-3 flex-col md:flex-row">
            {/* Avatar */}
            <div className="avatar online">
              <button
                onClick={handleImageClick}
                className="size-14 rounded-full overflow-hidden relative group"
              >
                <img
                  src={selectedImg || authUser.profilePicture || {defaultavatar}}
                  alt="User Avatar"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/50 cursor-pointer opacity-0 hover:opacity-100 flex items-center justify-center">
                  <span className="text-white text-sm">{uploading ? "Uploading..." : "Change"}</span>
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
              <h2 className="text-lg text-gray-100">{authUser.username}</h2>
              <p className="text-xs text-cyan-500 font-semibold">Online</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 items-center">

            {/* logout button */}
            <button
              onClick={logout}
              className="text-slate-300 hover:text-slate-200 py-2 rounded-md text-sm cursor-pointer"
            >
              <LogOutIcon className="w-5 h-5" />
            </button>

            {/* sound toggle button */}
            <button
              className="text-slate-300 hover:text-slate-100 transition-colors cursor-pointer"
              onClick={() => {
                soundRef.current.currentTime = 0;                // Resets the sound to the beginning so it can be played again immediately, even if it's already playing. This allows for rapid toggling of the sound without waiting for the previous sound to finish.
                soundRef.current.play().catch((error) => {       // Plays the mouse click sound when the button is clicked. If the sound is already playing, it will be restarted from the beginning due to the currentTime reset. If there's an error playing the sound (e.g., due to browser autoplay policies), it will be caught and logged to the console.
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
