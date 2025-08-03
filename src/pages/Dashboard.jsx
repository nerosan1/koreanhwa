import React from 'react';
import Dashboard from '../components/common/Dashboard';

const DashboardPage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Bảng điều khiển</h1>
        <p className="text-gray-600 mt-2">Theo dõi tiến độ học tập của bạn</p>
      </div>
      <Dashboard />
    </div>
  );
};

export default DashboardPage; 