// import Message from "../models/message.model.js"
// import Conversation from "../models/conversation.model.js"
// import { getReceiverSocketId,io } from "../socket/socket.js";
// export const sendMessage = async (req,res)=>{
// try {
//     const {message}=req.body;
//     const {id: receiverId}=req.params;
//     const senderId = req.user._id;
//     let conversation = await Conversation.findOne({
//         participant:{$all:[senderId,receiverId]}
//     });
//     // If conversation exists, check status
//     if(conversation) {
//         if(conversation.status === "blocked" && String(conversation.blockedBy) === String(senderId)) {
//             return res.status(403).json({error: "You have blocked this user."});
//         }
//         if(conversation.status === "blocked" && String(conversation.blockedBy) === String(receiverId)) {
//             return res.status(403).json({error: "You are blocked by this user."});
//         }
//         if(conversation.status === "pending" && String(conversation.initiator) !== String(senderId)) {
//             return res.status(403).json({error: "Message request not accepted yet."});
//         }
//     } else {
//         // Create new conversation as pending, set initiator
//         conversation = await Conversation.create({
//             participant: [senderId, receiverId],
//             status: "pending",
//             initiator: senderId
//         });
//         // Emit updateConversation to both sender and receiver
//         const senderSocketId = getReceiverSocketId(senderId);
//         const receiverSocketId = getReceiverSocketId(receiverId);
//         if (senderSocketId) {
//             io.to(senderSocketId).emit("updateConversation", conversation);
//         }
//         if (receiverSocketId) {
//             io.to(receiverSocketId).emit("updateConversation", conversation);
//         }
//     }
//     // Only allow sending if accepted or sender is initiator in pending
//     if(conversation.status === "pending" && String(conversation.initiator) !== String(senderId)) {
//         return res.status(403).json({error: "Message request not accepted yet."});
//     }
//     const newMessage = new Message({
//         senderId,
//         receiverId,
//         message,
//     });
//     if(newMessage){
//         conversation.messages.push(newMessage._id);
//     }
//     await Promise.all([conversation.save(),newMessage.save()]);
//     // SOCKET IO functionality will go here 
//     const receiverSocketId = getReceiverSocketId(receiverId);
//     if(receiverSocketId){
//         io.to(receiverSocketId).emit("newMessage",newMessage);
//     }
//     res.status(201).json(newMessage);

// } catch (error) {
//     res.status(500).json({error:"Internal Server Error"});
// }
// };
// export const getMessage = async (req,res)=>{
//         try {
//                 const {id:userToChatId}=req.params;
//                 const senderId = req.user._id;
//                 const conversation = await Conversation.findOne({
//                         participant:{$all:[senderId,userToChatId]},
//                 }).populate("messages");
//                 if(!conversation)return res.status(200).json([]);
//                 const messages =conversation.messages;
//                 res.status(200).json(messages);
//         } catch (error)
//         {
//             console.log("Error in getMessages controller:",error.message);
//             res.status(500).json({error:"Internal server error"});
//         }
// };

// // Delete entire chat (conversation)
// export const deleteChat = async (req, res) => {
//     try {
//         const { id: userToChatId } = req.params;
//         const userId = req.user._id;
//         const conversation = await Conversation.findOne({
//             participant: { $all: [userId, userToChatId] }
//         });
//         if (!conversation) return res.status(404).json({ error: "Conversation not found" });
//         // Only allow if user is a participant
//         if (!conversation.participant.some(id => String(id) === String(userId))) {
//             return res.status(403).json({ error: "Not authorized" });
//         }
//         // Delete all messages in the conversation
//         await Message.deleteMany({ _id: { $in: conversation.messages } });
//         // Delete the conversation
//         await conversation.deleteOne();
//         res.status(200).json({ message: "Chat deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// // Delete a specific message (for everyone)
// export const deleteMessage = async (req, res) => {
//     try {
//         const { messageId } = req.params;
//         const userId = req.user._id;
//         const message = await Message.findById(messageId);
//         if (!message) return res.status(404).json({ error: "Message not found" });
//         // Only sender can delete their message
//         if (String(message.senderId) !== String(userId)) {
//             return res.status(403).json({ error: "Not authorized" });
//         }
//         await message.deleteOne();
//         // Remove from any conversation
//         await Conversation.updateMany(
//             { messages: messageId },
//             { $pull: { messages: messageId } }
//         );
//         res.status(200).json({ message: "Message deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participant: { $all: [senderId, receiverId] },
		});

		// This flag will tell us if this is the very first message in a pending conversation
		let isNewRequest = false;

		if (!conversation) {
			conversation = await Conversation.create({
				participant: [senderId, receiverId],
				status: "pending",
				initiator: senderId,
			});
			isNewRequest = true; // It's a new conversation, so it's a new request
		}

		// If conversation exists, check status
		if (conversation.status === "blocked") {
			if (String(conversation.blockedBy) === String(senderId)) {
				return res.status(403).json({ error: "You have blocked this user." });
			} else {
				return res.status(403).json({ error: "You are blocked by this user." });
			}
		}

		if (conversation.status === "pending" && String(conversation.initiator) !== String(senderId)) {
			return res.status(403).json({ error: "Message request not accepted yet." });
		}
		
		// This is a new message in an existing pending conversation
		if (conversation.status === "pending" && conversation.messages.length === 0) {
			isNewRequest = true;
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET IO functionality
		const receiverSocketId = getReceiverSocketId(receiverId);
		const senderSocketId = getReceiverSocketId(senderId);
		const payload = { newMessage, conversation: {
			_id: conversation._id,
			status: conversation.status,
			initiator: conversation.initiator,
			blockedBy: conversation.blockedBy || null
		}};
		if (receiverSocketId) io.to(receiverSocketId).emit("newMessage", payload);
		if (senderSocketId) io.to(senderSocketId).emit("newMessage", payload);

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getMessage = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;
		const conversation = await Conversation.findOne({
			participant: { $all: [senderId, userToChatId] },
		}).populate("messages");
		if (!conversation) return res.status(200).json([]);
		const messages = conversation.messages;
		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Delete entire chat (conversation)
export const deleteChat = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const userId = req.user._id;
		const conversation = await Conversation.findOne({
			participant: { $all: [userId, userToChatId] },
		});
		if (!conversation) return res.status(404).json({ error: "Conversation not found" });

		if (!conversation.participant.some((id) => String(id) === String(userId))) {
			return res.status(403).json({ error: "Not authorized" });
		}
		await Message.deleteMany({ _id: { $in: conversation.messages } });
		await conversation.deleteOne();
		res.status(200).json({ message: "Chat deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Delete a specific message (for everyone)
export const deleteMessage = async (req, res) => {
	try {
		const { messageId } = req.params;
		const userId = req.user._id;
		const message = await Message.findById(messageId);
		if (!message) return res.status(404).json({ error: "Message not found" });

		if (String(message.senderId) !== String(userId)) {
			return res.status(403).json({ error: "Not authorized" });
		}
		await message.deleteOne();
		await Conversation.updateMany({ messages: messageId }, { $pull: { messages: messageId } });
		res.status(200).json({ message: "Message deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};
