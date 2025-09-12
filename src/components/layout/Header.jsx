import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogIn } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const Header = () => {
   function Navbar() {
    const [activeLink, setActiveLink] = useState(null);
  
    const handleClick = (link) => {
      setActiveLink(link);
    };
  
    return (
      <nav className="flex space-x-8 items-center text-sm font-medium text-gray-900">
        <a
          href="#"
          className={`text-white font-bold relative pb-2 border-b-2 p-3 border-transparent hover:border-yellow-400 transition ${activeLink === 'home' ? 'border-yellow-400' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleClick('home');
          }}
        >
          Home
          {activeLink === 'home' && (
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-400 mt-2 rounded-md"></span>
          )}
        </a>
        <a
          href="#"
          className={`text-white font-bold relative pb-2 border-b-2 p-3 border-transparent hover:border-yellow-400 transition ${activeLink === 'courses' ? 'border-yellow-400' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleClick('courses');
          }}
        >
          Courses
          {activeLink === 'courses' && (
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-400 mt-2 rounded-md"></span>
          )}
        </a>
        <a
          href="#"
          className={`text-white font-bold relative pb-2 border-b-2 p-3 border-transparent hover:border-yellow-400 transition ${activeLink === 'about' ? 'border-yellow-400' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleClick('about');
          }}
        >
          About us
          {activeLink === 'about' && (
            <span className="text-white font-bold absolute left-0 bottom-0 w-full h-0.5 bg-yellow-400 mt-2 rounded-md"></span>
          )}
        </a>
      </nav>
    );
  }
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };

  return (
          <header className="bg-black border-b border-gray-200 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-yellow-500">KoreanHwa</span>
            </div>
            
            <div className='flex items-center justify-center space-x-6'>
              <Navbar />
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleLoginClick}
                  className="text-white font-bold hover:text-yellow-600 px-3 py-2 rounded-md text-sm "
                >
                  Login
                </button>
                <button 
                  onClick={handleSignUpClick}
                  className="bg-yellow-500 text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-600"
                >
                  Sign Up
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>
  );
};

export default Header; 