import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSocketContext } from '../context/socketIO.context';

const useGetConversations = () => {
  const [loading,setLoading]=useState(false);
  const [conversations,setConversations] = useState([]);
  const { socket } = useSocketContext();
  useEffect(()=>{
    const getConversations =async()=>{
        setLoading(true);
        try{
            const res = await fetch('/api/user');
            const data=await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            setConversations(data);
        }
        catch(error){
           toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    getConversations();
  },[])

  // Realtime: listen directly on socket (more reliable than forwarding via window event)
  useEffect(()=>{
    if(!socket) return;
    const handler = (user) => {
      setConversations(prev => prev.some(u => u._id === user._id) ? prev : [...prev, user]);
    };
    socket.on('user:created', handler);
    return ()=> socket.off('user:created', handler);
  },[socket]);

  return {loading,conversations,setConversations}
}

export default useGetConversations
