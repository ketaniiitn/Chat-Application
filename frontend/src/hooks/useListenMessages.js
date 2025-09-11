// import {useEffect} from 'react'
// import { useSocketContext } from '../context/socketIO.context'
// import useConversation from '../zustand/useConversation';
// import notificationSound from '../assets/Sounds/notification.mp3'

//   const useListenMessage=()=>{
//     const {socket}=useSocketContext();
//     const {messages,setMessages}=useConversation();
//     useEffect(()=>{
//       socket?.on("newMessage",(newMessage)=>{
//         newMessage.shouldShake = true;
//         const sound = new Audio(notificationSound);
//         sound.play();
//         setMessages([...messages,newMessage])
//       })
//       return ()=> socket?.off("newMessage")
//     },[socket,setMessages,messages])
//   }

// export default useListenMessage

import { useEffect } from "react";
import { useSocketContext } from "../context/socketIO.context";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/Sounds/notification.mp3"; // corrected path capitalization

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages, selectedConversation, setSelectedConversation, incrementUnread } = useConversation();

	useEffect(() => {
		const handleNewMessage = (payload) => {
			const { newMessage, conversation } = payload.newMessage ? payload : { newMessage: payload, conversation: null };
			// Determine if message belongs to current open chat by comparing sender/receiver with selected userId
			// If no conversation selected, increment unread for sender
			if (!selectedConversation) {
				incrementUnread(newMessage.senderId);
				const sound = new Audio(notificationSound); sound.play();
				return; // nothing else to do
			}
			const targetUserId = selectedConversation.userId || selectedConversation._id;
			const belongs = newMessage.senderId === targetUserId || newMessage.receiverId === targetUserId;
			if (!belongs) {
				// Message for another chat while one is open
				incrementUnread(newMessage.senderId === targetUserId ? newMessage.receiverId : newMessage.senderId);
				const sound = new Audio(notificationSound); sound.play();
				return;
			}
			if (conversation) {
				setSelectedConversation(prev => prev ? { ...prev, conversationId: conversation._id, status: conversation.status, initiator: conversation.initiator, blockedBy: conversation.blockedBy } : prev);
			}
			const sound = new Audio(notificationSound);
			sound.play();
			setMessages([...messages, newMessage]);
		};

		socket?.on("newMessage", handleNewMessage);

		return () => socket?.off("newMessage", handleNewMessage);
	}, [socket, setMessages, messages, selectedConversation, setSelectedConversation]);
};

export default useListenMessages;
