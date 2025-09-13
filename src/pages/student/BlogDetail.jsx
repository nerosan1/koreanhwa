import React from 'react';
import { 
  ArrowLeft,
  Award,
  FileText, 
  Edit, 
  Trash, 
  Eye, 
  Plus, 
  Search, 
  Filter, 
  User,
  Calendar,
  Tag
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlogPost = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white ">
      <div className=" mx-auto">
        <div onClick={() => navigate(-1)} className="flex items-center justify-between  border-b border-gray-900 p-4 mb-10">
          <div className="flex items-center gap-3">
            <ArrowLeft 
              className="w-6 h-6  cursor-pointer" 
            />
            <span className="text-lg font-medium">Quay lại</span>
          </div>
      </div>
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 font-serif">
            "Nhớ khi nao lúc ra đi..."
          </h1>
          <div className="text-sm text-gray-600 uppercase tracking-wide">
            <span>PUBLISHED </span>
            <span className="text-yellow-600 font-semibold">NOVEMBER 12, 2018</span>
            <span> BY </span>
            <span className="text-yellow-600 font-semibold">RIO LAM</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12 p-10 flex items-center justify-center">
          <div className="w-full max-w-[1000px] h-96 md:h-[500px] bg-gradient-to-b from-amber-100 to-yellow-200 rounded-lg shadow-2xl overflow-hidden">
            <div className="w-full h-full bg-black bg-opacity-20 flex items-center justify-center relative">
              {/* Simulated outdoor dining area */}
              <div className="relative w-full h-[400px] overflow-hidden">
                {/* Ảnh nền */}
                <img
                    src="/src/assets/login.png"
                    alt="Ảnh nền"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900 via-yellow-800 to-amber-700 opacity-80"></div>

                {/* Nội dung trên ảnh + overlay */}
                <div className="relative z-10 text-white p-6">
                    <h1 className="text-3xl font-bold">Nhớ khi nào lúc ra đi</h1>
                    <p className="mt-2">hehe </p>
                </div>
                </div>

              
              {/* Tables and chairs silhouettes */}
              <div className="relative z-10 flex items-center justify-center space-x-8">
                <div className="w-16 h-16 bg-black opacity-60 rounded-full"></div>
                <div className="w-12 h-20 bg-black opacity-60 rounded"></div>
                <div className="w-16 h-16 bg-black opacity-60 rounded-full"></div>
                <div className="w-12 h-20 bg-black opacity-60 rounded"></div>
              </div>
              
              {/* Railing effect */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-black opacity-40"></div>
              <div className="absolute bottom-12 left-0 right-0 h-1 bg-yellow-200 opacity-60"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-lg max-w-none flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 border-l-4 border-yellow-500">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Đã thành lệ hàng năm, cứ đến tháng 11 là mình sẽ đem lòng nhớ Tết.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Tối hôm qua Gấu béo chở mình đi bắt phở, mình làm nhắm hát đoạn mình thích nhất trong 
              bài Xuân Họp Mặt.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8 rounded-r-lg">
              <div className="italic text-gray-800 space-y-2">
                <p>"Vui mừa xuân năm nay gặp nhau</p>
                <p className="text-yellow-700 font-semibold">Nhớ khi nao lúc ra đi</p>
                <p>Cầm tay hen câu chờ nhau</p>
                <p>Đêm dài sao chẳng về..."</p>
              </div>
            </div>
          </div>
        </article>

        {/* Decorative elements */}
        <div className="mt-16 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"></div>
        </div>

        {/* Footer decoration */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-yellow-600">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;