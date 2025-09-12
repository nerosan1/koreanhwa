import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Trash2, Volume2, ArrowLeftRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VocabularyMatching = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions] = useState(34);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matches, setMatches] = useState([]);
  const [progress, setProgress] = useState(0);

  const vocabularyPairs = [
    { korean: "모자", vietnamese: "Quả dưa chuột", id: 1, correct: false },
    { korean: "오이", vietnamese: "Quần", id: 2, correct: false },
    { korean: "바지", vietnamese: "Sữa", id: 3, correct: false },
    { korean: "우유", vietnamese: "Mũ", id: 4, correct: false }
  ];

  const correctPairs = [
    { korean: "모자", vietnamese: "Mũ" },
    { korean: "오이", vietnamese: "Quả dưa chuột" },
    { korean: "바지", vietnamese: "Quần" },
    { korean: "우유", vietnamese: "Sữa" }
  ];

  const handleLeftSelect = (item, index) => {
    setSelectedLeft({ ...item, index });
    if (selectedRight) {
      checkMatch(item, selectedRight);
    }
  };

  const handleRightSelect = (item, index) => {
    setSelectedRight({ ...item, index });
    if (selectedLeft) {
      checkMatch(selectedLeft, item);
    }
  };

  const checkMatch = (left, right) => {
    const isCorrect = correctPairs.some(pair => 
      pair.korean === left.korean && pair.vietnamese === right.vietnamese
    );
    
    if (isCorrect) {
      setMatches([...matches, { left: left.korean, right: right.vietnamese }]);
      setProgress(prev => prev + 1);
    }
    
    // Reset selections
    setTimeout(() => {
      setSelectedLeft(null);
      setSelectedRight(null);
    }, 1000);
  };

  const isMatched = (item, side) => {
    return matches.some(match => 
      (side === 'left' && match.left === item.korean) ||
      (side === 'right' && match.right === item.vietnamese)
    );
  };

  const MatchingCard = ({ item, side, index, isSelected, onClick, isMatched }) => (
    <button
      onClick={() => onClick(item, index)}
      disabled={isMatched}
      className={`w-full p-4 rounded-xl border-2 text-lg font-medium transition-all duration-200 ${
        isMatched 
          ? 'bg-green-100 border-green-300 text-green-700 cursor-not-allowed'
          : isSelected 
            ? 'bg-yellow-100 border-yellow-400 text-yellow-800 shadow-md transform scale-105'
            : 'bg-white border-gray-200 text-gray-800 hover:border-yellow-300 hover:bg-yellow-50'
      }`}
    >
      {side === 'left' ? item.korean : item.vietnamese}
    </button>
  );

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
          {currentQuestion + 1} / {totalQuestions}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">Ghép cặp từ - định nghĩa</h1>
        </div>

        {/* Matching Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Korean Words */}
          <div className="space-y-4">
            {vocabularyPairs.map((item, index) => (
              <MatchingCard
                key={`left-${index}`}
                item={item}
                side="left"
                index={index}
                isSelected={selectedLeft?.index === index}
                onClick={handleLeftSelect}
                isMatched={isMatched(item, 'left')}
              />
            ))}
          </div>

          {/* Center - Arrow */}
          <div className="flex items-center justify-center lg:my-0 my-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <ArrowLeftRight className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          {/* Right Column - Vietnamese Meanings */}
          <div className="space-y-4">
            {vocabularyPairs.map((item, index) => (
              <MatchingCard
                key={`right-${index}`}
                item={item}
                side="right"
                index={index}
                isSelected={selectedRight?.index === index}
                onClick={handleRightSelect}
                isMatched={isMatched(item, 'right')}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-200">
            Kiểm tra
          </button>
          <button className="text-gray-600 hover:text-white px-6 py-3 font-medium transition-colors">
            Bỏ qua
          </button>
        </div>

        {/* Progress Feedback */}
        {progress > 0 && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full">
              <span className="font-medium">Đã ghép đúng {progress} cặp!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VocabularyMatching;