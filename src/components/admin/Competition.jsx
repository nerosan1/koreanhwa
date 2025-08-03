// Competition.js
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export function Competition() {
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: 'Nguyễn Văn A', score: 95 },
    { rank: 2, name: 'Trần Thị B', score: 92 },
    { rank: 3, name: 'Lê Văn C', score: 88 },
  ]);

  const [examStats, setExamStats] = useState([
    { month: 'Tháng 6', participants: 120 },
    { month: 'Tháng 7', participants: 150 },
    { month: 'Tháng 8', participants: 135 },
  ]);

  const handleCreateEvent = () => {
    alert('Tạo sự kiện mới!');
  };

  const handleManageSubmissions = () => {
    alert('Quản lý bài thi!');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Quản lý cuộc thi</h2>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={handleCreateEvent} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Tạo sự kiện
        </button>
        <button onClick={handleManageSubmissions} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Quản lý bài thi
        </button>
      </div>

      {/* Leaderboard */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Bảng xếp hạng Top học viên mỗi quý</h3>
        <table className="min-w-full border border-gray-300 text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Hạng</th>
              <th className="border px-4 py-2">Học viên</th>
              <th className="border px-4 py-2">Điểm</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((student) => (
              <tr key={student.rank} className="hover:bg-gray-50">
                <td className="border px-4 py-2 font-bold">{student.rank}</td>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Exam Participation Chart */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Số lượng tham gia mỗi kỳ thi</h3>
        <div className="border border-gray-300 rounded-xl p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={examStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="participants" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tổ chức & Quản lý kỳ thi */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Quản lý kỳ thi</h3>
        <div className="border border-gray-300 rounded-lg p-4 text-gray-500">
          [Danh sách sự kiện, đề thi, bài nộp và kết quả]
        </div>
      </div>
    </div>
  );
}
