import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    alert("Logged Out Successfully!!!");
    navigate("/login");
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (localStorage.getItem("isLoggedIn")) {
        const confirmationMessage = "Are you sure you want to leave without signing out?";
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const result = await axios.get('http://localhost:5000/getPrompt');
        const data = result.data.filter(prompt => prompt.username === username).slice(0, 5);
        setPrompts(data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchRecentActivity = async () => {
      try {
        const result = await axios.get(`http://localhost:5000/recentActivity/${username}`);
        setRecentActivity(result.data); // Assuming it returns an array of activities
      } catch (err) {
        console.error("Failed to fetch recent activity:", err);
        setError("Could not load recent activity.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
    fetchRecentActivity();
  }, [username]);

  const getGreetingMessage = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleNavigate = (action) => {
    navigate(`/${username}/prompt?action=${action}`);
  };

  const truncateDescription = (description) => {
    const endIndex = description.indexOf(".");
    if (endIndex !== -1) {
      return description.substring(0, endIndex + 1); // Include the full stop
    }
    return description; // If no full stop found, return the whole description
  };

  return (
    <>
      <div className="p-10">
        <div className="flex justify-between pr-[150px]">
          <div>
            <p className="text-4xl capitalize">{getGreetingMessage()}, {username}</p>
            <p>Welcome back where you have left</p>
          </div>
          <div className="flex gap-5 text-xl ">
            <button
              className="w-10 h-10 center text-center rounded-md cursor-pointer"
              onClick={() => navigate(`/${username}/profile`)}
            >
              <FaRegUserCircle size={30} />
            </button>
            <button 
              onClick={() => navigate(`/${username}/cart`)}
              className="w-10 h-10 center text-center text-3xl rounded-md cursor-pointer"
            >
              <MdOutlineAddShoppingCart />
            </button>
            <button
              className="w-20 h-10 bg-white text-gray-900 rounded-md cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <div className="pl-10">
        {["create", "edit", "delete", "buy"].map(action => (
          <button
            key={action}
            onClick={() => handleNavigate(action)}
            className="hover:bg-[rgb(69,69,102)] w-20 h-8 text-center rounded-md cursor-pointer mr-2"
          >
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[rgb(69,69,102)] p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Your Prompts</h3>
            {prompts.length === 0 ? (
              <p>No prompts found.</p>
            ) : (
              <ul>
                {prompts.map((prompt) => (
                  <li key={prompt.id} className="mb-4">
                    <h4 className="text-lg font-bold">{prompt.title}</h4>
                    <p>{truncateDescription(prompt.description)}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bg-[rgb(69,69,102)] p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Recent Activity</h3>
            {loading ? (
              <p>Loading recent activity...</p>
            ) : error ? (
              <p>{error}</p>
            ) : recentActivity.length > 0 ? ( 
              <ul>
                {recentActivity.map((activity, index) => (
                  <li key={index} className="mb-4">
                    <h4 className="text-lg font-bold">{activity.activity}</h4>
                    <p>{new Date(activity.date).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent activity found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
