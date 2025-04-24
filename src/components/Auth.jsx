import { useState } from 'react';
import { supabase } from '../services/SupabaseClient';

const Auth = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else onAuthSuccess();
  };

  return (
    <div className='flex flex-col items-center'>
      <input
        className='m-2 p-2 rounded bg-gray-700 text-white'
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className='m-2 p-2 rounded bg-gray-700 text-white'
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className='bg-blue-600 text-white px-4 py-2 rounded mt-2'
      >
        Login
      </button>
    </div>
  );
};

export default Auth;
