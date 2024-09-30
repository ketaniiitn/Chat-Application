// import React from 'react'

// const Signup = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Signup
import React, { useState } from 'react';
import GenderCheckbox from './GenderCheckbox';

const Signup = () => {
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto' style={{ margin: '3cm 0' }}>
      <div className='w-full p-4 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300 mb-2'>
          Sign Up <span className='text-blue-500'>ChatApp</span>
        </h1>
        <form>
          {/* Full Name field */}
          <div className='mt-2'>
            <label className='label p-1'>
              <span className='text-base label-text text-black'>Full Name</span>
            </label>
            <input
              type='text'
              className='input input-bordered w-full p-2 text-gray-900 bg-white focus:bg-white border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Enter your full name'
              required
            />
          </div>

          {/* Username field */}
          <div className='mt-2'>
            <label className='label p-1'>
              <span className='text-base label-text text-black'>Username</span>
            </label>
            <input
              type='text'
              className='input input-bordered w-full p-2 text-gray-900 bg-white focus:bg-white border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Enter your username'
              required
            />
          </div>

          {/* Password field */}
          <div className='mt-2'>
            <label className='label p-1'>
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
              required
            />
          </div>

          {/* Confirm Password field */}
          <div className='mt-2'>
            <label className='label p-1'>
              <span className='text-base label-text text-black'>Confirm Password</span>
            </label>
            <input
              type='password'
              className={`input input-bordered w-full p-2 text-gray-900 bg-white ${
                isConfirmPasswordFocused ? 'bg-white' : 'bg-white'
              } border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder='Confirm your password'
              onFocus={() => setConfirmPasswordFocused(true)}
              onBlur={() => setConfirmPasswordFocused(false)}
              required
            />
          </div>
          
          {/* Gender Checkbox */}
          <div>
            <GenderCheckbox />
          </div>

          {/* Sign Up button */}
          <div className='mt-4'>
            <button
              type='submit'
              className='w-full p-2 text-white bg-blue-500 hover:bg-red-500 rounded-lg'
            >
              Sign Up
            </button>
          </div>

          <a href='#' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            Already have an account? Login
          </a>
        </form>
      </div>
    </div>
  );
};

export default Signup;




