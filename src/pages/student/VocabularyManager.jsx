import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookMarked, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash, 
  Star, 
  Volume2,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Calendar,
  Tag,
  BookOpen,
  PenTool,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Play 
} from 'lucide-react';
import Card from '../../components/common/Card';
import StudentLayout from '../../components/layout/StudentLayout';

const VocabularyManager = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [userInput, setUserInput] = useState(''); // For Nghe viết
  const [userText, setUserText] = useState('');   // For Luyện viết
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // For Luyện viết word progression
  const [feedback, setFeedback] = useState(''); 
    // Feedback message for Luyện viết

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'family', name: 'Gia đình' },
    { id: 'food', name: 'Thức ăn' },
    { id: 'travel', name: 'Du lịch' },
    { id: 'business', name: 'Kinh doanh' },
    { id: 'emotions', name: 'Cảm xúc' },
    { id: 'colors', name: 'Màu sắc' },
    { id: 'numbers', name: 'Số đếm' }
  ];

  const levels = [
    { id: 'all', name: 'Tất cả' },
    { id: 'beginner', name: 'Sơ cấp' },
    { id: 'intermediate', name: 'Trung cấp' },
    { id: 'advanced', name: 'Cao cấp' }
  ];

  const mockVocabulary = [
    {
      id: 1,
      korean: '안녕하세요',
      vietnamese: 'Xin chào',
      pronunciation: 'an-nyeong-ha-se-yo',
      english: 'Hello',
      category: 'greetings',
      level: 'beginner',
      example: '안녕하세요, 저는 마이클입니다.',
      exampleTranslation: 'Xin chào, tôi là Michael.',
      dateAdded: '2024-01-15',
      reviewCount: 5,
      isFavorite: true
    },
    {
      id: 2,
      korean: '감사합니다',
      vietnamese: 'Cảm ơn',
      pronunciation: 'gam-sa-ham-ni-da',
      english: 'Thank you',
      category: 'greetings',
      level: 'beginner',
      example: '감사합니다, 선생님.',
      exampleTranslation: 'Cảm ơn, thầy/cô.',
      dateAdded: '2024-01-16',
      reviewCount: 3,
      isFavorite: false
    },
    {
      id: 3,
      korean: '가족',
      vietnamese: 'Gia đình',
      pronunciation: 'ga-jok',
      english: 'Family',
      category: 'family',
      level: 'beginner',
      example: '우리 가족은 4명입니다.',
      exampleTranslation: 'Gia đình tôi có 4 người.',
      dateAdded: '2024-01-17',
      reviewCount: 2,
      isFavorite: true
    },
    {
      id: 4,
      korean: '맛있다',
      vietnamese: 'Ngon',
      pronunciation: 'ma-sit-da',
      english: 'Delicious',
      category: 'food',
      level: 'beginner',
      example: '이 음식이 정말 맛있어요.',
      exampleTranslation: 'Món ăn này thực sự rất ngon.',
      dateAdded: '2024-01-18',
      reviewCount: 1,
      isFavorite: false
    },
    {
      id: 5,
      korean: '여행',
      vietnamese: 'Du lịch',
      pronunciation: 'yeo-haeng',
      english: 'Travel',
      category: 'travel',
      level: 'intermediate',
      example: '한국에 여행 가고 싶어요.',
      exampleTranslation: 'Tôi muốn đi du lịch Hàn Quốc.',
      dateAdded: '2024-01-19',
      reviewCount: 0,
      isFavorite: false
    }
  ];

  const filteredVocabulary = mockVocabulary.filter(word => {
    const matchesSearch = word.korean.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         word.vietnamese.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         word.english.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || word.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || word.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleFavoriteToggle = (wordId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(wordId)) {
        newFavorites.delete(wordId);
      } else {
        newFavorites.add(wordId);
      }
      return newFavorites;
    });
  };

  const handleNextFlashcard = () => {
    setCurrentFlashcard(prev => (prev + 1) % filteredVocabulary.length);
    setShowAnswer(false);
  };

  const handlePrevFlashcard = () => {
    setCurrentFlashcard(prev => prev === 0 ? filteredVocabulary.length - 1 : prev - 1);
    setShowAnswer(false);
  };

  const currentWord = filteredVocabulary[currentFlashcard];
  const practiceWord = filteredVocabulary[currentWordIndex % filteredVocabulary.length];

  const handleCheckAnswer = () => {
    const trimmedInput = userText.trim();
    if (trimmedInput === practiceWord.korean) {
      setFeedback('Đúng! Chuyển sang từ tiếp theo.');
      setUserText('');
      setTimeout(() => {
        setCurrentWordIndex(prev => prev + 1);
        setFeedback('');
      }, 1000);
    } else {
      setFeedback('Sai! Hãy thử lại. Gợi ý: ' + practiceWord.pronunciation);
    }
  };

  const handleHint = () => {
    setFeedback('Gợi ý: ' + practiceWord.pronunciation);
  };

  const renderFlashcard = () => {
    if (!currentWord) return null;

    return (
      <div className="max-w-md mx-auto">
        <Card className="p-8 text-center">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => handleFavoriteToggle(currentWord.id)}
                className={`p-2 rounded-full ${
                  favorites.has(currentWord.id) 
                    ? 'text-yellow-500 bg-yellow-50' 
                    : 'text-gray-400 hover:text-yellow-500'
                }`}
              >
                <Star className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-500">
                {currentFlashcard + 1} / {filteredVocabulary.length}
              </span>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {showAnswer ? currentWord.vietnamese : currentWord.korean}
              </h2>
              {showAnswer && (
                <p className="text-lg text-gray-600 mb-2">{currentWord.pronunciation}</p>
              )}
              {showAnswer && (
                <p className="text-sm text-gray-500">{currentWord.english}</p>
              )}
            </div>

            {showAnswer && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">Ví dụ:</p>
                <p className="text-gray-900 mb-1">{currentWord.example}</p>
                <p className="text-sm text-gray-600">{currentWord.exampleTranslation}</p>
              </div>
            )}

            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showAnswer ? 'Ẩn đáp án' : 'Xem đáp án'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevFlashcard}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentFlashcard(0)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextFlashcard}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </Card>
      </div>
    );
  };

  const renderVocabularyList = () => {
    return (
      <div className="space-y-4">
        {filteredVocabulary.map((word) => (
          <Card key={word.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{word.korean}</h3>
                  <button
                    onClick={() => handleFavoriteToggle(word.id)}
                    className={`p-1 rounded ${
                      favorites.has(word.id) 
                        ? 'text-yellow-500' 
                        : 'text-gray-400 hover:text-yellow-500'
                    }`}
                  >
                    <Star className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-600 mb-1">{word.vietnamese}</p>
                <p className="text-sm text-gray-500 mb-2">{word.pronunciation} • {word.english}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Tag className="w-3 h-3" />
                    <span>{categories.find(c => c.id === word.category)?.name}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{levels.find(l => l.id === word.level)?.name}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{word.dateAdded}</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Volume2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-600">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600">
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const renderListenWrite = () => {
    const mockAudioUrl = 'https://example.com/sample-audio.mp3'; // Placeholder audio URL

    return (
      <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Nghe viết
        </h3>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <button className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
              <Play className="w-5 h-5" />
            </button>
            <audio controls className="w-full">
              <source src={mockAudioUrl} type="audio/mp3" />
              Trình duyệt của bạn không hỗ trợ thẻ audio.
            </audio>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Viết lại những gì bạn nghe</label>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Nhập văn bản ở đây..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 bg-white/80 backdrop-blur-sm h-32 resize-y"
            />
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg">
            Kiểm tra
          </button>
        </div>
      </Card>
    );
  };

  const renderPracticeWrite = () => {
    return (
      <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          Luyện viết
        </h3>
        <div className="space-y-6">
          <div>
            <p className="text-lg font-semibold text-gray-700 mb-2">Từ tiếng Việt: {practiceWord.vietnamese}</p>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Viết bằng tiếng Hàn</label>
            <textarea
              value={userText}
              onChange={(e) => {
                setUserText(e.target.value);
                setFeedback(''); // Clear feedback when user starts typing
              }}
              placeholder="Nhập từ tiếng Hàn ở đây..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm h-24 resize-y"
            />
            {feedback && (
              <p className={`mt-2 text-sm ${feedback.includes('Đúng') ? 'text-green-600' : 'text-red-600'}`}>
                {feedback}
              </p>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleCheckAnswer}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Kiểm tra
            </button>
            <button
              onClick={handleHint}
              className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 hover:scale-105"
            >
              Gợi ý
            </button>
            <button
              onClick={() => {
                setUserText('');
                setCurrentWordIndex(prev => prev + 1);
                setFeedback('');
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105"
            >
              Tiếp theo
            </button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý từ vựng</h1>
            <p className="text-gray-600">Học và quản lý từ vựng cá nhân của bạn</p>
          </div>
          <button 
            onClick={() => navigate('/student/vocabulary/add')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            <span>Thêm từ mới</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <BookMarked className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{mockVocabulary.length}</p>
                <p className="text-sm text-gray-500">Tổng từ vựng</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{favorites.size}</p>
                <p className="text-sm text-gray-500">Từ yêu thích</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-500">Đã học hôm nay</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <PenTool className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">85%</p>
                <p className="text-sm text-gray-500">Tỷ lệ nhớ</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-6 py-3 text-sm font-semibold rounded-t-xl transition-all duration-300 hover:scale-105 ${
              activeTab === 'list'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/80 backdrop-blur-sm'
            }`}
          >
            Danh sách từ vựng
          </button>
          <button
            onClick={() => setActiveTab('flashcard')}
            className={`px-6 py-3 text-sm font-semibold rounded-t-xl transition-all duration-300 hover:scale-105 ${
              activeTab === 'flashcard'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/80 backdrop-blur-sm'
            }`}
          >
            Học bằng flashcard
          </button>
          <button
            onClick={() => setActiveTab('listenWrite')}
            className={`px-6 py-3 text-sm font-semibold rounded-t-xl transition-all duration-300 hover:scale-105 ${
              activeTab === 'listenWrite'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/80 backdrop-blur-sm'
            }`}
          >
            Nghe viết
          </button>
          <button
            onClick={() => setActiveTab('practiceWrite')}
            className={`px-6 py-3 text-sm font-semibold rounded-t-xl transition-all duration-300 hover:scale-105 ${
              activeTab === 'practiceWrite'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/80 backdrop-blur-sm'
            }`}
          >
            Luyện viết
          </button>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm từ vựng..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cấp độ</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {levels.map(level => (
                  <option key={level.id} value={level.id}>{level.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Lọc</span>
              </button>
            </div>
          </div>
        </Card>

        {/* Content */}
        <div className="min-h-[400px]">
          {activeTab === 'list' && renderVocabularyList()}
          {activeTab === 'flashcard' && renderFlashcard()}
          {activeTab === 'listenWrite' && renderListenWrite()}
          {activeTab === 'practiceWrite' && renderPracticeWrite()}
        </div>

        {/* Empty State */}
        {filteredVocabulary.length === 0 && (
          <Card className="p-8 text-center">
            <BookMarked className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy từ vựng</h3>
            <p className="text-gray-500 mb-4">Thử thay đổi bộ lọc hoặc thêm từ vựng mới</p>
            <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Thêm từ vựng đầu tiên
            </button>
          </Card>
        )}
      </div>
    </StudentLayout>
  );
};

export default VocabularyManager;