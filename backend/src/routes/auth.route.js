import express from 'express';
import { loginController, signupController, logoutController, updateProfileController } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { signupSchema } from '../schemas/auth.schemas.js';
import { loginSchema } from '../schemas/auth.schemas.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { arcjetMiddleware } from '../middlewares/arcjet.middleware.js';
import upload from '../lib/multer.js';

const router = express.Router();

// Arcjet is applied as middleware before routes so requests are validated and blocked before reaching controllers.
// The Arcjet configuration enables attack shielding, bot detection, and sliding-window rate limiting to secure a Node.js application.
router.use(arcjetMiddleware);    // so before going to any route arcjet middleware will be executed first to protect routes from bots, attacks and rate limiting.

router.post('/signup', validate(signupSchema), signupController);
router.post('/login', validate(loginSchema), loginController);   
router.post('/logout', logoutController);

router.put("/update-profile", protectRoute, upload.single("profilePicture"), updateProfileController);  // upload.single("profilePicture") is a multer middleware that handles file uploads for the "profilePicture" field in the request. It processes the uploaded file and makes it available in req.file for the updateProfileController to use when updating the user's profile picture. protectRoute middleware ensures that only authenticated users can access this route to update their profile information.


router.get('/check', protectRoute, (req, res) => res.status(200).json(req.user));  // Before showing screen --> to check whether the user is authenticated and to return the currently logged-in user’s data.
 
export default router;