// DictionaryManagement.js
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';

export function DictionaryManagement() {
  const [topWords, setTopWords] = useState([
    { word: '사랑', searches: 150 },
    { word: '학교', searches: 130 },
    { word: '공부', searches: 115 },
    { word: '친구', searches: 110 },
    { word: '여행', searches: 105 },
    { word: '음식', searches: 100 },
    { word: '문화', searches: 95 },
    { word: '책', searches: 90 },
    { word: '운동', searches: 85 },
    { word: '게임', searches: 80 },
  ]);

  const [searchGrowth, setSearchGrowth] = useState([
    { month: 'Tháng 5', searches: 400 },
    { month: 'Tháng 6', searches: 450 },
    { month: 'Tháng 7', searches: 500 },
    { month: 'Tháng 8', searches: 550 },
  ]);

  const [pendingWords, setPendingWords] = useState([
    { id: 1, word: '배우다', meaning: 'Học', status: 'Chờ duyệt' },
    { id: 2, word: '노력', meaning: 'Nỗ lực', status: 'Chờ duyệt' },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Quản lý từ điển</h2>

      {/* Top 10 từ được tra nhiều nhất */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Top 10 từ được tra nhiều nhất</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Table */}
          <div className="overflow-x-auto border border-gray-300 rounded-xl">
            <table className="min-w-full text-sm text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Từ</th>
                  <th className="border px-4 py-2">Số lượt tra</th>
                </tr>
              </thead>
              <tbody>
                {topWords.map((word, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{word.word}</td>
                    <td className="border px-4 py-2">{word.searches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chart */}
          <div className="border border-gray-300 rounded-xl p-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topWords}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="word" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="searches" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tăng trưởng lượt tra từ */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Tăng trưởng lượt tra từ</h3>
        <div className="border border-gray-300 rounded-xl p-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={searchGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="searches" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Duyệt từ mới */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Duyệt từ mới</h3>
        <div className="overflow-x-auto border border-gray-300 rounded-xl">
          <table className="min-w-full text-sm text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Từ</th>
                <th className="border px-4 py-2">Nghĩa</th>
                <th className="border px-4 py-2">Trạng thái</th>
                <th className="border px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {pendingWords.map((word) => (
                <tr key={word.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{word.id}</td>
                  <td className="border px-4 py-2">{word.word}</td>
                  <td className="border px-4 py-2">{word.meaning}</td>
                  <td className="border px-4 py-2">{word.status}</td>
                  <td className="border px-4 py-2">
                    <button className="text-green-500 hover:underline mr-2">Duyệt</button>
                    <button className="text-red-500 hover:underline">Từ chối</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
