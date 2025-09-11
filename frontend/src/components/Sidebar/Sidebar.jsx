import React from 'react'
import SearchInput from './SearchInput.jsx'
import Conversations from './Conversations.jsx'
import LogoutButton from './LogoutButton.jsx'
import { FaUserCog } from 'react-icons/fa';
import { useState } from 'react';
import ProfileModal from '../ProfileModal';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import useUIStore from '../../zustand/useUIStore'

const Sidebar = () => {
  const { sidebarCollapsed: collapsed, toggleSidebar } = useUIStore();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 lg:static lg:inset-auto flex flex-col h-screen lg:h-full bg-[#111b21] bg-gradient-to-b from-[#0b141a] via-[#111b21] to-[#0b141a] border-r border-[#2a3942] transition-all duration-200 ${collapsed ? 'w-20' : 'w-full lg:w-80'}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#202c33]/80 backdrop-blur-sm border-b border-[#0ad347]">
        <div className="flex items-center space-x-3">
          <div className={`w-9 h-9 bg-[#00a884] rounded-full flex items-center justify-center shadow-md ${collapsed ? 'mx-auto' : ''}`}>
            {/* Unified logo icon (same style as login) */}
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.5-4 8-9 8a9.7 9.7 0 01-4.4-1.02L3 21l1.15-3.45A8.1 8.1 0 013 13c0-4.5 4-8 9-8s9 3.5 9 8z" />
            </svg>
          </div>
          {!collapsed && <h1 className="text-lg font-bold tracking-tight text-[#e9edef]">ChatApp</h1>}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          {!collapsed && (
            <>
              <button
                className="p-2 rounded-md text-[#e9edef] hover:bg-[#2a3942]"
                title="Profile & Settings"
                onClick={() => setShowProfile(true)}
              >
                <FaUserCog />
              </button>
              <div className="p-2 rounded-md text-[#e9edef] hover:bg-[#2a3942]">
                <LogoutButton />
              </div>
            </>
          )}
          <button
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => toggleSidebar()}
            className="p-2 rounded-md text-[#e9edef] hover:bg-[#2a3942]"
          >
            {collapsed ? <FiChevronRight className="text-[#cfd6da]" /> : <FiChevronLeft className="text-[#cfd6da]" />}
          </button>
        </div>
      </div>

      {/* Search */}
  <div className={`px-3 py-2 ${collapsed ? 'hidden' : 'block'}`}>
        <SearchInput />
      </div>

      {/* Conversations list */}
  <div className="flex-1 overflow-y-auto px-1 custom-scrollbar">
        <Conversations collapsed={collapsed} />
      </div>
      {showProfile && <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />}
    </aside>
  )
}

export default Sidebar
