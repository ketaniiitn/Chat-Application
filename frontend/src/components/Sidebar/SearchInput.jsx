import {useState} from 'react';
import { MdOutlinePersonSearch } from "react-icons/md";
import useGetConversations from '../../hooks/useGetConversations';
import useConversation from '../../zustand/useConversation';
import toast from 'react-hot-toast';
const SearchInput = () => {
  const [search,setSearch] = useState("");
  const {conversations}=useGetConversations();
  const {setSelectedConversation}=useConversation();
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(search.length<3){
      return toast.error('Search term must be at least 3 charachters long')
    }
    const conversation = conversations.find((c)=> c.fullName.toLowerCase().includes(search.toLowerCase()));
    if(conversation){
      setSelectedConversation(conversation)
      setSearch('');
    } else toast.error("No Such User Found");
  }
  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2 px-4 pt-4 pb-0'>
      <input 
        type="text" 
        placeholder="Search..." 
        className='input input-bordered rounded-full w-full mr-1' 
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />
      <button 
        type='submit' 
        className='btn btn-circle bg-sky-500 text-white'
      >
       <MdOutlinePersonSearch />
      </button>
    </form>
  );
}
export default SearchInput;