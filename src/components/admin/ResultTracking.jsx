// ResultTracking.js
import { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

export function ResultTracking() {
  const [studentSkills, setStudentSkills] = useState([
    { name: 'Nguyễn Văn A', listening: 70, speaking: 60, reading: 80, writing: 75 },
    { name: 'Trần Thị B', listening: 85, speaking: 90, reading: 78, writing: 82 },
    { name: 'Lê Văn C', listening: 60, speaking: 55, reading: 65, writing: 70 },
  ]);

  const [commonErrors, setCommonErrors] = useState([
    { type: 'Sai phát âm', count: 45 },
    { type: 'Sai ngữ pháp', count: 30 },
    { type: 'Sai từ vựng', count: 25 },
  ]);

  const radarData = [
    { skill: 'Nghe', A: 70, B: 85, C: 60 },
    { skill: 'Nói', A: 60, B: 90, C: 55 },
    { skill: 'Đọc', A: 80, B: 78, C: 65 },
    { skill: 'Viết', A: 75, B: 82, C: 70 },
  ];

  const histogramData = [
    { skill: 'Nghe', score: 70 },
    { skill: 'Nói', score: 60 },
    { skill: 'Đọc', score: 80 },
    { skill: 'Viết', score: 75 },
    { skill: 'Nghe', score: 85 },
    { skill: 'Nói', score: 90 },
    { skill: 'Đọc', score: 78 },
    { skill: 'Viết', score: 82 },
    { skill: 'Nghe', score: 60 },
    { skill: 'Nói', score: 55 },
    { skill: 'Đọc', score: 65 },
    { skill: 'Viết', score: 70 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Theo dõi kết quả học tập</h2>

      {/* Bảng Thống kê kỹ năng yếu */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Thống kê kỹ năng yếu</h3>
        <table className="min-w-full border border-gray-300 text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Học viên</th>
              <th className="border px-4 py-2">Nghe</th>
              <th className="border px-4 py-2">Nói</th>
              <th className="border px-4 py-2">Đọc</th>
              <th className="border px-4 py-2">Viết</th>
            </tr>
          </thead>
          <tbody>
            {studentSkills.map((student, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{student.name}</td>
                <td className={`border px-4 py-2 ${student.listening < 70 ? 'text-red-500' : ''}`}>{student.listening}</td>
                <td className={`border px-4 py-2 ${student.speaking < 70 ? 'text-red-500' : ''}`}>{student.speaking}</td>
                <td className={`border px-4 py-2 ${student.reading < 70 ? 'text-red-500' : ''}`}>{student.reading}</td>
                <td className={`border px-4 py-2 ${student.writing < 70 ? 'text-red-500' : ''}`}>{student.writing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bảng Phân tích lỗi thường gặp */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Phân tích lỗi thường gặp</h3>
        <table className="min-w-full border border-gray-300 text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Loại lỗi</th>
              <th className="border px-4 py-2">Số lần gặp</th>
            </tr>
          </thead>
          <tbody>
            {commonErrors.map((error, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{error.type}</td>
                <td className="border px-4 py-2">{error.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Biểu đồ thống kê */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="border border-gray-300 rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">Radar Phân tích kỹ năng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart outerRadius={100} data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis />
              <Radar name="Nguyễn Văn A" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Radar name="Trần Thị B" dataKey="B" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              <Radar name="Lê Văn C" dataKey="C" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-gray-300 rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">Histogram Phân bố điểm TOPIK</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={histogramData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
