import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  CheckCircle, 
  Clock, 
  Award, 
  Headphones,
  FileText,
  Send,
  ArrowRight,
  Star,
  Globe,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ContestJoin() {
    const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes per question
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const contestInfo = {
    title: "Korean News Challenge 2025",
    titleKr: "2025 한국 뉴스 챌린지",
    subtitle: "Nghe tin tức thời sự Hàn Quốc và trả lời câu hỏi",
    subtitleKr: "한국 시사 뉴스를 듣고 질문에 답하세요",
    totalQuestions: 5,
    timePerQuestion: "5 phút/câu",
    totalTime: "25 phút",
    level: "Trung cấp - 중급"
  };

  const newsQuestions = [
    {
      id: 1,
      category: "Chính trị",
      categoryKr: "정치",
      title: "Hội nghị thượng đỉnh Hàn-Việt 2025",
      titleKr: "2025 한-베트남 정상회담",
      audioUrl: "/audio/korea-vietnam-summit.mp3",
      duration: "2:30",
      transcript: "한국과 베트남 정상이 양국 간 경제 협력 강화 방안을 논의했습니다. 특히 디지털 전환, 그린 에너지, 그리고 문화 교류 분야에서의 협력을 확대하기로 합의했습니다...",
      question: "Theo tin tức, hai nước đã thống nhất hợp tác trong những lĩnh vực nào?",
      questionKr: "뉴스에 따르면, 양국은 어떤 분야에서 협력하기로 합의했나요?",
      options: [
        "Chuyển đổi số, năng lượng xanh, trao đổi văn hóa",
        "Nông nghiệp, du lịch, giáo dục", 
        "Quốc phòng, y tế, thể thao",
        "Công nghiệp, thương mại, giao thông"
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      category: "Kinh tế",
      categoryKr: "경제",
      title: "Samsung công bố kế hoạch đầu tư mới",
      titleKr: "삼성, 신규 투자 계획 발표",
      audioUrl: "/audio/samsung-investment.mp3",
      duration: "3:15",
      transcript: "삼성전자가 반도체 생산 확대를 위해 베트남에 50억 달러를 추가 투자하겠다고 발표했습니다. 이번 투자로 약 3만 개의 새로운 일자리가 창출될 예정입니다...",
      question: "Samsung dự định đầu tư bao nhiêu tiền vào Việt Nam?",
      questionKr: "삼성이 베트남에 얼마를 투자할 계획인가요?",
      options: [
        "30 tỷ USD",
        "50 tỷ USD", 
        "70 tỷ USD",
        "100 tỷ USD"
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      category: "Văn hóa",
      categoryKr: "문화",
      title: "K-pop Festival tại Hà Nội thu hút hàng triệu fan",
      titleKr: "하노이 K-pop 페스티벌, 수백만 팬 몰려",
      audioUrl: "/audio/kpop-festival.mp3",
      duration: "2:45",
      transcript: "하노이에서 열린 K-pop 페스티벌에 200만 명 이상의 관객이 참석했습니다. BTS, BLACKPINK, NewJeans 등 유명 그룹들이 참여하여 큰 성황을 이뤘습니다...",
      question: "Có bao nhiêu khán giả tham dự K-pop Festival?",
      questionKr: "K-pop 페스티벌에 몇 명의 관객이 참석했나요?",
      options: [
        "100만 người",
        "150만 người",
        "200만 người", 
        "250만 người"
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      category: "Công nghệ",
      categoryKr: "기술",
      title: "Hàn Quốc phát triển AI thế hệ mới",
      titleKr: "한국, 차세대 AI 개발",
      audioUrl: "/audio/korea-ai-development.mp3",
      duration: "3:00",
      transcript: "한국 정부가 차세대 인공지능 기술 개발을 위해 10조 원을 투자한다고 발표했습니다. 이 프로젝트는 2030년까지 완성될 예정이며, 전 세계 AI 시장에서 한국의 경쟁력을 높일 것으로 예상됩니다...",
      question: "Chính phủ Hàn Quốc đầu tư bao nhiều cho dự án AI?",
      questionKr: "한국 정부가 AI 프로젝트에 얼마를 투자하나요?",
      options: [
        "5조 원",
        "10조 원",
        "15조 원", 
        "20조 원"
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      category: "Thể thao",
      categoryKr: "스포츠",
      title: "Đội tuyển bóng đá Hàn Quốc chuẩn bị World Cup",
      titleKr: "한국 축구 대표팀, 월드컵 준비",
      audioUrl: "/audio/korea-worldcup-prep.mp3",
      duration: "2:20",
      transcript: "한국 축구 대표팀이 2026년 월드컵을 위한 집중 훈련에 돌입했습니다. 손흥민 선수를 중심으로 한 새로운 전술을 연습하고 있으며, 베트남과의 친선경기도 예정되어 있습니다...",
      question: "Đội tuyển Hàn Quốc đang chuẩn bị cho giải đấu nào?",
      questionKr: "한국 대표팀이 어떤 대회를 준비하고 있나요?",
      options: [
        "Asian Cup 2025",
        "World Cup 2026",
        "Olympics 2028", 
        "Euro 2024"
      ],
      correctAnswer: 1
    }
  ];

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showResults]);

  // Audio progress simulation
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== '') {
      setAnswers({
        ...answers,
        [currentQuestion]: selectedAnswer
      });
      
      if (currentQuestion < newsQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
        setTimeLeft(300);
        setAudioProgress(0);
        setIsPlaying(false);
      } else {
        setShowResults(true);
      }
    }
  };

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setAudioProgress(0);
  };

  const currentQ = newsQuestions[currentQuestion];
  const progressPercent = ((currentQuestion + 1) / newsQuestions.length) * 100;

  if (showResults) {
    const score = Object.keys(answers).length;
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <Award className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">
              Hoàn thành cuộc thi!
            </h1>
            <p className="text-yellow-400 text-lg mb-8">
              시험을 완료했습니다!
            </p>
            
            <div className="bg-white/10 rounded-2xl p-8 border border-yellow-400/20 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Kết quả của bạn</h3>
              <div className="text-6xl font-bold text-yellow-400 mb-2">
                {score}/{newsQuestions.length}
              </div>
              <p className="text-gray-300">câu trả lời đã hoàn thành</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition-all">
                Xem đáp án chi tiết
              </button>
              <button className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-full font-bold hover:bg-yellow-400 hover:text-black transition-all">
                Thi lại
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-yellow-400/20">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">{contestInfo.title}</h1>
              <p className="text-yellow-400 text-sm">{contestInfo.titleKr}</p>
            </div>
            <div className="text-right">
              <div className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                {formatTime(timeLeft)}
              </div>
              <p className="text-gray-400 text-sm mt-1">Thời gian còn lại</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
            <div 
              className="bg-yellow-400 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Câu {currentQuestion + 1}/{newsQuestions.length}</span>
            <span>{Math.round(progressPercent)}% hoàn thành</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Audio Player Section */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 rounded-2xl p-6 border border-yellow-400/20 sticky top-6">
              <div className="flex items-center mb-4">
                <Headphones className="w-6 h-6 text-yellow-400 mr-3" />
                <div>
                  <h3 className="text-lg font-bold text-white">Audio News</h3>
                  <p className="text-gray-400 text-sm">{currentQ.duration}</p>
                </div>
              </div>

              <div className="bg-black/50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">
                    {currentQ.category} | {currentQ.categoryKr}
                  </span>
                  <Volume2 className="w-4 h-4 text-yellow-400" />
                </div>
                
                <h4 className="text-white font-medium mb-1 text-sm">{currentQ.title}</h4>
                <p className="text-yellow-400 text-xs mb-4">{currentQ.titleKr}</p>

                {/* Audio Progress */}
                <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all"
                    style={{ width: `${audioProgress}%` }}
                  ></div>
                </div>

                {/* Audio Controls */}
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={handleRestart}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={handlePlayAudio}
                    className="bg-yellow-400 text-black p-3 rounded-full hover:bg-yellow-300 transition-all"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Transcript Preview */}
              <div className="bg-black/30 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <FileText className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-sm font-medium text-white">Transcript Preview</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-4">
                  {currentQ.transcript}
                </p>
              </div>
            </div>
          </div>

          {/* Question Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 rounded-2xl p-8 border border-yellow-400/20">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold mr-3">
                    Q{currentQuestion + 1}
                  </div>
                  <span className="text-yellow-400 text-sm">
                    {currentQ.category} | {currentQ.categoryKr}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-3">
                  {currentQ.question}
                </h2>
                <p className="text-yellow-400 text-lg">
                  {currentQ.questionKr}
                </p>
              </div>

              {/* Answer Options */}
              <div className="space-y-4 mb-8">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedAnswer === index
                        ? 'border-yellow-400 bg-yellow-400/10 text-white'
                        : 'border-gray-600 bg-white/5 text-gray-300 hover:border-yellow-400/50 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                        selectedAnswer === index
                          ? 'border-yellow-400 bg-yellow-400'
                          : 'border-gray-500'
                      }`}>
                        {selectedAnswer === index && (
                          <CheckCircle className="w-4 h-4 text-black" />
                        )}
                      </div>
                      <span className="text-lg">{String.fromCharCode(65 + index)}. {option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Thời gian: {formatTime(timeLeft)}
                </div>
                
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === ''}
                  className={`px-8 py-3 rounded-full font-bold flex items-center transition-all ${
                    selectedAnswer !== ''
                      ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {currentQuestion < newsQuestions.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 bg-black/50 rounded-xl p-6 border border-yellow-400/10">
              <h3 className="text-white font-bold mb-3 flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                Hướng dẫn làm bài
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
                <div className="flex items-start">
                  <Globe className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Nghe kỹ nội dung tin tức bằng tiếng Hàn</span>
                </div>
                <div className="flex items-start">
                  <Users className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Trả lời câu hỏi dựa trên nội dung đã nghe</span>
                </div>
                <div className="flex items-start">
                  <Clock className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Mỗi câu có 5 phút để hoàn thành</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Có thể nghe lại audio nhiều lần</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}