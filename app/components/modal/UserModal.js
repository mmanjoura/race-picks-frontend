import React, { useState } from 'react';
import Modal from 'react-modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const UserModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="User Modal"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-8 rounded-lg w-96">
        <div className="flex justify-between mb-4">
          <button onClick={() => setIsLogin(true)} className={`px-4 py-2 ${isLogin ? 'bg-blue-500 text-white' : 'text-gray-500'}`}>Login</button>
          <button onClick={() => setIsLogin(false)} className={`px-4 py-2 ${!isLogin ? 'bg-blue-500 text-white' : 'text-gray-500'}`}>Register</button>
          <button onClick={onClose} className="text-gray-500 hover:text-black">&times;</button>
        </div>
        {isLogin ? <LoginForm onClose={onClose} /> : <RegisterForm onClose={onClose} />}
      </div>
    </Modal>
  );
};

export default UserModal;
