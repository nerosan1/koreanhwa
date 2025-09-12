import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const KoreanQuizModal = () => {

    const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);

  const questionData = {
    id: 105,
    testName: 'TOPIK II Reading Practice Test 1',
    tags: ['#[Grammar] Ngữ pháp', '#[Part 3] Đọc hiểu văn bản'],
    question: '다음 빈칸에 들어갈 가장 알맞은 것을 고르십시오. 한국어를 배우는 _____ 많은 시간과 노력이 필요합니다.',
    questionTranslation: 'Chọn từ thích hợp nhất để điền vào chỗ trống. Để học tiếng Hàn _____ cần rất nhiều thời gian và công sức.',
    options: [
      { id: 'A', text: '것은', meaning: 'việc (là)' },
      { id: 'B', text: '는데', meaning: 'nhưng mà' },
      { id: 'C', text: '에는', meaning: 'ở/tại' },
      { id: 'D', text: '으면서', meaning: 'trong khi' }
    ],
    correctAnswer: 'A',
    explanation: 'Đáp án đúng là A. "것은" được dùng để danh từ hóa động từ "학습하다" (học tập), tạo thành "한국어를 배우는 것은" (việc học tiếng Hàn). Cấu trúc này thường được dùng để nhấn mạnh chủ đề trong câu.'
  };

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const handleShowExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-black mb-2">
              Đáp án chi tiết #{questionData.id}
            </h2>
            <h3 className="text-lg text-gray-700 mb-3">{questionData.testName}</h3>
            <div className="flex flex-wrap gap-2">
              {questionData.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button 
          onClick={() => {navigate(-1);}}
          className="text-gray-400 hover:text-black transition-colors">
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Question Content */}
        <div className="p-6">
          {/* Korean Question */}
          <div className="mb-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div className="flex items-start gap-3">
                <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                  {questionData.id}
                </span>
                <div>
                  <p className="text-lg font-medium text-black leading-relaxed">
                    {questionData.question}
                  </p>
                  <p className="text-gray-600 mt-2 italic">
                    {questionData.questionTranslation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {questionData.options.map((option) => (
              <div
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  selectedAnswer === option.id
                    ? option.id === questionData.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : option.id === questionData.correctAnswer && selectedAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-yellow-400 hover:bg-yellow-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    selectedAnswer === option.id
                      ? option.id === questionData.correctAnswer
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : option.id === questionData.correctAnswer && selectedAnswer
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {option.id}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-black">{option.text}</span>
                      <span className="text-gray-600">({option.meaning})</span>
                    </div>
                  </div>
                  {option.id === questionData.correctAnswer && selectedAnswer && (
                    <div className="text-green-600 font-bold">✓ Đáp án đúng</div>
                  )}
                  {selectedAnswer === option.id && option.id !== questionData.correctAnswer && (
                    <div className="text-red-600 font-bold">✗ Sai</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Correct Answer Indicator */}
          {selectedAnswer && (
            <div className="mb-6">
              <div className="bg-green-100 border border-green-400 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-700 font-bold">Đáp án đúng:</span>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full font-bold">
                    {questionData.correctAnswer}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Explanation Toggle */}
          <div className="border-t-2 border-gray-200 pt-6">
            <button
              onClick={handleShowExplanation}
              className="flex items-center gap-2 text-black font-bold hover:text-yellow-600 transition-colors"
            >
              <span>Giải thích chi tiết đáp án</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${showExplanation ? 'rotate-180' : ''}`} />
            </button>
            
            {showExplanation && (
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold text-black mb-3">Giải thích:</h4>
                <p className="text-gray-700 leading-relaxed">
                  {questionData.explanation}
                </p>
                
                {/* Additional Korean Grammar Info */}
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h5 className="font-bold text-black mb-2">💡 Kiến thức ngữ pháp:</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>것은:</strong> Dùng để danh từ hóa động từ/tính từ</li>
                    <li>• <strong>는데:</strong> Diễn tả sự tương phản hoặc cung cấp nền tảng cho câu sau</li>
                    <li>• <strong>에는:</strong> Chỉ địa điểm, thời gian cụ thể</li>
                    <li>• <strong>으면서:</strong> Diễn tả hai hành động xảy ra đồng thời</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-gray-200">
            <div className="flex gap-3">
              <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                ← Câu trước
              </button>
              <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Câu tiếp →
              </button>
            </div>
            <div className="flex gap-3">
              <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
                Thêm vào ghi chú
              </button>
              <button className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KoreanQuizModal;