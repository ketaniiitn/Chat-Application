import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar.jsx'
import MessageContainer from '../../components/messages/MessageContainer.jsx'
import useConversation from '../../zustand/useConversation'

const ChatLayout = () => {
  const { selectedConversation, setSelectedConversation } = useConversation()

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0b141a]">
      {/* Sidebar: visible on desktop, and on mobile when no conversation is selected */}
      <div className={`${selectedConversation ? 'hidden' : 'block'} lg:block`}>
        <Sidebar />
      </div>

  {/* Message area: visible on desktop always; on mobile only when a conversation is selected */}
  <div className={`${selectedConversation ? 'flex' : 'hidden'} lg:flex flex-1 min-h-0 flex-col`}> 
        {/* Mobile header with back button */}
        <div className="lg:hidden bg-[#202c33] border-b border-[#2a3942] px-3 py-2 flex items-center">
          <button onClick={() => setSelectedConversation(null)} className="p-2 rounded hover:bg-[#2a3942] mr-3">
            <svg className="w-5 h-5 text-[#cfd6da]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="font-semibold text-[#e9edef]">{selectedConversation?.fullName || 'Chat'}</div>
        </div>

        <div className="flex-1 min-h-0">
          <MessageContainer />
        </div>
      </div>
    </div>
  )
}

export default ChatLayout
