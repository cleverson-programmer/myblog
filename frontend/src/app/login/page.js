'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/slices/authSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from "next/link";

import logotype from '../../../public/Tech100px.png'
import  Loading  from '@/utils/loading';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        const { token } = result.payload;
        const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do JWT
        const expirationTime = tokenPayload.exp * 1000; // `exp` é em segundos, converter para ms
        localStorage.setItem('authToken', token);
        localStorage.setItem('tokenExpiration', expirationTime);
        router.push('/');
      }else {
        console.error('Erro ao fazer login:', result.payload);
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2E2D78]">
      {loading ?
      <Loading/>
    :
    <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-lg w-96">
      <div className='flex justify-end'>
      <Image
        width={60}
        className='rounded-[50%]'
        src={logotype}
        alt='Logotype of Devlearn'
      />
      </div>
      <h2 className="text-3xl uppercase font-bold mb-6 text-center">Login</h2>
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          placeholder='Enter your password'
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className='mb-6 text-md flex flex-col justify-center items-start font-medium'>
        <p>Don&apos;t have an account?
          <span>
             <Link className='text-blue-900 cursor-pointer' href={`/user/new/`}> Register</Link>
          </span>
        </p>

        <p>Forgot your password?
          <span>
            <a className='text-blue-900 cursor-pointer'>
             Click here
            </a>
          </span>
        </p>
      </div>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <button
        type="submit"
        className="w-full font-semibold py-2 text-white bg-[#2E2D78] rounded-lg hover:bg-[#1a1946]"
      >
        Enter
      </button>
    </form>}
    </div>
  );
}
