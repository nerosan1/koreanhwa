import React from 'react';

const Footer = () => {
  return (
      <footer className="bg-black text-white py-12 pt-10 z-">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl font-bold">KoreanHwa</span>
              </div>
              <p className="text-gray-400 mb-6">
                Vietnam's leading online Korean learning platform.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-black">Courses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-black">Lessons</a></li>
                <li><a href="#" className="text-gray-400 hover:text-black">Achievements</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-black">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-black">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-black">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-black">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-black">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-black">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 KoreanHwa. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;