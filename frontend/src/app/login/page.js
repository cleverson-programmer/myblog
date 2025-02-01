'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/slices/authSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from "next/link";
import Loading from '@/utils/loading';
import PasswordToggle from '@/components/users/PasswordToggle';

import logotype from '../../../public/Tech100px.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { error, user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await dispatch(loginUser({ email, password }));

      if (result.meta.requestStatus === 'fulfilled') {
        const { token } = result.payload;
        const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do JWT
        const expirationTime = tokenPayload.exp * 1000; // `exp` é em segundos, converter para ms
        localStorage.setItem('authToken', token);
        localStorage.setItem('tokenExpiration', expirationTime);
        router.push('/');
      } else {
        console.error('Erro ao fazer login:', result.payload);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    } finally {
      setIsLoading(false); // Desativa o loading após a requisição ser concluída
    }
  };

  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#2E2D78]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2E2D78]">
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
          <PasswordToggle
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            required
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
              <Link href={`/password-reset/request`} className='text-blue-900 cursor-pointer'>
                Click here
              </Link>
            </span>
          </p>
        </div>
        
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <button
          type="submit"
          className="w-full font-semibold py-2 text-white bg-[#2E2D78] rounded-lg hover:bg-[#1a1946]"
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
