import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore"
import { useAuthStore } from "../store/useAuthStore"

export const ProfileHeader = () => {

    const {logout, authUser, updateProfile} = useAuthStore();
    const {isSoundEnabled, toggleSound} = useChatStore();
    const [selectedImg, setSelectedImg] = useState(null);

    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    }

    const handleImageUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("profilePic", file);
            await updateProfile(formData);
        }
        catch (error) {
            console.log("Error in uploading profile picture:", error);
        }
    }

    return (
    <>
    <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="avatar online">
                    <button onClick={handleImageClick} className="size-14 rounded-full overflow-hidden relative group">
                        <img src={selectedImg || authUser.ProfilePic || "/avatar.png"} alt="User Avatar" className="object-cover w-full h-full" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-white text-sm">Change</span>
                        </div>
                    </button>

                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload}/>

                </div>

                {/* username and status */}
                <div>
                    <h2 className="text-lg font-semibold">{authUser.username}</h2>
                    <p className="text-sm text-slate-400">Online</p>
                </div>

            </div> 
        </div>
    </div>
    </>
    )

}