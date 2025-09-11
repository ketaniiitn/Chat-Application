import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { apiUrl } from "../utils/api";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { selectedConversation, setMessages } = useConversation();

	const sendMessage = async (message) => {
		if (!selectedConversation) return;
		setLoading(true);
		try {
			const res = await fetch(apiUrl(`/api/messages/send/${selectedConversation.userId || selectedConversation._id}`), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);
			setMessages((prev) => [...prev, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};

export default useSendMessage;