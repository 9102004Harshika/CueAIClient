import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { IoHome } from "react-icons/io5";

const Orders = () => {
  const { username } = useParams(); // Retrieve the username from URL parameters
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadedFiles, setDownloadedFiles] = useState({}); // Track downloaded files

  useEffect(() => {
    // Fetch order details when the component mounts
    axios.get(`http://localhost:5000/${username}/getOrders`)
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch orders', err);
        setError('Failed to fetch orders');
        setLoading(false);
      });
      
    // Load downloaded files from localStorage
    const storedDownloads = JSON.parse(localStorage.getItem('downloadedFiles')) || {};
    setDownloadedFiles(storedDownloads);
  }, [username]);

  const handleGetPromptFile = async (promptId) => {
    try {
      const response = await axios.get(`http://localhost:5000/getPromptFile/${promptId}`, {
        responseType: 'blob' // Important to handle file downloads
      });
      
      // Create a link element to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `prompt_${promptId}.docx`); // Change extension based on your file type
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      // Update downloaded files state to disable the button
      setDownloadedFiles(prevState => {
        const updatedState = {
          ...prevState,
          [promptId]: true
        };
        // Store the updated state in localStorage
        localStorage.setItem('downloadedFiles', JSON.stringify(updatedState));
        return updatedState;
      });
    } catch (err) {
      console.error('Failed to fetch the prompt file', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="orders-container bg-[#222236] min-h-screen p-10 relative">
      {/* Go to Home Button */}
      <button 
        onClick={() => navigate(`/${username}`)} // Navigate to home when clicked
        className="absolute top-15 right-10 text-3xl text-white font-bold py-2 px-4 rounded"
      >
       <IoHome />
      </button>
      
      <h1 className="text-3xl font-bold mb-6">Order Details for <span className="capitalize"> {username}</span></h1>
      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-item bg-[rgb(57,57,84)] p-6 rounded-lg shadow-lg mb-4">
              <h2 className="text-xl text-white font-semibold mb-2">Order ID: {order._id}</h2>
              <p className="text-gray-400 mb-4">Date: {new Date(order.date).toLocaleDateString()}</p>
              <p className="text-lg text-white font-bold">Total Price: ₹{order.totalPrice}</p>
              <div className="order-items mt-4">
                {order.items.map(item => (
                  <div key={item.promptId} className="order-item-details bg-[rgb(50,50,70)] p-4 rounded-lg mb-2">
                    <h3 className="text-lg text-white font-semibold">{item.title}</h3>
                    <p className="text-gray-300">Quantity: {item.quantity}</p>
                    <p className="text-gray-300">Price per unit: ₹{item.price}</p>
                    
                    {/* Render the button only if the file has not been downloaded */}
                    {!downloadedFiles[item.promptId] ? (
                      <button 
                        onClick={() => handleGetPromptFile(item.promptId)} 
                        className={`mt-3 font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-white 
                          bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] text-slate-900 hover:bg-white`}
                      >
                        Get Prompt File
                      </button>
                    ) : (
                      <p className="text-green-500 mt-3">File Already Downloaded</p> // Show this message if downloaded
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-400">No orders found for {username}...</p>
      )}
    </div>
  );
};

export default Orders;
