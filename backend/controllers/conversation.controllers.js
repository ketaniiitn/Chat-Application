import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

// Accept a message request
export const acceptMessageRequest = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id;
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) return res.status(404).json({ error: "Conversation not found" });
    if (conversation.status !== "pending") return res.status(400).json({ error: "Request is not pending" });
    // Only the non-initiator can accept
    if (String(conversation.initiator) === String(userId)) {
      return res.status(403).json({ error: "You cannot accept your own request" });
    }
    conversation.status = "accepted";
    await conversation.save();
    // Notify both participants about updated status
    conversation.participant.forEach(uid => {
      const sid = getReceiverSocketId(uid.toString());
      if (sid) io.to(sid).emit("conversation:updated", {
        _id: conversation._id,
        status: conversation.status,
        initiator: conversation.initiator,
        blockedBy: conversation.blockedBy
      });
    });
    res.status(200).json({ message: "Message request accepted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Block a user in a conversation
export const blockUser = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id;
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) return res.status(404).json({ error: "Conversation not found" });
    conversation.status = "blocked";
    conversation.blockedBy = userId;
    await conversation.save();
    // Add to user's blockedUsers array
    const otherUserId = conversation.participant.find(id => String(id) !== String(userId));
    await User.findByIdAndUpdate(userId, { $addToSet: { blockedUsers: otherUserId } });
    conversation.participant.forEach(uid => {
      const sid = getReceiverSocketId(uid.toString());
      if (sid) io.to(sid).emit("conversation:updated", {
        _id: conversation._id,
        status: conversation.status,
        initiator: conversation.initiator,
        blockedBy: conversation.blockedBy
      });
    });
    res.status(200).json({ message: "User blocked" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Unblock a user in a conversation
export const unblockUser = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id;
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) return res.status(404).json({ error: "Conversation not found" });
    if (conversation.status !== "blocked" || String(conversation.blockedBy) !== String(userId)) {
      return res.status(400).json({ error: "You have not blocked this user" });
    }
    conversation.status = "accepted";
    conversation.blockedBy = null;
    await conversation.save();
    // Remove from user's blockedUsers array
    const otherUserId = conversation.participant.find(id => String(id) !== String(userId));
    await User.findByIdAndUpdate(userId, { $pull: { blockedUsers: otherUserId } });
    conversation.participant.forEach(uid => {
      const sid = getReceiverSocketId(uid.toString());
      if (sid) io.to(sid).emit("conversation:updated", {
        _id: conversation._id,
        status: conversation.status,
        initiator: conversation.initiator,
        blockedBy: conversation.blockedBy
      });
    });
    res.status(200).json({ message: "User unblocked" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get blocked users for the logged-in user
export const getBlockedUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("blockedUsers", "firstName lastName username profilePic");
    res.status(200).json(user.blockedUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
