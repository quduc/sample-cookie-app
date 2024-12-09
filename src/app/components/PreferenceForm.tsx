'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import Cookies from 'js-cookie';
import { UserPreferences } from '../../type';

export default function PreferenceForm() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    notifications: false,
    newsletter: false,
    language: 'en',
  });

  useEffect(() => {
    const savedPrefs = Cookies.get('userPreferences');
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs));
    }
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    const newPreferences: UserPreferences = {
      ...preferences,
      [name]: type === 'checkbox' ? checked : value,
    } as UserPreferences;

    setPreferences(newPreferences);
    Cookies.set('userPreferences', JSON.stringify(newPreferences), {
      expires: 365,
    });
  };

  return (
    <div className='p-4 border rounded-lg'>
      <h2 className='text-xl font-semibold mb-4'>User Preferences</h2>
      <form className='space-y-4'>
        <div>
          <label className='flex items-center space-x-2'>
            <input
              type='checkbox'
              name='notifications'
              checked={preferences.notifications}
              onChange={handleChange}
            />
            <span>Enable Notifications</span>
          </label>
        </div>
        <div>
          <label className='flex items-center space-x-2'>
            <input
              type='checkbox'
              name='newsletter'
              checked={preferences.newsletter}
              onChange={handleChange}
            />
            <span>Subscribe to Newsletter</span>
          </label>
        </div>
        <div>
          <label className='block mb-1'>Language</label>
          <select
            name='language'
            value={preferences.language}
            onChange={handleChange}
            className='w-full p-2 border rounded'
          >
            <option value='en'>English</option>
            <option value='es'>Spanish</option>
            <option value='fr'>French</option>
          </select>
        </div>
      </form>
    </div>
  );
}
