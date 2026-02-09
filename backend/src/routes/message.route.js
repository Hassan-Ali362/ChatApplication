import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getAllContacts, getMessagesByUserId, sendMessage, getChatPartners } from '../controllers/message.controller.js';
import { arcjetMiddleware } from '../middlewares/arcjet.middleware.js';

const router = express.Router();

router.use(arcjetMiddleware, protectRoute);    // so before going to any route arcjet middleware will be executed first to protect routes from bots, attacks and rate limiting.

router.get("/contacts", getAllContacts)
router.get("/chats", getChatPartners)
router.get("/:id", getMessagesByUserId)
router.post("/send/:id", sendMessage)

export default router;  