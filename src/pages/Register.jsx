
import React from 'react';
import Header from '../components/layout/Header';
const Register = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col ">
      {/* Header */}
      <Header />
      {/* Main content */}
      <div className="flex-1 flex w-full p-10 mx-auto px-4 py-12 gap-16 px-40">
        {/* Left image */}
        <div className="relative flex-1 flex items-center justify-between">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-[#82c7dc] rounded-full opacity-80 -translate-x-1/2 -translate-y-1/2 z-0"></div>
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#3498ac] rounded-full opacity-90 -translate-x-1/2 -translate-y-1/2 z-0"></div>
          <img
            src="https://i.pinimg.com/736x/77/68/d1/7768d10aada994c916957d935a3e192e.jpg"
            alt="Person"
            className="relative z-10 object-cover w-[350px] h-[350px] rounded-full"
          />

        </div>
        {/* Right form */}
        <div className="flex-1 max-w-md">
          <h2 className="text-black text-2xl font-bold mb-6">Đăng ký và bắt đầu học</h2>
          {/* Google login */}
          <button className="w-full bg-white text-gray-700 py-2 rounded-full mb-3 flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-100 transition">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.62 2.38 30.15 0 24 0 14.6 0 6.44 5.3 2.54 13l7.98 6.19C12.5 13.47 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.62-.15-3.18-.43-4.68H24v9.05h12.7c-.55 2.96-2.16 5.47-4.6 7.15l7.14 5.55C43.68 37.57 46.5 31.57 46.5 24.5z"/>
            <path fill="#FBBC05" d="M10.52 28.19c-.48-1.44-.74-2.97-.74-4.54s.26-3.1.74-4.54L2.54 13C.93 16.19 0 19.94 0 24s.93 7.81 2.54 11l7.98-6.81z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.9-2.13 15.87-5.8l-7.14-5.55c-2.02 1.37-4.61 2.15-8.73 2.15-6.26 0-11.5-3.97-13.48-9.69l-7.98 6.81C6.44 42.7 14.6 48 24 48z"/>
          </svg>
          Đăng ký qua Google
        </button>


          {/* Facebook login */}
          <button className="w-full bg-blue-700 text-white py-2 rounded-full mb-3 flex items-center justify-center gap-3 hover:bg-blue-800 transition">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22 12.07c0-5.52-4.48-10-10-10S2 6.55 2 12.07c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54v-2.21c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.89h-2.34v6.99C18.34 21.2 22 17.05 22 12.07z" />
            </svg>
            Đăng ký qua Facebook
          </button>
          {/* Apple login */}
          <button className="w-full bg-[#000814] text-white py-2 rounded-full mb-8 flex items-center justify-center gap-3 hover:bg-[#0b0f1c] transition">
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M16.365 1.43a4.017 4.017 0 0 0-3.46 2.14c-.74 1.27-.52 3.12.52 4.35.52.7 1.3 1.2 2.05 1.2.1 0 .15-.01.2-.03a4.042 4.042 0 0 0-1.28-7.62zM21.59 17.37c-.84 2.2-3.14 6.8-6.44 6.8-2.66 0-3.5-1.7-6.44-1.7-3.05 0-4.14 1.66-6.44 1.7-2.75.06-5.29-2.6-5.84-6.45-.11-.73-.18-1.43-.04-2.16.9-5.19 5.86-9.09 11.42-9.09 3.07 0 5.52 1.37 6.8 1.37 2.07 0 4.14-1.3 6.44-1.3.11 0-.15 0-.34.28-1.9 2.3-3.44 6.2-1.6 10.35z" />
            </svg>
            Đăng ký với Apple
          </button>
          {/* Or text */}
          <p className="text-center mb-6 text-gray-700">Hoặc đăng ký bằng email</p>
          {/* Form */}
          <form>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              placeholder="linh@memrise.com"
              className="w-full mb-4 p-3 border border-black rounded-lg text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <label className="block mb-1 font-semibold">Mật khẩu</label>
            <input
              type="password"
              placeholder="********"
              className="w-full mb-4 p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <div className="mb-6 font-semibold">
              Hãy đảm bảo mật khẩu của bạn:
              <ul className="list-disc pl-5 font-normal mt-2">
                <li>có ít nhất 6 ký tự</li>
                <li>không có dấu cách</li>
              </ul>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-xl cursor-not-allowed select-none"
              disabled
            >
              Đăng ký miễn phí
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;