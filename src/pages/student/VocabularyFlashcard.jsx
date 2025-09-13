import React, { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, RotateCcw, Settings, ChevronLeft, ChevronRight, BookOpen, Star, StarOff, Shuffle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VocabularyFlashcard = () => {
    const navigate = useNavigate();
  // Mock data với hình ảnh và từ vựng đa dạng
  const flashcards = [
    {
      id: 1,
      image: "🏠",
      korean: "집",
      pronunciation: "/ jip /",
      vietnamese: "Nhà",
      category: "Địa điểm",
      difficulty: "easy"
    },
    {
      id: 2,
      image: "🍎",
      korean: "사과",
      pronunciation: "/ sagwa /",
      vietnamese: "Táo",
      category: "Thức ăn",
      difficulty: "easy"
    },
    {
      id: 3,
      image: "📚",
      korean: "책",
      pronunciation: "/ chaek /",
      vietnamese: "Sách",
      category: "Đồ vật",
      difficulty: "easy"
    },
    {
      id: 4,
      image: "🚗",
      korean: "자동차",
      pronunciation: "/ jadongcha /",
      vietnamese: "Ô tô",
      category: "Phương tiện",
      difficulty: "medium"
    },
    {
      id: 5,
      image: "☀️",
      korean: "태양",
      pronunciation: "/ taeyang /",
      vietnamese: "Mặt trời",
      category: "Thiên nhiên",
      difficulty: "medium"
    },
    {
      id: 6,
      image: "👨‍🏫",
      korean: "선생님",
      pronunciation: "/ seonsaengnim /",
      vietnamese: "Giáo viên",
      category: "Nghề nghiệp",
      difficulty: "medium"
    },
    {
      id: 7,
      image: "🌸",
      korean: "벚꽃",
      pronunciation: "/ beojkkot /",
      vietnamese: "Hoa anh đào",
      category: "Thiên nhiên",
      difficulty: "hard"
    },
    {
      id: 8,
      image: "🏥",
      korean: "병원",
      pronunciation: "/ byeongwon /",
      vietnamese: "Bệnh viện",
      category: "Địa điểm",
      difficulty: "hard"
    },
    {
      id: 9,
      image: "✈️",
      korean: "비행기",
      pronunciation: "/ bihaenggi /",
      vietnamese: "Máy bay",
      category: "Phương tiện",
      difficulty: "hard"
    },
    {
      id: 10,
      image: "🎵",
      korean: "음악",
      pronunciation: "/ eumak /",
      vietnamese: "Âm nhạc",
      category: "Giải trí",
      difficulty: "medium"
    },
    {
      id: 11,
      image: "🍜",
      korean: "라면",
      pronunciation: "/ ramyeon /",
      vietnamese: "Mì tôm",
      category: "Thức ăn",
      difficulty: "easy"
    },
    {
      id: 12,
      image: "🌙",
      korean: "달",
      pronunciation: "/ dal /",
      vietnamese: "Mặt trăng",
      category: "Thiên nhiên",
      difficulty: "easy"
    },
    {
      id: 13,
      image: "👥",
      korean: "친구",
      pronunciation: "/ chingu /",
      vietnamese: "Bạn bè",
      category: "Người",
      difficulty: "easy"
    },
    {
      id: 14,
      image: "🏫",
      korean: "학교",
      pronunciation: "/ hakgyo /",
      vietnamese: "Trường học",
      category: "Địa điểm",
      difficulty: "medium"
    },
    {
      id: 15,
      image: "💻",
      korean: "컴퓨터",
      pronunciation: "/ keompyuteo /",
      vietnamese: "Máy tính",
      category: "Đồ vật",
      difficulty: "medium"
    }
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState(new Set());
  const [favoriteCards, setFavoriteCards] = useState(new Set());
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledCards, setShuffledCards] = useState(flashcards);
  const [showStats, setShowStats] = useState(false);

  const currentCards = isShuffled ? shuffledCards : flashcards;
  const currentCard = currentCards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / currentCards.length) * 100;

  // Text-to-speech function
  const speakKorean = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentCard.korean);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  // Navigation functions
  const nextCard = () => {
    if (currentCardIndex < currentCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      // Mark as studied when flipped to see answer
      setStudiedCards(new Set([...studiedCards, currentCard.id]));
    }
  };

  const toggleFavorite = () => {
    const newFavorites = new Set(favoriteCards);
    if (favoriteCards.has(currentCard.id)) {
      newFavorites.delete(currentCard.id);
    } else {
      newFavorites.add(currentCard.id);
    }
    setFavoriteCards(newFavorites);
  };

  const shuffleCards = () => {
    if (!isShuffled) {
      const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
      setShuffledCards(shuffled);
      setIsShuffled(true);
      setCurrentCardIndex(0);
      setIsFlipped(false);
    } else {
      setIsShuffled(false);
      setCurrentCardIndex(0);
      setIsFlipped(false);
    }
  };

  const resetProgress = () => {
    setStudiedCards(new Set());
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Địa điểm': 'bg-blue-100 text-blue-800',
      'Thức ăn': 'bg-orange-100 text-orange-800',
      'Đồ vật': 'bg-purple-100 text-purple-800',
      'Phương tiện': 'bg-indigo-100 text-indigo-800',
      'Thiên nhiên': 'bg-green-100 text-green-800',
      'Nghề nghiệp': 'bg-pink-100 text-pink-800',
      'Giải trí': 'bg-yellow-100 text-yellow-800',
      'Người': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && currentCardIndex < currentCards.length - 1) {
        nextCard();
      } else if (e.key === 'ArrowLeft' && currentCardIndex > 0) {
        prevCard();
      } else if (e.key === ' ') {
        e.preventDefault();
        flipCard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCardIndex, currentCards.length]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900">
        <button 
            onClick={() => navigate(-1)}
        className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          <span>Quay lại</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={shuffleCards}
            className={`p-2 rounded-lg transition-colors ${isShuffled ? 'bg-yellow-500 text-black' : 'text-yellow-400 hover:bg-gray-800'}`}
            title={isShuffled ? 'Tắt xáo trộn' : 'Xáo trộn thẻ'}
          >
            <Shuffle size={20} />
          </button>
          
          <div className="text-sm">
            <span className="text-yellow-400">{studiedCards.size}</span>
            <span className="text-gray-400">/{currentCards.length} đã học</span>
          </div>
        </div>
      </div>
      
      {/* Card Navigation */}
      <div className="flex justify-between items-center px-6 py-2">
        <button 
          onClick={prevCard}
          disabled={currentCardIndex === 0}
          className="p-2 text-yellow-400 disabled:text-gray-600 disabled:cursor-not-allowed hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-400">
            {currentCardIndex + 1} / {currentCards.length}
          </div>
          
          <div className={`px-3 py-1 rounded-full text-xs ${getCategoryColor(currentCard.category)}`}>
            {currentCard.category}
          </div>
        </div>
        
        <button 
          onClick={nextCard}
          disabled={currentCardIndex === currentCards.length - 1}
          className="p-2 text-yellow-400 disabled:text-gray-600 disabled:cursor-not-allowed hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Main Card */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div 
          className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center cursor-pointer transform transition-all hover:scale-105 relative"
          onClick={flipCard}
        >
          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
            className="absolute top-4 right-4 text-yellow-500 hover:text-yellow-600 transition-colors"
          >
            {favoriteCards.has(currentCard.id) ? <Star size={20} fill="currentColor" /> : <StarOff size={20} />}
          </button>
          
          {/* Difficulty badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentCard.difficulty)}`}>
              {currentCard.difficulty.toUpperCase()}
            </span>
          </div>
          
          {!isFlipped ? (
            /* Front of card */
            <div className="pt-8">
              <div className="text-9xl mb-6">{currentCard.image}</div>
              <div className="text-gray-500 text-lg mb-4">Từ này có nghĩa gì?</div>
              <div className="text-gray-400 text-sm">Nhấn để xem đáp án</div>
              <div className="text-gray-300 text-xs mt-4">Hoặc nhấn Space</div>
            </div>
          ) : (
            /* Back of card */
            <div className="pt-8">
              <div className="text-7xl mb-4">{currentCard.image}</div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{currentCard.korean}</h1>
              <div className="text-gray-600 text-lg mb-2">{currentCard.pronunciation}</div>
              <div className="text-gray-700 text-xl font-semibold mb-4">{currentCard.vietnamese}</div>
              <div className="text-gray-400 text-sm">Nhấn để lật lại</div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                speakKorean();
              }}
              className="p-3 rounded-full hover:bg-gray-100 transition-colors"
              title="Phát âm"
            >
              <Volume2 size={20} className="text-gray-600" />
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                flipCard();
              }}
              className="p-3 rounded-full hover:bg-gray-100 transition-colors"
              title="Lật thẻ"
            >
              <RotateCcw size={20} className="text-gray-600" />
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                resetProgress();
              }}
              className="p-3 rounded-full hover:bg-gray-100 transition-colors"
              title="Reset tiến độ"
            >
              <BookOpen size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="px-8 pb-4">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Tiến độ học</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      {/* Bottom Stats */}
      <div className="flex justify-center items-center pb-8 space-x-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">{studiedCards.size}</div>
          <div className="text-xs text-gray-400">Đã xem</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-pink-400">{favoriteCards.size}</div>
          <div className="text-xs text-gray-400">Yêu thích</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{currentCards.length - studiedCards.size}</div>
          <div className="text-xs text-gray-400">Còn lại</div>
        </div>
      </div>
      
      {/* Keyboard shortcuts info */}
      <div className="text-center pb-4">
        <div className="text-xs text-gray-500">
          ← → để chuyển thẻ • Space để lật • Nhấn thẻ để tương tác
        </div>
      </div>
    </div>
  );
};

export default VocabularyFlashcard;