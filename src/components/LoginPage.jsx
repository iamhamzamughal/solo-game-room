import { useNavigate } from 'react-router-dom';
import Auth from './Auth';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className='h-screen flex flex-col items-center justify-center bg-gray-900 text-white'>
      <h1 className='text-3xl font-bold mb-6'>Welcome to Solo Game Room</h1>
      <Auth onAuthSuccess={() => navigate('/game')} />
    </div>
  );
};

export default LoginPage;
