import React from "react";
import logo from "../assets/logo.png";
import searchIcon from "../assets/searchIcon.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between mt-5 bg-[] border-b border-slate-700">
        <div className="mb-2 cursor-pointer">
          <p className="inline-flex ml-8">
            <img src={logo} width={55} alt="logo" />
            <span className="ml-3 mt-3 text-3xl font-bold">CueAI</span>
          </p>
        </div>
        <div className="w-full max-w-sm">
          <div className="mt-3">
            <form className="relative flex items-centers justify-center">
              <input
                type="text"
                id="search"
                placeholder="Enter your search here"
                className="rounded-l-full bg-[rgb(69,69,102)] w-full pl-4 text-xs sm:text-sm text-white text-md relative"
              />
              <div className="absolute top-[50%] right-[60px] transform -translate-y-1/2 h-[50%] border-r border-slate-500"></div>
              <button className="shadow-transparent bg-transparent rounded-[50%] active:scale-95 cursor-pointer">
                <h2 className="bg-[rgb(69,69,102)] w-16 h-10 text-sm text-center justify-center rounded-r-full flex items-center font-semibold">
                  <img src={searchIcon} width={20} alt="search" />
                </h2>
              </button>
            </form>
          </div>
        </div>
        <div className="flex mr-6 cursor-pointer font-bold text-center text-xl mt-3">
          <div className="mr-20 ml-[-20px]">
            <Link to={'/login'}>
              <p>Login</p>
            </Link>
          </div>
          <div className="mr-20 ml-[-20px]">
            <Link to={'/signup'}>
              <p>Signup</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
