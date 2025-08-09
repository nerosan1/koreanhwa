import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, BookOpen, User, Settings } from 'lucide-react';

const CollapsibleSidebarDemo = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'home', name: 'Trang chủ', icon: Home },
    { id: 'lessons', name: 'Bài học', icon: BookOpen },
    { id: 'profile', name: 'Hồ sơ', icon: User },
    { id: 'settings', name: 'Cài đặt', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Collapsible Sidebar */}
      <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white shadow-lg transition-all duration-300 ease-in-out`}>
        {/* Toggle Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <div className="px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-center space-x-3 p-3 mb-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
              >
                <Icon size={20} className="text-blue-600" />
                {!isCollapsed && (
                  <span className="text-gray-700 font-medium">{item.name}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Demo Sidebar Thu Gọn
        </h1>
        <p className="text-gray-600 mb-6">
          Click vào nút mũi tên để thu gọn/mở rộng sidebar. Sidebar sẽ thay đổi từ 256px xuống 64px.
        </p>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tính năng:</h2>
          <ul className="space-y-2 text-gray-600">
            <li>✅ Smooth animation với transition 300ms</li>
            <li>✅ Icon vẫn hiển thị khi thu gọn</li>
            <li>✅ Text ẩn/hiện khi thu gọn/mở rộng</li>
            <li>✅ Hover effects hoạt động tốt</li>
            <li>✅ Responsive design</li>
          </ul>
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800">
            <strong>Trạng thái hiện tại:</strong> Sidebar đang {isCollapsed ? 'thu gọn' : 'mở rộng'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSidebarDemo; 