import React, { useState } from 'react';
import {
  Trophy, Users, Calendar, Clock, Star, Award, Target, Zap, Flame, Crown, Medal, Gift, Sparkles, TrendingUp, BarChart3, PieChart, LineChart, Activity, Heart, Share2, Download, Eye, EyeOff, Search, Filter, SortAsc, SortDesc, ChevronRight, ChevronLeft, Plus, Minus, RotateCcw, Settings, Bell, BellOff, BookOpen, PenTool, Mic, Headphones, Camera, Video, FileText, Image, Music, Play, Pause, Volume2, VolumeX, Lock, Unlock, CheckCircle, XCircle, Info, HelpCircle, ExternalLink, Link, Copy, Edit, Trash, Save, Upload, Mail, Phone, MapPin, Globe, Wifi, WifiOff, Battery, Smartphone, Monitor, Tablet, Laptop, Mouse, Keyboard
} from 'lucide-react';
import Card from '../../components/common/Card';
import StudentLayout from '../../components/layout/StudentLayout';
import {useNavigate} from 'react-router-dom';

const CompetitionPage = () => {
  const navigate = useNavigate();
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  // Enhanced categories
  const categories = [
    { id: 'all', name: 'Tất cả', icon: Trophy, color: 'bg-yellow-400 text-black', count: 12 },
    { id: 'speaking', name: 'Nói', icon: Mic, color: 'bg-green-500 text-white', count: 4 },
    { id: 'writing', name: 'Viết', icon: PenTool, color: 'bg-purple-500 text-white', count: 3 },
    { id: 'listening', name: 'Nghe', icon: Headphones, color: 'bg-blue-500 text-white', count: 3 },
    { id: 'reading', name: 'Đọc', icon: BookOpen, color: 'bg-indigo-500 text-white', count: 2 }
  ];

  // Enhanced tabs
  const tabs = [
    { id: 'active', name: 'Đang diễn ra', icon: Activity, count: 8, color: 'bg-green-500 text-white' },
    { id: 'upcoming', name: 'Sắp diễn ra', icon: Calendar, count: 3, color: 'bg-blue-500 text-white' },
    { id: 'completed', name: 'Đã kết thúc', icon: CheckCircle, count: 15, color: 'bg-gray-500 text-white' },
    { id: 'my', name: 'Của tôi', icon: Heart, count: 5, color: 'bg-yellow-400 text-black' }
  ];

  // Enhanced competitions data
const mockCompetitions = [
  {
    id: 1,
    title: 'Cuộc thi phát âm tiếng Hàn 2024',
    description: 'Thể hiện khả năng phát âm chuẩn xác và tự nhiên như người Hàn Quốc',
    category: 'speaking',
    difficulty: 'Trung bình',
    timeLimit: '30 phút',
    entryFee: 0,
    totalPrize: 5000000,
    participants: 156,
    deadline: '2024-02-15',
    status: 'active',
    tags: ['Phát âm', 'Giao tiếp', 'Thực hành'],
    mySubmission: {
      submitted: true,
      score: 85,
      rank: 12,
      feedback: 'Phát âm tốt, cần cải thiện ngữ điệu',
      submittedAt: '2024-01-20'
    },
    stats: {
      totalSubmissions: 156,
      averageScore: 78,
      topScore: 95,
      completionRate: 85
    },
    color: 'bg-green-500',
    image: '/src/assets/phatam.jpg'
  },
  {
    id: 2,
    title: 'Viết văn tiếng Hàn sáng tạo',
    description: 'Sáng tác một bài văn ngắn bằng tiếng Hàn về chủ đề tự chọn',
    category: 'writing',
    difficulty: 'Khó',
    timeLimit: '60 phút',
    entryFee: 50000,
    totalPrize: 3000000,
    participants: 89,
    deadline: '2024-02-20',
    status: 'active',
    tags: ['Viết văn', 'Sáng tạo', 'Ngữ pháp'],
    mySubmission: {
      submitted: false,
      score: null,
      rank: null,
      feedback: null,
      submittedAt: null
    },
    stats: {
      totalSubmissions: 89,
      averageScore: 72,
      topScore: 88,
      completionRate: 65
    },
    color: 'bg-purple-500',
    image: '/src/assets/vietvan.jpg'
  },
  {
    id: 3,
    title: 'Nghe hiểu tin tức Hàn Quốc',
    description: 'Nghe và trả lời câu hỏi về tin tức thời sự Hàn Quốc',
    category: 'listening',
    difficulty: 'Dễ',
    timeLimit: '45 phút',
    entryFee: 0,
    totalPrize: 2000000,
    participants: 234,
    deadline: '2024-02-10',
    status: 'upcoming',
    tags: ['Nghe hiểu', 'Tin tức', 'Thời sự'],
    mySubmission: {
      submitted: false,
      score: null,
      rank: null,
      feedback: null,
      submittedAt: null
    },
    stats: {
      totalSubmissions: 0,
      averageScore: 0,
      topScore: 0,
      completionRate: 0
    },
    color: 'bg-blue-500',
    image: '/src/assets/news.jpg'
  }
];


  // Enhanced leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'Trần Thị B', score: 95, level: 'Trung cấp 1', avatar: 'B', streak: 15, wins: 8, color: 'bg-yellow-400' },
    { rank: 2, name: 'Lê Văn C', score: 92, level: 'Sơ cấp 3', avatar: 'C', streak: 12, wins: 6, color: 'bg-gray-500' },
    { rank: 3, name: 'Phạm Thị D', score: 88, level: 'Sơ cấp 2', avatar: 'D', streak: 8, wins: 5, color: 'bg-orange-500' },
    { rank: 4, name: 'Hoàng Văn E', score: 85, level: 'Sơ cấp 2', avatar: 'E', streak: 5, wins: 4, color: 'bg-blue-500' },
    { rank: 5, name: 'Nguyễn Văn A', score: 82, level: 'Sơ cấp 2', avatar: 'A', streak: 12, wins: 3, color: 'bg-green-500' }
  ];

  // Enhanced my stats
  const myStats = {
    totalCompetitions: 15,
    wins: 8,
    averageScore: 78,
    bestRank: 3,
    totalPrize: 2500000,
    currentStreak: 5,
    achievements: [
      { name: 'Người chiến thắng', icon: Trophy, color: 'bg-yellow-400' },
      { name: 'Streak 5 cuộc thi', icon: Flame, color: 'bg-green-500' },
      { name: 'Top 10', icon: Crown, color: 'bg-blue-500' }
    ]
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Dễ': return 'bg-green-500 text-white';
      case 'Trung bình': return 'bg-yellow-400 text-black';
      case 'Khó': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

const renderCompetitionCard = (competition) => (
  <div 
    key={competition.id}
    className="relative overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:scale-105 cursor-pointer shadow-2xl"
    onMouseEnter={() => setHoveredCard(competition.id)}
    onMouseLeave={() => setHoveredCard(null)}
    style={{
      backgroundImage: `url(${competition.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {/* Overlay để tăng độ tương phản và tránh chữ bị che */}
    <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

    <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{competition.title}</h3>
          <p className="text-sm text-white opacity-90 mb-3">{competition.description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {competition.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-white/30 rounded-full text-xs font-medium text-white backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Status badge */}
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
          competition.status === 'active' ? 'bg-green-500 text-black' :
          competition.status === 'upcoming' ? 'bg-blue-500 text-black' :
          'bg-gray-500 text-black'
        }`}>
          {competition.status === 'active' ? 'Đang diễn ra' :
           competition.status === 'upcoming' ? 'Sắp diễn ra' : 'Đã kết thúc'}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
          <div className="text-lg font-bold text-white">{competition.participants}</div>
          <div className="text-xs text-white opacity-80">Tham gia</div>
        </div>
        <div className="text-center p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
          <div className="text-lg font-bold text-white">{competition.totalPrize.toLocaleString()}đ</div>
          <div className="text-xs text-white opacity-80">Tổng giải thưởng</div>
        </div>
      </div>

      {/* Competition details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white opacity-80">Độ khó:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(competition.difficulty)}`}>
            {competition.difficulty}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-white opacity-80">Thời gian:</span>
          <span className="text-sm font-medium text-white">{competition.timeLimit}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-white opacity-80">Phí tham gia:</span>
          <span className="text-sm font-medium text-white">
            {competition.entryFee === 0 ? 'Miễn phí' : `${competition.entryFee.toLocaleString()}đ`}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-white opacity-80">Hạn chót:</span>
          <span className="text-sm font-medium text-white">{competition.deadline}</span>
        </div>
      </div>

      {/* My submission status */}
      {competition.mySubmission.submitted ? (
        <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-white">Bài nộp của bạn</span>
            <span className="text-sm text-white opacity-80">Điểm: {competition.mySubmission.score}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white">Xếp hạng: #{competition.mySubmission.rank}</span>
            <span className="text-white">Nộp: {competition.mySubmission.submittedAt}</span>
          </div>
          {competition.mySubmission.feedback && (
            <p className="text-sm text-white opacity-80 mt-2">{competition.mySubmission.feedback}</p>
          )}
        </div>
      ) : (
        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm mb-4 border border-black">
          <div className="text-center">
            <span className="text-sm text-white opacity-80">Chưa tham gia</span>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        <button onClick={()=> navigate('/student/competition/info')} className="flex-1 px-4 py-2 bg-yellow-400 text-black rounded-xl text-sm font-medium hover:bg-yellow-500 transition-all duration-300 hover:scale-105">
          {competition.mySubmission.submitted ? 'Xem chi tiết' : 'Tham gia ngay'}
        </button>
        <button className="px-4 py-2 bg-black text-white rounded-xl text-sm hover:bg-gray-800 transition-all duration-300 hover:scale-105">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);


  const renderLeaderboardCard = () => (
    <div className="relative overflow-hidden rounded-3xl bg-black  p-6 shadow-2xl">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Bảng xếp hạng
          </h3>
          <button 
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            className="p-3 bg-yellow-400/20 rounded-2xl hover:bg-yellow-400/40 transition-all duration-300 hover:scale-110"
          >
            {showLeaderboard ? <EyeOff className="w-6 h-6 text-yellow-400" /> : <Eye className="w-6 h-6 text-yellow-400" />}
          </button>
        </div>
        
        <div className="space-y-4">
          {leaderboardData.slice(0, showLeaderboard ? 5 : 3).map((user) => (
            <div 
              key={user.rank} 
              className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl hover:bg-gray-800/70 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${user.color}`}>
                  {user.rank}
                </div>
                <div>
                  <div className="font-semibold text-white">{user.name}</div>
                  <div className="text-sm text-gray-300">{user.level} • {user.wins} chiến thắng</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white text-lg">{user.score} điểm</div>
                <div className="text-sm text-gray-300">Streak: {user.streak}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMyStatsCard = () => (
    <div className="relative overflow-hidden rounded-3xl bg-black text-white p-6 shadow-2xl">
      <div className="relative z-10">
        <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-6">
          Thống kê của tôi
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-800/50 rounded-2xl">
            <div className="text-2xl font-bold">{myStats.totalCompetitions}</div>
            <div className="text-sm text-gray-300">Cuộc thi</div>
          </div>
          <div className="text-center p-4 bg-gray-800/50 rounded-2xl">
            <div className="text-2xl font-bold">{myStats.wins}</div>
            <div className="text-sm text-gray-300">Chiến thắng</div>
          </div>
          <div className="text-center p-4 bg-gray-800/50 rounded-2xl">
            <div className="text-2xl font-bold">{myStats.averageScore}</div>
            <div className="text-sm text-gray-300">Điểm TB</div>
          </div>
          <div className="text-center p-4 bg-gray-800/50 rounded-2xl">
            <div className="text-2xl font-bold">{myStats.totalPrize.toLocaleString()}đ</div>
            <div className="text-sm text-gray-300">Giải thưởng</div>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-gray-300">Thành tích:</h4>
          <div className="flex gap-2">
            {myStats.achievements.map((achievement, index) => (
              <div key={index} className={`p-2 rounded-xl ${achievement.color}`}>
                <achievement.icon className="w-4 h-4 text-white" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Cuộc thi
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Tham gia các cuộc thi để thử thách và cải thiện kỹ năng</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-yellow-400 text-black rounded-2xl hover:bg-yellow-500 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Thành tích
            </button>
            <button className="px-6 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2">
              <Download className="w-5 h-5" />
              Xuất báo cáo
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-2xl">
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm cuộc thi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 text-black py-3 rounded-2xl flex items-center gap-2 transition-all duration-300 hover:scale-105 whitespace-nowrap ${selectedCategory === category.id ? `${category.color} shadow-lg` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{category.name}</span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Sort */}
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="recent">Mới nhất</option>
                  <option value="popular">Phổ biến</option>
                  <option value="deadline">Hạn chót</option>
                  <option value="prize">Giải thưởng</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center">
          <div className="bg-white/80 rounded-2xl p-2 shadow-lg">
            <div className="flex gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 ${tab.id === 'active' ? `${tab.color} shadow-lg` : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Competitions List */}
          <div className="lg:col-span-2 space-y-6 mb-9">
            {mockCompetitions.map(renderCompetitionCard)}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {renderLeaderboardCard()}
            {renderMyStatsCard()}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default CompetitionPage;