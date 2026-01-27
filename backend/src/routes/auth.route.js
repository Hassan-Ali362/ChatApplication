import express from 'express';
import { loginController, signupController, logoutController, updateProfileController } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { signupSchema } from '../schemas/auth.schemas.js';
import { loginSchema } from '../schemas/auth.schemas.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { arcjetMiddleware } from '../middlewares/arcjet.middleware.js';

const router = express.Router();

// Arcjet is applied as middleware before routes so requests are validated and blocked before reaching controllers.
// The Arcjet configuration enables attack shielding, bot detection, and sliding-window rate limiting to secure a Node.js application.
router.use(arcjetMiddleware);    // so before going to any route arcjet middleware will be executed first to protect routes from bots, attacks and rate limiting.

router.post('/signup', validate(signupSchema), signupController);
router.post('/login', validate(loginSchema), loginController);   
router.post('/logout', logoutController);

router.put('/update-profile', protectRoute, updateProfileController);

router.get('/check', protectRoute, (req, res) => res.status(200).json(req.user));  // Before showing screen --> to check whether the user is authenticated and to return the currently logged-in user’s data.
 
export default router;