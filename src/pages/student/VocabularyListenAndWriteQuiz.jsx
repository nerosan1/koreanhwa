import React, { useState, useRef } from 'react';
import { ArrowLeft, Volume2, RotateCcw, Trash2, ArrowLeftRight  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ListenAndWriteQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions] = useState(34);
  const [userInput, setUserInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  
  const correctAnswer = "dưa chuột";
  const audioRef = useRef(null);

  // Simulate text-to-speech
  const playAudio = () => {
    setIsPlaying(true);
    
    // Simulate audio playback
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(correctAnswer);
      utterance.lang = 'vi-VN';
      utterance.rate = playbackSpeed === '0.7x' ? 0.7 : 1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    } else {
      // Fallback - just simulate playing
      setTimeout(() => {
        setIsPlaying(false);
      }, 2000);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    setShowResult(false);
  };

  const handleCheck = () => {
    const correct = userInput.toLowerCase().trim() === correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleContinue = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserInput('');
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const handleSkip = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserInput('');
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const toggleSpeed = () => {
    setPlaybackSpeed(playbackSpeed === '1x' ? '0.7x' : '1x');
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col">
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


      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-8">Nghe và viết</h1>
          
          {/* Speed Controls */}
          <div className="flex gap-2 justify-center mb-8">
            <button 
              onClick={toggleSpeed}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                playbackSpeed === '0.7x' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-white text-yellow-500 border border-yellow-500'
              }`}
            >
              0.7x
            </button>
            <button 
              onClick={toggleSpeed}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                playbackSpeed === '1x' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-white text-yellow-500 border border-yellow-500'
              }`}
            >
              1x
            </button>
          </div>

          {/* Audio Character */}
          <div className="relative mb-8">
            {/* Audio visualization bars */}
            <div className="flex items-center justify-center gap-1 mb-4">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-gray-400 rounded transition-all duration-200 ${
                    isPlaying 
                      ? `animate-pulse h-${Math.floor(Math.random() * 8) + 4}` 
                      : 'h-2'
                  }`}
                />
              ))}
            </div>
            
            {/* Character */}
            <button
              onClick={playAudio}
              disabled={isPlaying}
              className="relative mx-auto w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors disabled:opacity-70"
            >
              <div className="text-white text-2xl">😊</div>
              {isPlaying && (
                <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
              )}
            </button>
            
            {/* More audio bars */}
            <div className="flex items-center justify-center gap-1 mt-4">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-gray-400 rounded transition-all duration-200 ${
                    isPlaying 
                      ? `animate-pulse h-${Math.floor(Math.random() * 8) + 4}` 
                      : 'h-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Input Field */}
        <div className="w-full max-w-md mb-6">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="dưa chuột"
            className="w-full px-4 py-3 text-center text-lg border-2 border-gray-300 rounded-full focus:border-yellow-500 focus:outline-none"
            disabled={showResult}
          />
        </div>

        {/* Result Display */}
        {showResult && (
          <div className="text-center mb-6">
            <p className={`text-lg font-medium mb-2 ${
              isCorrect ? 'text-green-600' : 'text-red-500'
            }`}>
              {isCorrect ? 'Chính xác!' : 'Haizz, bạn không thuộc bài rồi!'}
            </p>
            <p className="text-gray-600 mb-2">Câu trả lời đúng</p>
            <p className="text-2xl font-bold text-yellow-500 mb-2">🥒</p>
            <p className="text-lg font-medium text-gray-800">Quả dưa chuột</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-xs">
          {!showResult ? (
            <button 
              onClick={handleCheck}
              disabled={!userInput.trim()}
              className="w-full py-4 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-600 transition-colors disabled:cursor-not-allowed"
            >
              Kiểm tra
            </button>
          ) : (
            <button 
              onClick={handleContinue}
              className="w-full py-4 bg-yellow-500 text-white font-semibold rounded-full hover:bg-yellow-600 transition-colors"
            >
              Tiếp tục
            </button>
          )}
          
          <button 
            onClick={handleSkip}
            className="w-full py-3 text-gray-600 font-medium hover:text-gray-800 transition-colors underline"
          >
            Bỏ qua
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListenAndWriteQuiz;