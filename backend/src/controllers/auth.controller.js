import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import { sendWelcomeEmail } from '../emails/emailHandler.js';
import dotenv from 'dotenv';

dotenv.config();

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

        // saving user to database
        const savedUser = await newUser.save();

        // Generating JWT Token after successful signup
        if(savedUser){
            console.log("User signed up successfully");

            generateToken(savedUser._id, res);
     
            return res.status(201).json({
                _id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                profilePicture: savedUser.profilePicture
            });
        

            // sending a welcome msg to user email after successful signup
            try {
                await sendWelcomeEmail(savedUser.email, savedUser.username, process.env.CLIENT_URL);
            } 
            catch (error) {
                console.error("Failed to send welcome email", error.message);
            }
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
