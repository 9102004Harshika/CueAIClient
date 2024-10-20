import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
  const { promptId } = useParams();
  const navigate = useNavigate();
  const [type, setType] = useState('');
  const [categories, setCategories] = useState([]);
  const [models, setModels] = useState([]);
  const date = new Date().toISOString().slice(0, 10);
  const [promptFile, setPromptFile] = useState(null); // Track uploaded file
  const [promptData, setPromptData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    price: '',
    model: '',
    exampleInput: '',
    exampleOutput: ''
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
  
  useEffect(() => {
    // Fetch the prompt data when the component mounts
    axios.get(`http://localhost:5000/prompt/${promptId}`)
      .then(response => {
        setPromptData(response.data);
        setType(response.data.type);
      })
      .catch(error => {
        console.error('Error fetching prompt data:', error);
      });
  }, [promptId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromptData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setPromptFile(e.target.files[0]); // Track the selected file
  };

  const handleSaveClick = () => {
    const formData = new FormData();
    
    // Append form fields
    formData.append('title', promptData.title);
    formData.append('description', promptData.description);
    formData.append('category', promptData.category);
    formData.append('type', promptData.type);
    formData.append('price', promptData.price);
    formData.append('model', promptData.model);
    formData.append('exampleInput', promptData.exampleInput);
    formData.append('exampleOutput', promptData.exampleOutput);
    
    // Append the .docx file if one was uploaded
    if (promptFile) {
      formData.append('promptFile', promptFile);
    }

    axios.post(`http://localhost:5000/prompt/${promptId}/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        alert('Prompt edited successfully!!');
        axios.post('http://localhost:5000/addActivity', {
          username: response.data.username,
          activity: "Edited a prompt",
          date,
        });
        navigate(`/${response.data.username}`);
      })
      .catch(error => {
        console.error('Error updating prompt data:', error);
      });
  };

  return (
    <>
      <div className="pt-10 pl-20">
        <h1 className="font-bold text-4xl">Edit Prompt.</h1>
        <p className="text-xs text-[rgb(161,161,169)] italic">
          Want to make changes in prompt
        </p>
      </div>
      <div className="pl-20 pt-10 pt-8 pl-20 pr-20">
        <div className="bg-[rgb(57,57,84)] rounded-lg p-10">
          <form>
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
                  placeholder="The Reluctant Hero"
                  value={promptData.description}
                  onChange={handleChange}
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
              <div>
                <p className="font-bold text-md">Category</p>
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
            </div>
            <div className="flex gap-10 pt-10">
              <div>
                <p className="font-bold text-md">Price</p>
                <input
                  className="border border-white p-2 rounded-md w-[250px] mt-2 bg-[#222236]"
                  name="price"
                  type="text"
                  placeholder="Price here"
                  value={promptData.price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p className="font-bold text-md">Model</p>
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
              <div>
                <p className="font-bold text-md">Prompt (.docx)</p>
                <input
                  className="border border-white p-2 rounded-md w-[250px] mt-2 bg-[#222236]"
                  name="promptFile"
                  type="file"
                  accept=".docx"
                  onChange={handleFileChange}
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
            </div>
            <div className='flex gap-10 pt-5'>
              <div>
                <p className="font-bold text-md">Example Output</p>
                <input
                  className="border border-white p-2 rounded-md w-[250px] mt-2 bg-[#222236]"
                  name="exampleOutput"
                  type="text"
                  placeholder="Example Output here..."
                  value={promptData.exampleOutput}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              className="bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] text-slate-900 mt-4 rounded-md  p-2"
              type="button"
              onClick={handleSaveClick}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
