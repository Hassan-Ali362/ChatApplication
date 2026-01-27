import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

import {ENV} from './env.js';

// generateToken function creates a JWT token for the user and stores it in a secure HTTP-only cookie so the user remains authenticated (logged in).

// res → Express response object, used to send data back to the browser so take it as parameter
// res.cookie() → sends the generated JWT to the browser as a cookie

// Token has a) id is payload(Later to know which user is logged in), b) secret key(to sign & verify token), c) options

export const generateToken = (userId, res) => {    
    const token = jsonwebtoken.sign({ id: userId }, ENV.JWT_SECRET, {    
        expiresIn: '30d',
    });
    res.cookie('token', token, {
        httpOnly: true,        // cookie cannot be accessed via client-side JS (for security) otherwise they can steal cookies to hack accounts.
        secure: ENV.NODE_ENV === 'production' ? true : false,         // cookie will be sent only over HTTPS in production
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
}
