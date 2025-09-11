import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiUrl } from '../utils/api';
import useConversation from '../zustand/useConversation';

const useConversationStatus = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const conversationId = selectedConversation?.conversationId || selectedConversation?._id;

  // Accept message request
  const acceptRequest = async () => {
    setLoading(true);
    setError(null);
    try {
      if(!conversationId) throw new Error("No conversation to accept");
      const res = await fetch(apiUrl(`/api/conversations/accept/${conversationId}`), {
        method: 'PATCH',
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSelectedConversation({ ...selectedConversation, status: 'accepted' });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Block user
  const blockUser = async () => {
    setLoading(true);
    setError(null);
    try {
      if(!conversationId) throw new Error("No conversation to block");
      const res = await fetch(apiUrl(`/api/conversations/block/${conversationId}`), {
        method: 'PATCH',
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSelectedConversation({ ...selectedConversation, status: 'blocked', blockedBy: 'me' });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Unblock user
  const unblockUser = async () => {
    setLoading(true);
    setError(null);
    try {
      if(!conversationId) throw new Error("No conversation to unblock");
      const res = await fetch(apiUrl(`/api/conversations/unblock/${conversationId}`), {
        method: 'PATCH',
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSelectedConversation({ ...selectedConversation, status: 'accepted', blockedBy: null });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Listen globally for conversation status updates (moved inside hook to obey Rules of Hooks)
  useEffect(() => {
    const handler = (e) => {
      const data = e.detail;
      setSelectedConversation(prev => {
        if (!prev) return prev;
        const prevCid = prev.conversationId || prev._id;
        if (prevCid === data._id) {
          return { ...prev, status: data.status, blockedBy: data.blockedBy };
        }
        return prev;
      });
    };
    window.addEventListener('app:conversationUpdated', handler);
    return () => window.removeEventListener('app:conversationUpdated', handler);
  }, [setSelectedConversation]);

  return {
    status: selectedConversation?.status,
    blockedBy: selectedConversation?.blockedBy,
    acceptRequest,
    blockUser,
    unblockUser,
    loading,
    error,
  };
};

export default useConversationStatus;
