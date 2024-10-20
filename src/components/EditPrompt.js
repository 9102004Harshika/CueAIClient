import { useParams,Link } from "react-router-dom";
import React, {  useEffect, useState } from 'react';
import axios from 'axios'

export const CreatePrompt = () => {
  const { username } = useParams();
  const [type, setType] = useState('');
  const [categories, setCategories] = useState([]);
  const [models, setModels] = useState([]);
  const [promptData, setPromptData] = useState({
    title: "",
    description: "",
    prompt: "",
    category: "",
    username: username,
    price: 0,
    exampleInput: "",
    exampleOutput: "",
    type: "",
    model: "",
  });

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    setPromptData({ ...promptData, type: selectedType });

    if (selectedType === 'text') {
      setCategories(['Story', 'Poetry', 'Scene']);
      setModels(['GPT-3', 'GPT-4', 'Davinci', 'Curie', 'Babbage', 'Ada']);
    } else if (selectedType === 'image') {
      setCategories(['Landscape', 'Portrait', 'Abstract', 'Street']);
      setModels(['DALL-E', 'MidJourney', 'Stable Diffusion']);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromptData({
      ...promptData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Assuming the use of 'docx' library for reading .docx files
      const reader = new FileReader();
      reader.onload = (event) => {
        // Process the file content here
        const content = event.target.result;
        // Update promptData with the file content
        setPromptData({ ...promptData, prompt: content });
      };
      reader.readAsText(file); // Read as text for simplicity, adjust for your needs
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Prepare form data to be sent in multipart format
    const formData = new FormData();
    formData.append('username', promptData.username);
    formData.append('title', promptData.title);
    formData.append('description', promptData.description);
    formData.append('type', promptData.type);
    formData.append('category', promptData.category);
    formData.append('price', promptData.price);
    formData.append('model', promptData.model);
    formData.append('exampleInput', promptData.exampleInput);
    formData.append('exampleOutput', promptData.exampleOutput);
  
    // If a file is selected, append it to formData
    if (promptData.promptFile) {
      formData.append('promptFile', promptData.promptFile);
    }
  
    axios.post('http://localhost:5000/createPrompt', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(result => {
        alert("Created Prompt Successfully");
      axios.post('http://localhost:5000/addActivity',{username:promptData.username,activity:"Created a prompt",date:Date.now()})
        // Send approval request after prompt creation
        return axios.post('http://localhost:5000/admin/approvePrompt', { username: promptData.username });
      })
      .then(result => {
        alert("Prompt sent for approval");
        axios.post('http://localhost:5000/addActivity',{username:promptData.username,activity:"Prompt Sent for approval",date:Date.now()})
      })
      .catch(err => {
        console.error("Error creating prompt:", err.response ? err.response.data : err.message);
        alert("An error occurred while creating the prompt.");
      });
  };
  
  

  return (
    <>
      <div className="pt-10 pl-20">
        <h1 className="font-bold text-4xl">Create Prompt.</h1>
        <p className="text-xs text-[rgb(161,161,169)] italic">
          Let's create a new prompt
        </p>
      </div>
      <div className="pt-8 pl-20 pr-20">
        <form className="bg-[rgb(57,57,84)] justify-center align-center p-10 rounded-md" onSubmit={handleSubmit}>
          <div className="flex gap-10">
            <div>
              <p className="font-bold text-md">Title</p>
              <input
                className="border border-white p-2 rounded-md w-[250px] mt-2 bg-[#222236]"
                name="title"
                type="text"
                placeholder="The Reluctant Hero"
                value={promptData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <p className="font-bold text-md">Description</p>
              <input
                className="border border-white p-2 rounded-md w-[250px] mt-2 bg-[#222236]"
                name="description"
                type="text"
                placeholder="Description here..."
                value={promptData.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <p className="font-bold text-md">Prompts <span className="text-sm text-red-500">(Note:only word file accepted)</span></p>
              <input
                type="file"
                accept=".docx"
                onChange={handleFileChange}
                className="border border-white p-2 rounded-md w-[250px] mt-2 bg-[#222236]"
              />
            </div>
            <div>
              <p className="font-bold text-md">Type</p>
              <select
                className="border border-white p-2 rounded-md w-[250px] mt-2 bg-[#222236]"
                name="type"
                value={type}
                onChange={handleTypeChange}
              >
                <option value="">Select prompt type...</option>
                <option value="text">Text Based</option>
                <option value="image">Image Based</option>
              </select>
            </div>
          </div>
          <div className="flex gap-10 mt-5">
            <div>
              <p className="font-bold text-md">Categories</p>
              <select
                className="border border-white p-2 rounded-md w-[250px] mt-2 bg-[#222236]"
                name="category"
                value={promptData.category}
                onChange={handleChange}
              >
                <option value="">Select category...</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="font-bold text-md">Price</p>
              <input
                className="border border-white p-2 rounded-md w-[250px] mt-2 bg-[#222236]"
                name="price"
                type="number"
                placeholder="Price here"
                value={promptData.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <p className="font-bold text-md">Example Input</p>
              <input
                className="border border-white p-2 rounded-md w-[250px] mt-2 bg-[#222236]"
                name="exampleInput"
                type="text"
                placeholder="Example Input here..."
                value={promptData.exampleInput}
                onChange={handleChange}
              />
            </div>
            <div>
              <p className="font-bold text-md">Example Output</p>
              <textarea
                className="border border-white p-2 rounded-md w-[250px] mt-2 bg-[#222236]"
                name="exampleOutput"
                placeholder="Example Output here..."
                value={promptData.exampleOutput}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex gap-10">
            <div>
              <p className="font-bold text-md">AI Model Used:</p>
              <select
                className="border border-white p-2 rounded-md w-[250px] mt-2 bg-[#222236]"
                name="model"
                value={promptData.model}
                onChange={handleChange}
              >
                <option value="">Select model...</option>
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] text-slate-900 my-4 py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};


export const EditPrompt = () => {
  const {username}=useParams()
  const [userPrompts, setUserPrompts] = useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:5000/user/${username}/prompts`)
      .then(response => {
        setUserPrompts(response.data);
      })
      .catch(error => {
        console.error('Error fetching user prompts:', error);
      });
  },[username])
  return (
    <>
      <div className="pt-10 pl-20">
        <h1 className="font-bold text-4xl">Choose Prompt.</h1>
        <p className="text-xs text-[rgb(161,161,169)] italic">
          Want to make changes in prompt
        </p>
      </div>
      <div className="flex wrap gap-5 pt-10 pl-20">
        {
            userPrompts.map(prompt => (
              <Link to={`/editprompt/${prompt._id}`} className="prompt-card-link" key={prompt._id}>
                <div className="prompts-card  bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
                  <div className="prompt-card-content p-4">
                    <h2 className="font-bold text-md mb-2 text-gray-700">{prompt.title}</h2>
                    <p className="text-gray-700 text-sm mb-4">{prompt.description.substring(0, 100)}...</p>
                   <div className='flex gap-10'> <p className="text-gray-900 font-semibold mb-2">Price: ₹{prompt.price}</p>
                   <p className="text-gray-600">Model: <span className="capitalize">{prompt.model}</span></p></div>
                  </div>
                  <button className="prompt-buy-button text-gray-900 py-2 px-4 rounded-b-lg w-full text-center">
                    Edit
                  </button>
                </div>
              </Link>
            ))
        }
      </div>
    </>
  );
};
export const DeletePrompt = () => {
  const { username } = useParams();
  const [userPrompts, setUserPrompts] = useState([]);
  const [deletedPrompts, setDeletedPrompts] = useState([]);
  const date = new Date().toISOString().slice(0, 10);
  useEffect(() => {
    axios.get(`http://localhost:5000/user/${username}/prompts`)
      .then(response => {
        setUserPrompts(response.data);
      })
      .catch(error => {
        console.error('Error fetching user prompts:', error);
      });
  
    axios.get(`http://localhost:5000/user/${username}/deleted-prompts`)
      .then(response => {
        setDeletedPrompts(response.data);
      })
      .catch(error => {
        console.error('Error fetching deleted prompts:', error);
      });
  }, [username]);
  
  const handleDeletePrompt = (promptId) => {
    axios.delete(`http://localhost:5000/prompt/${promptId}/delete`)
      .then(response => {
        const deletedPrompt = userPrompts.find(prompt => prompt._id === promptId);
        setUserPrompts(userPrompts.filter(prompt => prompt._id !== promptId));
        setDeletedPrompts([...deletedPrompts, deletedPrompt]);
        alert('Prompt moved to trash. Undo?');
        axios.post('http://localhost:5000/addActivity',{username:username,activity:"Deleted a prompt",date:Date.now()})
      })
      .catch(error => {
        console.error('Error deleting prompt:', error);
      });
  };
  
  const handleUndoDelete = (promptId) => {
    axios.put(`http://localhost:5000/prompt/${promptId}/restore`)
      .then(response => {
        const restoredPrompt = deletedPrompts.find(prompt => prompt._id === promptId);
        setDeletedPrompts(deletedPrompts.filter(prompt => prompt._id !== promptId));
        setUserPrompts([...userPrompts, restoredPrompt]);
        axios.post('http://localhost:5000/addActivity',{username:username,activity:"Restored a prompt"})
      })
      .catch(error => {
        console.error('Error restoring prompt:', error);
      });
  };
  
  const handlePermanentDelete = (promptId) => {
    axios.delete(`http://localhost:5000/prompt/${promptId}/permanently`)
      .then(response => {
        setDeletedPrompts(deletedPrompts.filter(prompt => prompt._id !== promptId));
        alert('Prompt permanently deleted');
        axios.post('http://localhost:5000/addActivity',{username,activity:"Deleted a prompt"},date)
      })
      .catch(error => {
        console.error('Error permanently deleting prompt:', error);
      });
  };
  return (
    <>
      <div className="pt-10 pl-20">
        <h1 className="font-bold text-4xl">Delete Prompt</h1>
        <p className="text-xs text-[rgb(161,161,169)] italic">
          Want to delete the prompt
        </p>
      </div>
      <div className="flex wrap gap-5 pt-10 pl-20">
        {userPrompts.map(prompt => (
          <div key={prompt._id}>
            <div className="prompts-card bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
              <div className="prompt-card-content p-4">
                <h2 className="font-bold text-md mb-2 text-gray-700">{prompt.title}</h2>
                <p className="text-gray-700 text-sm mb-4">{prompt.description.substring(0, 100)}...</p>
                <div className='flex gap-10'>
                  <p className="text-gray-900 font-semibold mb-2">Price: ₹{prompt.price}</p>
                  <p className="text-gray-600">Model: <span className="capitalize">{prompt.model}</span></p>
                </div>
              </div>
              <button
                className="prompt-buy-button text-gray-900 py-2 px-4 rounded-b-lg w-full text-center"
                onClick={() => handleDeletePrompt(prompt._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {deletedPrompts.length > 0 && (
        <div className="pt-10 pl-20 ">
          <h2 className="font-bold text-2xl">Recently Deleted Prompts</h2>
          <div className="flex overflow-x-auto gap-5"> {deletedPrompts.map(prompt => (
            <div key={prompt._id} className=" prompts-card bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl mb-4">
              <div className="prompt-card-content p-4">
                <h2 className="font-bold text-md mb-2 text-gray-700">{prompt.title}</h2>
                <p className="text-gray-700 text-sm mb-4">{prompt.description.substring(0, 100)}...</p>
                <div className='flex gap-10'>
                  <p className="text-gray-900 font-semibold mb-2">Price: ₹{prompt.price}</p>
                  <p className="text-gray-600">Model: <span className="capitalize">{prompt.model}</span></p>
                </div>
              </div>
              <div className="flex justify-between p-4">
                <button
                  className="prompts-buy-button text-gray-900 py-2 px-4 rounded-lg"
                  onClick={() => handleUndoDelete(prompt._id)}
                >
                  Undo
                </button>
                <button
                  className="prompts-buy-button text-red-900 py-2 px-4 rounded-lg"
                  onClick={() => handlePermanentDelete(prompt._id)}
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          ))}</div>
         
        </div>
      )}
    </>
  );
  
};

export const BuyPrompt = () => {
  const { username } = useParams(); // Get the username from URL params
  const [prompts, setPrompts] = useState([]);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');


  useEffect(() => {
    axios.get('http://localhost:5000/getPrompt')
      .then(result => {
        const data = result.data.filter(prompt => prompt.username !== username); // Exclude prompts by the user
        setPrompts(data);
        setFilteredPrompts(data);
      })
      .catch(err => console.log(err));
  }, [username]);

  useEffect(() => {
    let filtered = prompts;

    if (typeFilter) {
      filtered = filtered.filter(prompt => prompt.type === typeFilter);
    }

    if (categoryFilter) {
      filtered = filtered.filter(prompt => prompt.category === categoryFilter);
    }

    if (priceFilter) {
      filtered = filtered.filter(prompt => {
        const priceRange = priceFilter.split('-');
        const minPrice = parseFloat(priceRange[0]);
        const maxPrice = parseFloat(priceRange[1]);
        return prompt.price >= minPrice && prompt.price <= maxPrice;
      });
    }

    setFilteredPrompts(filtered);
  }, [typeFilter, categoryFilter, priceFilter, prompts]);

  const handleBuyClick = (promptUsername) => {
    // Save the prompt's username in localStorage
    localStorage.setItem('username', promptUsername);
    // You can also redirect the user to another page after saving the username if needed
  };

  const priceOptions = [
    { label: 'Price Range', value: '' },
    { label: '₹0 - ₹10', value: '0-10' },
    { label: '₹10 - ₹50', value: '10-50' },
    { label: '₹50+', value: '50-10000' },
  ];

  return (
    <>
      <div className="filter-container pt-20 pl-20">
        <h1 className="font-bold text-4xl">Buy Prompt.</h1>
        <p className="pt-2 text-xs text-[rgb(161,161,169)] italic">
          Unable to think of a prompt? No worries, buy a prompt!
        </p>
        <div className="filters pt-4 flex">
          <select
            className="bg-[rgb(57,57,84)] text-white p-2 rounded-md"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">Type</option>
            <option value="text">Text</option>
            <option value="image">Image</option>
          </select>
          <select
            className="bg-[rgb(57,57,84)] ml-10 text-white p-2 rounded-md"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Categories</option>
            <option value="Story">Story</option>
            <option value="Poetry">Poetry</option>
            <option value="Scene">Scene</option>
          </select>
          <select
            className="bg-[rgb(57,57,84)] ml-10 text-white p-2 rounded-md"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            {priceOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="prompt-container gap-4 pt-10 pl-20">
        {filteredPrompts.length > 0 ? (
          filteredPrompts.map((prompt, index) => (
            <Link key={index} to={{
              pathname: `/prompt/${prompt._id}`,
            }} className="prompt-card-link">
              <div className="prompt-card bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
                <div className="prompt-card-content p-4">
                  <h2 className="font-bold text-xl mb-2 text-gray-700">{prompt.title}</h2>
                  <p className="text-gray-700 text-base mb-4">{prompt.description.substring(0, 100)}...</p>
                  <p className="text-gray-900 font-semibold mb-2">Price: ₹{prompt.price}</p>
                  <p className="text-gray-600">Created by: <span className="capitalize">{prompt.username}</span></p>
                </div>
                <button 
                  onClick={() => handleBuyClick(username)} // Add onClick to handle the buy action
                  className="prompt-buy-button text-gray-900 py-2 px-4 rounded-b-lg w-full text-center ">
                  Buy Now
                </button>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-600">No prompts available</p>
        )}
      </div>
    </>
  );
};
