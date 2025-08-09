import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Bell, 
  User,
  LogOut,
  ChevronDown,
  Search
} from 'lucide-react';

const TeacherLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/teacher', 
      icon: Home,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'Quản lý bài học', 
      href: '/teacher/lessons', 
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      name: 'Quản lý học viên', 
      href: '/teacher/students', 
      icon: Users,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      name: 'Tài liệu', 
      href: '/teacher/materials', 
      icon: FileText,
      color: 'from-orange-500 to-red-500'
    },
    { 
      name: 'Báo cáo', 
      href: '/teacher/reports', 
      icon: BarChart3,
      color: 'from-indigo-500 to-purple-500'
    },
    { 
      name: 'Cài đặt', 
      href: '/teacher/settings', 
      icon: Settings,
      color: 'from-gray-500 to-slate-500'
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Học viên mới đăng ký',
      message: 'Nguyễn Văn A đã đăng ký khóa học TOPIK I',
      time: '5 phút trước',
      type: 'success'
    },
    {
      id: 2,
      title: 'Bài tập cần chấm',
      message: 'Có 15 bài tập cần chấm điểm',
      time: '1 giờ trước',
      type: 'warning'
    },
    {
      id: 3,
      title: 'Lịch dạy hôm nay',
      message: 'Bạn có 3 tiết dạy hôm nay',
      time: '2 giờ trước',
      type: 'info'
    }
  ];

  const stats = [
    { name: 'Tổng học viên', value: '156', change: '+12%', changeType: 'positive' },
    { name: 'Bài học đã tạo', value: '89', change: '+8%', changeType: 'positive' },
    { name: 'Đánh giá trung bình', value: '4.8', change: '+0.2', changeType: 'positive' },
    { name: 'Tỷ lệ hoàn thành', value: '92%', change: '+5%', changeType: 'positive' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Sidebar */}
      <div className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} fixed inset-y-0 left-0 z-50 bg-white shadow-xl transition-all duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {!isSidebarCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    KoreanHwa
                  </h1>
                  <p className="text-xs text-gray-500">Teacher Portal</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-300 hover:scale-110"
            >
              {isSidebarCollapsed ? (
                <ChevronDown className="w-4 h-4 text-gray-600 rotate-90" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-600 -rotate-90" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? `bg-gradient-to-r ${item.color} text-white shadow-xl`
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {!isSidebarCollapsed && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              {!isSidebarCollapsed && (
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Giáo viên</p>
                  <p className="text-xs text-gray-500">teacher@koreanhwa.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${isSidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300 ease-in-out`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Teacher Dashboard
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Thông báo</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'success' ? 'bg-green-500' :
                              notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                            }`}></div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-900">{notification.title}</p>
                              <p className="text-sm text-gray-600">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Giáo viên</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-200 z-50">
                    <div className="py-2">
                      <Link
                        to="/teacher/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="w-4 h-4" />
                        <span>Hồ sơ</span>
                      </Link>
                      <Link
                        to="/teacher/settings"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Cài đặt</span>
                      </Link>
                      <hr className="my-2" />
                      <button className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full">
                        <LogOut className="w-4 h-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Click outside to close dropdowns */}
      {(isProfileDropdownOpen || isNotificationsOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileDropdownOpen(false);
            setIsNotificationsOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default TeacherLayout; 