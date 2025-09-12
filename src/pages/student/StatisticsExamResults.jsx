import React, { useState } from 'react';
import { BarChart3, Book, Clock, Calendar, Target, Edit2 } from 'lucide-react';
import StudentLayout from '../../components/layout/StudentLayout';
import { useNavigate } from 'react-router-dom';

const ExamStatistics = () => {

    const navigate = useNavigate();

  const [activeExamType, setActiveExamType] = useState('TOEIC');
  const [activeSkill, setActiveSkill] = useState('Listening');
  const [filterDays, setFilterDays] = useState('30 ngày');

  const examResults = [
    {
      date: '27/07/2025',
      testName: 'New Economy TOEIC Test 1',
      result: '22/30',
      duration: '0:11:14',
      tags: ['Luyện tập', 'Part 5']
    },
    {
      date: '25/07/2025', 
      testName: 'TOPIK II Reading Practice 03',
      result: '18/25',
      duration: '0:35:22',
      tags: ['Luyện tập', 'Reading']
    },
    {
      date: '23/07/2025',
      testName: 'Korean Grammar Test Advanced',
      result: '45/50',
      duration: '0:42:15',
      tags: ['Kiểm tra', 'Grammar']
    }
  ];

  return (
    <StudentLayout>
            <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="w-8 h-8 text-black" />
          <h1 className="text-3xl font-bold text-black">Thống kê kết quả luyện thi</h1>
        </div>

        {/* Exam Type Tabs */}
        <div className="flex gap-1 mb-6">
          {['TOEIC', 'TOPIK I'].map((examType) => (
            <button
              key={examType}
              onClick={() => setActiveExamType(examType)}
              className={`px-6 py-3 font-bold transition-all duration-200 border-b-4 ${
                activeExamType === examType
                  ? 'text-yellow-600 border-yellow-600 bg-yellow-50'
                  : 'text-gray-800 border-transparent hover:text-black hover:border-gray-300'
              }`}
            >
              {examType}
            </button>
          ))}
        </div>

        {/* Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-700 text-sm italic">
            <strong>Chú ý:</strong> Mặc định trang thống kê sẽ hiển thị các bài làm trong khoảng thời gian 30 ngày gần nhất, 
            để xem kết quả trong khoảng thời gian xa hơn bạn chọn ở phần dropdown dưới đây.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-gray-800 font-medium">Lọc kết quả theo ngày (tính từ bài thi cuối):</span>
          <select 
            value={filterDays}
            onChange={(e) => setFilterDays(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
          >
            <option value="30 ngày">30 ngày</option>
            <option value="60 ngày">60 ngày</option>
            <option value="90 ngày">90 ngày</option>
            <option value="6 tháng">6 tháng</option>
            <option value="1 năm">1 năm</option>
          </select>
          <button className="bg-yellow-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-yellow-700 transition-colors">
            Search
          </button>
          <button className="text-gray-800 hover:text-black font-medium">
            Clear
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {/* Số đề đã làm */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 text-center">
            <Book className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
            <div className="text-gray-800 text-sm mb-2">Số đề đã làm</div>
            <div className="text-4xl font-bold text-black mb-1">1</div>
            <div className="text-gray-600 text-sm">đề thi</div>
          </div>

          {/* Thời gian luyện thi */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 text-center">
            <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
            <div className="text-gray-800 text-sm mb-2">Thời gian luyện thi</div>
            <div className="text-4xl font-bold text-black mb-1">11</div>
            <div className="text-gray-600 text-sm">phút</div>
          </div>

          {/* Ngày dự thi */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 text-center">
            <Calendar className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
            <div className="text-gray-800 text-sm mb-2">Ngày dự thi</div>
            <div className="text-2xl font-bold text-black mb-1">26/12/2023</div>
            <Edit2 className="w-4 h-4 text-gray-400 mx-auto" />
          </div>

          {/* Tới kỳ thi */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 text-center">
            <Calendar className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
            <div className="text-gray-800 text-sm mb-2">Tới kỳ thi</div>
            <div className="text-4xl font-bold text-black mb-1">0</div>
            <div className="text-gray-600 text-sm">ngày</div>
          </div>

          {/* Điểm mục tiêu */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 text-center">
            <Target className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
            <div className="text-gray-800 text-sm mb-2">Điểm mục tiêu</div>
            <div className="text-4xl font-bold text-yellow-600">800.0</div>
          </div>
        </div>

        {/* Skill Tabs */}
        <div className="flex gap-1 mb-6">
          {['Listening', 'Reading'].map((skill) => (
            <button
              key={skill}
              onClick={() => setActiveSkill(skill)}
              className={`px-6 py-3 font-bold transition-all duration-200 border-b-4 ${
                activeSkill === skill
                  ? 'text-yellow-600 border-yellow-600 bg-yellow-50'
                  : 'text-gray-800 border-transparent hover:text-black hover:border-gray-300'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-black">Danh sách đề thi đã làm:</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Ngày làm</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Đề thi</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-800">Kết quả</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-800">Thời gian làm bài</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {examResults.map((result, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">{result.date}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{result.testName}</div>
                      <div className="flex gap-2 mt-1">
                        {result.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className={`text-xs px-2 py-1 rounded-full font-medium ${
                              tag === 'Luyện tập' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : tag === 'Part 5' 
                                ? 'bg-yellow-200 text-yellow-900'
                                : tag === 'Reading'
                                ? 'bg-yellow-300 text-yellow-900'
                                : tag === 'Kiểm tra'
                                ? 'bg-yellow-400 text-yellow-900'
                                : 'bg-yellow-500 text-yellow-900'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-bold text-gray-900">{result.result}</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-900">{result.duration}</td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => navigate('/student/topik/DetaillExamResult')}
                      className="text-yellow-600 hover:text-yellow-800 font-medium text-sm">
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </StudentLayout>
  );
};

export default ExamStatistics;