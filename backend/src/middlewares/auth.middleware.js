import jwt from 'jsonwebtoken';
import { ENV } from '../lib/env.js';
import User from '../models/user.model.js';

// Middleware to protect routes
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;   // getting token from cookies
        if(!token) return res.status(401).json({ message: "No token found" });  
                
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if(!decoded) return res.status(401).json({ message: "Invalid token" });

        const user = await User.findById(decoded.id).select('-password');
        if(!user) return res.status(401).json({ message: "User not found" });

        req.user = user;  // attaching user to req object so that we can access it in next middlewares or controllers
        next();
    } 
    catch (error) {
        console.log("Error in protecting route middleware:", error.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid token or Internal Server Error' });
    }
};