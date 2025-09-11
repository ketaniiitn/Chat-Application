import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProfileModal = ({ isOpen, onClose }) => {
  const { authUser, setAuthUser } = useAuthContext();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
  });
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [tab, setTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(''); // kept for inline fallback but using toast

  useEffect(() => {
    if (authUser) {
      setForm({
        firstName: authUser.firstName || '',
        lastName: authUser.lastName || '',
        username: authUser.username || '',
      });
    }
  }, [authUser]);

  useEffect(() => {
    if (tab === 'blocked') {
      fetch('/api/conversations/blocked')
        .then(res => res.json())
        .then(data => setBlockedUsers(data));
    }
  }, [tab]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handlePasswordChange = e => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const res = await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
  setAuthUser(data);
  toast.success('Profile updated');
    } catch (err) {
  toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const res = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwords),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
  toast.success('Password updated');
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
  toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#111b21] border border-[#2a3942] rounded-xl w-full max-w-lg p-6 relative shadow-2xl">
        <button className="absolute top-2 right-2 text-[#8696a0] hover:text-[#e9edef]" onClick={onClose}>&times;</button>
        <div className="flex gap-2 mb-6">
          {['profile','password','blocked'].map(t => (
            <button
              key={t}
              onClick={()=>setTab(t)}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${tab===t ? 'bg-[#00a884] text-white shadow-md' : 'bg-[#202c33] text-[#cfd6da] hover:bg-[#2a3942]'}`}
            >
              {t==='profile' && 'Profile'}
              {t==='password' && 'Password'}
              {t==='blocked' && 'Blocked'}
            </button>
          ))}
        </div>
        {tab === 'profile' && (
          <form onSubmit={handleProfileUpdate} className="flex flex-col gap-3">
            <div className="flex gap-3">
              <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="flex-1 bg-[#202c33] border border-[#2a3942] focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884] rounded-lg px-3 py-2 text-[#e9edef] placeholder-[#8696a0] outline-none" />
              <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="flex-1 bg-[#202c33] border border-[#2a3942] focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884] rounded-lg px-3 py-2 text-[#e9edef] placeholder-[#8696a0] outline-none" />
            </div>
            <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="bg-[#202c33] border border-[#2a3942] focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884] rounded-lg px-3 py-2 text-[#e9edef] placeholder-[#8696a0] outline-none" />
            <button type="submit" className="mt-2 inline-flex items-center justify-center bg-[#00a884] hover:bg-[#008f72] text-white rounded-lg px-4 py-2 font-semibold transition disabled:opacity-50" disabled={loading}>{loading ? 'Saving…' : 'Save Changes'}</button>
          </form>
        )}
        {tab === 'password' && (
          <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-3">
            <input name="oldPassword" value={passwords.oldPassword} onChange={handlePasswordChange} placeholder="Old Password" type="password" className="bg-[#202c33] border border-[#2a3942] focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884] rounded-lg px-3 py-2 text-[#e9edef] placeholder-[#8696a0] outline-none" />
            <input name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} placeholder="New Password" type="password" className="bg-[#202c33] border border-[#2a3942] focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884] rounded-lg px-3 py-2 text-[#e9edef] placeholder-[#8696a0] outline-none" />
            <input name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} placeholder="Confirm Password" type="password" className="bg-[#202c33] border border-[#2a3942] focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884] rounded-lg px-3 py-2 text-[#e9edef] placeholder-[#8696a0] outline-none" />
            <button type="submit" className="mt-2 inline-flex items-center justify-center bg-[#00a884] hover:bg-[#008f72] text-white rounded-lg px-4 py-2 font-semibold transition disabled:opacity-50" disabled={loading}>{loading ? 'Saving…' : 'Change Password'}</button>
          </form>
        )}
        {tab === 'blocked' && (
          <div className="max-h-72 overflow-y-auto pr-1 custom-scrollbar">
            <h3 className="font-semibold mb-3 text-[#e9edef]">Blocked Users</h3>
            <ul className="space-y-2">
              {blockedUsers.length === 0 && <li className="text-[#8696a0] text-sm">No blocked users</li>}
              {blockedUsers.map(user => (
                <li key={user._id} className="flex items-center gap-3 bg-[#202c33] border border-[#2a3942] rounded-lg px-3 py-2">
                  <img src={user.profilePic} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-[#e9edef] text-sm font-medium">{user.firstName} {user.lastName}</span>
                    <span className="text-[#8696a0] text-xs">@{user.username}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {msg && <div className="mt-2 text-center text-sm text-red-400">{msg}</div>}
      </div>
    </div>
  );
};

export default ProfileModal;
