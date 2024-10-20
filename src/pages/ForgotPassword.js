import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate =useNavigate()
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/sendOtp', { email });
      alert("Please check your email for Otp")
      setMessage(response.data.message);
      setOtpSent(true);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/verifyOtp', { email, otp });
      setMessage(response.data.message);
      if (response.data.message === 'OTP verified successfully.') {
        localStorage.setItem('resetEmail', email);
        navigate('/resetPassword');
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className='flex align-center  justify-center p-[50px] '>
      <div className="lg:w-1/3 flex flex-col items-center justify-center rounded-l-md p-12 bg-no-repeat bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80')] "></div>
      <div className="w-full lg:w-1/2 py-16 px-12 bg-[rgb(69,69,102)]">
        <h2 className="text-3xl mb-4">Forgot Password</h2>
        <p className="mb-4">
          Forgot your Password? Reset it now!
        </p>
        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
            <div className="mt-5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="py-1 px-2 border-b border-slate-500 bg-[rgb(69,69,102)] w-full"
              />
            </div>
            <div className="mt-5">
              <input type="checkbox" className="border border-gray-400" />
              <span>
                &nbsp;I accept the{" "}
                <a
                  href="#"
                  className="bg-gradient-to-r from-[rgb(214,133,134)]  to-[rgb(219,194,144)] text-transparent  bg-clip-text font-semibold"
                >
                  Terms of Use
                </a>{" "}
                &{" "}
                <a
                  href="#"
                  className="bg-gradient-to-r from-[rgb(214,133,134)]  to-[rgb(219,194,144)] text-transparent  bg-clip-text font-semibold"
                >
                  Privacy Policy
                </a>
              </span>
            </div>
            <div className="mt-5">
              <button type="submit" className="w-full rounded-md bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] text-slate-900 py-3 text-center">
                Send OTP
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="mt-5">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter OTP"
                className="py-1 px-2 border-b border-slate-500 bg-[rgb(69,69,102)] w-full"
              />
            </div>
            <div className="mt-5">
              <button type="submit" className="w-full rounded-md bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] text-slate-900 py-3 text-center">
                Verify OTP
              </button>
            </div>
          </form>
        )}
        <div className="text-center mt-4">
          <Link to="/login">
            <a className="underline hover:underline text-blue-dark text-xs" href="/login">
              Go Back
            </a>
          </Link>
        </div>
        {message && <p className="text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
