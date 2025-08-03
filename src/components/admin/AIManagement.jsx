// AIManagement.js
import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export function AIManagement() {
  const [satisfactionData, setSatisfactionData] = useState([
    { month: 'Tháng 5', score: 80 },
    { month: 'Tháng 6', score: 85 },
    { month: 'Tháng 7', score: 90 },
    { month: 'Tháng 8', score: 88 },
  ]);

  const [aiErrors, setAIErrors] = useState([
    { type: 'Sai ngữ cảnh', count: 20 },
    { type: 'Sai phát âm', count: 15 },
    { type: 'Thiếu dữ liệu', count: 10 },
    { type: 'Lỗi kỹ thuật', count: 5 },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Quản lý AI</h2>

      {/* Mức độ hài lòng học viên */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Mức độ hài lòng học viên</h3>
        <div className="border border-gray-300 rounded-xl p-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={satisfactionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Số lỗi AI bị báo cáo */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Số lỗi AI bị báo cáo</h3>
        <div className="border border-gray-300 rounded-xl p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={aiErrors}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
