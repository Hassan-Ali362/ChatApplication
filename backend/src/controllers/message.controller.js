import Message from "../models/message.model.js"
import User from "../models/user.model.js"
import cloudinary from "../lib/cloudinary.js"

export const getAllContacts = async (req, res) => {
    try{
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")

        res.status(200).json(filteredUsers);  // Returns the list of users as JSON. Frontend can now display all contacts except the current user
    }
    catch (error){
        console.log("Error in gellAllContacts: ", error)
        res.status(500).json({message: "Server error"});
    }
}

export const getMessagesByUserId = async (req, res) => {
    try{
        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        const allMessages = await Message.find({   // $or for 2 cases --> all the messages received and messages sent
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId} 
            ]
        })

        res.status(200).json(allMessages);
    }
    catch(error){
        console.log("Error in getMessages controller: ", error.message)
        res.status(500).json({ error: "Internal server error "})
    }
}

export const sendMessage = async (req, res) => {
    try{
        const senderId = req.user._id;
        const receiverId = req.params.id;  // is same as:  const { id: receiverId } = req.params;  // receiver id

        const { text, image } = req.body;

         if(!text && !image) {
            return res.status(400).json({message: "Message text or image is required"});
        }

        const receiverUser = await User.findById(receiverId);
        if(!receiverUser) {
            return res.status(404).json({message: "Receiver user not found"});
        }

        let imageUrl;
        if(image){
            // Upload the image to Cloudinary and get the URL
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await newMessage.save();

        // todo: send message in real-time if user is online using socket.io

        res.status(201).json(newMessage);
    }
    catch(error){
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({ error: "Internal server error "})
    }
}

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // find all messages where the logged-in user is either the sender or receiver
        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId }
            ]
        });

        // extract unique user IDs of chat partners
        const chatPartnerIds = [...new Set(messages.map(msg => msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()))];  // for each msg if sender is loggedInUser(me) then partner is receiver and vice versa

        // find users with these IDs
        const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");

        res.status(200).json(chatPartners);
    }
    catch(error){
        console.log("Error in getChatPartners controller: ", error.message)
        res.status(500).json({ error: "Internal server error "})
    }   
}
