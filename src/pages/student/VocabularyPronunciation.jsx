import React, { useState } from 'react';
import { ChevronLeft, Mic,  ArrowLeft, RotateCcw, Trash2, Volume2, ArrowLeftRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PronunciationPractice = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions] = useState(34);
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentWord = {
    korean: "오이",
    vietnamese: "Quả dưa chuột"
  };

  const handleMicrophoneClick = () => {
    setIsRecording(!isRecording);
    // Simulate recording for demo
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setProgress(prev => prev + 1);
      }, 2000);
    }
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
              {currentQuestion + 1} / {totalQuestions}
            </div>
          </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Word Display */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            {currentWord.korean}
          </h1>
          <p className="text-xl text-gray-400">
            {currentWord.vietnamese}
          </p>
        </div>

        {/* Character Illustration Section */}
        <div className="flex justify-center items-center mb-16">
          <div className="relative">
            {/* Dots decoration */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-24">
              <div className="flex space-x-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-gray-300 rounded-full"></div>
                ))}
              </div>
            </div>
            
            {/* Character placeholder - You can replace this div with your image */}
            <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center relative overflow-hidden">
              {/* Replace this entire div with your image */}
              <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center">
                <div className="w-16 h-12 bg-orange-200 rounded-full relative">
                  {/* Simple face representation */}
                  <div className="absolute top-3 left-3 w-2 h-1 bg-black rounded"></div>
                  <div className="absolute top-3 right-3 w-2 h-1 bg-black rounded"></div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-black rounded-full"></div>
                </div>
              </div>
              {/* Small decorative elements */}
              <div className="absolute top-4 right-6 w-3 h-3 bg-yellow-400 rounded-full"></div>
            </div>
            
            {/* Dots decoration */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-24">
              <div className="flex space-x-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-gray-300 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Microphone Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleMicrophoneClick}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-yellow-500 hover:bg-yellow-600'
            }`}
          >
            <Mic className="w-8 h-8 text-white" />
          </button>
        </div>

        {/* Recording Status */}
        {isRecording && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              <span className="font-medium">Đang ghi âm...</span>
            </div>
          </div>
        )}

        {/* Skip Button */}
        <div className="flex justify-center">
          <button className="text-gray-600 hover:text-white px-6 py-3 font-medium transition-colors">
            Bỏ qua
          </button>
        </div>

        {/* Instructions */}
        <div className="text-center mt-12 max-w-md mx-auto">
          <p className="text-gray-500 text-sm leading-relaxed">
            Nhấn vào biểu tượng microphone và phát âm từ tiếng Hàn. 
            Hệ thống sẽ đánh giá độ chính xác của phát âm của bạn.
          </p>
        </div>

        {/* Feedback Section (shows after recording) */}
        {progress > 0 && !isRecording && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center bg-green-100 text-green-700 px-6 py-3 rounded-full">
              <span className="font-medium">Phát âm tốt! Tiếp tục luyện tập.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PronunciationPractice;