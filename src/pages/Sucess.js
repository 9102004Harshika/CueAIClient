import React, { useEffect } from 'react';
import axios from 'axios'; // Import axios
import { Link, useParams } from 'react-router-dom';

const Success = () => {
  const { username } = useParams();

  // Function to clear the cart
  const clearCart = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/clear-cart', {
        data: { username }, // Send username in the request body using `data` property
      });

      if (response.status === 200) {
        console.log('Cart cleared successfully');
      } else {
        console.error('Failed to clear cart');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Use effect to clear the cart when component mounts
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="success-container bg-[#222236] min-h-screen p-10 flex items-center justify-center">
      <div className="success-content bg-[rgb(57,57,84)] p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Payment Successful!</h2>
        <p className="text-white mb-6">Thank you for your purchase. Your order has been processed successfully.</p>
        <Link
          to={`/${username}/orders`}
          className="bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          Go to Orders
        </Link>
      </div>
    </div>
  );
};

export default Success;
