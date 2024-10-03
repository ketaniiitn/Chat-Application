import React, { useState } from 'react';
import GenderCheckbox from './GenderCheckbox';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';
const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName:'',
    username:'',
    password:'',
    confirmPassword:'',
    gender:''
  })
  const {loading,signup}=useSignup()
  const handleCheckboxChange=(gender)=>{
    setInputs({...inputs,gender})
  }
  const handleSubmit= async(e)=>{
    e.preventDefault();
   await signup(inputs);
  }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto' style={{ margin: '3cm 0' }}>
      <div className='w-full p-4 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300 mb-2'>
          Sign Up <span className='text-blue-500'>ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Full Name field */}
          <div className='mt-2'>
            <label className='label p-1'>
              <span className='text-base label-text text-black'>Full Name</span>
            </label>
            <input
              type='text'
              className='input input-bordered w-full p-2 text-gray-900 bg-white focus:bg-white border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Enter your full name'
              value={inputs.fullName}
              onChange={(e)=>setInputs({...inputs,fullName:e.target.value})}
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
              value={inputs.username}
              onChange={(e)=>setInputs({...inputs,username:e.target.value})}
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
              className={`input input-bordered w-full p-2 text-gray-900 bg-white focus:bg-white border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder='Enter your password'
              value={inputs.password}
              onChange={(e)=>setInputs({...inputs,password:e.target.value})}
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
              className={`input input-bordered w-full p-2 text-gray-900 bg-white focus:bg-white border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder='Confirm your password'
              value={inputs.confirmPassword}
              onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})}
              required
            />
          </div>
          
            <GenderCheckbox onCheckboxChange = {handleCheckboxChange} selectedGender={inputs.gender} />
          
          {/* Sign Up button */}
          <div className='mt-4'>
            <button
              type='submit'
              className='w-full p-2 text-white bg-blue-500 hover:bg-red-500 rounded-lg'
              disabled={loading}
            >
              {loading?<span className='loading loading-spinner'></span>:"Sign Up"}
            </button>
          </div>
          <Link to="/login" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
};
export default Signup;