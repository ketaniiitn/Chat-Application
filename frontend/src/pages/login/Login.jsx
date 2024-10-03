import { useState } from 'react';
import {Link} from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
const Login = () => {
  const[ username, setUsername] =useState("");
  const[ password, setPassword] =useState("");
  const {loading,login}=useLogin();
  const handleSubmit= async(e)=>{
     e.preventDefault();
     await login({username,password});
  }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Login <span className='text-blue-500'>ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Username field */}
          <div className='mt-4'>
            <label className='label p-2'>
              <span className='text-base label-text text-black'>Username</span>
            </label>
            <input
              type='text'
              className='input input-bordered w-full p-2 text-gray-900 bg-white focus:bg-white border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Enter your username'
              value={username}
              onChange = {(e)=>setUsername(e.target.value)}
            />
          </div>
          {/* Password field */}
          <div className='mt-4'>
            <label className='label p-2'>
              <span className='text-base label-text text-black'>Password</span>
            </label>
            <input
              type='password'
              className={`input input-bordered w-full p-2 text-gray-900 bg-white 
              border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder='Enter your password'
              value={password}
              onChange = {(e)=>setPassword(e.target.value)}
            />
          </div>
          <Link to='/signup' className='text-sm hover:underline hover:text-blue-800 mt-2 inline-block'>
            {"Don't"} have an account?
          </Link>
          {/* Login button */}
          <div className='mt-6'>
            <button
              type='submit'
              className='w-full p-2 text-white bg-blue-500 hover:bg-red-500 rounded-lg'
              disabled={loading}
            >
              {loading ? <span className='loading loading-spinner'></span>:"Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;