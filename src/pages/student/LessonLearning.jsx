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
  Mic,
  User
} from 'lucide-react';

const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  );
};

const StudentLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
};

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

const lessonList = [
  { id: 1, title: 'Bài 1: Chào hỏi cơ bản', completed: true, current: true },
  { id: 2, title: 'Bài 2: Giới thiệu bản thân', completed: false, current: false, unlocked: true },
  { id: 3, title: 'Bài 3: Số đếm cơ bản', completed: false, current: false, unlocked: false },
  { id: 4, title: 'Bài 4: Thời gian', completed: false, current: false, unlocked: false },
  { id: 5, title: 'Bài 5: Gia đình', completed: false, current: false, unlocked: false },
  { id: 6, title: 'Bài 6: Ngữ pháp nâng cao', completed: false, current: false, unlocked: false },
  { id: 7, title: 'Bài 7: Giao tiếp hàng ngày', completed: false, current: false, unlocked: false },
  { id: 8, title: 'Bài 8: Văn hóa Hàn Quốc', completed: false, current: false, unlocked: false },
  { id: 9, title: 'Bài 9: Thương mại', completed: false, current: false, unlocked: false }
];

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
              <div className="aspect-video bg-black flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <p className="text-white">Video bài giảng</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setIsMuted(!isMuted)} className="text-white hover:text-yellow-400">
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <div className="w-32 bg-gray-600 rounded-full h-1">
                      <div className="bg-yellow-400 h-1 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <button onClick={() => setIsFullscreen(!isFullscreen)} className="text-white hover:text-yellow-400">
                    {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-black">{lessonData.title}</h3>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-black" />
                <span className="text-sm text-black">{lessonData.duration}</span>
              </div>
            </div>
          </div>
        );

      case 'vocabulary':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-black">Từ vựng bài học</h3>
              <button 
                onClick={() => setShowVocabularyModal(true)}
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 text-sm font-medium"
              >
                Học bằng flashcard
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lessonData.vocabulary.map((word, index) => (
                <Card key={index} className="p-4 border border-black">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-lg text-black">{word.korean}</h4>
                      <button className="text-black hover:text-yellow-400">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-black font-medium">{word.vietnamese}</p>
                    <p className="text-sm text-black bg-yellow-100 px-2 py-1 rounded">{word.pronunciation}</p>
                    <p className="text-xs text-black italic bg-gray-100 px-2 py-1 rounded">{word.example}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'listening':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">Luyện nghe</h3>
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-black p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-black">Bài tập 1: Nghe và chọn đáp án đúng</h4>
                <div className="space-y-2">
                  <p className="text-sm text-black">Nghe câu sau và chọn nghĩa đúng:</p>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-yellow-400 rounded-full hover:bg-yellow-500">
                      <Play className="w-4 h-4 text-black" />
                    </button>
                    <span className="text-sm text-black font-medium">안녕하세요, 저는 마이클입니다.</span>
                  </div>
                  <div className="space-y-2 mt-4">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="listening1" className="accent-yellow-400" />
                      <span className="text-sm text-black">A. Xin chào, tôi là Michael</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="listening1" className="accent-yellow-400" />
                      <span className="text-sm text-black">B. Tạm biệt, tôi là Michael</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="listening1" className="accent-yellow-400" />
                      <span className="text-sm text-black">C. Cảm ơn, tôi là Michael</span>
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
            <h3 className="text-lg font-semibold text-black">Ngữ pháp</h3>
            {lessonData.grammar.map((grammar, index) => (
              <Card key={index} className="p-4 border border-black">
                <h4 className="font-medium text-lg mb-2 text-black bg-yellow-100 px-3 py-1 rounded">{grammar.title}</h4>
                <p className="text-black mb-3">{grammar.explanation}</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-black">Ví dụ:</p>
                  {grammar.examples.map((example, idx) => (
                    <div key={idx} className="bg-black text-white p-3 rounded">
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
            <h3 className="text-lg font-semibold text-black">Bài tập kiểm tra</h3>
            <div className="space-y-4">
              {lessonData.exercises.map((exercise, index) => (
                <Card key={exercise.id} className="p-4 border border-black">
                  <div className="space-y-3">
                    <h4 className="font-medium text-black bg-yellow-100 px-3 py-2 rounded">Câu {index + 1}: {exercise.question}</h4>
                    {exercise.type === 'multiple_choice' && (
                      <div className="space-y-2">
                        {exercise.options.map((option, idx) => (
                          <label key={idx} className="flex items-center space-x-2">
                            <input type="radio" name={`exercise${exercise.id}`} className="accent-yellow-400" />
                            <span className="text-sm text-black">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {exercise.type === 'fill_blank' && (
                      <div>
                        <input 
                          type="text" 
                          placeholder="Nhập đáp án..."
                          className="w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
              <div className="flex justify-end">
                <button className="bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 font-medium border border-black">
                  Nộp bài
                </button>
              </div>
            </div>
          </div>
        ); 

      case 'ai-chat':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">Chat với AI</h3>
            <div className=" rounded-lg p-4 h-64 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-black" />
                  </div>
                  <div className="bg-white p-3 rounded-lg max-w-xs border border-yellow-400">
                    <p className="text-sm text-black">Xin chào! Tôi có thể giúp gì cho bạn về bài học hôm nay?</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2 justify-end">
                  <div className="bg-yellow-400 text-black p-3 rounded-lg max-w-xs border border-white">
                    <p className="text-sm font-medium">Tôi muốn luyện phát âm từ "안녕하세요"</p>
                  </div>
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-black" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-3 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 border border-black">
                <Mic className="w-4 h-4" />
              </button>
              <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 font-medium border border-black">
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
      <div className="flex h-screen">
        {/* Left Sidebar - Lesson List */}
        <div className="w-80 bg-white border-r-2 border-gray-300 p-6 overflow-y-auto">


          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-4">
              Danh sách bài học
            </h3>
          </div>
          
        <div className="space-y-3">
        {lessonList.map((lesson, index) => {
            // Kiểm tra nếu bài trước đó đã hoàn thành hoặc là bài đầu tiên
            const isUnlocked = index === 0 || lessonList[index - 1].completed;
            if (!isUnlocked) return null; // Không hiển thị nếu chưa mở khóa

            return (
            <div
                key={lesson.id}
                className={`p-4 rounded-lg cursor-pointer transition-colors border ${
                lesson.current 
                    ? 'bg-yellow-100 border-yellow-400' 
                    : 'bg-white border-gray-300 hover:bg-yellow-50'
                }`}
            >
                <div className="flex items-center justify-between">
                <div>
                    <p className={`text-sm font-medium ${
                    lesson.current ? 'text-black' : 'text-gray-700'
                    }`}>
                    {lesson.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">45 phút</p>
                </div>
                {lesson.completed && (
                    <CheckCircle className="w-5 h-5 text-yellow-400" />
                )}
                </div>
            </div>
            );
        })}
        </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <div className="bg-black border-b-4 border-yellow-400 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="text-white hover:text-yellow-400">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="text-xl font-bold text-white">{lessonData.title}</h2>
                  <p className="text-sm text-yellow-400">{lessonData.level} • {lessonData.duration}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-700 rounded-full h-3">
                  <div className="bg-yellow-400 h-3 rounded-full" style={{ width: `${lessonData.progress}%` }}></div>
                </div>
                <span className="text-sm text-white font-medium">{lessonData.progress}%</span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex">
            {/* Center Content */}
            <div className="flex-1 p-6 overflow-y-auto bg-white">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b-2 border-black">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors border border-black ${
                        activeTab === tab.id
                          ? 'bg-yellow-400 text-black'
                          : 'bg-white text-black hover:bg-yellow-100'
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
            <div className="w-80 bg-yellow-50 p-4 overflow-y-auto border-l-2 border-gray-300">
              <div className="space-y-4">
                {/* Dictionary */}
                <Card className="p-4 border border-black">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-black">Từ điển nhanh</h3>
                    <button 
                      onClick={() => setShowDictionaryModal(true)}
                      className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 text-sm font-medium border border-black"
                    >
                      Mở rộng
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-2 bg-white rounded border border-black">
                      <Search className="w-4 h-4 text-black" />
                      <input 
                        type="text" 
                        placeholder="Tra từ..."
                        className="flex-1 text-sm border-none outline-none text-black"
                      />
                    </div>
                  </div>
                </Card>

                {/* Progress */}
                <Card className="p-4 border border-black">
                  <h3 className="font-medium text-black mb-3">Tiến độ bài học</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2 font-medium">
                        <span className="text-black">Video</span>
                        <span className="text-black">60%</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-3 border border-black">
                        <div className="bg-yellow-400 h-3 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2 font-medium">
                        <span className="text-black">Từ vựng</span>
                        <span className="text-black">40%</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-3 border border-black">
                        <div className="bg-black h-3 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2 font-medium">
                        <span className="text-black">Bài tập</span>
                        <span className="text-black">0%</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-3 border border-black">
                        <div className="bg-yellow-400 h-3 rounded-full" style={{ width: '0%' }}></div>
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