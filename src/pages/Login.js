
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false); // Track if OTP has been sent
  const [loading, setLoading] = useState(false); // To handle loading states

  // Step 1: Send OTP to user's email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/send-otp-for-login', { email });
      if (response.status === 200) {
        alert('OTP sent to your email');
        setOtpSent(true); // Show OTP input form
      } else {
        alert('Failed to send OTP');
      }
    } catch (err) {
      console.error('OTP request error:', err);
      alert('Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and login
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/verify-otp-and-login', { email, otp });
      if (response.status === 200) {
        alert('Logged In Successfully!!!');
        const { user } = response.data;

        // Use the user information to navigate
        if (user.accountType === 'admin') {
          navigate('/admin');
        } else {
          navigate(`/${user.fname}`);
        }
      } else {
        alert('Invalid OTP');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#222236] h-[580px] w-[1300px]">
      <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        <div className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-[rgb(69,69,102)] sm:mx-0 h-[500px]">
          <div className="flex flex-col w-full md:w-1/2 p-4">
            <div className="flex flex-col flex-1 justify-center mb-8">
              <h1 className="text-4xl text-center">Welcome Back</h1>
              <div className="w-full mt-4">
                
                {/* Form to send OTP if it hasn't been sent */}
                {!otpSent ? (
                  <form className="form-horizontal w-3/4 mx-auto" method="POST" onSubmit={handleEmailSubmit}>
                    <div className="mt-5">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                        placeholder="Email"
                        className="py-1 px-2 border-b border-slate-500 bg-[rgb(69,69,102)] w-full"
                      />
                    </div>
                    <div className="flex flex-col mt-8">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] text-slate-900 py-2 px-4 rounded"
                        disabled={loading}
                      >
                        {loading ? 'Sending OTP...' : 'Send OTP'}
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Form to verify OTP */
                  <form className="form-horizontal w-3/4 mx-auto" method="POST" onSubmit={handleOtpSubmit}>
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
                    <div className="flex flex-col mt-8">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] text-slate-900 py-2 px-4 rounded"
                        disabled={loading}
                      >
                        {loading ? 'Verifying OTP...' : 'Verify OTP'}
                      </button>
                    </div>
                  </form>
                )}
                
                <div className="text-center mt-4">
                  <Link to="/forgotPassword" className="no-underline hover:underline text-blue-dark text-xs">
                    Forgot Your Password?
                  </Link>
                </div>
                <div className="text-center mt-4">
                  <Link to="/signup">
                    <a className="no-underline hover:underline text-blue-dark text-xs" href="/signup">
                      New user? Create an account
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="md:block md:w-1/2 rounded-r-lg cover bg-[url('https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80')] bg-center"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
