import React, { useState, useEffect, useRef } from 'react';
import { Info, MessageCircle, Clock } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const KoreanTestForm = () => {
    const navigate = useNavigate();

    const location = useLocation();

      // Lưu testType vào state để giữ lại sau khi reload
      const [testType, setTestType] = useState('topik');

      useEffect(() => {
        if (location.state?.testType) {
          setTestType(location.state.testType);
        }
      }, [location.state]);

      const handleSubmit = () => {
        if (testType === 'roadmap') {
          navigate('/student/roadmap/detail');
        } else {
          navigate('/student/topik/DetaillExamResult');
        }
      };


  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [highlightEnabled, setHighlightEnabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(14 * 60); // 14 minutes in seconds
  const [contextMenu, setContextMenu] = useState(null);
  const contextMenuRef = useRef(null);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          alert('Hết thời gian làm bài!');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Disable copy/paste/right-click
  useEffect(() => {
    const handleCopy = (e) => e.preventDefault();
    const handleCut = (e) => e.preventDefault();
    const handlePaste = (e) => e.preventDefault();
    const handleSelectStart = (e) => e.preventDefault();
    const handleContextMenu = (e) => {
      e.preventDefault();
      if (highlightEnabled) {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();
        
        if (selectedText && selectedText.length > 0) {
          setContextMenu({
            x: e.clientX,
            y: e.clientY,
            text: selectedText
          });
        }
      }
      return false;
    };

    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && (e.key === 'c' || e.key === 'a' || e.key === 'v' || e.key === 'x')) {
        e.preventDefault();
      }
      if (e.key === 'F12') {
        e.preventDefault();
      }
    });

    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [highlightEnabled]);

  // Close context menu when clicking elsewhere
  useEffect(() => {
    const handleClick = (e) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
        setContextMenu(null);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const questions = [
    {
      id: 101,
      question: "한국어에서 '안녕하세요'의 의미는 무엇입니까? 다음 중 올바른 답을 선택하세요.",
      options: [
        { value: 'A', text: '좋은 아침입니다' },
        { value: 'B', text: '안녕히 가세요' },
        { value: 'C', text: '반갑습니다' },
        { value: 'D', text: '감사합니다' }
      ]
    },
    {
      id: 102,
      question: "다음 문장에서 빈칸에 들어갈 가장 적절한 단어를 고르세요: '저는 한국 음식을 _____ 좋아해요.'",
      options: [
        { value: 'A', text: '매우' },
        { value: 'B', text: '조금' },
        { value: 'C', text: '전혀' },
        { value: 'D', text: '가끔' }
      ]
    },
    {
      id: 103,
      question: "한국의 전통 의상인 '한복'에 대한 설명으로 올바른 것은 무엇입니까?",
      options: [
        { value: 'A', text: '일상복으로만 사용됩니다' },
        { value: 'B', text: '특별한 날에 입는 전통 의상입니다' },
        { value: 'C', text: '현대적인 디자인만 있습니다' },
        { value: 'D', text: '외국에서 만들어집니다' }
      ]
    }
  ];

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleHighlight = () => {
    if (contextMenu && contextMenu.text) {
      setHighlightedTexts(prev => [...prev, contextMenu.text]);
      setContextMenu(null);
    }
  };

  const questionNumbers = Array.from({length: 30}, (_, i) => i + 101);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white select-none">
      {/* Disable right-click overlay */}
      <div 
        className="fixed inset-0 z-50 pointer-events-none"
        style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none' }}
      />

      {/* Context Menu */}
      {contextMenu && (
        <div
          ref={contextMenuRef}
          className="fixed bg-white border border-gray-300 rounded-lg shadow-lg py-2 px-1 z-50"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button
            onClick={handleHighlight}
            className="block w-full px-4 py-2 text-sm text-left hover:bg-yellow-100 text-black"
          >
            🖍️ Đánh dấu văn bản
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header Controls */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-yellow-200 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div 
                    className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all ${
                      highlightEnabled 
                        ? 'bg-blue-500 border-blue-500' 
                        : 'bg-white border-gray-300'
                    }`}
                    onClick={() => setHighlightEnabled(!highlightEnabled)}
                  >
                    {highlightEnabled && (
                      <div className="w-2 h-2 bg-white rounded-full m-1"></div>
                    )}
                  </div>
                  <span className="text-sm text-gray-700">Highlight nội dung</span>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">Thời gian làm bài:</div>
                <div className="text-2xl font-bold text-red-600 flex items-center justify-end">
                  <Clock className="w-5 h-5 mr-2" />
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-yellow-200 p-6 mb-6">
            <div className="flex items-center mb-6">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-3 font-semibold">
                Part 5
              </span>
            </div>

            {questions.map((question, index) => (
              <div key={question.id} className="mb-8 last:mb-0">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white font-bold px-3 py-1 rounded-lg min-w-[3rem] text-center">
                    {question.id}
                  </div>
                  <div className="flex-1">
                    <p 
                      className="text-black font-medium mb-4 leading-relaxed"
                      style={{
                        userSelect: highlightEnabled ? 'text' : 'none',
                        WebkitUserSelect: highlightEnabled ? 'text' : 'none',
                        MozUserSelect: highlightEnabled ? 'text' : 'none'
                      }}
                    >
                      {question.question}
                    </p>
                    
                    <div className="space-y-2">
                      {question.options.map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedAnswers[question.id] === option.value
                              ? 'bg-yellow-100 border-yellow-400'
                              : 'bg-white border-gray-300 hover:bg-yellow-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option.value}
                            onChange={() => handleAnswerSelect(question.id, option.value)}
                            className="w-4 h-4 text-yellow-600 mr-3"
                          />
                          <span className="font-semibold mr-3 text-gray-600">{option.value}.</span>
                          <span 
                            className="text-black"
                            style={{
                              userSelect: highlightEnabled ? 'text' : 'none',
                              WebkitUserSelect: highlightEnabled ? 'text' : 'none',
                              MozUserSelect: highlightEnabled ? 'text' : 'none'
                            }}
                          >
                            {option.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80">
          <div className="bg-white rounded-xl shadow-lg border-2 border-yellow-200 p-6 sticky top-8">
            <div className="text-right mb-4">
              <button 
              onClick={handleSubmit}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black font-semibold hover:bg-gray-50 transition-colors">
                NỘP BÀI
              </button>
            </div>

            <div className="mb-4">
              <div className="text-red-500 text-sm mb-1">
                Khôi phục/lưu bài làm ▷
              </div>
              <div className="text-yellow-600 text-sm">
                <strong>Chú ý:</strong> bạn có thể click vào số thứ tự câu hỏi trong bài để đánh dấu review
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-bold text-black mb-4">Part 5</h3>
              
              <div className="grid grid-cols-5 gap-2 mb-4">
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

              <div className="text-right text-sm text-gray-500">
                Tự điền
              </div>
            </div>

            <div className="text-center">
              <div className="flex justify-center space-x-4">
                <MessageCircle className="w-8 h-8 text-blue-500" />
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">💬</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Anti-copy protection warning */}
      <div className="fixed bottom-4 left-4 bg-red-100 border border-red-300 rounded-lg p-3 text-red-700 text-sm max-w-xs">
        ⚠️ Bài kiểm tra được bảo vệ. Không thể sao chép nội dung.
      </div>
    </div>
  );
};

export default KoreanTestForm;