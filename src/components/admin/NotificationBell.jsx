import React, { useState } from 'react';
import { Bell } from 'lucide-react'; // Assuming you're using Lucide icons for the Bell

const NotificationBell = () => {
  // State to toggle notification dropdown
  const [isOpen, setIsOpen] = useState(false);

  // Sample notifications data (you can replace this with your own data)
  const notifications = [
    { id: 1, message: 'Server downtime reported!', type: 'urgent' },
    { id: 2, message: 'New user registered.', type: 'new' },
    { id: 3, message: 'Payment pending approval.', type: 'pending' },
    { id: 4, message: 'Security violation detected.', type: 'violation' },
    { id: 5, message: 'System update required.', type: 'warning' },
  ];

  // Function to get notification styles based on type
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

  return (
    <div className="relative">
      {/* Bell Icon with Notification Badge */}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5 text-gray-400 hover:text-gray-600" />
        {notifications.length > 0 && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        )}
      </div>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
          <div className="py-2">
            <h3 className="px-4 py-2 text-sm font-semibold text-gray-700">
              Notifications ({notifications.length})
            </h3>
            <div className="max-h-60 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="px-4 py-2 text-sm text-gray-500">
                  No notifications
                </p>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${getNotificationStyle(
                        notification.type
                      )}`}
                    ></span>
                    <span>{notification.message}</span>
                  </div>
                ))
              )}
            </div>
            <div className="px-4 py-2 text-sm text-blue-500 hover:text-blue-700 cursor-pointer border-t">
              Clear all notifications
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;