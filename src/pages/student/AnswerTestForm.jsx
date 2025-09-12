import React, { useState } from 'react';
import { ChevronDown, Volume2, MessageCircle, RotateCcw } from 'lucide-react';
import StudentLayout from '../../components/layout/StudentLayout';
import { useNavigate } from 'react-router-dom';

const KoreanLearningApp = () => {
    const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showDetails, setShowDetails] = useState({});

  const questions = [
    {
      id: 101,
      question: "안녕하세요! Cách chào hỏi phổ biến nhất trong tiếng Hàn là gì?",
      options: [
        { value: 'A', text: '안녕하세요', correct: true },
        { value: 'B', text: '여보세요', correct: false },
        { value: 'C', text: '감사합니다', correct: false },
        { value: 'D', text: '죄송합니다', correct: false }
      ],
      explanation: "안녕하세요 (annyeonghaseyo) là cách chào hỏi lịch sự và phổ biến nhất trong tiếng Hàn."
    },
    {
      id: 102,
      question: "Từ nào dưới đây có nghĩa là 'cảm ơn' trong tiếng Hàn?",
      options: [
        { value: 'A', text: '미안합니다', correct: false },
        { value: 'B', text: '감사합니다', correct: true },
        { value: 'C', text: '안녕히 가세요', correct: false },
        { value: 'D', text: '처음 뵙겠습니다', correct: false }
      ],
      explanation: "감사합니다 (gamsahamnida) có nghĩa là 'cảm ơn' trong tiếng Hàn."
    },
    {
      id: 103,
      question: "Khi muốn nói 'Tôi yêu bạn' bằng tiếng Hàn, bạn sẽ nói như thế nào?",
      options: [
        { value: 'A', text: '좋아해요', correct: false },
        { value: 'B', text: '사랑해요', correct: true },
        { value: 'C', text: '고마워요', correct: false },
        { value: 'D', text: '보고 싶어요', correct: false }
      ],
      explanation: "사랑해요 (saranghaeyo) có nghĩa là 'Tôi yêu bạn' trong tiếng Hàn."
    }
  ];

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const toggleDetails = (questionId) => {
    setShowDetails(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const getAnswerStyle = (questionId, option) => {
    const selected = selectedAnswers[questionId];
    if (!selected) return 'bg-white border-gray-300 hover:bg-yellow-50';
    
    if (option.value === selected) {
      return option.correct 
        ? 'bg-green-100 border-green-500 text-green-800' 
        : 'bg-red-100 border-red-500 text-red-800';
    }
    
    if (option.correct) {
      return 'bg-green-100 border-green-500 text-green-800';
    }
    
    return 'bg-gray-50 border-gray-300 text-gray-500';
  };

  const questionNumbers = Array.from({length: 30}, (_, i) => i + 101);

  return (
    <StudentLayout>
            <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-yellow-400">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-black">
                📚 Bài kiểm tra tiếng Hàn cơ bản - Phần 1
              </h1>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
                  Chia sẻ
                </button>
                <button
                    onClick={() => navigate(-1)}
                 className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition-colors">
                  Quay về trang kết quả
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center mt-4 space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Đánh dấu câu khó</span>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white">
              <option>Lưu/Khôi phục</option>
            </select>
            <button className="px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
              Hiển thị giải thích
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-lg border-2 border-yellow-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-black mb-6 flex items-center">
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-lg mr-3">Phần 1</span>
              Từ vựng và cụm từ cơ bản
            </h2>

            {questions.map((question, index) => (
              <div key={question.id} className="mb-8 last:mb-0">
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-400 text-black font-bold px-3 py-1 rounded-lg min-w-[3rem] text-center">
                    {question.id}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <p className="text-black font-medium">{question.question}</p>
                      <button className="text-yellow-600 hover:text-yellow-800">
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {question.options.map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${getAnswerStyle(question.id, option)}`}
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option.value}
                            onChange={() => handleAnswerSelect(question.id, option.value)}
                            className="sr-only"
                          />
                          <span className="font-semibold mr-3">{option.value}.</span>
                          <span>{option.text}</span>
                        </label>
                      ))}
                    </div>

                    <button
                      onClick={() => toggleDetails(question.id)}
                      className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-800 font-medium"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${showDetails[question.id] ? 'rotate-180' : ''}`} />
                      <span>Giải thích chi tiết đáp án</span>
                    </button>

                    {showDetails[question.id] && (
                      <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                        <p className="text-gray-700">{question.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center bg-white rounded-xl shadow-lg border-2 border-yellow-200 p-6">
            <button className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition-colors">
              <RotateCcw className="w-5 h-5" />
              <span>Làm lại</span>
            </button>
            
            <div className="flex space-x-4">
              <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
                Nộp bài
              </button>
              <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                Tiếp tục
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80">
          <div className="bg-white rounded-xl shadow-lg border-2 border-yellow-200 p-6 sticky top-8">
            <h3 className="text-lg font-bold text-black mb-4">Phần 1</h3>
            
            <div className="grid grid-cols-5 gap-2">
              {questionNumbers.map((num) => {
                const isAnswered = selectedAnswers[num];
                const isCurrent = num <= 103;
                
                return (
                  <button
                    key={num}
                    className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                      isCurrent
                        ? isAnswered
                          ? 'bg-green-500 text-white'
                          : 'bg-yellow-400 text-black'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!isCurrent}
                  >
                    {num}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <div className="flex items-center justify-between mb-2">
                <span>Đã trả lời:</span>
                <span className="font-semibold">{Object.keys(selectedAnswers).length}/3</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all"
                  style={{ width: `${(Object.keys(selectedAnswers).length / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2 text-yellow-800 mb-2">
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold">Mẹo học tập</span>
              </div>
              <p className="text-sm text-yellow-700">
                Hãy đọc to các từ tiếng Hàn để luyện phát âm và ghi nhớ tốt hơn!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </StudentLayout>
  );
};

export default KoreanLearningApp;