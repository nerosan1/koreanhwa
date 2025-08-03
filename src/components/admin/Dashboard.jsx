// Dashboard.js
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export function Dashboard() {
  const [aiInteractionData, setAIInteractionData] = useState([
    { day: 'Thứ 2', count: 120 },
    { day: 'Thứ 3', count: 150 },
    { day: 'Thứ 4', count: 170 },
    { day: 'Thứ 5', count: 160 },
    { day: 'Thứ 6', count: 180 },
    { day: 'Thứ 7', count: 140 },
    { day: 'CN', count: 130 },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-100 text-blue-800 p-6 rounded-lg shadow text-center text-lg font-semibold">
          Học viên hoạt động: 120
        </div>
        <div className="bg-green-100 text-green-800 p-6 rounded-lg shadow text-center text-lg font-semibold">
          Giờ học TB: 2.5h
        </div>
        <div className="bg-yellow-100 text-yellow-800 p-6 rounded-lg shadow text-center text-lg font-semibold">
          Hoàn thành khóa: 65%
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Tương tác AI theo tuần</h3>
        <div className="border border-gray-300 rounded-xl p-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={aiInteractionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
