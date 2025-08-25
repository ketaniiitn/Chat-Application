// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server:{
//     proxy:{
//       "/api":{
//         target:"http://localhost:8000",
//       }
//     }
//   }
// })
// File: vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Your frontend port
    proxy: {
      '/api': {
        target: 'http://localhost:8000', 
        changeOrigin: true,
      }
    }
  }
})