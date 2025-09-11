import {useState} from 'react';
import { IoSendSharp } from "react-icons/io5";
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
  const [message, setMessage] = useState(""); // State to manage message input
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    
    await sendMessage(message); // Send the message using your custom hook
    setMessage(""); // Clear the input after sending the message
  };

  return (
    <div className="flex-none bg-[#202c33]">
      <form onSubmit={handleSubmit} className="p-3 flex items-center gap-2">
  <input
    type="text"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    className="flex-1 rounded-lg bg-[#2a3942] text-white px-3 py-2 text-sm outline-none"
    placeholder="Type a message"
  />
  <button type="submit" className="text-[#00a884] text-xl">
    {loading ? <div className="loading loading-spinner"></div> : <IoSendSharp />}
  </button>
      </form>
    </div>
  )
};

export default MessageInput;
