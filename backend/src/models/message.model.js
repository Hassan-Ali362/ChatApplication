import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        trim: true,
        maxlength: 2000
    },
    image: {
        type: String
    }
}, {timestamps: true});

// optimize frequent queries
messageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 }); // for fetching messages between two users in one direction (sender to receiver)
messageSchema.index({ receiverId: 1, senderId: 1, createdAt: -1 }); // for fetching messages between two users in both directions

const Message = mongoose.model("Message", messageSchema)

export default Message;