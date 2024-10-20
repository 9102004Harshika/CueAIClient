import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className="cancel-container bg-[#222236] min-h-screen p-10 flex items-center justify-center">
      <div className="cancel-content bg-[rgb(57,57,84)] p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Payment Canceled</h2>
        <p className="text-white mb-6">Your payment was canceled. If this was an error, please try again.</p>
        <Link
          to="/"
          className="bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
