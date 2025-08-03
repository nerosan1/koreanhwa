// DocumentManagement.js
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function DocumentManagement() {
  const [documents, setDocuments] = useState([
    { id: 1, title: 'Giáo trình N5', downloads: 120 },
    { id: 2, title: 'Từ điển TOPIK II', downloads: 95 },
    { id: 3, title: 'Video luyện phát âm', downloads: 87 },
    { id: 4, title: 'Sách luyện đề', downloads: 150 },
    { id: 5, title: 'Flashcard từ vựng', downloads: 110 },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Quản lý tài liệu</h2>

      {/* Danh sách tài liệu */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border border-gray-300 text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Tên tài liệu</th>
              <th className="border px-4 py-2">Lượt tải</th>
              <th className="border px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{doc.id}</td>
                <td className="border px-4 py-2">{doc.title}</td>
                <td className="border px-4 py-2">{doc.downloads}</td>
                <td className="border px-4 py-2">
                  <button className="text-blue-500 hover:underline mr-2">Sửa</button>
                  <button className="text-red-500 hover:underline">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Biểu đồ thống kê lượt tải */}
      <div className="border border-gray-300 rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-4">Tài liệu được tải nhiều nhất</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={documents}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="downloads" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
