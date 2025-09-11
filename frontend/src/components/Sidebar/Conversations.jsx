import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'
import { getRandomEmoji } from '../../utils/emojis'

const Conversations = ({ collapsed = false }) => {
  const { loading, conversations } = useGetConversations()
  return (
    <div className={`py-2 flex flex-col overflow-auto ${collapsed ? 'items-center' : ''}`}>
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
          collapsed={collapsed}
        />
      ))}
      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  )
}

export default Conversations