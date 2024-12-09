'use client';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const theme = Cookies.get('theme') as Theme | undefined;
    if (theme) {
      setIsDark(theme === 'dark');
      document.body.className = theme;
    }
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    Cookies.set('theme', newTheme, { expires: 365 });
    document.body.className = newTheme;
  };

  return (
    <div className='p-4 border rounded-lg'>
      <h2 className='text-xl font-semibold mb-4'>Theme Preference</h2>
      <button
        onClick={toggleTheme}
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
      >
        Switch to {isDark ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}
