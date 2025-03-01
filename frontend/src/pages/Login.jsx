import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const url = isSignUp ? `${backendUrl}/api/user/register` : `${backendUrl}/api/user/login`;
      const payload = isSignUp ? { name, email, password } : { email, password };

      const { data } = await axios.post(url, payload);

      if (data.success) {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        }
        toast.success(isSignUp ? 'Account created successfully!' : 'Login successful!');
      } else {
        toast.error(data.message || 'An error occurred');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Something went wrong!');
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{isSignUp ? 'Create Account' : 'Login'}</p>
        <p>Please {isSignUp ? 'sign up' : 'log in'} to book an appointment</p>

        {isSignUp && (
          <div className='w-full'>
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='border border-[#DADADA] rounded w-full p-2 mt-1'
              type='text'
              required
            />
          </div>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='email'
            required
          />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='password'
            required
          />
        </div>
        <button type='submit' className='bg-indigo-500 hover:bg-blue-500 text-white w-full py-2 my-2 rounded-md text-base'>
          {isSignUp ? 'Create Account' : 'Login'}
        </button>
        <p>
          {isSignUp ? 'Already have an account?' : 'Create a new account?'}{' '}
          <span onClick={() => setIsSignUp(!isSignUp)} className='text-blue-500 underline cursor-pointer'>
            {isSignUp ? 'Login here' : 'Click here'}
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;