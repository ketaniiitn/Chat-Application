import { create } from 'zustand';

const useConversation = create((set, get) => ({
    selectedConversation: null,
    messages: [],
    unread: {}, // { userId: count }

    setSelectedConversation: (selectedConversation) => set((state) => {
        // When selecting a conversation, clear its unread count
        if (selectedConversation) {
            const userId = selectedConversation.userId || selectedConversation._id;
            const { unread } = state;
            if (unread[userId]) {
                const newUnread = { ...unread };
                delete newUnread[userId];
                return { selectedConversation, unread: newUnread };
            }
        }
        return { selectedConversation };
    }),

    setMessages: (messages) => set({ messages }),

    incrementUnread: (userId) => set((state) => ({
        unread: { ...state.unread, [userId]: (state.unread[userId] || 0) + 1 }
    })),
}));

export default useConversation;