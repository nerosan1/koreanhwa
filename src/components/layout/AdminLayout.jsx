import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Users,
  FileText,
  Shield,
  MessageSquare,
  BookOpen,
  TrendingUp,
  BarChart3,
  Settings,
  Eye,
  User,
  LogOut,
  Menu,
  X,
  FolderOpen,
  Calendar,
  Brain,
  Bell
} from 'lucide-react';
import NotificationBell from '../admin/NotificationBell';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Mock data cho notifications - trong thực tế sẽ lấy từ API hoặc state management
  const [notifications] = useState({
    '/admin/users': { count: 3, type: 'new' }, // Người dùng mới đăng ký
    '/admin/content': { count: 5, type: 'pending' }, // Nội dung chờ duyệt
    '/admin/forum': { count: 12, type: 'violation' }, // Bài viết vi phạm
    '/admin/dictionary': { count: 8, type: 'pending' }, // Từ mới chờ duyệt
    '/admin/materials': { count: 2, type: 'new' }, // Tài liệu mới upload
    '/admin/exams': { count: 1, type: 'urgent' }, // Kỳ thi sắp diễn ra
    '/admin/ai-monitoring': { count: 1, type: 'warning' }, // Cảnh báo hệ thống
    '/admin/reports': { count: 7, type: 'new' }, // Báo cáo mới
  });

  const navigation = [
    {
      name: 'Quản lý hệ thống',
      items: [
        {
          name: 'Tổng quan',
          href: '/admin',
          icon: BarChart3,
          description: 'Dashboard tổng quan hệ thống'
        },
        {
          name: 'Quản lý người dùng',
          href: '/admin/users',
          icon: Users,
          description: 'Quản lý tài khoản người dùng'
        },
        {
          name: 'Quản lý nội dung',
          href: '/admin/content',
          icon: FileText,
          description: 'Quản lý bài học, video, tài liệu'
        },
        {
          name: 'Phân quyền hệ thống',
          href: '/admin/roles',
          icon: Shield,
          description: 'Quản lý vai trò và quyền hạn'
        },
        {
          name: 'Quản lý diễn đàn',
          href: '/admin/forum',
          icon: MessageSquare,
          description: 'Duyệt bài, xóa vi phạm'
        },
        {
          name: 'Quản lý từ điển',
          href: '/admin/dictionary',
          icon: BookOpen,
          description: 'Cập nhật từ mới, duyệt từ gửi lên'
        },
        {
          name: 'Quản lý tài liệu',
          href: '/admin/materials',
          icon: FolderOpen,
          description: 'Upload, phân loại tài liệu học tập'
        },
        {
          name: 'Tổ chức kỳ thi',
          href: '/admin/exams',
          icon: Calendar,
          description: 'Tạo, quản lý và theo dõi kỳ thi'
        },
        {
          name: 'Theo dõi hệ thống AI',
          href: '/admin/ai-monitoring',
          icon: Brain,
          description: 'Giám sát hiệu suất hệ thống AI'
        }
      ]
    },
    {
      name: 'Quản lý học tập và thống kê',
      items: [
        {
          name: 'Theo dõi tiến độ',
          href: '/admin/progress',
          icon: TrendingUp,
          description: 'Theo dõi tiến độ học tập của học viên'
        },
        {
          name: 'Báo cáo và thống kê',
          href: '/admin/reports',
          icon: BarChart3,
          description: 'Xem báo cáo chi tiết và thống kê'
        },
        {
          name: 'Cài đặt hệ thống',
          href: '/admin/settings',
          icon: Settings,
          description: 'Cấu hình hệ thống và thông báo'
        }
      ]
    }
  ];

  const isActive = (href) => {
    return location.pathname === href;
  };

  // Hàm để lấy màu sắc dựa trên loại thông báo
  const getNotificationStyle = (type) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-500 animate-pulse';
      case 'warning':
        return 'bg-orange-500';
      case 'violation':
        return 'bg-red-600';
      case 'pending':
        return 'bg-yellow-500';
      case 'new':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Component hiển thị notification badge
  const NotificationBadge = ({ notification }) => {
    if (!notification) return null;
    
    const { count, type } = notification;
    
    return (
      <div className="relative">
        {count > 0 && (
          <div className={`absolute -top-1 -right-1 min-w-[18px] h-4 ${getNotificationStyle(type)} rounded-full flex items-center justify-center`}>
            <span className="text-white text-xs font-medium px-1">
              {count > 99 ? '99+' : count}
            </span>
          </div>
        )}
      </div>
    );
  };

  // Component hiển thị notification dot
  const NotificationDot = ({ notification }) => {
    if (!notification) return null;
    
    const { type } = notification;
    
    return (
      <div className={`w-2 h-2 ${getNotificationStyle(type)} rounded-full`}></div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-6 space-y-8">
            {navigation.map((section) => (
              <div key={section.name}>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  {section.name}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const notification = notifications[item.href];
                    
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 relative ${
                          isActive(item.href)
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <div className="relative mr-3">
                          <Icon className={`h-5 w-5 ${
                            isActive(item.href) ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'
                          }`} />
                          <NotificationBadge notification={notification} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="font-medium flex items-center justify-between">
                            <span>{item.name}</span>
                            <NotificationDot notification={notification} />
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>
          <div className="space-y-2">
            <Link
              to="/"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
            >
              <Eye className="mr-3 h-4 w-4 text-gray-400" />
              Xem trang web
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
            >
              <User className="mr-3 h-4 w-4 text-gray-400" />
              Dashboard người dùng
            </Link>
            <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200">
              <LogOut className="mr-3 h-4 w-4 text-gray-400" />
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
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
              {/* Notification bell in top bar */}
              <NotificationBell />
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
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;