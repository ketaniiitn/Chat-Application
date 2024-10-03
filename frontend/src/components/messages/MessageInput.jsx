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
    <div>
      <form className='px-4 my-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
          <input 
            type='text'
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
            placeholder='Message'
          />
          <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
            {loading 
              ? <div className='loading loading-spinner'></div> 
              : <IoSendSharp />
            }
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
