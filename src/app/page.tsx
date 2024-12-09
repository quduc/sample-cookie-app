'use client';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ThemeToggle from '../app/components/ThemeToggle';
import LoginForm from '../app/components/LoginForm';
import PreferenceForm from '../app/components/PreferenceForm';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <main className='min-h-screen p-8'>
      <h1 className='text-3xl font-bold mb-8'>Cookie Management Demo</h1>
      <div className='space-y-8'>
        <ThemeToggle />
        <LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        {isLoggedIn && <PreferenceForm />}
      </div>
    </main>
  );
}
