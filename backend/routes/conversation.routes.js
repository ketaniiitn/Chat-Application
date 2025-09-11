// conversation.routes.js

import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  acceptMessageRequest,
  blockUser,
  unblockUser,
  getBlockedUsers
} from "../controllers/conversation.controllers.js"; //
import { getOrCreateConversation } from "../controllers/conversation.quick.controllers.js"; //


const router = express.Router();

router.get("/conversation/:id", protectRoute, getOrCreateConversation);

// Accept a message request
router.post("/accept/:conversationId", protectRoute, acceptMessageRequest); //

// Block a user in a conversation
router.post("/block/:conversationId", protectRoute, blockUser); //

// Unblock a user in a conversation
router.post("/unblock/:conversationId", protectRoute, unblockUser); //

// Get blocked users for the logged-in user
router.get("/blocked", protectRoute, getBlockedUsers); //

export default router;