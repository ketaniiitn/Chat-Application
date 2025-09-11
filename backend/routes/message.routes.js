
import express from "express";
import { getMessage, sendMessage, deleteChat, deleteMessage } from "../controllers/message.controllers.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();
router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, sendMessage);
router.delete("/chat/:id", protectRoute, deleteChat); // Delete entire chat
router.delete("/message/:messageId", protectRoute, deleteMessage); // Delete specific message

export default router;