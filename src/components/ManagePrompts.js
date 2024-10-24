import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagePrompts = () => {
  const [prompts, setPrompts] = useState([]);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [editPrompt, setEditPrompt] = useState(null);
  const [typeFilter, setTypeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [usernameFilter, setUsernameFilter] = useState('');
  const date = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      const response = await axios.get('https://cueaiserver-1.onrender.com/getPrompts');
      setPrompts(response.data);
      setFilteredPrompts(response.data);
    } catch (error) {
      console.error('Error fetching prompts:', error);
    }
  };

  useEffect(() => {
    let filtered = prompts;

    if (typeFilter) {
      filtered = filtered.filter(prompt => prompt.type === typeFilter);
    }

    if (categoryFilter) {
      filtered = filtered.filter(prompt => prompt.category === categoryFilter);
    }

    if (usernameFilter) {
      filtered = filtered.filter(prompt => prompt.username === usernameFilter);
    }

    setFilteredPrompts(filtered);
  }, [typeFilter, categoryFilter, usernameFilter, prompts]);

  const getUniqueValues = (data, key) => {
    return [...new Set(data.map(item => item[key]))];
  };

  const handleUpdate = async (id) => {
    try {
      await axios.post(`https://cueaiserver-1.onrender.com/prompt/${id}/update`, editPrompt);
      setEditPrompt(null);
      fetchPrompts();
    } catch (error) {
      console.error('Error updating prompt:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const prompt = prompts.find(prompt => prompt._id === id);
      await axios.delete(`https://cueaiserver-1.onrender.com/prompt/${id}/delete`);
      setPrompts(prompts.map(prompt => prompt._id === id ? { ...prompt, deleted: true } : prompt));
      axios.post('https://cueaiserver-1.onrender.com/addActivity', { username: prompt.username, activity: "Moved prompt to trash" }, date);
    } catch (error) {
      console.error('Error deleting prompt:', error);
    }
  };

  const handleRestore = async (id) => {
    try {
      const prompt = prompts.find(prompt => prompt._id === id);
      await axios.put(`https://cueaiserver-1.onrender.com/prompt/${id}/restore`);
      setPrompts(prompts.map(prompt => prompt._id === id ? { ...prompt, deleted: false } : prompt));
      axios.post('https://cueaiserver-1.onrender.com/addActivity', { username: prompt.username, activity: "Restored a prompt" }, date);
    } catch (error) {
      console.error('Error restoring prompt:', error);
    }
  };

  const handlePermanentDelete = async (id) => {
    try {
      await axios.delete(`https://cueaiserver-1.onrender.com/prompt/${id}/permanently`);
      setPrompts(prompts.filter(prompt => prompt._id !== id));
      axios.post('https://cueaiserver-1.onrender.com/addActivity', { username: id, activity: "Permanently deleted a prompt" }, date);
    } catch (error) {
      console.error('Error permanently deleting prompt:', error);
    }
  };

  const typeOptions = getUniqueValues(prompts, 'type');
  const categoryOptions = getUniqueValues(prompts, 'category');
  const usernameOptions = getUniqueValues(prompts, 'username');

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="pt-10 pl-20">
        <h1 className="font-bold text-4xl">Manage Prompts</h1>
        <p className="text-xs text-[rgb(161,161,169)] italic">Manage all prompts</p>
      </div>

      {/* Filter Section */}
      <div className="filters pt-4 flex pl-20">
        <select
          className="bg-[rgb(57,57,84)] text-white p-2 rounded-md"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">Type</option>
          {typeOptions.map((type, index) => (
            <option key={index} value={type} className="capitalize">
              {type}
            </option>
          ))}
        </select>
        <select
          className="bg-[rgb(57,57,84)] ml-10 text-white p-2 rounded-md"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Categories</option>
          {categoryOptions.map((category, index) => (
            <option key={index} value={category} className="capitalize">
              {category}
            </option>
          ))}
        </select>
        <select
          className="bg-[rgb(57,57,84)] ml-10 text-white p-2 rounded-md"
          value={usernameFilter}
          onChange={(e) => setUsernameFilter(e.target.value)}
        >
          <option value="">Username</option>
          {usernameOptions.map((username, index) => (
            <option key={index} value={username} className="capitalize">
              {username}
            </option>
          ))}
        </select>
      </div>

      {/* Prompt Table */}
      <div className="mt-10 bg-[rgb(57,57,84)] w-full">
        <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-[rgb(57,57,84)]">
            <tr>
              <th className="p-4 text-left border border-gray-300">Title</th>
              <th className="p-4 text-left border border-gray-300">Description</th>
              <th className="p-4 text-left border border-gray-300">Type</th>
              <th className="p-4 text-left border border-gray-300">Category</th>
              <th className="p-4 text-left border border-gray-300">Price</th>
              <th className="p-4 text-left border border-gray-300">Created By</th>
              <th className="p-4 text-left border border-gray-300">Created At</th>
              <th className="p-4 text-left border border-gray-300">Model</th>
              <th className="p-4 text-left border border-gray-300">Prompts</th>
              <th className="p-4 text-left border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrompts.map((prompt) => (
              <tr key={prompt._id} className="hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200">
                <td className="p-4 border border-gray-200">{prompt.title}</td>
                <td className="p-2 border border-gray-200">{prompt.description.substring(0, 50)}...</td>
                <td className="p-4 border border-gray-200 capitalize">{prompt.type}</td>
                <td className="p-4 border border-gray-200">{prompt.category}</td>
                <td className="p-4 border border-gray-200">{prompt.price}</td>
                <td className="p-4 border border-gray-200 capitalize">{prompt.username}</td>
                <td className="p-4 border border-gray-200">{new Date(prompt.createdAt).toDateString()}</td>
                <td className="p-4 border border-gray-200">{prompt.model}</td>
                  {/* Provide a download link or button for the Word file */}
      <td className="p-4 border border-gray-200">
        {prompt.prompt ? (
          <a
            href={prompt.prompt} // Assuming this is a file URL; adjust as needed
            download
            className="text-blue-500 underline"
          >
            Download Word File
          </a>
        ) : (
          'No File Available'
        )}
      </td>

                <td className="p-4 border border-gray-200">
                  {prompt.deleted ? (
                    <>
                      <button
                        onClick={() => handleRestore(prompt._id)}
                        className="ml-5 bg-gradient-to-r from-green-600 to-green-400 text-white px-4 py-2 rounded-md"
                      >
                        Restore
                      </button>
                      <button
                        onClick={() => handlePermanentDelete(prompt._id)}
                        className="ml-5 bg-gradient-to-r from-red-600 to-red-400 text-white px-4 py-2 rounded-md"
                      >
                        Permanently Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditPrompt(prompt)}
                        className="ml-5 bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(251,177,64)] text-white px-4 py-2 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(prompt._id)}
                        className="ml-5 bg-gradient-to-r from-red-600 to-red-400 text-white px-4 py-2 rounded-md"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-full max-w-lg">
            <h2 className="text-2xl mb-4">Edit Prompt</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editPrompt._id);
              }}
            >
              <div className="mb-4">
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={editPrompt.title}
                  onChange={(e) => setEditPrompt({ ...editPrompt, title: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Description</label>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={editPrompt.description}
                  onChange={(e) => setEditPrompt({ ...editPrompt, description: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Type</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={editPrompt.type}
                  onChange={(e) => setEditPrompt({ ...editPrompt, type: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Category</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={editPrompt.category}
                  onChange={(e) => setEditPrompt({ ...editPrompt, category: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Price</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={editPrompt.price}
                  onChange={(e) => setEditPrompt({ ...editPrompt, price: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Model</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={editPrompt.model}
                  onChange={(e) => setEditPrompt({ ...editPrompt, model: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Prompt</label>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={editPrompt.prompt}
                  onChange={(e) => setEditPrompt({ ...editPrompt, prompt: e.target.value })}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={() => setEditPrompt(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePrompts;
