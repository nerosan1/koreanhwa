import React, { useState } from 'react';
import { Volume2, ChevronRight, RotateCcw } from 'lucide-react';
import StudentLayout from "../../components/layout/StudentLayout";
import { link } from 'framer-motion/client';  
import { useNavigate } from 'react-router-dom';

const TopikVocabularyLearning = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null);
  
  const vocabularyData = [
    { korean: "오이", pronunciation: "(Oi)", meaning: "Quả dưa chuột" },
    { korean: "우유", pronunciation: "(Uyu)", meaning: "Sữa" },
    { korean: "모자", pronunciation: "(Moja)", meaning: "Mũ" },
    { korean: "바지", pronunciation: "(Baji)", meaning: "Quần" },
    { korean: "치마", pronunciation: "(Chima)", meaning: "Váy" },
    { korean: "사과", pronunciation: "(Sagwa)", meaning: "Quả táo" },
    { korean: "고기", pronunciation: "(Gogi)", meaning: "Thịt" },
    { korean: "시계", pronunciation: "(Sigye)", meaning: "Đồng hồ" },
    { korean: "휴지", pronunciation: "(Hyuji)", meaning: "Giấy lau, khăn giấy" },
    { korean: "돼지", pronunciation: "(Dwaeji)", meaning: "Con lợn" },
    { korean: "포도", pronunciation: "(Podo)", meaning: "Nho" },
    { korean: "의자", pronunciation: "(Uija)", meaning: "Cái ghế" },
    { korean: "피자", pronunciation: "(Pija)", meaning: "Bánh pizza" },
    { korean: "기차", pronunciation: "(Gicha)", meaning: "Tàu hỏa" },
    { korean: "토끼", pronunciation: "(Tokki)", meaning: "Con thỏ" },
    { korean: "떡", pronunciation: "(Tteok)", meaning: "Bánh tteok" },
    { korean: "딸기", pronunciation: "(Ttalgi)", meaning: "Dâu tây" },
    { korean: "옷", pronunciation: "(Ot)", meaning: "Quần áo" },
    { korean: "꽃", pronunciation: "(Kkot)", meaning: "Hoa" },
    { korean: "생선", pronunciation: "(Saengseon)", meaning: "Con cá" },
    { korean: "지갑", pronunciation: "(Jigap)", meaning: "Cái ví" }
  ];

  const tabs = [
    { id: 'definition', label: 'Định nghĩa', active: true, link: '/student/topik/vocabulary-matching' },
    { id: 'multiplechoice', label: 'Trắc nghiệm', link: '/student/topik/vocabulary-quiz' },
    { id: 'practice', label: 'Luyện nói', link: '/student/topik/vocabulary-pronunciation' },
    { id: 'write', label: 'Viết', link: '/student/topik/vocabulary-writing' },
    { id: 'listen', label: 'Nghe viết', link: '/student/topik/vocabulary-listen-and-write' }
  ];

  const VocabularyCard = ({ korean, pronunciation, meaning }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-black hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="w-12 h-12 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors group-hover:scale-105 transform duration-200">
            <Volume2 className="w-6 h-6" />
          </button>
          <div>
            <div className="text-2xl font-bold text-black mb-1">{korean}</div>
            <div className="text-gray-500 text-sm mb-1">{pronunciation}</div>
            <div className="text-gray-700 text-base">{meaning}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <StudentLayout>
            <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center text-sm text-gray-600 space-x-2">
            <span>Lý thuyết</span>
            <ChevronRight className="w-4 h-4" />
            <span>Từ vựng TOPIK 1</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-black font-medium">Bài 1A: Giới thiệu</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-6">Bài 1A: Giới thiệu</h1>
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigate (tab.link)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-yellow-400 text-black shadow-md'
                    : 'bg-white text-black border border-black hover:border-yellow-300 hover:text-yellow-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Test Button */}
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-medium shadow-md transition-all duration-200 transform hover:scale-105">
            Kiểm tra
          </button>
        </div>

        {/* Vocabulary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vocabularyData.map((item, index) => (
            <VocabularyCard
              key={index}
              korean={item.korean}
              pronunciation={item.pronunciation}
              meaning={item.meaning}
            />
          ))}
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8">
          <button className="w-14 h-14 bg-yellow-400 hover:bg-yellow-500 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110">
            <RotateCcw className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
    </StudentLayout>
  );
};

export default TopikVocabularyLearning;