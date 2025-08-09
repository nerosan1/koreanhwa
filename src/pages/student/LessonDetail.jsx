import React, { useState } from 'react';
import { 
  Play, 
  BookOpen, 
  Headphones, 
  PenTool, 
  MessageSquare, 
  Brain,
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  BookMarked,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Search,
  Book,
  FileText,
  Video,
  Mic
} from 'lucide-react';
import Card from '../../components/common/Card';
import StudentLayout from '../../components/layout/StudentLayout';

const LessonDetail = () => {
  const [activeTab, setActiveTab] = useState('video');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showVocabularyModal, setShowVocabularyModal] = useState(false);
  const [showDictionaryModal, setShowDictionaryModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('beginner');

  // Mock lesson data
  const lessonData = {
    id: 1,
    title: 'Bài 1: Chào hỏi cơ bản',
    level: 'Sơ cấp 1',
    duration: '45 phút',
    progress: 60,
    videoUrl: 'https://example.com/video.mp4',
    vocabulary: [
      { korean: '안녕하세요', vietnamese: 'Xin chào', pronunciation: 'an-nyeong-ha-se-yo', example: '안녕하세요, 저는 마이클입니다.' },
      { korean: '감사합니다', vietnamese: 'Cảm ơn', pronunciation: 'gam-sa-ham-ni-da', example: '감사합니다, 선생님.' },
      { korean: '안녕히 가세요', vietnamese: 'Tạm biệt', pronunciation: 'an-nyeong-hi ga-se-yo', example: '안녕히 가세요, 내일 봐요.' },
      { korean: '네', vietnamese: 'Vâng', pronunciation: 'ne', example: '네, 알겠습니다.' },
      { korean: '아니요', vietnamese: 'Không', pronunciation: 'a-ni-yo', example: '아니요, 모르겠습니다.' }
    ],
    grammar: [
      {
        title: 'Cấu trúc chào hỏi',
        explanation: '안녕하세요 được sử dụng để chào hỏi một cách lịch sự',
        examples: [
          '안녕하세요, 저는 [이름]입니다. (Xin chào, tôi là [tên])',
          '안녕하세요, 만나서 반갑습니다. (Xin chào, rất vui được gặp bạn)'
        ]
      }
    ],
    exercises: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Cách chào hỏi lịch sự trong tiếng Hàn là gì?',
        options: ['안녕', '안녕하세요', '안녕히 가세요', '감사합니다'],
        correct: 1
      },
      {
        id: 2,
        type: 'fill_blank',
        question: 'Điền từ thích hợp: "안녕하세요, 저는 마이클___입니다."',
        answer: '입니다'
      }
    ]
  };

  const lessonList = {
    beginner: [
      { id: 1, title: 'Bài 1: Chào hỏi cơ bản', completed: true, current: true },
      { id: 2, title: 'Bài 2: Giới thiệu bản thân', completed: false, current: false },
      { id: 3, title: 'Bài 3: Số đếm cơ bản', completed: false, current: false },
      { id: 4, title: 'Bài 4: Thời gian', completed: false, current: false },
      { id: 5, title: 'Bài 5: Gia đình', completed: false, current: false }
    ],
    intermediate: [
      { id: 6, title: 'Bài 6: Ngữ pháp nâng cao', completed: false, current: false },
      { id: 7, title: 'Bài 7: Giao tiếp hàng ngày', completed: false, current: false }
    ],
    advanced: [
      { id: 8, title: 'Bài 8: Văn hóa Hàn Quốc', completed: false, current: false },
      { id: 9, title: 'Bài 9: Thương mại', completed: false, current: false }
    ]
  };

  const relatedSuggestions = [
    { id: 1, title: 'Bài học về ngữ pháp', type: 'grammar', level: 'Sơ cấp 1' },
    { id: 2, title: 'Luyện nghe cơ bản', type: 'listening', level: 'Sơ cấp 1' },
    { id: 3, title: 'Từ vựng chủ đề gia đình', type: 'vocabulary', level: 'Sơ cấp 1' }
  ];

  const tabs = [
    { id: 'video', name: 'Video bài giảng', icon: Video },
    { id: 'vocabulary', name: 'Từ vựng', icon: BookMarked },
    { id: 'listening', name: 'Luyện nghe', icon: Headphones },
    { id: 'grammar', name: 'Ngữ pháp', icon: BookOpen },
    { id: 'exercise', name: 'Bài tập', icon: PenTool },
    { id: 'ai-chat', name: 'Chat AI', icon: Brain }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'video':
        return (
          <div className="space-y-4">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-white mx-auto mb-4" />
                  <p className="text-white">Video bài giảng</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setIsMuted(!isMuted)} className="text-white">
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <div className="w-32 bg-gray-600 rounded-full h-1">
                      <div className="bg-white h-1 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <button onClick={() => setIsFullscreen(!isFullscreen)} className="text-white">
                    {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{lessonData.title}</h3>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">{lessonData.duration}</span>
              </div>
            </div>
          </div>
        );

      case 'vocabulary':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Từ vựng bài học</h3>
              <button 
                onClick={() => setShowVocabularyModal(true)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Học bằng flashcard
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lessonData.vocabulary.map((word, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-lg">{word.korean}</h4>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-600">{word.vietnamese}</p>
                    <p className="text-sm text-gray-500">{word.pronunciation}</p>
                    <p className="text-xs text-gray-400 italic">{word.example}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'listening':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Luyện nghe</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Bài tập 1: Nghe và chọn đáp án đúng</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Nghe câu sau và chọn nghĩa đúng:</p>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-blue-100 rounded-full">
                      <Play className="w-4 h-4 text-blue-600" />
                    </button>
                    <span className="text-sm">안녕하세요, 저는 마이클입니다.</span>
                  </div>
                  <div className="space-y-2 mt-4">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="listening1" className="text-blue-600" />
                      <span className="text-sm">A. Xin chào, tôi là Michael</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="listening1" className="text-blue-600" />
                      <span className="text-sm">B. Tạm biệt, tôi là Michael</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="listening1" className="text-blue-600" />
                      <span className="text-sm">C. Cảm ơn, tôi là Michael</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'grammar':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ngữ pháp</h3>
            {lessonData.grammar.map((grammar, index) => (
              <Card key={index} className="p-4">
                <h4 className="font-medium text-lg mb-2">{grammar.title}</h4>
                <p className="text-gray-600 mb-3">{grammar.explanation}</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Ví dụ:</p>
                  {grammar.examples.map((example, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded">
                      <p className="text-sm">{example}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        );

      case 'exercise':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bài tập kiểm tra</h3>
            <div className="space-y-4">
              {lessonData.exercises.map((exercise, index) => (
                <Card key={exercise.id} className="p-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Câu {index + 1}: {exercise.question}</h4>
                    {exercise.type === 'multiple_choice' && (
                      <div className="space-y-2">
                        {exercise.options.map((option, idx) => (
                          <label key={idx} className="flex items-center space-x-2">
                            <input type="radio" name={`exercise${exercise.id}`} className="text-blue-600" />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {exercise.type === 'fill_blank' && (
                      <div>
                        <input 
                          type="text" 
                          placeholder="Nhập đáp án..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
              <div className="flex justify-end">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Nộp bài
                </button>
              </div>
            </div>
          </div>
        );

      case 'ai-chat':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Chat với AI</h3>
            <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="bg-white p-3 rounded-lg max-w-xs">
                    <p className="text-sm">Xin chào! Tôi có thể giúp gì cho bạn về bài học hôm nay?</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2 justify-end">
                  <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                    <p className="text-sm">Tôi muốn luyện phát âm từ "안녕하세요"</p>
                  </div>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <Mic className="w-4 h-4" />
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Gửi
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <StudentLayout>
      <div className="flex h-full">
        {/* Left Sidebar - Lesson List */}
        <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Danh sách bài học</h3>
            <div className="flex space-x-1">
              {['beginner', 'intermediate', 'advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-3 py-1 text-sm rounded ${
                    selectedLevel === level 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level === 'beginner' ? 'Sơ cấp' : level === 'intermediate' ? 'Trung cấp' : 'Cao cấp'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            {lessonList[selectedLevel].map((lesson) => (
              <div
                key={lesson.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  lesson.current 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${
                      lesson.current ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {lesson.title}
                    </p>
                    <p className="text-xs text-gray-500">45 phút</p>
                  </div>
                  {lesson.completed && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{lessonData.title}</h2>
                  <p className="text-sm text-gray-500">{lessonData.level} • {lessonData.duration}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${lessonData.progress}%` }}></div>
                </div>
                <span className="text-sm text-gray-600">{lessonData.progress}%</span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex">
            {/* Center Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* Tabs */}
              <div className="flex space-x-1 mb-6 border-b border-gray-200">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="min-h-[500px]">
                {renderTabContent()}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-80 bg-gray-50 p-4 overflow-y-auto">
              <div className="space-y-4">
                {/* Dictionary */}
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">Từ điển nhanh</h3>
                    <button 
                      onClick={() => setShowDictionaryModal(true)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Mở rộng
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-2 bg-white rounded border">
                      <Search className="w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Tra từ..."
                        className="flex-1 text-sm border-none outline-none"
                      />
                    </div>
                  </div>
                </Card>

                {/* Related Suggestions */}
                <Card className="p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Gợi ý liên quan</h3>
                  <div className="space-y-2">
                    {relatedSuggestions.map((suggestion) => (
                      <div key={suggestion.id} className="p-2 bg-white rounded border cursor-pointer hover:bg-gray-50">
                        <p className="text-sm font-medium text-gray-900">{suggestion.title}</p>
                        <p className="text-xs text-gray-500">{suggestion.level}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Progress */}
                <Card className="p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Tiến độ bài học</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Video</span>
                        <span>60%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Từ vựng</span>
                        <span>40%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Bài tập</span>
                        <span>0%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default LessonDetail; 