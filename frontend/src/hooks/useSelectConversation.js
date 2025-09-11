import { useState, useCallback } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import { apiUrl } from '../utils/api';

// Responsible for selecting (and creating if needed) a conversation with a user.
// We keep BOTH: userId (the other user's id, used for sending messages) and conversationId (server conversation id for status / accept / block APIs).
const useSelectConversation = () => {
  const { setSelectedConversation } = useConversation();
  const [loading, setLoading] = useState(false);

  const selectConversation = useCallback(
    async (user) => {
      setLoading(true);
      try {
        const res = await fetch(apiUrl(`/api/conversations/conversation/${user._id}`));
        const data = await res.json();

        if (data.error) throw new Error(data.error);

        setSelectedConversation({
          // User info (keep _id as user id so existing send logic still works)
          ...user,
          userId: user._id,
          // Conversation specific info
          conversationId: data._id,
          status: data.status,
          initiator: data.initiator ? String(data.initiator) : undefined,
          blockedBy: data.blockedBy || null,
        });
      } catch (err) {
        // Fallback: still allow UI to open; no conversation yet.
        setSelectedConversation({ ...user, userId: user._id, conversationId: null });
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    },
    [setSelectedConversation]
  );

  return { selectConversation, loading };
};

export default useSelectConversation;
