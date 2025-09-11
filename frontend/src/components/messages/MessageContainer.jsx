import React from 'react';
import toast from 'react-hot-toast';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessages } from 'react-icons/ti';
import { FaTrash, FaBan, FaCheck, FaUnlock } from 'react-icons/fa';
import useConversationStatus from '../../hooks/useConversationStatus';
import useConversation from '../../zustand/useConversation';
import useListenMessages from '../../hooks/useListenMessages'; // Import the new hook
import { useAuthContext } from '../../context/AuthContext';

function NoChatSelected() {
  const { authUser } = useAuthContext();
  return (
  <div className="flex flex-col items-center justify-center flex-1 text-center text-[#8696a0] p-8 h-full bg-[#111b21]">
      <TiMessages className="text-6xl mb-4" />
      <p className="text-lg font-semibold">
        Welcome, {authUser?.firstName || 'User'} 👋
      </p>
      <p className="text-sm">Select a chat to start messaging</p>
    </div>
  );
}

const MessageContainer = () => {
  useListenMessages();
  const { selectedConversation, setSelectedConversation, setMessages } = useConversation();
  const { authUser } = useAuthContext();
  const {
    status,
    blockedBy,
    acceptRequest,
    blockUser,
    unblockUser,
    loading: statusLoading,
    error: statusError
  } = useConversationStatus();

  if (!selectedConversation?.userId && !selectedConversation?._id) return <NoChatSelected />;

  const handleDeleteChat = async () => {
    const otherUserId = selectedConversation.userId || selectedConversation._id;
    if (!otherUserId) return toast.error("Could not delete chat. Participant not found.");
    
    try {
      const res = await fetch(`/api/messages/chat/${otherUserId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setSelectedConversation(null);
      setMessages([]);
      toast.success('Chat deleted successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const isInitiator = selectedConversation.initiator && String(selectedConversation.initiator) === String(authUser._id);
  const isReceiver = !isInitiator;

  return (
  <div className="flex flex-col h-full bg-[#111b21]">
      {/* Chat header */}
  <div className="flex items-center justify-between px-4 py-2 border-b border-[#0ad347] bg-[#202c33]/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <img src={selectedConversation.profilePic} alt="avatar" className="w-10 h-10 rounded-full object-cover border border-gray-700" />
          <span className="font-semibold text-white">{selectedConversation.firstName + ' ' + selectedConversation.lastName}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Message request controls: only show if status is pending and logged-in user is the receiver */}
          {status === 'pending' && isReceiver && (
            <>
              <button
                className="text-green-400 hover:text-green-600 text-lg"
                title="Accept message request"
                onClick={async () => {
                  await acceptRequest();
                  toast.success('Message request accepted!');
                }}
                disabled={statusLoading}
              >
                <FaCheck />
              </button>
              <button
                className="text-red-400 hover:text-red-600 text-lg"
                title="Block user"
                onClick={async () => {
                  await blockUser();
                  toast.success('User blocked.');
                }}
                disabled={statusLoading}
              >
                <FaBan />
              </button>
            </>
          )}
          {/* Block/unblock controls */}
          {status === 'accepted' && (
            <button
              className="text-yellow-400 hover:text-yellow-600 text-lg"
              title="Block user"
              onClick={async () => {
                await blockUser();
                toast.success('User blocked.');
              }}
              disabled={statusLoading}
            >
              <FaBan />
            </button>
          )}
          {status === 'blocked' && String(selectedConversation.blockedBy) === String(authUser._id) && (
            <button
              className="text-green-400 hover:text-green-600 text-lg"
              title="Unblock user"
              onClick={async () => {
                await unblockUser();
                toast.success('User unblocked.');
              }}
              disabled={statusLoading}
            >
              <FaUnlock />
            </button>
          )}
          {/* Delete chat button */}
          <button
            className="text-red-400 hover:text-red-600 text-lg"
            title="Delete chat"
            onClick={handleDeleteChat}
          >
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Status Banners */}
      {status === 'pending' && isReceiver && (
        <div className="text-center py-1 text-xs tracking-wide bg-[#182229] text-[#e9edef]">Message request: Accept to reply.</div>
      )}
       {status === 'pending' && isInitiator && (
        <div className="text-center py-1 text-xs tracking-wide bg-[#182229] text-[#8696a0]">Waiting for acceptance…</div>
      )}
      {status === 'blocked' && String(selectedConversation.blockedBy) === String(authUser._id) && (
        <div className="text-center py-1 text-xs tracking-wide bg-[#3b4a54] text-[#ff6b6b]">You blocked this user.</div>
      )}
      {status === 'blocked' && String(selectedConversation.blockedBy) !== String(authUser._id) && (
        <div className="text-center py-1 text-xs tracking-wide bg-[#3b4a54] text-[#ff6b6b]">You are blocked by this user.</div>
      )}
      {statusError && (
        <div className="bg-red-100 text-red-800 text-center py-1 text-sm">{statusError}</div>
      )}

      <Messages />

      {/* Show MessageInput only if conversation is 'accepted' */}
      {status === 'accepted' && (
        <div className="flex-none border-t border-[#2a3942]">
          <MessageInput />
        </div>
      )}
       {/* Or if the user is the initiator of a pending request */}
       {status === 'pending' && isInitiator && (
        <div className="flex-none border-t border-[#2a3942]">
          <MessageInput />
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
