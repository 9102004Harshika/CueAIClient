import React, { useState } from "react";
import axios from "axios";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [issue, setIssue] = useState({ name: '', email: '', message: '' });

  const faqs = [
    {
      question: "What is CueAI?",
      answer: "CueAI is a prompt marketplace where users can create, buy, and sell prompts for various AI models."
    },
    {
      question: "How do I create a new prompt?",
      answer: "You can create a new prompt by navigating to the 'Create Prompt' section in your profile."
    },
    {
      question: "What is the pricing model for prompts?",
      answer: "Prompt creators can set their own pricing. Buyers can purchase prompts based on their listed prices."
    },
    // Add more FAQ entries as needed
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIssue({ ...issue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send issue to backend
    try {
      const response = await axios.post("http://localhost:5000/submitIssue", issue); // Make sure the backend is set up to handle this
      alert(`Thank you for submitting your issue! Your ticket ID is sent to your email. We will get back to you shortly.`)

    } catch (error) {
      alert('There was a problem submitting your issue.');
    }
  };

  return (
    <div className="p-10">
      {/* FAQ Section */}
      <h2 className="text-3xl font-bold mb-5">Frequently Asked Questions (FAQ)</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-[rgb(69,69,102)] p-4 rounded-lg shadow-md">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left text-lg font-semibold"
            >
              {faq.question}
            </button>
            {activeIndex === index && (
              <p className="mt-2 text-base">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* New Issue/Query Submission Form */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Submit a New Issue</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-20">
            <div><label className="block text-lg">Name</label>
            <input
              type="text"
              name="name"
              value={issue.name}
              onChange={handleInputChange}
              required
              className="w-[200px] p-2 text-gray-900 border border-gray-300 rounded"
            /></div>


<div>
            <label className="block text-lg">Email</label>
            <input
              type="email"
              name="email"
              value={issue.email}
              onChange={handleInputChange}
              required
              className="w-[300px] p-2 border text-gray-900 border-gray-300 rounded"
            />
          </div>
          </div>
         
          <div>
            <label className="block text-lg">Issue/Query</label>
            <textarea
              name="message"
              value={issue.message}
              onChange={handleInputChange}
              required
              className="w-[700px] h-[200px] text-gray-900 p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <button type="submit" className="bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] text-slate-900 px-4 py-2 rounded">
            Submit Issue
          </button>
        </form>

       
      </div>
    </div>
  );
};

export default FAQ;
