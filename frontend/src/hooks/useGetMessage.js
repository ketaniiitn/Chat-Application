import React, { useEffect } from 'react'
import { useState } from 'react'
import useConversation from "../zustand/useConversation";
import toast from 'react-hot-toast';
import { apiUrl } from '../utils/api';

const useGetMessage = () => {
  const [loading,setLoading]=useState(false);
  const {messages, setMessages, selectedConversation } = useConversation();
  useEffect(()=>{
    const getMessages = async () =>{
      setLoading(true);
      try {
        if (!selectedConversation) return;
        const res = await fetch(apiUrl(`/api/messages/${selectedConversation.userId || selectedConversation._id}`));
        const data = await res.json();
        if(data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally{
        setLoading(false);
      }
    };
    getMessages();
  },[selectedConversation, setMessages]);
  return {messages, loading};
}

export default useGetMessage
