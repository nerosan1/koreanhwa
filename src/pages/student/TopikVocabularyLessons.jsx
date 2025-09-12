import React from 'react';
import { Lock } from 'lucide-react';
import StudentLayout from '../../components/layout/StudentLayout';
import { useNavigate } from 'react-router-dom';

const TopikVocabularyLessons = () => {
  const navigate = useNavigate();
  const lessons = [
    { title: "Bài 1A: Giới thiệu", words: 34, locked: false },
    { title: "Bài 1B: Giới thiệu", words: 36, locked: true },
    { title: "Bài 2: Trường học", words: 51, locked: true },
    { title: "Bài 3: Sinh hoạt đời thường", words: 53, locked: true },
    { title: "Bài 4A: Thứ ngày tháng", words: 36, locked: true },
    { title: "Bài 4B: Thứ ngày tháng", words: 37, locked: true },
    { title: "Bài 5: Công việc trong ngày", words: 65, locked: true },
    { title: "Bài 6: Cuối tuần", words: 48, locked: true },
    { title: "Bài 7: Mua sắm P1", words: 30, locked: true },
    { title: "Bài 8: Ẩm thực", words: 57, locked: true },
    { title: "Bài 9: Nhà ở", words: 60, locked: true },
    { title: "Bài 10: Gia đình", words: 62, locked: true },
    { title: "Bài 11: Thời tiết", words: 52, locked: true },
    { title: "Bài 12: Điện thoại liên lạc P1", words: 52, locked: true },
    { title: "Bài 13: Sinh nhật", words: 48, locked: true },
    { title: "Bài 14: Sở thích và đam mê", words: 65, locked: true },
    { title: "Bài 15: Giao thông P1", words: 52, locked: true }
  ];

  const LessonCard = ({ title, words, locked }) => (
    <div 
      onClick={() => {
      if (!locked) {
        navigate('/student/topik/vocabulary-learning');
      }
    }}
    className="bg-white rounded-xl p-4 shadow-sm border m-3 border-black hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-black font-bold text-lg">Aa</span>
          <div className="absolute ml-8 mt-6">
            <div className="w-3 h-1 bg-white rounded mb-0.5"></div>
            <div className="w-3 h-1 bg-white rounded mb-0.5"></div>
            <div className="w-3 h-1 bg-white rounded"></div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-gray-900 font-medium text-base mb-1 truncate">{title}</h3>
          <p className="text-gray-600 text-sm">{words} từ</p>
        </div>
        {locked && (
          <div className="flex-shrink-0">
            <Lock className="w-5 h-5 text-yellow-500" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <StudentLayout>
          <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-black">Từ vựng TOPIK 1</h1>
          <div className="flex items-center space-x-4">
            <select className="px-4 py-2 border-2 border-yellow-400 rounded-full text-yellow-600 bg-white text-sm font-medium">
              <option>Cấp độ 1</option>
              <option>Cấp độ 2</option>
              <option>Cấp độ 3</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 bg-white hover:bg-gray-50 text-sm font-medium">
              Kiểm tra
            </button>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson, index) => (
            <LessonCard 
              key={index} 
              title={lesson.title}
              words={lesson.words}
              locked={lesson.locked}
            />
          ))}
        </div>
      </div>
    </div>
    </StudentLayout>
  );
};

export default TopikVocabularyLessons;