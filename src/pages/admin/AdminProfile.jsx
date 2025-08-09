import React from 'react';
import { User, Shield, Settings, BarChart3, Users, BookOpen } from 'lucide-react';

const AdminProfile = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Hồ sơ Admin
        </h1>
      </div>
      
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-blue-50 p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative z-10 text-center">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Shield className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin KoreanHwa</h2>
          <p className="text-gray-600 mb-6">Quản trị viên hệ thống</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-center space-x-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <Users className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-800">1,234</p>
                <p className="text-sm text-gray-600">Tổng người dùng</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <BookOpen className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-800">567</p>
                <p className="text-sm text-gray-600">Tổng bài học</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-gray-800">45</p>
                <p className="text-sm text-gray-600">Báo cáo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile; 