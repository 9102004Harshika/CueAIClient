
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import axios from "axios";


const PromptDetail = () => {
  const { id } = useParams();
  const [prompt, setPrompt] = useState(null);
  const [date, setDate] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userPrompts, setUserPrompts] = useState([]);
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  // Fetch prompt details
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);

    axios.get(`https://cueaiserver-1.onrender.com/prompt/${id}`)
      .then((result) => {
        const foundPrompt = result.data;
        setPrompt(foundPrompt);

        // Calculate how long ago the prompt was created
        const promptCreationDate = new Date(foundPrompt.createdAt);
        const currentDate = new Date();
        const timeDifference = currentDate - promptCreationDate;
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        const daysDifference = Math.floor(hoursDifference / 24);
        const remainingHours = hoursDifference % 24;

        let dateString = "";
        if (daysDifference > 0) {
          dateString += `${daysDifference} day${daysDifference > 1 ? "s" : ""} `;
        }
        dateString += `${remainingHours} hour${remainingHours !== 1 ? "s" : ""} ago`;

        setDate(dateString);
      })
      .catch((err) => console.log(err));
  }, [id]);


  // Fetch user details and other prompts by the user
  useEffect(() => {
    if (prompt) {
      axios.get(`https://cueaiserver-1.onrender.com/user/${prompt.username}`)
        .then((result) => {
          setUserInfo(result.data);

          axios.get(`https://cueaiserver-1.onrender.com/user/${prompt.username}/prompts`)
            .then((response) => {
              const filteredPrompts = response.data.filter((p) => p.title !== prompt.title);
              setUserPrompts(filteredPrompts);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [prompt]);


  // Handle heart button click (favorite/unfavorite)
  const handleHeartClick = async () => {
    try {
      if (isLiked) {
        await axios.delete(`https://cueaiserver-1.onrender.com/user/${username}/favorites/${id}`);
      } else {
        await axios.post(`https://cueaiserver-1.onrender.com/user/${username}/favorites`, { promptId: id });
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Failed to update favorites:", err);
    }
  };

  // Handle add to cart button click
  const handleCartClick = async () => {
    try {
      await axios.post("https://cueaiserver-1.onrender.com/addToCart", {
        username: username,
        promptId: id
      });
      alert('Prompt added to your Cart, proceed to payment');
      navigate(`/${username}/cart`);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  // Handle review submission

  return (
    <>
      <div className="flex pt-10 pl-20">
        <div className="w-[1150px]">
          <div className="flex pt-10 pr-5 justify-between">
            <p className="text-sm">{prompt.model}</p>
            {isLiked ? (
              <button className="text-2xl" onClick={handleHeartClick}>
                <IconContext.Provider value={{ color: "#e74c3c" }}>
                  <FaHeart />
                </IconContext.Provider>
              </button>
            ) : (
              <button className="text-2xl" onClick={handleHeartClick}>
                <FaRegHeart />
              </button>
            )}
          </div>
          <h1 className="text-5xl pt-5">{prompt.title}</h1>
          <p className="text-xs text-gray-900 bg-white w-[70px] p-1 rounded-md text-center mt-5 capitalize">
            @{prompt.username}
          </p>
          <p className="pt-5">
            {prompt.description.substring(0, 100)}
            <span>...more</span>
          </p>
          <h1 className="pt-10">
            <span className="mt-[-20px]">₹</span>
            <span className="text-5xl">{prompt.price}</span>
          </h1>
          <div className="pt-5 flex">
            <button className="getPrompt p-3 text-gray-900 rounded-md text-xl">
              Get Prompt
            </button>
            <div className="flex justify-center">
              <button
                onClick={handleCartClick}
                className="ml-5 rounded-md text-4xl w-[100px] align-center place-items-center">
                <MdOutlineAddShoppingCart />
              </button>
            </div>
          </div>
          <p className="pt-5 text-[rgb(136,136,147)] text-xs italic ">
            After purchasing, you will gain access to the prompt file which you
            can use with GPT or the app builder. You'll receive 20 free
            generation credits with this purchase. By purchasing this prompt,
            you agree to our terms of service.
          </p>
          <p className="text-sm italic pt-3 font-bold">{date}</p>
        </div>

        {/* User Information */}
        <div className="pt-10 pl-10 w-[1200px] pr-10">
          <div className="border border-white border-1 h-[600px] p-5 rounded-md overflow-y-scroll custom-scrollbar">
            <h1 className="text-2xl pt-2 pb-2 font-bold">Prompt Details</h1>
            <label className="pb-2 font-bold text-sm">Model </label>
            <p className="pb-2 text-sm">{prompt.model}</p>
            <label className="font-bold text-sm">Example Input:</label>
            <p className="text-sm pb-2" style={{ whiteSpace: 'pre-line' }}>{prompt.exampleInput}</p>
            <label className="font-bold text-sm">Example Output:</label>
            <p className="text-sm pb-2" style={{ whiteSpace: 'pre-line' }}>{prompt.exampleOutput}</p>
          </div>
        </div>
      </div>

      

      {/* Other Prompts by the Same User */}
      <div className="pt-10 pl-20">
        <h3 className="text-2xl font-bold">Other Prompts by @{prompt.username}</h3>
        <div className="flex flex-wrap">
          {
            userPrompts.length === 0 ?(
              <p className=" text-gray-400 ml-5">This author has only one prompt</p>
            ):(
              userPrompts.map((userPrompt) => (
                <Link
                  key={userPrompt._id}
                  to={`/prompt/${userPrompt._id}`}
                  className="block border p-4 rounded-md w-[200px] m-2"
                >
                  <h4 className="text-lg font-bold">{userPrompt.title}</h4>
                  <p className="text-sm">{userPrompt.description.substring(0, 50)}...</p>
                </Link>
              ))
            )
          }
          
        </div>
      </div>
    </>
  );
};

export default PromptDetail;
