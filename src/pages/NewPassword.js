
import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    try {
      const email = localStorage.getItem('resetEmail');
      const response = await axios.post('http://localhost:5000/resetPassword', { email, newPassword });
      setMessage(response.data.message);
      if (response.data.message === 'Password reset successfully.') {
        localStorage.removeItem('resetEmail');
        navigate('/login');
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className='flex align-center  justify-center p-[50px] '>
      <div className="lg:w-1/3 flex flex-col items-center justify-center rounded-l-md p-12 bg-no-repeat bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80')] "></div>
      <div className="w-full lg:w-1/2 py-16 px-12 bg-[rgb(69,69,102)]">
        <h2 className="text-3xl mb-4">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="mt-5">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="New Password"
              className="py-1 px-2 border-b border-slate-500 bg-[rgb(69,69,102)] w-full"
            />
          </div>
          <div className="mt-5">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm New Password"
              className="py-1 px-2 border-b border-slate-500 bg-[rgb(69,69,102)] w-full"
            />
          </div>
          <div className="mt-5">
            <button type="submit" className="w-full rounded-md bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] text-slate-900 py-3 text-center">
              Reset Password
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <a className="underline hover:underline text-blue-dark text-xs" href="/login">
            Go Back
          </a>
        </div>
        {message && <p className="text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default NewPassword;

