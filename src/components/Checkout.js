
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

// Replace with your own public key
const stripePromise = loadStripe('pk_test_51NHJfkSC31qw0z2vDih3AjJXPsSph1EVAavy7U5yZiC3FXpKOFx5RTuOi8Dxipv6fpoTd23tqs0nQYKjIsxgfJrM002xyDMITu');

const Checkout = () => {
  const location = useLocation();
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    country: '',
    address: '',
    email: '',
    postalCode: '',
  });
  const { cartItems, totalPrice } = location.state || {};

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const  response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems, totalPrice, personalInfo }),
      });

    const { id } = await response.json();
    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <div className="checkout-container bg-[#222236] min-h-screen p-10">
      <div className="checkout-content flex gap-8">
        <div className="checkout-form bg-[rgb(57,57,84)] p-8 rounded-lg shadow-lg w-2/3">
          <h2 className="text-2xl font-bold text-white mb-6">Checkout</h2>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="personal-info mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <input
                  type="text"
                  name="firstName"
                  value={personalInfo.firstName}
                  onChange={handlePersonalInfoChange}
                  placeholder="First Name"
                  className="p-2 bg-[rgb(57,57,84)] rounded-lg border border-gray-300"
                />
                <input
                  type="text"
                  name="lastName"
                  value={personalInfo.lastName}
                  onChange={handlePersonalInfoChange}
                  placeholder="Last Name"
                  className="p-2 rounded-lg bg-[rgb(57,57,84)] border border-gray-300"
                />
                <input
                  type="text"
                  name="country"
                  value={personalInfo.country}
                  onChange={handlePersonalInfoChange}
                  placeholder="Country"
                  className="p-2 rounded-lg bg-[rgb(57,57,84)] border border-gray-300"
                />
                <input
                  type="text"
                  name="address"
                  value={personalInfo.address}
                  onChange={handlePersonalInfoChange}
                  placeholder="Address"
                  className="p-2 rounded-lg bg-[rgb(57,57,84)] border border-gray-300"
                />
                <input
                  type="email"
                  name="email"
                  value={personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  placeholder="Email"
                  className="p-2 rounded-lg border bg-[rgb(57,57,84)] border-gray-300"
                />
                <input
                  type="text"
                  name="postalCode"
                  value={personalInfo.postalCode}
                  onChange={handlePersonalInfoChange}
                  placeholder="Postal Code"
                  className="p-2 rounded-lg border bg-[rgb(57,57,84)] border-gray-300"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              Checkout
            </button>
          </form>
        </div>
        <div className="cart-summary bg-[rgb(57,57,84)] p-8 rounded-lg shadow-lg w-1/3">
          <h2 className="text-2xl font-bold text-white mb-6">Cart Summary</h2>
          <div className="space-y-4 mb-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between text-white">
                <span>{item.promptId.title}</span>
                <span>₹{item.promptId.price} x {item.quantity || 1}</span>
              </div>
            ))}
          </div>
          <hr />
          <div className="mt-4 flex justify-between text-white font-bold">
            <span>Total Price:</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
