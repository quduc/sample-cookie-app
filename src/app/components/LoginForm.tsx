'use client';
import { useState, FormEvent } from 'react';
import Cookies from 'js-cookie';

interface LoginFormProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export default function LoginForm({
  isLoggedIn,
  setIsLoggedIn,
}: LoginFormProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, validate credentials against backend
    Cookies.set('authToken', 'demo-token', { expires: 7 });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    Cookies.remove('authToken');
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <div className='p-4 border rounded-lg'>
        <h2 className='text-xl font-semibold mb-4'>Authentication</h2>
        <button
          onClick={handleLogout}
          className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className='p-4 border rounded-lg'>
      <h2 className='text-xl font-semibold mb-4'>Login</h2>
      <form onSubmit={handleLogin} className='space-y-4'>
        <div>
          <label className='block mb-1'>Username</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        <div>
          <label className='block mb-1'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        <button
          type='submit'
          className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
        >
          Login
        </button>
      </form>
    </div>
  );
}
