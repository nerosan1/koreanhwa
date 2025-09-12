import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  GraduationCap,
  User,
  BookMarked,
  FileText,
  Trophy,
  FolderOpen,
  Home,
  LogOut,
  Menu,
  X,
  Settings,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const StudentLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile
  const [collapsed, setCollapsed] = useState(false); // desktop collapse
  const location = useLocation();

  const navigation = [
    {
      name: 'Học tập',
      items: [
        { name: 'Dashboard', href: '/student/dashboard', icon: Home, description: 'Tổng quan học tập' },
        { name: 'My Roadmap', href: '/student/roadmap', icon: TrendingUp, description: 'Hành trình học tập' },
        { name: 'Bài học', href: '/student/lessons', icon: BookOpen, description: 'Học bài học theo cấp độ' },
        { name: 'Luyện đề TOPIK', href: '/student/topik', icon: GraduationCap, description: 'Luyện thi TOPIK' },
        { name: 'Từ vựng', href: '/student/vocabulary', icon: BookMarked, description: 'Quản lý từ vựng cá nhân' }
      ]
    },
    {
      name: 'Tài nguyên',
      items: [
        { name: 'Tài liệu', href: '/student/materials', icon: FolderOpen, description: 'Tài liệu học tập' },
        { name: 'Blog học viên', href: '/student/blog', icon: FileText, description: 'Chia sẻ kinh nghiệm học tập' }
      ]
    },
    {
      name: 'Thi đua',
      items: [{ name: 'Cuộc thi', href: '/student/competition', icon: Trophy, description: 'Tham gia cuộc thi học viên' }]
    },
    {
      name: 'Cá nhân',
      items: [
        { name: 'Hồ sơ', href: '/student/profile', icon: User, description: 'Quản lý thông tin cá nhân' },
        { name: 'Cài đặt', href: '/student/settings', icon: Settings, description: 'Tùy chỉnh hệ thống' }
      ]
    }
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg transform transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:inset-0
          ${collapsed ? 'w-20' : 'w-80'}`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {!collapsed && <h1 className="text-xl font-bold text-blue-600">Student Dashboard</h1>}
          <div className="flex items-center space-x-2">
            {/* Collapse toggle button (desktop) */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            {/* Close button (mobile) */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-6 space-y-8">
            {navigation.map((section) => (
              <div key={section.name}>
                {!collapsed && (
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    {section.name}
                  </h3>
                )}
                <div className="space-y-2">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                          isActive(item.href)
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon
                          className={`h-5 w-5 flex-shrink-0 ${
                            isActive(item.href) ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'
                          }`}
                        />
                        {!collapsed && (
                          <div className="flex-1 ml-3">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          {!collapsed && (
            <>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Nguyễn Văn A</p>
                  <p className="text-xs text-gray-500">Cấp độ: Sơ cấp 2</p>
                </div>
              </div>
            </>
          )}
          <div className="space-y-2">
            <Link
              to="/"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
            >
              <Home className="mr-3 h-4 w-4 text-gray-400" />
              {!collapsed && 'Về trang chủ'}
            </Link>
            <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200">
              <LogOut className="mr-3 h-4 w-4 text-gray-400" />
              {!collapsed && 'Đăng xuất'}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString('vi-VN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default StudentLayout;
