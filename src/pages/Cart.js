import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    axios
      .get(`http://localhost:5000/getItems?username=${username}`)
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch cart items', error);
      });
  }, [username]);



  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    axios.post('http://localhost:5000/removeItem', {
      itemId,
    });
  };

  const handleCheckout = () => {
    const totalPrice = cartItems.reduce(
      (total, item) => total + (item.promptId.price * (item.quantity || 1)),
      0
    );
  
    // Prepare the order details to send to the server
    const orderDetails = {
      username:username, // Assuming username is being passed via useParams
      items: cartItems.map(item => ({
        promptId: item.promptId._id,
        title: item.promptId.title,
        description: item.promptId.description,
        price: item.promptId.price
      })),
      totalPrice:totalPrice
    };
  
    // Save order details to the database
    axios.post('http://localhost:5000/saveOrder', orderDetails)
      .then(response => {
        // On successful save, navigate to checkout page
        navigate('/checkout', { state: { cartItems, totalPrice } });
      })
      .catch(error => {
        console.error('Failed to save order details', error);
        alert("You have buyed this prompt earlier")
      });
  };
  
  const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <div className="cart-container bg-[#222236] min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">You have {totalItems} prompt{totalItems !== 1 ? 's' : ''} in your cart</h1>
      {cartItems.length > 0 ? (
        <div className="cart-items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item bg-[rgb(57,57,84)] p-6 rounded-lg shadow-lg">
              <h2 className="text-xl text-white font-semibold mb-2">{item.promptId.title}</h2>
              <p className="text-gray-400 mb-4">{item.promptId.description}</p>
              <p className="text-lg text-white font-bold">Price: ₹{item.promptId.price}</p>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="mt-2 bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] text-slate-900 font-bold py-2 px-3 rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    Remove Prompt
                  </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-400">No prompts in the cart...</p>
      )}
      {cartItems.length > 0 && (
        <button
          onClick={handleCheckout}
          className="mt-8 bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default Cart;
