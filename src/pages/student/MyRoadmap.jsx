import React, { useState } from 'react';
import { ChevronDown, Play, Clock, Users, Star, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LearningRoadmap = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState('level1');
  
  const levels = [
    { id: 'level1', name: 'Cấp độ 1', color: 'text-green-400' },
    { id: 'level2', name: 'Cấp độ 2', color: 'text-yellow-400' },
    { id: 'level3', name: 'Cấp độ 3', color: 'text-orange-400' },
    { id: 'level4', name: 'Cấp độ 4', color: 'text-red-400' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        {/* Mountain silhouettes */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 400" className="w-full h-64">
            <path d="M0,400 L0,200 L200,100 L400,160 L600,80 L800,140 L1000,60 L1200,120 L1200,400 Z" 
                  fill="url(#mountain-gradient)" />
            <defs>
              <linearGradient id="mountain-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-10 w-8 h-8 bg-yellow-300 rounded-full opacity-30"></div>
        <div className="absolute bottom-40 right-40 w-12 h-12 bg-yellow-500 rounded-full opacity-15"></div>
        
        {/* Pagoda silhouette */}
        <div className="absolute bottom-10 right-10">
          <svg width="80" height="120" viewBox="0 0 80 120" className="fill-yellow-400 opacity-20">
            <polygon points="40,0 50,20 30,20" />
            <rect x="35" y="15" width="10" height="10" />
            <polygon points="40,25 55,40 25,40" />
            <rect x="30" y="35" width="20" height="10" />
            <polygon points="40,45 60,60 20,60" />
            <rect x="25" y="55" width="30" height="15" />
            <polygon points="40,70 65,85 15,85" />
            <rect x="20" y="80" width="40" height="40" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black bg-opacity-50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-yellow-400">TOPIK Learning</h1>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-300">
                <Clock size={16} className="inline mr-1" />
                Cập nhật: 13/09/2025
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Character */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Character Container */}
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-400 rounded-full"></div>
                  <div className="absolute bottom-6 right-6 w-6 h-6 bg-yellow-500 rounded-full"></div>
                  <div className="absolute top-1/2 right-8 w-4 h-4 bg-yellow-300 rounded-full"></div>
                </div>
                
                {/* Mascot Character */}
                <div className="relative z-10 text-center">
                  <div className="text-8xl mb-4 animate-bounce">🧙‍♂️</div>
                  <div className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold mb-2">
                    TOPIK Master
                  </div>
                  <div className="text-gray-700 text-sm">
                    Hướng dẫn viên AI
                  </div>
                </div>
                
                {/* Floating books */}
                <div className="absolute top-8 right-8 text-2xl animate-pulse">📚</div>
                <div className="absolute bottom-8 left-8 text-2xl animate-pulse delay-500">✨</div>
              </div>
              
              {/* Progress indicator dots */}
              <div className="flex justify-center mt-6 space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                Cấu trúc Lộ trình
              </h2>
              
              <div className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Lộ trình được chia nhỏ thành <span className="text-yellow-400 font-semibold">từng dạng bài</span> đang có trong đề thi TOPIK hiện hành.
                </p>
                
                <p className="leading-relaxed">
                  Mỗi dạng bài sẽ có <span className="text-yellow-400 font-semibold">1 mục tiêu điểm</span> được các giáo viên đặt ra. 
                  Để đạt điểm đó TOPIK, các bạn được khuyến rằng nên đạt các điểm mục tiêu này.
                </p>
              </div>
            </div>

            {/* Learning Stats */}
            <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">
                📊 Hãy cùng nhau chinh phục TOPIK nhé!
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">8 phút</div>
                  <div className="text-sm text-gray-400">Thời gian</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">8 câu</div>
                  <div className="text-sm text-gray-400">Số câu</div>
                </div>
              </div>

              {/* Level Selection */}
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-3">Chọn cấp độ để bắt đầu</label>
                <div className="relative">
                  <select 
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 appearance-none cursor-pointer"
                  >
                    {levels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>

              {/* Start Button */}
              <button 
                onClick={() => navigate('/student/topik/TestForm', {
                  state: { testType: 'roadmap' }
                })}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                <Play className="inline mr-2" size={20} />
                Bắt đầu ngay
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningRoadmap;