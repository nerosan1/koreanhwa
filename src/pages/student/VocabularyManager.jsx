import React from 'react';
import { Check } from 'lucide-react';
import StudentLayout from "../../components/layout/StudentLayout";
import { useNavigate } from 'react-router-dom';

const  VocabularyManager = () => {
  const navigate = useNavigate();
  const vocabularyData = [
    { title: "Từ vựng cấp độ TOPIK 1", progress: "0/838", completed: false },
    { title: "Từ vựng chưa thuộc", progress: "", completed: true }
  ];

  const grammarData = [
    { title: "Ngữ pháp cấp độ TOPIK 1", progress: "0/53", completed: false },
    { title: "Ngữ pháp cấp độ TOPIK 2", progress: "0/46", completed: false },
    { title: "Ngữ pháp cấp độ TOPIK 3", progress: "0/50", completed: false },
    { title: "Ngữ pháp cấp độ TOPIK 4", progress: "0/48", completed: false },
    { title: "Ngữ pháp cấp độ TOPIK 5", progress: "0/46", completed: false },
    { title: "Ngữ pháp cấp độ TOPIK 6", progress: "0/60", completed: false }
  ];

  const VocabularyCard = ({ title, progress, completed }) => (
    <div onClick={() => navigate('/student/topik/vocabulary-lessons')} className="border border-gray-300 bg-white rounded-3xl p-6 shadow-sm hover:border-black  ">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
          <span className="text-black font-bold text-lg">Aa</span>
        </div>
        <div className="flex-1">
          <h3 className="text-gray-900 font-medium text-lg">{title}</h3>
          <div className="flex items-center mt-2">
            <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center mr-3">
              <Check className="w-4 h-4 text-black" />
            </div>
            {progress && <span className="text-gray-600">{progress}</span>}
          </div>
        </div>
      </div>
    </div>
  );

  const GrammarCard = ({ title, progress, completed }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-black ">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-sm">ABC</span>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-gray-900 font-medium text-lg">{title}</h3>
          <div className="flex items-center mt-2">
            <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center mr-3">
              <Check className="w-4 h-4 text-black" />
            </div>
            <span className="text-gray-600">{progress}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <StudentLayout>
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Vocabulary Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-black">Từ vựng</h1>
            <div className="flex items-center space-x-4">
              <select className="px-4 py-2 border border-yellow-400 rounded-lg text-yellow-600 bg-white">
                <option>Topik cấp 1</option>
                <option>Topik cấp 2</option>
                <option>Topik cấp 3</option>
                <option>Topik cấp 4</option>
                <option>Topik cấp 5</option>
                <option>Topik cấp 6</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 bg-white hover:bg-gray-50">
                Kiểm tra
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {vocabularyData.map((item, index) => (
              <VocabularyCard key={index} {...item} />
            ))}
          </div>
        </div>

        {/* Grammar Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-black">Ngữ pháp</h1>
            <select className="px-4 py-2 border border-yellow-400 rounded-lg text-yellow-600 bg-white">
              <option>Theo cấp độ</option>
              <option>Theo chủ đề</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {grammarData.map((item, index) => (
              <GrammarCard key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
    </StudentLayout>
  );
};

export default  VocabularyManager;