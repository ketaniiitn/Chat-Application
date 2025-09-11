"use client"

import { useState } from "react"
import { FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import useLogin from "../../hooks/useLogin"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { loading, login } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login({ username, password })
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#111b21] bg-gradient-to-br from-[#0b141a] via-[#111b21] to-[#0b141a]">
      {/* Decorative gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[400px] h-[400px] bg-[#00a884] opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[400px] h-[400px] bg-[#008f72] opacity-20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-[#202c33]/80 backdrop-blur-sm border-b border-[#2a3942] px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#00a884] rounded-full flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.39-1.02L3 21l1.13-3.39C3.41 16.13 3 14.61 3 13c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#e9edef] tracking-tight">ChatApp</h1>
          </div>
          <span className="hidden sm:block text-sm text-[#8696a0]">Private • Real-time • Secure</span>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch">
        {/* Branding (visible on mobile and desktop) */}
        <div className="flex w-full lg:w-1/2 bg-[#202c33] flex-col justify-start items-center py-0 px-6 sm:px-12 lg:justify-center lg:border-r border-transparent border-[#2a3942]">
          <div className="max-w-md text-center w-full pt-4 lg:pt-0">
            <div className="w-20 h-20 sm:w-28 sm:h-28 bg-[#00a884] rounded-full flex items-center justify-center mx-auto shadow-lg">
              <svg className="w-12 h-12 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.39-1.02L3 21l1.13-3.39C3.41 16.13 3 14.61 3 13c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#e9edef] mt-3">Connect Privately, Instantly</h2>
            <p className="text-[#cfd6da] text-base sm:text-lg leading-relaxed mt-2 mb-4">
              A secure chat app with real-time messaging, status updates, and notifications.
            </p>
          </div>
        </div>

        {/* Login form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="bg-[#202c33]/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-10 border border-[#2a3942]">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#e9edef]">Welcome Back</h2>
                <p className="text-sm sm:text-base text-[#8696a0]">Sign in to continue your chat</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#e9edef] mb-2">Username</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-[#2a3942] border border-[#3b4a54] rounded-lg text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#00a884] transition"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#e9edef] mb-2">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-[#2a3942] border border-[#3b4a54] rounded-lg text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#00a884] transition"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#00a884] hover:bg-[#008f72] text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <a href="/signup" className="text-[#00a884] hover:text-[#008f72] text-sm font-medium transition-colors">
                  Don’t have an account? Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-[#202c33]/80 backdrop-blur-sm border-t border-[#2a3942] px-4 py-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <p className="text-sm text-[#8696a0]">&copy; {new Date().getFullYear()} ChatApp. All Rights Reserved.</p>
          <div className="flex items-center space-x-5 text-[#afb9c1]">
            <a href="https://github.com/ketaniiitn" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="hover:text-[#00a884] transition-colors">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/ketanbajpai/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="hover:text-[#00a884] transition-colors">
              <FaLinkedin size={20} />
            </a>
            <a href="mailto:ketanbajpai980@gmail.com" aria-label="Email" className="hover:text-[#00a884] transition-colors">
              <FaEnvelope size={20} />
            </a>
            <a href="https://x.com/KetanIIITN" target="_blank" rel="noopener noreferrer" aria-label="X Profile" className="hover:text-[#00a884] transition-colors">
              <FaXTwitter size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Login



// "use client"

// import { useState } from "react"
// import useLogin from "../../hooks/useLogin"

// const Login = () => {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const { loading, login } = useLogin()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     await login({ username, password })
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-[#111b21] bg-gradient-to-br from-[#0b141a] via-[#111b21] to-[#0b141a]">
//       {/* Decorative gradient blobs */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-[-20%] left-[-20%] w-[400px] h-[400px] bg-[#00a884] opacity-20 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-[-20%] right-[-20%] w-[400px] h-[400px] bg-[#008f72] opacity-20 rounded-full blur-3xl"></div>
//       </div>

//       {/* Header */}
//       <header className="relative z-10 bg-[#202c33]/80 backdrop-blur-sm border-b border-[#2a3942] px-4 py-3 sm:px-6 sm:py-4">
//         <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-[#00a884] rounded-full flex items-center justify-center shadow-md">
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.39-1.02L3 21l1.13-3.39C3.41 16.13 3 14.61 3 13c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//               </svg>
//             </div>
//             <h1 className="text-xl sm:text-2xl font-bold text-[#e9edef] tracking-tight">ChatApp</h1>
//           </div>
//           <span className="hidden sm:block text-sm text-[#8696a0]">Private • Real-time • Secure</span>
//         </div>
//       </header>

//       {/* Body */}
//       <div className="flex-1 flex flex-col lg:flex-row items-stretch">
//         {/* Branding (visible on mobile and desktop) */}
//         <div className="flex w-full lg:w-1/2 bg-[#202c33] flex-col justify-start items-center py-0 px-6 sm:px-12 lg:justify-center lg:border-r border-transparent border-[#2a3942]">
//           <div className="max-w-md text-center w-full pt-4 lg:pt-0">
//             <div className="w-20 h-20 sm:w-28 sm:h-28 bg-[#00a884] rounded-full flex items-center justify-center mx-auto shadow-lg">
//               <svg className="w-12 h-12 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.39-1.02L3 21l1.13-3.39C3.41 16.13 3 14.61 3 13c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//               </svg>
//             </div>
//             <h2 className="text-2xl sm:text-3xl font-bold text-[#e9edef] mt-3">Connect Privately, Instantly</h2>
//             <p className="text-[#cfd6da] text-base sm:text-lg leading-relaxed mt-2 mb-4">
//               A secure chat app with real-time messaging, status updates, and notifications.
//             </p>
//           </div>
//         </div>

//         {/* Login form */}
//         <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">
//           <div className="w-full max-w-md">
//             <div className="bg-[#202c33]/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-10 border border-[#2a3942]">
//               <div className="text-center mb-8">
//                 <h2 className="text-2xl sm:text-3xl font-bold text-[#e9edef]">Welcome Back</h2>
//                 <p className="text-sm sm:text-base text-[#8696a0]">Sign in to continue your chat</p>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-[#e9edef] mb-2">Username</label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-3 bg-[#2a3942] border border-[#3b4a54] rounded-lg text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#00a884] transition"
//                     placeholder="Enter your username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-[#e9edef] mb-2">Password</label>
//                   <input
//                     type="password"
//                     className="w-full px-4 py-3 bg-[#2a3942] border border-[#3b4a54] rounded-lg text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#00a884] transition"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-[#00a884] hover:bg-[#008f72] text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
//                 >
//                   {loading ? (
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   ) : (
//                     "Sign In"
//                   )}
//                 </button>
//               </form>

//               <div className="mt-6 text-center">
//                 <a href="/signup" className="text-[#00a884] hover:text-[#008f72] text-sm font-medium transition-colors">
//                   Don’t have an account? Sign up
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login



// "use client"

// import { useState } from "react"
// import useLogin from "../../hooks/useLogin"

// const Login = () => {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const { loading, login } = useLogin()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     await login({ username, password })
//   }

//   return (
//   <div className="min-h-screen bg-[#111b21] flex flex-col">
//       <header className="bg-[#202c33] border-b border-[#2a3942] px-4 py-3 sm:px-6 sm:py-4">
//         <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-[#00a884] rounded-full flex items-center justify-center">
//               {/* Generic chat/message icon */}
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.39-1.02L3 21l1.13-3.39C3.41 16.13 3 14.61 3 13c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//               </svg>
//             </div>
//             <h1 className="text-xl font-semibold text-[#e9edef]">ChatApp</h1>
//           </div>
//           <div className="text-xs sm:text-sm text-[#8696a0] text-right">Private • Real-time • Secure</div>
//         </div>
//       </header>

//   <div className="flex-1 flex flex-col lg:flex-row min-h-0 items-center justify-center">
//         {/* Left section: Brand/Info */}
//         <div className="hidden lg:flex lg:w-1/2 bg-[#202c33] flex-col justify-center items-center p-6 sm:p-12 border-r border-[#2a3942] h-full">
//           <div className="max-w-md text-center">
//             <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#00a884] rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
//               {/* Generic chat/message icon */}
//               <svg className="w-14 h-14 sm:w-20 sm:h-20 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.39-1.02L3 21l1.13-3.39C3.41 16.13 3 14.61 3 13c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//               </svg>
//             </div>
//             <h2 className="text-2xl sm:text-3xl font-bold text-[#e9edef] mb-3 sm:mb-4 text-balance">Connect Privately, Instantly</h2>
//             <p className="text-[#8696a0] text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
//               A private chat app with real-time chat experience, online/offline status, and notifications.
//             </p>
//             <div className="space-y-3 sm:space-y-4 text-left">
//               <div className="flex items-center space-x-3">
//                 <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#00a884] rounded-full flex items-center justify-center flex-shrink-0">
//                   <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M7 10l2 2 4-4" />
//                   </svg>
//                 </div>
//                 <span className="text-[#e9edef] text-sm sm:text-base">Real-time messaging</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#00a884] rounded-full flex items-center justify-center flex-shrink-0">
//                   <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20">
//                     <circle cx="10" cy="10" r="6" />
//                     <path d="M14 10a4 4 0 11-8 0 4 4 0 018 0z" />
//                   </svg>
//                 </div>
//                 <span className="text-[#e9edef] text-sm sm:text-base">Online/offline status</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#00a884] rounded-full flex items-center justify-center flex-shrink-0">
//                   <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M10 2v2m0 12v2m8-8h-2M4 10H2m12.95 4.95l-1.414-1.414M6.464 6.464L5.05 5.05m9.9 0l-1.414 1.414M6.464 13.536l-1.414 1.414" />
//                   </svg>
//                 </div>
//                 <span className="text-[#e9edef] text-sm sm:text-base">Notifications</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right section: Login form */}
//   <div className="w-full lg:w-1/2 flex flex-1 items-center justify-center p-4 sm:p-8 bg-[#111b21] h-full">
//           <div className="w-full max-w-md">
//             <div className="bg-[#202c33] rounded-2xl shadow-2xl p-8 border border-[#2a3942]">
//               <div className="text-center mb-8">
//                 <h2 className="text-2xl font-bold text-[#e9edef] mb-2">Welcome back</h2>
//                 <p className="text-[#8696a0]">Sign in to your account</p>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-[#e9edef] mb-2">Username</label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-3 bg-[#2a3942] border border-[#3b4a54] rounded-lg text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#00a884] focus:border-transparent transition-colors"
//                     placeholder="Enter your username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-[#e9edef] mb-2">Password</label>
//                   <input
//                     type="password"
//                     className="w-full px-4 py-3 bg-[#2a3942] border border-[#3b4a54] rounded-lg text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#00a884] focus:border-transparent transition-colors"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-[#00a884] hover:bg-[#008f72] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   ) : (
//                     "Sign In"
//                   )}
//                 </button>
//               </form>

//               <div className="mt-6 text-center">
//                 <a href="/signup" className="text-[#00a884] hover:text-[#008f72] text-sm font-medium transition-colors">
//                   Don't have an account? Sign up
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login



// import { useState } from 'react';
// import {Link} from 'react-router-dom';
// import useLogin from '../../hooks/useLogin';
// const Login = () => {
//   const[ username, setUsername] =useState("");
//   const[ password, setPassword] =useState("");
//   const {loading,login}=useLogin();
//   const handleSubmit= async(e)=>{
//      e.preventDefault();
//      await login({username,password});
//   }
//   return (
//     <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
//       <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//         <h1 className='text-3xl font-semibold text-center text-gray-300'>
//           Login <span className='text-blue-500'>ChatApp</span>
//         </h1>
//         <form onSubmit={handleSubmit}>
//           <div className='mt-4'>
//             <label className='label p-2'>
//               <span className='text-base label-text text-black'>Username</span>
//             </label>
//             <input
//               type='text'
//               className='input input-bordered w-full p-2 text-gray-900 bg-white focus:bg-white border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400'
//               placeholder='Enter your username'
//               value={username}
//               onChange = {(e)=>setUsername(e.target.value)}
//             />
//           </div>
//           <div className='mt-4'>
//             <label className='label p-2'>
//               <span className='text-base label-text text-black'>Password</span>
//             </label>
//             <input
//               type='password'
//               className={`input input-bordered w-full p-2 text-gray-900 bg-white 
//               border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400`}
//               placeholder='Enter your password'
//               value={password}
//               onChange = {(e)=>setPassword(e.target.value)}
//             />
//           </div>
//           <Link to='/signup' className='text-sm hover:underline hover:text-blue-800 mt-2 inline-block'>
//             {"Don't"} have an account?
//           </Link>
//           <div className='mt-6'>
//             <button
//               type='submit'
//               className='w-full p-2 text-white bg-blue-500 hover:bg-red-500 rounded-lg'
//               disabled={loading}
//             >
//               {loading ? <span className='loading loading-spinner'></span>:"Login"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default Login;