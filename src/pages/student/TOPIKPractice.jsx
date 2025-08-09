import React, { useState } from 'react';
import { 
  Headphones, 
  BookOpen, 
  PenTool, 
  BookMarked, 
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Star,
  Target,
  BarChart3,
  FileText,
  Mic,
  Brain
} from 'lucide-react';
import Card from '../../components/common/Card';
import StudentLayout from '../../components/layout/StudentLayout';

const TOPIKPractice = () => {
  const [activeSkill, setActiveSkill] = useState('listening');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const skills = [
    { id: 'listening', name: 'Nghe', icon: Headphones, color: 'blue' },
    { id: 'reading', name: 'Đọc', icon: BookOpen, color: 'green' },
    { id: 'writing', name: 'Viết', icon: PenTool, color: 'purple' },
    { id: 'vocabulary', name: 'Từ vựng', icon: BookMarked, color: 'orange' },
    { id: 'video', name: 'Video chữa đề', icon: Video, color: 'red' }
  ];

  const mockQuestions = {
    listening: [
      {
        id: 1,
        type: 'audio',
        question: 'Nghe đoạn hội thoại và chọn đáp án đúng:',
        audioUrl: 'audio1.mp3',
        options: [
          'A. Người phụ nữ muốn mua một chiếc áo',
          'B. Người phụ nữ muốn đổi chiếc áo',
          'C. Người phụ nữ muốn trả lại chiếc áo',
          'D. Người phụ nữ muốn thử chiếc áo'
        ],
        correct: 1,
        explanation: 'Trong đoạn hội thoại, người phụ nữ nói "이 옷을 바꿔주세요" (Hãy đổi chiếc áo này cho tôi)'
      },
      {
        id: 2,
        type: 'audio',
        question: 'Nghe và điền từ còn thiếu:',
        audioUrl: 'audio2.mp3',
        text: '안녕하세요, 저는 ___ 입니다.',
        answer: '학생',
        explanation: 'Dựa vào ngữ cảnh, từ còn thiếu là "학생" (học sinh)'
      }
    ],
    reading: [
      {
        id: 3,
        type: 'text',
        question: 'Đọc đoạn văn và trả lời câu hỏi:',
        text: `한국어는 한국의 공식 언어입니다. 한국어는 약 7,500만 명의 사람들이 사용하고 있습니다. 한국어는 조선어라고도 불리며, 한국과 조선민주주의인민공화국에서 사용됩니다.`,
        question: '한국어를 사용하는 사람은 몇 명입니까?',
        options: [
          'A. 약 5,000만 명',
          'B. 약 7,500만 명', 
          'C. 약 1억 명',
          'D. 약 1억 5천만 명'
        ],
        correct: 1,
        explanation: 'Đoạn văn có ghi "약 7,500만 명" (khoảng 75 triệu người)'
      }
    ],
    writing: [
      {
        id: 4,
        type: 'essay',
        question: 'Viết một đoạn văn ngắn (150-200 từ) về chủ đề: "내가 좋아하는 계절" (Mùa tôi thích)',
        requirements: [
          'Sử dụng từ vựng phù hợp',
          'Cấu trúc câu đúng ngữ pháp',
          'Ý tưởng rõ ràng, logic',
          'Độ dài 150-200 từ'
        ],
        sampleAnswer: '저는 봄을 가장 좋아합니다. 봄에는 날씨가 따뜻하고 꽃들이 피어서 정말 아름답습니다...'
      }
    ],
    vocabulary: [
      {
        id: 5,
        type: 'multiple_choice',
        question: 'Chọn từ đồng nghĩa với "아름답다":',
        options: [
          'A. 예쁘다',
          'B. 크다',
          'C. 작다', 
          'D. 빠르다'
        ],
        correct: 0,
        explanation: '"아름답다" và "예쁘다" đều có nghĩa là đẹp'
      }
    ]
  };

  const currentQuestions = mockQuestions[activeSkill] || [];
  const currentQuestionData = currentQuestions[currentQuestion];

  const handleAnswerSelect = (answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionData.id]: answerIndex
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;
    
    Object.keys(answers).forEach(questionId => {
      const question = currentQuestions.find(q => q.id === parseInt(questionId));
      if (question && answers[questionId] === question.correct) {
        correct++;
      }
      total++;
    });
    
    return { correct, total, percentage: total > 0 ? Math.round((correct / total) * 100) : 0 };
  };

  const score = calculateScore();

  const renderQuestionContent = () => {
    if (!currentQuestionData) return null;

    switch (currentQuestionData.type) {
      case 'audio':
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Câu hỏi {currentQuestion + 1}</h3>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 bg-blue-100 rounded-full hover:bg-blue-200"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 text-blue-600" /> : <Play className="w-4 h-4 text-blue-600" />}
                  </button>
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-gray-600" /> : <Volume2 className="w-4 h-4 text-gray-600" />}
                  </button>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{currentQuestionData.question}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              {currentQuestionData.options?.map((option, index) => (
                <label key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input 
                    type="radio" 
                    name={`question-${currentQuestionData.id}`}
                    checked={answers[currentQuestionData.id] === index}
                    onChange={() => handleAnswerSelect(index)}
                    className="text-blue-600"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Câu hỏi {currentQuestion + 1}</h3>
              <div className="bg-white p-4 rounded border mb-4">
                <p className="text-gray-700 leading-relaxed">{currentQuestionData.text}</p>
              </div>
              <p className="text-gray-700 font-medium">{currentQuestionData.question}</p>
            </div>
            
            <div className="space-y-2">
              {currentQuestionData.options?.map((option, index) => (
                <label key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input 
                    type="radio" 
                    name={`question-${currentQuestionData.id}`}
                    checked={answers[currentQuestionData.id] === index}
                    onChange={() => handleAnswerSelect(index)}
                    className="text-blue-600"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'essay':
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Câu hỏi {currentQuestion + 1}</h3>
              <p className="text-gray-700 mb-4">{currentQuestionData.question}</p>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Yêu cầu:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {currentQuestionData.requirements.map((req, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bài viết của bạn:
              </label>
              <textarea 
                rows="8"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Viết bài luận của bạn ở đây..."
              />
              <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                <span>Độ dài: 0/200 từ</span>
                <button className="text-blue-600 hover:text-blue-800">
                  <Brain className="w-4 h-4 inline mr-1" />
                  AI sửa lỗi
                </button>
              </div>
            </div>
          </div>
        );

      case 'multiple_choice':
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Câu hỏi {currentQuestion + 1}</h3>
              <p className="text-gray-700">{currentQuestionData.question}</p>
            </div>
            
            <div className="space-y-2">
              {currentQuestionData.options?.map((option, index) => (
                <label key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input 
                    type="radio" 
                    name={`question-${currentQuestionData.id}`}
                    checked={answers[currentQuestionData.id] === index}
                    onChange={() => handleAnswerSelect(index)}
                    className="text-blue-600"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderResults = () => {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Kết quả bài thi</h3>
            <div className="flex items-center justify-center space-x-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{score.correct}</div>
                <div className="text-sm text-gray-500">Đúng</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{score.total - score.correct}</div>
                <div className="text-sm text-gray-500">Sai</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{score.percentage}%</div>
                <div className="text-sm text-gray-500">Tỷ lệ đúng</div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${score.percentage}%` }}
              ></div>
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900">
                {score.percentage >= 80 ? '🎉 Xuất sắc!' : 
                 score.percentage >= 60 ? '👍 Tốt!' : 
                 score.percentage >= 40 ? '📚 Cần cải thiện' : '💪 Cần luyện tập nhiều hơn'}
              </p>
              <p className="text-gray-600">
                {score.percentage >= 80 ? 'Bạn đã làm rất tốt! Hãy tiếp tục duy trì.' :
                 score.percentage >= 60 ? 'Kết quả khá tốt, hãy ôn tập thêm để cải thiện.' :
                 score.percentage >= 40 ? 'Cần ôn tập lại kiến thức cơ bản.' : 'Hãy dành thêm thời gian học tập.'}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Chi tiết từng câu</h4>
          <div className="space-y-3">
            {currentQuestions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correct;
              
              return (
                <div key={question.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="font-medium">Câu {index + 1}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {isCorrect ? 'Đúng' : 'Sai'}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    );
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Luyện đề TOPIK</h1>
            <p className="text-gray-600">Luyện tập các kỹ năng thi TOPIK</p>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-500">Mục tiêu: TOPIK II</span>
          </div>
        </div>

        {/* Skill Selection */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Chọn kỹ năng</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <button
                  key={skill.id}
                  onClick={() => {
                    setActiveSkill(skill.id);
                    setCurrentQuestion(0);
                    setAnswers({});
                    setShowResults(false);
                  }}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    activeSkill === skill.id
                      ? `border-${skill.color}-500 bg-${skill.color}-50 text-${skill.color}-700`
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Main Content */}
        {!showResults ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Question Area */}
            <div className="lg:col-span-3">
              <Card className="p-6">
                {renderQuestionContent()}
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress */}
              <Card className="p-4">
                <h4 className="font-medium text-gray-900 mb-3">Tiến độ</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Câu hỏi</span>
                    <span>{currentQuestion + 1}/{currentQuestions.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / currentQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </Card>

              {/* Navigation */}
              <Card className="p-4">
                <h4 className="font-medium text-gray-900 mb-3">Điều hướng</h4>
                <div className="grid grid-cols-3 gap-2">
                  {currentQuestions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`p-2 text-sm rounded ${
                        currentQuestion === index
                          ? 'bg-blue-600 text-white'
                          : answers[currentQuestions[index]?.id] !== undefined
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Actions */}
              <Card className="p-4">
                <div className="space-y-3">
                  <button
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                    className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Trước</span>
                  </button>
                  
                  <button
                    onClick={() => setCurrentQuestion(Math.min(currentQuestions.length - 1, currentQuestion + 1))}
                    disabled={currentQuestion === currentQuestions.length - 1}
                    className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Sau</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={handleSubmit}
                    className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Nộp bài
                  </button>
                </div>
              </Card>

              {/* Notes */}
              <Card className="p-4">
                <h4 className="font-medium text-gray-900 mb-3">Ghi chú</h4>
                <textarea 
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Ghi chú của bạn..."
                />
              </Card>
            </div>
          </div>
        ) : (
          renderResults()
        )}
      </div>
    </StudentLayout>
  );
};

export default TOPIKPractice; 