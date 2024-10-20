import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ApprovePrompt = () => {
  const [pendingPrompts, setPendingPrompts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/admin/pendingPrompts')
      .then(result => {
        setPendingPrompts(result.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const approvePrompt = (id) => {
    axios.post(`http://localhost:5000/admin/approved/${id}`)
      .then(result => {
        alert("Prompt approved");
        setPendingPrompts(pendingPrompts.filter(prompt => prompt._id !== id));
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="pt-10 pl-20">
        <h1 className="font-bold text-4xl">Approve Prompts</h1>
        <p className="text-xs text-[rgb(161,161,169)] italic">
          Check the prompts and approve them
        </p>
      </div>
      <div>
        {pendingPrompts.length === 0 ? (
          <p>No prompts awaiting approval.</p>
        ) : (
          <div className="flex wrap gap-5 pt-10 pl-20">
            {pendingPrompts.map(prompt => (
              <div className="prompt-card-link" key={prompt._id}>
                <div className="prompts-card bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
                  <div className="prompt-card-content p-4">
                    <h2 className="font-bold text-md mb-2 text-gray-700">{prompt.title}</h2>
                    <p className="text-gray-700 text-sm mb-4">{prompt.description.substring(0, 100)}...</p>
                    <div className='flex gap-10'>
                      <p className="text-gray-900 font-semibold mb-2">Price: ₹{prompt.price}</p>
                      <p className="text-gray-600">Model: <span className="capitalize">{prompt.model}</span></p>
                    </div>
                  </div>
                  <button onClick={() => approvePrompt(prompt._id)} className="prompt-buy-button text-gray-900 py-2 px-4 rounded-b-lg w-full text-center">
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default ApprovePrompt;
