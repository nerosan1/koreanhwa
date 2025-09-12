import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Trash2, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const KoreanWritingQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions] = useState(34);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Dữ liệu mẫu câu hỏi
  const questions = [
    {
      vietnamese: "Quả dưa chuột",
      korean: "오이",
      emoji: "🥒"
    },
    {
      vietnamese: "Quả táo",
      korean: "사과",
      emoji: "🍎"
    },
    {
      vietnamese: "Quả chuối",
      korean: "바나나",
      emoji: "🍌"
    }
  ];

  const currentQ = questions[currentQuestion % questions.length];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#FCD34D'; // Yellow color for writing
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.imageSmoothingEnabled = true;
    }
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setShowResult(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Touch events for mobile
  const startDrawingTouch = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    setIsDrawing(true);
    const ctx = canvas.getContext('2d');
    
    const x = (touch.clientX - rect.left) * (canvas.width / rect.width);
    const y = (touch.clientY - rect.top) * (canvas.height / rect.height);
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setShowResult(false);
  };

  const drawTouch = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    const x = (touch.clientX - rect.left) * (canvas.width / rect.width);
    const y = (touch.clientY - rect.top) * (canvas.height / rect.height);
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setShowResult(false);
  };

  const handleCheck = () => {
    // Giả lập logic kiểm tra (trong thực tế sẽ cần AI/OCR để nhận diện chữ viết tay)
    const randomCorrect = Math.random() > 0.3; // 70% correct rate for demo
    setIsCorrect(randomCorrect);
    setShowResult(true);
  };

  const handleSkip = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      clearCanvas();
      setShowResult(false);
    }
  };

  const handleContinue = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      clearCanvas();
      setShowResult(false);
    }
  };

  const playAudio = () => {
    // Text-to-speech for Korean
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentQ.korean);
      utterance.lang = 'ko-KR';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <ArrowLeft 
            className="w-6 h-6 text-white cursor-pointer" 
            onClick={() => navigate(-1)}
          />
          <span className="text-lg font-medium">Quay lại</span>
        </div>
        <div className="text-gray-400">
          {currentQuestion + 1} / {totalQuestions}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-2">
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center mb-8">
          <p className="text-gray-300 mb-2">Viết chữ Hàn Quốc tương ứng</p>
          <h1 className="text-3xl font-bold text-yellow-500 mb-2">{currentQ.vietnamese}</h1>
          <div className="text-4xl mb-4">{currentQ.emoji}</div>
          
          {showResult && (
            <div className="mt-4">
              <p className={`text-lg font-medium mb-2 ${
                isCorrect ? 'text-green-500' : 'text-red-500'
              }`}>
                {isCorrect ? 'Chính xác!' : 'Chưa chính xác, hãy thử lại!'}
              </p>
              <p className="text-gray-400 mb-2">Đáp án đúng:</p>
              <p className="text-2xl font-bold text-yellow-500">{currentQ.korean}</p>
            </div>
          )}
        </div>

        {/* Writing Canvas */}
        <div className="relative bg-gray-900 rounded-lg p-4 mb-8 border-2 border-gray-700">
          <div className="text-center mb-2">
            <span className="text-sm text-gray-400">Viết chữ Hàn ở đây</span>
          </div>
          <canvas
            ref={canvasRef}
            width={600}
            height={200}
            className="bg-gray-800 rounded cursor-crosshair w-full max-w-full border border-gray-600"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawingTouch}
            onTouchMove={drawTouch}
            onTouchEnd={stopDrawing}
            style={{ touchAction: 'none', maxWidth: '100%', height: 'auto' }}
          />
          {/* Canvas grid lines for better writing guidance */}
          <div className="absolute inset-4 pointer-events-none">
            <div className="w-full h-full border-l border-r border-gray-700 opacity-30"></div>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex gap-6 mb-8">
          <button
            onClick={clearCanvas}
            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            title="Xóa và viết lại"
          >
            <RotateCcw className="w-6 h-6 text-teal-400" />
          </button>
          <button
            onClick={clearCanvas}
            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            title="Xóa canvas"
          >
            <Trash2 className="w-6 h-6 text-teal-400" />
          </button>
          <button 
            onClick={playAudio}
            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            title="Phát âm tiếng Hàn"
          >
            <Volume2 className="w-6 h-6 text-teal-400" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-xs">
          {!showResult ? (
            <button
              onClick={handleCheck}
              className="w-full py-4 bg-teal-500 text-white font-semibold rounded-full hover:bg-teal-600 transition-colors"
            >
              Kiểm tra
            </button>
          ) : (
            <button
              onClick={handleContinue}
              className="w-full py-4 bg-teal-500 text-white font-semibold rounded-full hover:bg-teal-600 transition-colors"
            >
              Tiếp tục
            </button>
          )}
          
          <button
            onClick={handleSkip}
            className="w-full py-3 text-gray-400 font-medium hover:text-white transition-colors"
          >
            Bỏ qua
          </button>
        </div>
      </div>
    </div>
  );
};

export default KoreanWritingQuiz;