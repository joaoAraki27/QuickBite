import React, { useState } from 'react';
import { FaCheckCircle} from 'react-icons/fa'; 

interface RegisterProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
  error: string
}

const Register: React.FC<RegisterProps> = ({ onClose, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleRegister = async () => {
    if (!name || !email || !password || !phoneNumber) {
      setError('All fields are required.');
      return;
    }
    

    setError('');

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phoneNumber }),
      });

      if (!response.ok) {
        throw new Error('This email is already registered.');
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSwitchToLogin();
      }, 2000); 
    } catch (error) {
        if(error instanceof Error){
            setError(error.message);
        }
    }
  };

  if (success) {
    return (
      <div className='p-6 text-center'>
        <FaCheckCircle className='text-green-500 text-4xl mx-auto' />
        <h2 className='text-xl font-bold mt-4'>Registration Successful!</h2>
        <p className='mt-2'>You will be redirected to the login screen</p>
      </div>
    );
  }

  return (
    <div className='relative p-6'>
      <h2 className='text-xl font-bold'>Create an Account</h2>
      <input
        type='text'
        placeholder='Your Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='w-full mt-2 p-2 border border-gray-300 rounded'
      />
      <input
        type='email'
        placeholder='Your Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-full mt-2 p-2 border border-gray-300 rounded'
      />
      <input
        type='password'
        placeholder='Your Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='w-full mt-2 p-2 border border-gray-300 rounded'
      />
      <input
        type='text'
        placeholder='Your Phone Number'
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className='w-full mt-2 p-2 border border-gray-300 rounded'
      />
      {error && <p className='text-red-500 mt-2'>{error}</p>}
      <button
        onClick={handleRegister}
        className={`w-full mt-4 px-4 py-2 ${ 'bg-blue-600'} text-white rounded`}
      >
        Register
      </button>
      <p className='mt-4'>
        Already registered?{' '}
        <button onClick={onSwitchToLogin} className='text-blue-600'>
          Log in
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

export default Register;
