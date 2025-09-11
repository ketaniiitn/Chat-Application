import React from "react";
import useSelectConversation from "../../hooks/useSelectConversation";
import { useSocketContext } from "../../context/socketIO.context";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji, collapsed = false }) => {
  const selectConversation = useSelectConversation();
  const { selectedConversation, unread } = useConversation();
  const userId = conversation._id; // user list items represent users
  const unreadCount = unread[userId] || 0;
  const isSelected = selectedConversation && (selectedConversation.userId === userId || selectedConversation._id === userId);

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} p-3 cursor-pointer rounded-xl transition-all duration-200 ${
          isSelected ? 'bg-[#005c4b]' : 'hover:bg-[#202c33]'
        }`}
  onClick={() => selectConversation(conversation)}
      >
        {/* Avatar with online indicator */}
        <div className="relative">
          <img
            src={conversation.profilePic}
            alt="user avatar"
            className={`${collapsed ? 'w-10 h-10' : 'w-12 h-12'} rounded-full object-cover border border-gray-700 ${unreadCount && !isSelected ? 'ring-2 ring-green-500' : ''}`}
          />
          {unreadCount > 0 && !collapsed && !isSelected && (
            <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-semibold rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
          {isOnline && (
            <span className={`absolute bottom-1 right-1 ${collapsed ? 'w-2 h-2' : 'w-3 h-3'} rounded-full bg-green-500 border-2 border-gray-900`} />
          )}
        </div>

        {!collapsed && (
          <>
            {/* Conversation Details */}
            <div className="flex flex-1 flex-col">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-[#e9edef]">{conversation.firstName && conversation.lastName ? `${conversation.firstName} ${conversation.lastName}` : (conversation.username || 'Unknown')}</p>
                <span className="text-xl">{emoji}</span>
              </div>
              {(() => {
                const previewText = unreadCount > 0
                  ? `${unreadCount > 9 ? '9+' : unreadCount} new message${(unreadCount > 1 || unreadCount > 9) ? 's' : ''}`
                  : (conversation.lastMessage || 'Start a conversation...');
                return (
                  <p className={`text-sm truncate ${unreadCount && !isSelected ? 'text-green-400 font-semibold' : 'text-gray-400'}`}>{previewText}</p>
                );
              })()}
            </div>
          </>
        )}
      </div>

      {/* Divider between conversations */}
      {!lastIdx && <div className="border-b border-gray-700 mx-4"></div>}
    </>
  );
};

export default Conversation;
