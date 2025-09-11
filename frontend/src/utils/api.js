// Centralized API base URL helper
// Reads from Vite environment variable VITE_API_URL; fallback to relative ('') for local dev with proxy
export const API_BASE = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '';

export const apiUrl = (path = '') => `${API_BASE}${path.startsWith('/') ? path : '/' + path}`;
