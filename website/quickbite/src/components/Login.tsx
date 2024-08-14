import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const { token, user } = data;

      // Redirect to Dashboard with state
      navigate('/dashboard', { state: { userId: user.user_id, token, name: user.name, email: user.email,  phone_number:user.phone_number } });
    } catch (error) {
      setError('Login failed. Please check your email and password.'); 
      console.error('Login failed', error);
    }
  };

  return (
    <div className='p-6'>
      <h2 className='text-xl font-bold'>Sign In to Our Platform</h2>
      <input
        type='email'
        placeholder='Your email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-full mt-2 p-2 border border-gray-300 rounded'
      />
      <input
        type='password'
        placeholder='Your password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='w-full mt-2 p-2 border border-gray-300 rounded'
      />
      <button
        onClick={handleLogin}
        className='w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded'>
        Log In
      </button>
      {error && <p className='mt-4 text-red-600'>{error}</p>}
      <p className='mt-4'>
        Not registered?{' '}
        <button onClick={onSwitchToRegister} className='text-blue-600'>
          Create an account
        </button>
      </p>
      <button
        onClick={onClose}
        className='absolute top-2 right-2 text-gray-600'>
        &times;
      </button>
    </div>
  );
};

export default Login;

