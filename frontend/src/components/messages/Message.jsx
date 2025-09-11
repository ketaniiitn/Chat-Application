import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { extracttime } from '../../utils/extracttime';
import { FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation, messages, setMessages } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extracttime(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
  const bubblebgColor = fromMe ? ' bg-[#00a884]' : ' bg-[#202c33]';
  const shakeClass = message.shouldShake ? "shake" : "";

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/messages/message/${message._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages(messages.filter(m => m._id !== message._id));
      toast.success('Message deleted');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img
            alt='Tailwind CSS chat bubble component'
            src={profilePic}
          />
        </div>
      </div>

  <div className={`chat-bubble text-[#e9edef] ${bubblebgColor} ${shakeClass} pb-2 border border-[#2a3942]`}> 
        {message.message}
        {fromMe && (
          <button
            className="ml-2 text-xs text-red-300 hover:text-red-500"
            title="Delete message"
            onClick={handleDelete}
          >
            <FaTrash />
          </button>
        )}
      </div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  );
};
export default Message;