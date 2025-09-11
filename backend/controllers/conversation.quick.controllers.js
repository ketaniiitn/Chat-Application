import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

// Get or create a conversation between two users, return conversation with status/initiator
export const getOrCreateConversation = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: otherUserId } = req.params;
    if (!otherUserId) return res.status(400).json({ error: "User id required" });
    let conversation = await Conversation.findOne({
      participant: { $all: [userId, otherUserId] }
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participant: [userId, otherUserId],
        status: "pending",
        initiator: userId
      });
    }
    res.status(200).json({
      _id: conversation._id,
      status: conversation.status,
      initiator: conversation.initiator,
      blockedBy: conversation.blockedBy || null
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
