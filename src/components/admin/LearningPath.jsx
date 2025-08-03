// LearningPath.js
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';

export function LearningPath() {
  const [learningPaths, setLearningPaths] = useState([
    { id: 1, name: 'N5 Sơ Cấp', level: 'N5', students: 150 },
    { id: 2, name: 'TOPIK II Chuyên Sâu', level: 'Advanced', students: 80 },
    { id: 3, name: 'Luyện Nói Giao Tiếp', level: 'Intermediate', students: 120 },
  ]);

  const popularPathsData = learningPaths.map(path => ({ name: path.name, students: path.students }));

  const growthData = [
    { month: 'Tháng 1', N5: 30, TOPIKII: 10, GiaoTiep: 20 },
    { month: 'Tháng 2', N5: 50, TOPIKII: 20, GiaoTiep: 40 },
    { month: 'Tháng 3', N5: 70, TOPIKII: 35, GiaoTiep: 60 },
    { month: 'Tháng 4', N5: 90, TOPIKII: 50, GiaoTiep: 80 },
    { month: 'Tháng 5', N5: 120, TOPIKII: 65, GiaoTiep: 100 },
    { month: 'Tháng 6', N5: 150, TOPIKII: 80, GiaoTiep: 120 },
  ];

  const handleCreatePath = () => {
    alert('Chức năng tạo lộ trình học!');
  };

  const handleEditPath = (id) => {
    alert(`Chỉnh sửa lộ trình ID: ${id}`);
  };

  const handleDeletePath = (id) => {
    alert(`Xóa lộ trình ID: ${id}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Quản lý lộ trình học</h2>

      {/* Action Buttons */}
      <div className="mb-6">
        <button
          onClick={handleCreatePath}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Tạo lộ trình mới
        </button>
      </div>

      {/* Danh sách lộ trình */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Tên lộ trình</th>
              <th className="border px-4 py-2">Cấp độ</th>
              <th className="border px-4 py-2">Số học viên</th>
              <th className="border px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {learningPaths.map((path) => (
              <tr key={path.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{path.id}</td>
                <td className="border px-4 py-2">{path.name}</td>
                <td className="border px-4 py-2">{path.level}</td>
                <td className="border px-4 py-2">{path.students}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditPath(path.id)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeletePath(path.id)}
                    className="text-red-500 hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Biểu đồ thống kê */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="border border-gray-300 rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">Lộ trình phổ biến nhất</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={popularPathsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="border border-gray-300 rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">Tăng trưởng học viên theo lộ trình</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="N5" stroke="#10B981" />
              <Line type="monotone" dataKey="TOPIKII" stroke="#F59E0B" />
              <Line type="monotone" dataKey="GiaoTiep" stroke="#3B82F6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
