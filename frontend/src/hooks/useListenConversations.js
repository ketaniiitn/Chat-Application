import { useEffect } from "react";
import { useSocketContext } from "../context/socketIO.context";
import useConversation from "../zustand/useConversation";

// Listens for 'updateConversation' socket event and updates selectedConversation in Zustand
const useListenConversations = () => {
  const { socket } = useSocketContext();
  const { setSelectedConversation, selectedConversation } = useConversation();

  useEffect(() => {
    if (!socket) return;
    const handleUpdateConversation = (conversation) => {
      // Only update if the conversation matches the currently selected one
      if (selectedConversation && conversation._id === selectedConversation._id) {
        setSelectedConversation(conversation);
      }
    };
    socket.on("updateConversation", handleUpdateConversation);
    return () => {
      socket.off("updateConversation", handleUpdateConversation);
    };
    // eslint-disable-next-line
  }, [socket, selectedConversation, setSelectedConversation]);
};

export default useListenConversations;
