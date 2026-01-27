import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import { sendWelcomeEmail } from '../emails/emailHandler.js';
import { ENV } from '../lib/env.js';


// Logic for register or signup user
export const signupController = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if(!username || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        
        const user = await User.findOne({ email: email });

        if(user) {
            return res.status(400).json({message: "User with this email already exists"});
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // save user and send email & Generating JWT Token after successful signup
        if(newUser){
            // saving user to database
            const savedUser = await newUser.save();
            console.log("User signed up successfully");

            // sending a welcome msg to user email
            try {
                await sendWelcomeEmail(savedUser.email, savedUser.username, ENV.CLIENT_URL);
            } 
            catch (error) {
                console.error("Failed to send welcome email", error.message);
            }

            // generating token
            generateToken(savedUser._id, res);
     
            return res.status(201).json({
                _id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                profilePicture: savedUser.profilePicture
            });
        } 
        else{
            return res.status(500).json({message: "Failed to Sign up user"});
        }
    } 
    catch (error) {
        console.log("Error in Signup:", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

// logic for login user
export const loginController = async (req, res) => {
    const { email, password } = req.body;   

    try {
        if(!email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }                       

        const user = await User.findOne({ email: email });

        if(!user) {
            return res.status(400).json({message: "Invalid email or password"});
        }       

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch) {
            return res.status(400).json({message: "Invalid email or password"});
        }

        generateToken(user._id, res);

        return res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture
        });
    } catch (error) {
        console.log("Error in Login:", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }   
};


// logic for logout user
export const logoutController = (req, res) => {
    res.cookie('token', '', {maxAge: 0 });
    return res.status(200).json({ message: "Logged out successfully" });
}


// logic for update user profile
export const updateProfileController = async (req, res) => {
    try {
        const { profilePicture } = req.body;
        if(!profilePicture) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        const userId = await User.findById(req.user._id);   // Get the user from database(as during signup we had put other info) using the ID available in req.user._id

        if(!userId) {
            return res.status(404).json({ message: "User not found" });
        }

        const uploadResponse = await clouinary.uploader.upload(profilePicture);  // Upload the profile picture to Cloudinary

        const updatedUser = await User.findByIdAndUpdate(userId, { profilePicture: uploadResponse.secure_url }, { new: true });  // new: true to return the updated user document

        return res.status(200).json({ updatedUser });
    } 
    catch (error) {
        console.log("Error in updating profile:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }   
};
