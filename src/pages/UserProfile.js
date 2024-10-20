import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import axios from 'axios';

const UserProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState({
    fname: '',
    lname: '',
    email: '',
    joinedDate: '',
    bio: '',
    twitter: '',
    instagram: '',
    website: '',
  });
  const [userPrompts, setUserPrompts] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [promptAuthors, setPromptAuthors] = useState({}); 
  useEffect(() => {
    // Fetch user data
    axios.get(`http://localhost:5000/user/${username}`)
      .then(response => {
        const { fname, lname, email, joinedDate, bio, twitter, instagram, website } = response.data; // Adjust as necessary
        setUserData({
          fname,
          lname,
          email,
          joinedDate: new Date(joinedDate).toDateString(),
          bio,
          twitter,
          instagram,
          website,
        });
        setEditedData({
          fname,
          lname,
          email,
          bio,
          twitter,
          instagram,
          website,
        });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    // Fetch user prompts
    axios.get(`http://localhost:5000/user/${username}/prompts`)
      .then(response => {
        setUserPrompts(response.data || []); // Adjusted to access data directly
      })
      .catch(error => {
        console.error('Error fetching user prompts:', error);
      });

    // Fetch user orders
    axios.get(`http://localhost:5000/${username}/getOrders`)
      .then(response => {
        setUserOrders(response.data || []);
        axios.get(`http://localhost:5000/getPrompts`)
      .then(response => {
        const prompts = response.data || [];
        // Create mapping of promptId to author username
        const authorsMap = {};
        prompts.forEach(prompt => {
          authorsMap[prompt._id] = prompt.username; // Assuming 'username' is available in prompt data
        });
        setPromptAuthors(authorsMap);
      })
      .catch(error => {
        console.error('Error fetching user prompts:', error);
      }); // Access data directly based on your schema
      })
      .catch(error => {
        console.error('Error fetching user orders:', error);
      });

      

    }, [username]);
    
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setEditedData(userData);
  };

  const handleSaveClick = () => {
    axios.post(`http://localhost:5000/user/${username}/update`, editedData)
      .then(() => {
        setUserData(editedData);
        setEditing(false);
      })
      .catch(error => {
        console.error('Error updating user data:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className='pl-40 pt-10'>
      <div className='bg-[rgb(57,57,84)] rounded-lg h-[200px] w-[1000px] absolute'>
        <div className='border border-white border-2 rounded-full w-[120px] relative p-5 bg-[rgb(34,34,54)] left-5 top-[150px]'>
          <img src={logo} width={100} alt='Logo' />
        </div>
        <div className='flex ml-[700px] gap-5'>
          {!editing ? (
            <button className='bg-white mt-[90px] rounded-md text-gray-900 p-1' onClick={handleEditClick}>Edit Profile</button>
          ) : (
            <>
              <button className='bg-white mt-[85px] rounded-md text-gray-900 p-1' onClick={handleSaveClick}>Save Profile</button>
              <button className='bg-white mt-[85px] rounded-md text-gray-900 p-1' onClick={handleCancelClick}>Cancel</button>
            </>
          )}
        </div>
        <div className='ml-5 mt-[45px]'>
          {!editing ? (
            <>
              <p className='text-xl capitalize'>{userData.fname} {userData.lname}</p>
              <p className='text-xs text-[rgb(161,161,169)] italic'>{userData.bio}</p>
              <div className='flex gap-2 text-xs text-[rgb(161,161,169)] italic'>
                <p>Twitter: {userData.twitter}</p>
                <p>Instagram: {userData.instagram}</p>
                <p>Website: {userData.website}</p>
              </div>
              <div className='text-sm capitalize'>
                <p>Joined: <span className='font-bold'>{userData.joinedDate}</span></p>
              </div>
            </>
          ) : (
            <form>
              {Object.keys(editedData).map((key) => (
                <div className='pt-2' key={key}>
                  <p className='font-bold text-md'>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                  <input
                    className='bg-[rgb(57,57,84)] p-2 rounded-md w-[250px] mt-2'
                    name={key}
                    value={editedData[key] || ''} // Ensure value is always a string
                    onChange={handleChange}
                    type={key === 'email' ? 'email' : 'text'}
                    placeholder={key === 'bio' ? 'Hi! I am Prompt Engineer' : `Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                  />
                </div>
              ))}
            </form>
          )}
        </div>

        {/* Prompts Section */}
        <div className='pt-10'>
          <p className='p-2 border-b-2 border-white text-2xl font-bold'>Prompts by <span className='capitalize'>{username}</span></p>
          <div className="flex wrap gap-5 pt-10">
            {userPrompts.length > 0 ? (
              userPrompts.map(prompt => (
                <Link to={`/prompt/${prompt._id}`} className="prompt-card-link" key={prompt._id}>
                  <div className="prompts-card bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
                    <div className="prompt-card-content p-4">
                      <h2 className="font-bold text-md mb-2 text-gray-700">{prompt.title}</h2>
                      <p className="text-gray-700 text-sm mb-4">{prompt.description ? prompt.description.substring(0, 100) + '...' : 'No description available'}</p>
                      <div className='flex gap-10'> 
                        <p className="text-gray-900 font-semibold mb-2">Price: ₹{prompt.price}</p>
                        <p className="text-gray-600">Model: <span className="capitalize">{prompt.model}</span></p>
                      </div>
                    </div>
                    <button className="prompt-buy-button text-gray-900 py-2 px-4 rounded-b-lg w-full text-center">
                      Buy Now
                    </button>
                  </div>
                </Link>
              ))
            ) : (
              <p className='p-5'>No prompts found</p>
            )}
          </div>
        </div>

        {/* Orders Section */}
        <div className='pt-10'>
          <p className='p-2 border-b-2 border-white text-2xl font-bold'>Orders by <span className='capitalize'>{username}</span></p>
          <div className="flex wrap gap-5 pt-10">
            {userOrders.length > 0 ? (
              userOrders.map(order => (
               order.items.map(item=>(
                <Link to={`/${username}/orders`} className="order-card-link" key={item._id}>
                <div className="prompts-card bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
                 <div className="prompt-card-content p-4">
                   <h2 className="font-bold text-md mb-2 text-gray-700">{item.title}</h2>
                   <p className="text-gray-700 text-sm mb-4">{item.description ? item.description.substring(0, 100) + '...' : 'No description available'}</p>
                   <div className='flex gap-10'> 
                     <p className="text-gray-900 font-semibold mb-2">Price: ₹{item.price}</p>
                     <p className="text-gray-900 font-semibold mb-2">Author: {promptAuthors[item.promptId] || 'Unknown'}</p> {/* Accessing the author from the mapping */}
                     
                   </div>
                 </div>
                 <button className="prompt-buy-button text-gray-900 py-2 px-4 rounded-b-lg w-full text-center">
                   View Order
                 </button>
               </div>
             </Link>
               ))
              ))
            ) : (
              <p className='p-5'>No orders found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
