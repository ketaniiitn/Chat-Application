import React, { useState } from "react";
import { FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading, signup } = useSignup();
  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#111b21] bg-gradient-to-br from-[#0b141a] via-[#111b21] to-[#0b141a]">
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

      <main className="flex-1 min-h-0">
        <div className="max-w-7xl mx-auto w-full h-full flex flex-col lg:flex-row items-stretch">
          <div className="flex w-full lg:w-1/2 bg-[#202c33] flex-col justify-center items-center py-0 px-6 sm:px-12 lg:justify-center lg:border-r border-transparent border-[#2a3942]">
            <div className="max-w-md text-center w-full pt-4 lg:pt-0">
              <div className="w-20 h-20 sm:w-28 sm:h-28 bg-[#00a884] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <svg className="w-12 h-12 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.39-1.02L3 21l1.13-3.39C3.41 16.13 3 14.61 3 13c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#e9edef] mt-3">Create your account</h2>
              <p className="text-[#cfd6da] text-base sm:text-lg leading-relaxed mt-2 mb-4">Join ChatApp for private, real-time conversations.</p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex-1 overflow-y-auto p-6 sm:p-10">
            <div className="w-full max-w-md mx-auto">
              <div className="bg-[#202c33]/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-10 border border-[#2a3942]">
                <div className="text-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#e9edef]">Sign Up</h2>
                  <p className="text-sm sm:text-base text-[#8696a0]">Create a new account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-[#e9edef] mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-[#2a3942] border border-[#3b4a54] rounded-lg text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#00a884] transition"
                        placeholder="First name"
                        value={inputs.firstName}
                        onChange={(e) => setInputs({ ...inputs, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-[#e9edef] mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-[#2a3942] border border-[#3b4a54] rounded-lg text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#00a884] transition"
                        placeholder="Last name"
                        value={inputs.lastName}
                        onChange={(e) => setInputs({ ...inputs, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#e9edef] mb-2">Username</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-[#2a3942] border border-[#3b4a54] rounded-lg text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#00a884] transition"
                      placeholder="Choose a username"
                      value={inputs.username}
                      onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#e9edef] mb-2">Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-[#2a3942] border border-[#3b4a54] rounded-lg text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#00a884] transition"
                      placeholder="Create a password"
                      value={inputs.password}
                      onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#e9edef] mb-2">Confirm Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-[#2a3942] border border-[#3b4a54] rounded-lg text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#00a884] transition"
                      placeholder="Confirm your password"
                      value={inputs.confirmPassword}
                      onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#00a884] hover:bg-[#008f72] text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Create account"}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/login" className="text-[#00a884] hover:text-[#008f72] text-sm font-medium transition-colors">
                    Already have an account? Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

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
  );
};

export default Signup;










// import React, { useState } from 'react'
// import GenderCheckbox from './GenderCheckbox'
// import { Link } from 'react-router-dom'
// import useSignup from '../../hooks/useSignup'

// const Signup = () => {
//   const [inputs, setInputs] = useState({
//     firstName: '',
//     lastName: '',
//     username: '',
//     password: '',
//     confirmPassword: '',
//     gender: ''
//   })
//   const { loading, signup } = useSignup()
//   const handleCheckboxChange = (gender) => {
//     setInputs({ ...inputs, gender })
//   }
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     await signup(inputs)
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-[#111b21] bg-gradient-to-br from-[#0b141a] via-[#111b21] to-[#0b141a]">
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

//       <main className="flex-1 min-h-0">
//         <div className="max-w-7xl mx-auto w-full h-full flex flex-col lg:flex-row items-stretch">
//           <div className="flex w-full lg:w-1/2 bg-[#202c33] flex-col justify-center items-center py-0 px-6 sm:px-12 lg:justify-center lg:border-r border-transparent border-[#2a3942]">
//             <div className="max-w-md text-center w-full pt-4 lg:pt-0">
//               <div className="w-20 h-20 sm:w-28 sm:h-28 bg-[#00a884] rounded-full flex items-center justify-center mx-auto shadow-lg">
//                 <svg className="w-12 h-12 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.39-1.02L3 21l1.13-3.39C3.41 16.13 3 14.61 3 13c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-[#e9edef] mt-3">Create your account</h2>
//               <p className="text-[#cfd6da] text-base sm:text-lg leading-relaxed mt-2 mb-4">Join ChatApp for private, real-time conversations.</p>
//             </div>
//           </div>

//           <div className="w-full lg:w-1/2 flex-1 overflow-y-auto p-6 sm:p-10">
//             <div className="w-full max-w-md mx-auto">
//               <div className="bg-[#202c33]/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-10 border border-[#2a3942]">
//                 <div className="text-center mb-6">
//                   <h2 className="text-2xl sm:text-3xl font-bold text-[#e9edef]">Sign Up</h2>
//                   <p className="text-sm sm:text-base text-[#8696a0]">Create a new account</p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div className="flex gap-2">
//                     <div className="flex-1">
//                       <label className="block text-sm font-medium text-[#e9edef] mb-2">First Name</label>
//                       <input
//                         type="text"
//                         className="w-full px-4 py-3 bg-[#2a3942] border border-[#3b4a54] rounded-lg text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#00a884] transition"
//                         placeholder="First name"
//                         value={inputs.firstName}
//                         onChange={(e) => setInputs({ ...inputs, firstName: e.target.value })}
//                         required
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <label className="block text-sm font-medium text-[#e9edef] mb-2">Last Name</label>
//                       <input
//                         type="text"
//                         className="w-full px-4 py-3 bg-[#2a3942] border border-[#3b4a54] rounded-lg text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#00a884] transition"
//                         placeholder="Last name"
//                         value={inputs.lastName}
//                         onChange={(e) => setInputs({ ...inputs, lastName: e.target.value })}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-[#e9edef] mb-2">Username</label>
//                     <input
//                       type="text"
//                       className="w-full px-4 py-3 bg-[#2a3942] border border-[#3b4a54] rounded-lg text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#00a884] transition"
//                       placeholder="Choose a username"
//                       value={inputs.username}
//                       onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-[#e9edef] mb-2">Password</label>
//                     <input
//                       type="password"
//                       className="w-full px-4 py-3 bg-[#2a3942] border border-[#3b4a54] rounded-lg text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#00a884] transition"
//                       placeholder="Create a password"
//                       value={inputs.password}
//                       onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-[#e9edef] mb-2">Confirm Password</label>
//                     <input
//                       type="password"
//                       className="w-full px-4 py-3 bg-[#2a3942] border border-[#3b4a54] rounded-lg text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#00a884] transition"
//                       placeholder="Confirm your password"
//                       value={inputs.confirmPassword}
//                       onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-[#00a884] hover:bg-[#008f72] text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
//                   >
//                     {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Create account'}
//                   </button>
//                 </form>

//                 <div className="mt-6 text-center">
//                   <Link to="/login" className="text-[#00a884] hover:text-[#008f72] text-sm font-medium transition-colors">
//                     Already have an account? Log in
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

// export default Signup