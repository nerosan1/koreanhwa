import React, { useState } from 'react';
import { Search, User, Clock, Users, MessageCircle, BarChart3, Calculator } from 'lucide-react';
import SearchBar from '../../components/common/SearchBar';
import StudentLayout from "../../components/layout/StudentLayout";
import {useNavigate} from 'react-router-dom';
import ExamCard from '../../components/student/ExamCard';


const KoreanExamLibrary = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const examCategories = [
    'Tất cả', 'TOPIK I', 'TOPIK II', 'KLAT', 'KBS', 'FLEX', 'KLPT', 'OPIc',
    'S-TOPIK', 'SNULT', 'KOSTAT', 'KICE', 'KCT', 'KIIP', 'KIBS', 'Korean SAT',
    'Sejong Institute', 'King Sejong', 'Hangeul Test', 'Korean Proficiency'
  ];

  const examData = [
    {
      title: 'TOPIK II Reading & Listening Test 01',
      duration: '110 phút',
      participants: 4521,
      id: 'TK2001',
      questions: '3 phần thi | 70 câu hỏi',
      tags: ['TOPIK II', 'Reading', 'Listening']
    },
    {
      title: 'TOPIK I Simulation Test 15',
      duration: '100 phút',
      participants: 2845,
      id: 'TK1015',
      questions: '2 phần thi | 70 câu hỏi',
      tags: ['TOPIK I', 'Reading', 'Listening']
    },
    {
      title: 'KLAT Korean Listening Practice 03',
      duration: '45 phút',
      participants: 1892,
      id: 'KL003',
      questions: '4 phần thi | 50 câu hỏi',
      tags: ['KLAT', 'Listening']
    },
    {
      title: 'TOPIK II Writing Practice Test 05',
      duration: '70 phút',
      participants: 1654,
      id: 'TK2W05',
      questions: '2 phần thi | 4 câu viết',
      tags: ['TOPIK II', 'Writing']
    },
    {
      title: 'OPIc Korean Speaking Level 7-8',
      duration: '25 phút',
      participants: 987,
      id: 'OP78',
      questions: '3 phần thi | 15 câu nói',
      tags: ['OPIc', 'Speaking']
    },
    {
      title: 'FLEX Korean Proficiency Mock Test',
      duration: '120 phút',
      participants: 2156,
      id: 'FX001',
      questions: '4 phần thi | 100 câu hỏi',
      tags: ['FLEX', 'Comprehensive']
    },
    {
      title: 'KBS Korean Broadcasting Test 02',
      duration: '90 phút',
      participants: 743,
      id: 'KBS02',
      questions: '3 phần thi | 60 câu hỏi',
      tags: ['KBS', 'Broadcasting']
    },
    {
      title: 'TOPIK I Grammar & Vocabulary 12',
      duration: '40 phút',
      participants: 3421,
      id: 'TK1G12',
      questions: '1 phần thi | 30 câu hỏi',
      tags: ['TOPIK I', 'Grammar']
    },
    {
      title: 'S-TOPIK Speaking Test Advanced',
      duration: '30 phút',
      participants: 1265,
      id: 'STK01',
      questions: '2 phần thi | 6 câu nói',
      tags: ['S-TOPIK', 'Speaking']
    },
    {
      title: 'KLPT Korean Language Test Level 4',
      duration: '80 phút',
      participants: 2089,
      id: 'KLP4',
      questions: '3 phần thi | 75 câu hỏi',
      tags: ['KLPT', 'Level 4']
    },
    {
      title: 'Sejong Institute Placement Test',
      duration: '60 phút',
      participants: 1543,
      id: 'SJ001',
      questions: '4 phần thi | 50 câu hỏi',
      tags: ['Sejong Institute', 'Placement']
    },
    {
      title: 'KIIP Korean Integration Program L3',
      duration: '75 phút',
      participants: 867,
      id: 'KI03',
      questions: '3 phần thi | 45 câu hỏi',
      tags: ['KIIP', 'Integration']
    },
    {
      title: 'Hangeul Proficiency Test Beginner',
      duration: '50 phút',
      participants: 2734,
      id: 'HG001',
      questions: '2 phần thi | 40 câu hỏi',
      tags: ['Hangeul Test', 'Beginner']
    }
  ];

  // Lọc dữ liệu dựa trên tab và tìm kiếm
  const filteredExams = examData.filter((exam) => {
    const matchesTab = activeTab === 'all' || activeTab === 'Tất cả' || exam.tags.some((tag) => tag.includes(activeTab.replace('TOPIK ', '').replace('TOPIK', 'TOPIK')));
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <StudentLayout>
          <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-black mb-2">Thư viện đề thi tiếng Hàn</h1>
            <p className="text-gray-600 mb-6">Đánh giá năng lực tiếng Hàn toàn diện</p>

            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {examCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(category)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                    activeTab === category || (activeTab === 'all' && category === 'Tất cả')
                      ? 'bg-black text-white shadow-lg'
                      : 'bg-white text-black hover:bg-yellow-100 border-2 border-gray-200 hover:border-yellow-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

            {/* Tabs */}
            <div className="flex gap-8 border-b-2 border-gray-200">
              <button
                onClick={() => setActiveTab('all')}
                className={`pb-3 font-bold transition-colors ${
                  activeTab === 'all' || activeTab === 'Tất cả'
                    ? 'text-black border-b-4 border-yellow-400'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setActiveTab('removed')}
                className={`pb-3 font-bold transition-colors ${
                  activeTab === 'removed'
                    ? 'text-black border-b-4 border-yellow-400'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                Đã rút gọn
              </button>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="bg-white rounded-xl p-6 shadow-xl border-2 border-gray-200 min-w-[320px] ml-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="font-bold text-black text-lg">nguyengocanh852002</span>
                <div className="text-yellow-600 font-medium">Korean Learner</div>
              </div>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Kỳ thi:</span>
                  <span className="text-black font-bold">TOPIK II</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ngày dự thi:</span>
                <span className="text-black font-bold">15/04/2024 ✏️</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tới kỳ thi:</span>
                <span className="text-yellow-600 font-bold">45 ngày</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Điểm mục tiêu:</span>
                <span className="text-black font-bold">Level 5 (230 điểm)</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/student/topik/statistics')}
             className="w-full mt-6 bg-yellow-400 text-black py-3 px-4 rounded-lg text-sm font-bold hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Thống kê kết quả
            </button>
          </div>
        </div>

        {/* Exam Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredExams.length > 0 ? (
            filteredExams.map((exam, index) => <ExamCard key={index} exam={exam} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">Không tìm thấy bài thi nào phù hợp.</p>
              <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </StudentLayout>
  );
};

export default KoreanExamLibrary;