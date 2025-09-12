import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Trash2, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VocabularyQuiz = () => {

  const [currentNumberQuestion, setCurrentQuestion] = useState(0);
  const [totalNumberQuestions] = useState(34);
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = {
    vietnamese: "Quả dưa chuột",
    options: [
      { korean: "휴지", pronunciation: "Hyuji", id: 1 },
      { korean: "몽골", pronunciation: "Monggol", id: 2 },
      { korean: "오이", pronunciation: "Oi", id: 3, correct: true },
      { korean: "필리핀", pronunciation: "Pilipin", id: 4 }
    ]
  };

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      setShowResult(true);
      if (selectedAnswer.correct) {
        setProgress(prev => prev + 1);
      }
    }
  };

  const getOptionStyle = (option) => {
    if (!showResult) {
      return selectedAnswer?.id === option.id
        ? 'bg-blue-50 border-blue-400 text-blue-800'
        : 'bg-white border-gray-200 text-gray-800 hover:border-blue-300 hover:bg-blue-50';
    }
    
    if (option.correct) {
      return 'bg-green-100 border-green-400 text-green-800';
    }
    
    if (selectedAnswer?.id === option.id && !option.correct) {
      return 'bg-red-100 border-red-400 text-red-800';
    }
    
    return 'bg-gray-100 border-gray-200 text-gray-500';
  };

  return (
    <div className="min-h-screen  bg-gray-800 flex flex-col">
      {/* Header */}
<div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <ArrowLeft 
            className="w-6 h-6 text-white cursor-pointer" 
            onClick={() => navigate(-1)}
          />
          <span className="text-lg text-white font-medium">Quay lại</span>
        </div>
        <div className="text-gray-100">
          {currentNumberQuestion + 1} / {totalNumberQuestions}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Question Section */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <span className="text-gray-300 text-lg">Chọn câu trả lời đúng</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-8">
            {currentQuestion.vietnamese}
          </h1>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => !showResult && handleAnswerSelect(option)}
              disabled={showResult}
              className={`p-8 rounded-2xl border-2 text-center transition-all duration-200 transform hover:scale-105 ${getOptionStyle(option)} ${
                showResult ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <div className="text-2xl font-bold mb-2">
                {option.korean}
              </div>
              <div className="text-gray-600 text-base">
                / {option.pronunciation} /
              </div>
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className={`px-8 py-3 rounded-full font-medium text-white transition-all duration-200 ${
                selectedAnswer
                  ? 'bg-yellow-500 hover:bg-yellow-600 transform hover:scale-105'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Tiếp tục
            </button>
          ) : (
            <div className="text-center">
              <div className={`inline-flex items-center px-6 py-3 rounded-full text-white font-medium mb-4 ${
                selectedAnswer?.correct ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {selectedAnswer?.correct ? '✓ Chính xác!' : '✗ Sai rồi!'}
              </div>
              <div>
                <button
                  onClick={() => {
                    setSelectedAnswer(null);
                    setShowResult(false);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-200"
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Result Explanation */}
        {showResult && (
          <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl border border-gray-200">
            <div className="text-center">
              <div className="text-lg font-medium text-gray-800 mb-2">
                Đáp án đúng:
              </div>
              <div className="text-2xl font-bold text-green-600 mb-2">
                {currentQuestion.options.find(opt => opt.correct)?.korean}
              </div>
              <div className="text-gray-600">
                / {currentQuestion.options.find(opt => opt.correct)?.pronunciation} /
              </div>
              <div className="text-gray-800 mt-2">
                = {currentQuestion.vietnamese}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VocabularyQuiz;