// ContentManagement.js
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

export function ContentManagement() {
  const [lessons, setLessons] = useState([
    { id: 1, title: 'Ngữ pháp N5', type: 'Nghe', views: 1200 },
    { id: 2, title: 'Từ vựng TOPIK II', type: 'Đọc', views: 950 },
    { id: 3, title: 'Bài tập Nói cơ bản', type: 'Nói', views: 870 },
  ]);

  const topLessonsData = lessons.map((lesson) => ({ name: lesson.title, views: lesson.views }));

  const contentAccessData = [
    { month: 'Tháng 1', views: 300 },
    { month: 'Tháng 2', views: 500 },
    { month: 'Tháng 3', views: 450 },
    { month: 'Tháng 4', views: 600 },
    { month: 'Tháng 5', views: 700 },
  ];

  const handleCreateLesson = () => {
    alert('Chức năng tạo bài học mới!');
  };

  const handleManageVideo = () => {
    alert('Chức năng quản lý video!');
  };

  const handleManageFlashcard = () => {
    alert('Chức năng quản lý flashcard!');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Quản lý nội dung</h2>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={handleCreateLesson} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Tạo bài học
        </button>
        <button onClick={handleManageVideo} className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
          Quản lý video
        </button>
        <button onClick={handleManageFlashcard} className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
          Quản lý flashcard
        </button>
      </div>

      {/* Danh sách bài học */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Tiêu đề</th>
              <th className="border px-4 py-2">Loại</th>
              <th className="border px-4 py-2">Lượt xem</th>
              <th className="border px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{lesson.id}</td>
                <td className="border px-4 py-2">{lesson.title}</td>
                <td className="border px-4 py-2">{lesson.type}</td>
                <td className="border px-4 py-2">{lesson.views}</td>
                <td className="border px-4 py-2">
                  <button className="text-blue-500 hover:underline mr-2">Sửa</button>
                  <button className="text-red-500 hover:underline">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Biểu đồ thống kê */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="border border-gray-300 rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">10 bài học học nhiều nhất</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topLessonsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-gray-300 rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">Lượt truy cập nội dung theo tháng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={contentAccessData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quản lý phản hồi AI */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Phản hồi từ AI</h3>
        <div className="border border-gray-300 rounded-lg p-4 text-gray-500">
          [Danh sách phản hồi từ AI (sửa phát âm, nội dung sai, ...)]
        </div>
      </div>
    </div>
  );
}
