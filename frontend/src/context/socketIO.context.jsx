import { createContext, useState, useEffect ,useContext} from "react";
import io from "socket.io-client"
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext();
export const useSocketContext = ()=> {
    return useContext(SocketContext);
}

const SOCKET_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socket = io(SOCKET_BASE || undefined,{
               query:{
                userId:authUser._id,

               },
            });
            setSocket(socket);
            
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });
            // New user created broadcast -> dispatch custom event
            socket.on("user:created", (user)=>{
                window.dispatchEvent(new CustomEvent('app:userCreated',{detail:user}));
            });
            // Conversation status updated
            socket.on("conversation:updated", (data)=>{
                window.dispatchEvent(new CustomEvent('app:conversationUpdated',{detail:data}));
            });
            return () => socket.close();
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
