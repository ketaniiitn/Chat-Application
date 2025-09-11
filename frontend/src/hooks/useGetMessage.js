import React, { useEffect } from 'react'
import { useState } from 'react'
import useConversation from "../zustand/useConversation";
const useGetMessage = () => {
  const [loading,setLoading]=useState(false);
  const {messages, setMessages, selectedConversation } = useConversation();
  useEffect(()=>{
    const getMessages = async () =>{
      setLoading(true);
      try {
  // Backend get messages endpoint expects the other participant userId
  const res = await fetch(`/api/messages/${selectedConversation.userId || selectedConversation._id}`);
        const data = await res.json();
        if(data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally{
        setLoading(false);
      }
    };
    if(selectedConversation?.userId || selectedConversation?._id) getMessages();
  },[selectedConversation?.userId, selectedConversation?._id, setMessages]);
  return {messages, loading};
}

export default useGetMessage
