import { create } from 'zustand'

const useUIStore = create((set) => ({
  sidebarCollapsed: false,
  setSidebarCollapsed: (val) => set({ sidebarCollapsed: val }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
}))

export default useUIStore
