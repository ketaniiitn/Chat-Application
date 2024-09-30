import React from 'react';
import { MdOutlinePersonSearch } from "react-icons/md";
const SearchInput = () => {
  return (
    <form className='flex items-center gap-2 px-4 pt-4 pb-0'>
      <input 
        type="text" 
        placeholder="Search..." 
        className='input input-bordered rounded-full w-full mr-1' 
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
