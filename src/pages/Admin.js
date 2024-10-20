import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import {UserAnalytics,PromptsAnalytics} from '../components/Analytics'
import SalesAnalytics from '../components/SalesAnalytics'

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('userAnalytics');
  const underlineRef = useRef(null);

  useEffect(() => {
    const activeButton = document.querySelector('.active-button');
    if (activeButton && underlineRef.current) {
      const { offsetLeft, offsetWidth } = activeButton;
      underlineRef.current.style.width = `${offsetWidth}px`;
      underlineRef.current.style.left = `${offsetLeft - 15}px`; 
    }
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderAnalyticsComponent = () => {
    switch (activeTab) {
      case 'promptsAnalytics':
        return <PromptsAnalytics />;
      case 'salesAnalytics':
        return <SalesAnalytics />;
      case 'userAnalytics':
      default:
        return <UserAnalytics />;
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="pt-10 pl-20">
          <h1 className="font-bold text-4xl">Admin Dashboard</h1>
          <p className="text-xs  text-[rgb(161,161,169)] italic">Cue Ai dashboard</p>
        </div>
        <div className="mt-4 ml-20">
          <button
            onClick={() => navigate('/admin/approvePrompt')}
            className="bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] text-slate-900 py-2 px-4 rounded"
          >
            Approve Prompts
          </button>
          <button
            onClick={() => navigate('/admin/managePrompts')}
            className="ml-5 bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] text-slate-900 py-2 px-4 rounded"
          >
            Manage Prompts
          </button>
          
          <div className="flex justify-center align-center mt-5 space-x-4 relative">
            <button
              onClick={() => handleTabClick('userAnalytics')}
              className={`text-2xl font-bold py-2 px-4 rounded transition duration-300 relative ${activeTab === 'userAnalytics' ? 'active-button' : ''}`}
            >
              User Analytics
            </button>
            <button
              onClick={() => handleTabClick('promptsAnalytics')}
              className={`text-2xl font-bold py-2 px-4 rounded transition duration-300 relative ${activeTab === 'promptsAnalytics' ? 'active-button' : ''}`}
            >
              Prompts Analytics
            </button>
            <button
              onClick={() => handleTabClick('salesAnalytics')}
              className={`text-2xl font-bold py-2 px-4 rounded transition duration-300 relative ${activeTab === 'salesAnalytics' ? 'active-button' : ''}`}
            >
              Sales Analytics
            </button>
            <div ref={underlineRef} className="underline"></div>
          </div>
        </div>
        <div className="mt-2">
          {/* Render the selected analytics component */}
          {renderAnalyticsComponent()}
        </div>
      </div>
      <style jsx>{`
        .underline {
          position: absolute;
          bottom: -2px;
          height: 4px;
          background: linear-gradient(90deg, #dbca90, #d68586);
          transition: width 0.3s ease, left 0.3s ease;
        }
      `}</style>
    </>
  );
};

export default AdminPage;
