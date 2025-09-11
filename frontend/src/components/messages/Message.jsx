import React, { useEffect, useRef } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import extractTime from '../../utils/extracttime';
import { apiUrl } from '../../utils/api';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation, setMessages } = useConversation();
  const lastMessageRef = useRef();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? 'shake' : '';

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  useEffect(() => {
    if (!message.read && !fromMe) {
      (async () => {
        try {
          const res = await fetch(apiUrl(`/api/messages/message/${message._id}`), {
            method: 'PATCH',
          });
          const data = await res.json();
          if (data.error) throw new Error(data.error);
          setMessages((prev) => prev.map((m) => (m._id === message._id ? { ...m, read: true } : m)));
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [message._id]);

  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
  const bubblebgColor = fromMe ? ' bg-[#00a884]' : ' bg-[#202c33]';

  return (
    <div ref={lastMessageRef} className={`chat ${chatClassName} ${shakeClass}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img
            alt='Tailwind CSS chat bubble component'
            src={profilePic}
          />
        </div>
      </div>
      <div className={`chat-bubble text-[#e9edef] ${bubblebgColor} pb-2 border border-[#2a3942]`}>
        {message.message}
      </div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center mt-1'>
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;