// import React from 'react'

// const Login = () => {
//   return (
//     <div className='flex flex-col items-center justify center min-w-96 mx-auto'>
//       <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//         <h1 className='text-3xl font-semibold text-center text-gray-300'>Login
//           <span className='text-blue-500'>ChatApp</span>
//         </h1>
//         <form>
//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text'>UserName</span>
//             </label>
//           </div>
//         </form>
//       </div>

//     </div>
//   )
// }

// export default Login
import React, { useState } from 'react';

const Login = () => {
  const [isPasswordFocused, setPasswordFocused] = useState(false);

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Login <span className='text-blue-500'>ChatApp</span>
        </h1>
        <form>
          {/* Username field */}
          <div className='mt-4'>
            <label className='label p-2'>
              <span className='text-base label-text text-black'>Username</span>
            </label>
            <input
              type='text'
              className='input input-bordered w-full p-2 text-gray-900 bg-white focus:bg-white border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Enter your username'
            />
          </div>

          {/* Password field */}
          <div className='mt-4'>
            <label className='label p-2'>
              <span className='text-base label-text text-black'>Password</span>
            </label>
            <input
              type='password'
              className={`input input-bordered w-full p-2 text-gray-900 bg-white ${
                isPasswordFocused ? 'bg-white' : 'bg-white'
              } border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder='Enter your password'
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
          </div>
          <a href='#' className='text-sm hover:underline hover:text-blue-800 mt-2 inline-block'>
            {"Don't"} have an account?
          </a>
          {/* Login button */}
          <div className='mt-6'>
            <button
              type='submit'
              className='w-full p-2 text-white bg-blue-500 hover:bg-red-500 rounded-lg'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;






