import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

interface ModalProps {
  children?: React.ReactNode; 
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ closeModal }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSwitchToRegister = () => setIsRegistering(true);
  const handleSwitchToLogin = () => setIsRegistering(false);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center'>
      <div className='bg-white p-8 rounded relative'>
        {isRegistering ? (
          <Register onClose={closeModal} onSwitchToLogin={handleSwitchToLogin} error={''} />
        ) : (
          <Login onClose={closeModal} onSwitchToRegister={handleSwitchToRegister} />
        )}
      </div>
    </div>
  );
};

export default Modal;
