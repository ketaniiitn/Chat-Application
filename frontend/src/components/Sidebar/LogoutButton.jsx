import React from 'react';
import { TbLogout2 } from "react-icons/tb";
import useLogout from "../../hooks/useLogout";
import toast from 'react-hot-toast';

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  const handle = async () => {
    try {
      await logout();
      toast.success('Logged out');
    } catch (e) {
      toast.error('Logout failed');
    }
  };
  return (
    <button
      onClick={handle}
      disabled={loading}
      className="w-6 h-6 flex items-center justify-center disabled:opacity-40"
      title="Logout"
    >
      {loading ? <span className='loading loading-spinner loading-xs text-[#00a884]'></span> : <TbLogout2 className="text-[#e9edef] hover:text-[#00a884]" />}
    </button>
  );
};
export default LogoutButton;