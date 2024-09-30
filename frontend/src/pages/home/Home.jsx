import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar.jsx'
const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[450px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar/>
      
    </div>
  )
}

export default Home
// import React, { useEffect, useState } from 'react';

// const Home = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     // Fetch users from the backend
//     const fetchUsers = async () => {
//       const response = await fetch('/api/users'); // Update with your API endpoint
//       const data = await response.json();
//       setUsers(data);
//     };

//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     if (selectedUser) {
//       // Fetch messages for the selected user from the backend
//       const fetchMessages = async () => {
//         const response = await fetch(`/api/messages/${selectedUser.id}`); // Update with your API endpoint
//         const data = await response.json();
//         setMessages(data);
//       };

//       fetchMessages();
//     }
//   }, [selectedUser]);

//   const handleUserClick = (user) => {
//     setSelectedUser(user);
//     setMessages([]); // Clear messages when a new user is selected
//   };

//   return (
//     <div className='flex sm:h-[450px] md:h-[450px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//       <div className="w-64 bg-white border-r border-gray-300 p-4  backdrop-blur-lg bg-opacity-0">
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div>
//           {users.map((user) => (
//             <div
//               key={user.id}
//               className="p-2 cursor-pointer rounded hover:bg-gray-200"
//               onClick={() => handleUserClick(user)}
//             >
//               {user.name}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex-1 flex flex-col">
//         {selectedUser ? (
//           <>
//             <div className="bg-blue-600 text-white p-4">
//               <h2 className="text-lg">To: {selectedUser.name}</h2>
//             </div>
//             <div className="flex-1 p-4 overflow-y-auto bg-white">
//               {messages.map((message, index) => (
//                 <div
//                   key={index}
//                   className={`my-2 p-2 rounded ${
//                     message.senderId === selectedUser.id
//                       ? 'bg-gray-200 text-black'
//                       : 'bg-blue-100 text-black self-end'
//                   }`}
//                 >
//                   <span>{message.text}</span>
//                   <span className="text-xs text-gray-500 ml-2">{message.time}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="p-4 border-t border-gray-300">
//               <input
//                 type="text"
//                 placeholder="Send a message"
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//             </div>
//           </>
//         ) : (
//           <div className="flex items-center justify-center flex-1 text-gray-500">
//             Select a user to start chatting
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

