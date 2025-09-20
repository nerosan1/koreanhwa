import React from 'react';
import { Users, BookOpen, FileText, BarChart3, TrendingUp, Calendar, Settings, Shield } from 'lucide-react';
import { POINT_SYSTEM, getStudentLevel } from '../../utils/pointSystem';

const AdminDashboard = () => {
  const stats = [
    { 
      name: 'Tổng người dùng', 
      value: '1,234', 
      change: '+15%', 
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      details: [
        { label: 'Sơ cấp', count: 456, percentage: 37 },
        { label: 'Trung cấp', count: 523, percentage: 42 },
        { label: 'Cao cấp', count: 255, percentage: 21 }
      ]
    },
    { 
      name: 'Tổng bài học', 
      value: '567', 
      change: '+8%', 
      changeType: 'positive',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      details: [
        { label: 'Miễn phí', count: 123, percentage: 22 },
        { label: 'Trả phí', count: 444, percentage: 78 }
      ]
    },
    { 
      name: 'Tài liệu', 
      value: '890', 
      change: '+12%', 
      changeType: 'positive',
      icon: FileText,
      color: 'from-purple-500 to-pink-500',
      details: [
        { label: 'Video', count: 234, percentage: 26 },
        { label: 'Từ vựng', count: 345, percentage: 39 },
        { label: 'Ngữ pháp', count: 189, percentage: 21 },
        { label: 'Bài tập', count: 122, percentage: 14 }
      ]
    },
    { 
      name: 'Tổng điểm đã trao', 
      value: '45,678', 
      change: '+23%', 
      changeType: 'positive',
      icon: BarChart3,
      color: 'from-orange-500 to-red-500',
      details: [
        { label: 'Tuần này', count: 2340, percentage: 5 },
        { label: 'Tháng này', count: 12340, percentage: 27 },
        { label: 'Tổng cộng', count: 45678, percentage: 100 }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-700">Quản trị hệ thống</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-blue-50 p-6 shadow-xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.name}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <TrendingUp className={`w-4 h-4 ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={`text-sm font-semibold ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500">so với tháng trước</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-blue-50 p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative z-10 text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Quản trị hệ thống KoreanHwa
          </h2>
          <p className="text-gray-600 mb-6">Chào mừng đến với trang quản trị hệ thống</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Quản lý người dùng</h3>
              <p className="text-sm text-gray-600">Quản lý học viên, giáo viên và admin</p>
            </div>
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Quản lý nội dung</h3>
              <p className="text-sm text-gray-600">Quản lý bài học, tài liệu và khóa học</p>
            </div>
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Báo cáo & Thống kê</h3>
              <p className="text-sm text-gray-600">Xem báo cáo và thống kê hệ thống</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 