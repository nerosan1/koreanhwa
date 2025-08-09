import React, { useState } from 'react';
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  Award, 
  Play, 
  BookOpen, 
  Headphones, 
  PenTool,
  Mic,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  Flame,
  Trophy,
  Gift,
  Sparkles,
  Crown,
  Medal,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Bell,
  BellOff,
  Heart,
  Target as TargetIcon,
  Bookmark,
  Share2,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, 
  Line,
  BarChart as RechartsBarChart, 
  Bar,
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import Card from '../../components/common/Card';
import StudentLayout from '../../components/layout/StudentLayout';

const StudentDashboard = () => {
  const [showStreakDetails, setShowStreakDetails] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [hoveredCard, setHoveredCard] = useState(null);

  // Enhanced learning progress data
  const learningProgress = [
    { skill: 'Nghe', progress: 75, hours: 24, target: 30, trend: 'up', change: 5, color: 'from-blue-500 to-cyan-500' },
    { skill: 'Nói', progress: 60, hours: 18, target: 25, trend: 'up', change: 3, color: 'from-green-500 to-emerald-500' },
    { skill: 'Đọc', progress: 85, hours: 32, target: 35, trend: 'stable', change: 0, color: 'from-purple-500 to-pink-500' },
    { skill: 'Viết', progress: 45, hours: 12, target: 20, trend: 'down', change: -2, color: 'from-orange-500 to-red-500' }
  ];

  // Enhanced weekly activity data
  const weeklyActivity = [
    { day: 'T2', lessons: 3, practice: 2, vocabulary: 15, streak: true, minutes: 45 },
    { day: 'T3', lessons: 2, practice: 3, vocabulary: 20, streak: true, minutes: 60 },
    { day: 'T4', lessons: 4, practice: 1, vocabulary: 12, streak: true, minutes: 30 },
    { day: 'T5', lessons: 1, practice: 4, vocabulary: 25, streak: true, minutes: 75 },
    { day: 'T6', lessons: 3, practice: 2, vocabulary: 18, streak: true, minutes: 50 },
    { day: 'T7', lessons: 2, practice: 3, vocabulary: 22, streak: true, minutes: 40 },
    { day: 'CN', lessons: 1, practice: 1, vocabulary: 10, streak: false, minutes: 25 }
  ];

  // Enhanced daily tasks
  const dailyTasks = [
    { id: 1, title: 'Học 20 từ vựng mới', completed: true, points: 50, type: 'vocabulary', difficulty: 'easy', color: 'from-blue-400 to-blue-600' },
    { id: 2, title: 'Luyện nghe 30 phút', completed: true, points: 30, type: 'listening', difficulty: 'medium', color: 'from-green-400 to-green-600' },
    { id: 3, title: 'Làm bài tập ngữ pháp', completed: false, points: 40, type: 'grammar', difficulty: 'hard', color: 'from-purple-400 to-purple-600' },
    { id: 4, title: 'Viết 1 đoạn văn ngắn', completed: false, points: 60, type: 'writing', difficulty: 'hard', color: 'from-orange-400 to-orange-600' },
    { id: 5, title: 'Luyện phát âm với AI', completed: false, points: 25, type: 'speaking', difficulty: 'medium', color: 'from-pink-400 to-pink-600' }
  ];

  // Enhanced leaderboard
  const leaderboard = [
    { rank: 1, name: 'Trần Thị B', level: 'Trung cấp 1', points: 2840, avatar: 'B', streak: 15, wins: 8, color: 'from-yellow-400 to-yellow-600' },
    { rank: 2, name: 'Lê Văn C', level: 'Sơ cấp 3', points: 2650, avatar: 'C', streak: 12, wins: 6, color: 'from-gray-400 to-gray-600' },
    { rank: 3, name: 'Phạm Thị D', level: 'Sơ cấp 2', points: 2480, avatar: 'D', streak: 8, wins: 5, color: 'from-orange-400 to-orange-600' },
    { rank: 4, name: 'Hoàng Văn E', level: 'Sơ cấp 2', points: 2320, avatar: 'E', streak: 5, wins: 4, color: 'from-blue-400 to-blue-600' },
    { rank: 5, name: 'Nguyễn Văn A', level: 'Sơ cấp 2', points: 2180, avatar: 'A', streak: 12, wins: 3, color: 'from-green-400 to-green-600' }
  ];

  // Enhanced skill data
  const skillData = [
    { name: 'Nghe', value: 75, color: '#8884d8', target: 80 },
    { name: 'Nói', value: 60, color: '#82ca9d', target: 70 },
    { name: 'Đọc', value: 85, color: '#ffc658', target: 90 },
    { name: 'Viết', value: 45, color: '#ff7300', target: 60 }
  ];

  // Streak data
  const streakData = {
    currentStreak: 12,
    longestStreak: 25,
    totalStudyDays: 89,
    todayGoal: 30,
    todayProgress: 25,
    weeklyGoal: 180,
    weeklyProgress: 165,
    streakHistory: [
      { date: '2024-01-01', studied: true, minutes: 45 },
      { date: '2024-01-02', studied: true, minutes: 60 },
      { date: '2024-01-03', studied: true, minutes: 30 },
      { date: '2024-01-04', studied: false, minutes: 0 },
      { date: '2024-01-05', studied: true, minutes: 90 },
      { date: '2024-01-06', studied: true, minutes: 75 },
      { date: '2024-01-07', studied: true, minutes: 45 },
      { date: '2024-01-08', studied: true, minutes: 60 },
      { date: '2024-01-09', studied: true, minutes: 30 },
      { date: '2024-01-10', studied: true, minutes: 45 },
      { date: '2024-01-11', studied: true, minutes: 60 },
      { date: '2024-01-12', studied: true, minutes: 90 },
      { date: '2024-01-13', studied: true, minutes: 75 },
      { date: '2024-01-14', studied: true, minutes: 45 },
      { date: '2024-01-15', studied: true, minutes: 60 }
    ],
    milestones: [
      { days: 7, achieved: true, reward: 'Huy hiệu 7 ngày', icon: Star },
      { days: 14, achieved: true, reward: 'Huy hiệu 2 tuần', icon: Trophy },
      { days: 30, achieved: false, reward: 'Huy hiệu 1 tháng', icon: Crown },
      { days: 100, achieved: false, reward: 'Huy hiệu 100 ngày', icon: Medal }
    ]
  };

  // Recent achievements
  const recentAchievements = [
    { id: 1, title: 'Hoàn thành 50 bài học', description: 'Đã hoàn thành 50 bài học đầu tiên', icon: BookOpen, points: 100, date: '2024-01-15', color: 'from-yellow-400 to-orange-500' },
    { id: 2, title: 'Streak 10 ngày', description: 'Duy trì học tập 10 ngày liên tiếp', icon: Flame, points: 50, date: '2024-01-14', color: 'from-red-400 to-pink-500' },
    { id: 3, title: 'Thành thạo 100 từ vựng', description: 'Học thuộc 100 từ vựng cơ bản', icon: Target, points: 75, date: '2024-01-13', color: 'from-blue-400 to-cyan-500' }
  ];

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBarColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <TrendingUp className="w-4 h-4 text-gray-500" />;
    }
  };

  const renderStreakCard = () => (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 p-6 text-white shadow-2xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-bounce"></div>
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Flame className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
                Streak học tập
              </h3>
              <p className="text-orange-100 text-sm">Duy trì động lực học tập</p>
            </div>
          </div>
          <button 
            onClick={() => setShowStreakDetails(!showStreakDetails)}
            className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110"
          >
            {showStreakDetails ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-white mb-1">{streakData.currentStreak}</div>
            <div className="text-sm text-orange-100">Ngày hiện tại</div>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-white mb-1">{streakData.longestStreak}</div>
            <div className="text-sm text-orange-100">Kỷ lục</div>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-white mb-1">{streakData.totalStudyDays}</div>
            <div className="text-sm text-orange-100">Tổng ngày học</div>
          </div>
        </div>

        {/* Today's Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-3">
            <span className="font-medium">Tiến độ hôm nay</span>
            <span className="font-bold">{streakData.todayProgress}/{streakData.todayGoal} phút</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-white to-orange-200 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
              style={{ width: `${(streakData.todayProgress / streakData.todayGoal) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-orange-100 mt-2">
            Còn {streakData.todayGoal - streakData.todayProgress} phút để hoàn thành mục tiêu
          </p>
        </div>

        {showStreakDetails && (
          <div className="space-y-6 animate-fadeIn">
            {/* Streak Calendar */}
            <div>
              <h4 className="font-semibold mb-3 text-lg">Lịch sử 15 ngày gần nhất:</h4>
              <div className="grid grid-cols-15 gap-2">
                {streakData.streakHistory.slice(-15).map((day, index) => (
                  <div 
                    key={index}
                    className={`w-8 h-8 rounded-lg text-xs flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      day.studied 
                        ? 'bg-white text-orange-600 shadow-lg' 
                        : 'bg-white/20 text-white'
                    }`}
                    title={`${day.date}: ${day.studied ? `${day.minutes} phút học` : 'Không học'}`}
                  >
                    {day.studied ? '✓' : '✗'}
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div>
              <h4 className="font-semibold mb-3 text-lg">Cột mốc streak:</h4>
              <div className="grid grid-cols-2 gap-3">
                {streakData.milestones.map((milestone, index) => {
                  const Icon = milestone.icon;
                  return (
                    <div 
                      key={index}
                      className={`p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                        milestone.achieved ? 'bg-white/20' : 'bg-white/10'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mb-2 ${milestone.achieved ? 'text-yellow-300' : 'text-white/50'}`} />
                      <div className="text-sm font-medium">{milestone.days} ngày</div>
                      <div className="text-xs text-orange-100">{milestone.reward}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-white/20">
          <div className="flex items-center justify-between">
            <span className="text-sm">Tiếp theo: {streakData.milestones.find(m => !m.achieved)?.days} ngày</span>
            <button className="px-4 py-2 bg-white/20 rounded-xl text-sm hover:bg-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAchievementsCard = () => (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-6 text-white shadow-2xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl animate-bounce"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
            Thành tích gần đây
          </h3>
          <button className="text-white/80 hover:text-white text-sm font-medium transition-colors">
            Xem tất cả
          </button>
        </div>
        
        <div className="space-y-4">
          {recentAchievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${achievement.color}`}>
                <achievement.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white">{achievement.title}</h4>
                <p className="text-sm text-purple-100">{achievement.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-medium">+{achievement.points} điểm</span>
                  <span className="text-xs text-purple-100">{achievement.date}</span>
                </div>
              </div>
              <Award className="w-6 h-6 text-yellow-300" />
            </div>
          ))}
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Chào mừng trở lại! Hãy tiếp tục hành trình học tiếng Hàn của bạn</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Chia sẻ
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2">
              <Download className="w-5 h-5" />
              Xuất báo cáo
            </button>
          </div>
        </div>

        {/* Streak and Stats Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {renderStreakCard()}
          </div>
          <div>
            {renderAchievementsCard()}
          </div>
        </div>

        {/* Learning Progress */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-blue-50 to-purple-50 p-8 shadow-2xl">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-2xl animate-bounce"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tiến độ học tập
              </h3>
              <div className="flex items-center gap-3">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                >
                  <option value="week">Tuần này</option>
                  <option value="month">Tháng này</option>
                  <option value="year">Năm nay</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {learningProgress.map((skill, index) => (
                <div 
                  key={index} 
                  className={`p-6 rounded-2xl bg-gradient-to-br ${skill.color} text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg">{skill.skill}</h4>
                    {getTrendIcon(skill.trend)}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold">{skill.progress}%</span>
                    <span className={`text-sm font-medium ${skill.trend === 'up' ? 'text-green-200' : skill.trend === 'down' ? 'text-red-200' : 'text-gray-200'}`}>
                      {skill.trend === 'up' ? '+' : skill.trend === 'down' ? '' : ''}{skill.change}%
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 mb-3">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-1000 ease-out shadow-lg"
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-white/80">
                    <span>{skill.hours}h học</span>
                    <span>Mục tiêu: {skill.target}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={skillData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {skillData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Weekly Activity and Daily Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Activity */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-2xl animate-pulse"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
                Hoạt động tuần này
              </h3>
              <div className="grid grid-cols-7 gap-3">
                {weeklyActivity.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm font-medium text-gray-700 mb-2">{day.day}</div>
                    <div className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${
                      day.streak 
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg' 
                        : 'bg-white/80 backdrop-blur-sm border border-gray-200'
                    }`}>
                      <div className="text-xs mb-1">Bài học: {day.lessons}</div>
                      <div className="text-xs mb-1">Luyện tập: {day.practice}</div>
                      <div className="text-xs mb-1">Từ vựng: {day.vocabulary}</div>
                      <div className="text-xs mb-2">{day.minutes} phút</div>
                      {day.streak && <Flame className="w-4 h-4 mx-auto animate-pulse" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Daily Tasks */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 to-red-50 p-8 shadow-2xl">
            <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-2xl animate-bounce"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Nhiệm vụ hôm nay
                </h3>
                <span className="text-sm text-gray-600 bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm">
                  {dailyTasks.filter(task => task.completed).length}/{dailyTasks.length} hoàn thành
                </span>
              </div>
              
              <div className="space-y-4">
                {dailyTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                      task.completed 
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg' 
                        : 'bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-lg'
                    }`}
                  >
                    <div className={`p-3 rounded-2xl ${
                      task.completed 
                        ? 'bg-white/20' 
                        : 'bg-gradient-to-r from-gray-100 to-gray-200'
                    }`}>
                      {task.completed ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${task.completed ? 'text-white' : 'text-gray-900'}`}>
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          task.completed 
                            ? 'bg-white/20 text-white' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          +{task.points} điểm
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                          task.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {task.difficulty === 'easy' ? 'Dễ' : task.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                        </span>
                      </div>
                    </div>
                    {!task.completed && (
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl text-sm hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 shadow-lg">
                        Bắt đầu
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Bảng xếp hạng
              </h3>
              <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors">
                Xem tất cả
              </button>
            </div>
            
            <div className="space-y-4">
              {leaderboard.map((user, index) => (
                <div 
                  key={user.rank} 
                  className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg bg-gradient-to-br ${user.color}`}>
                      {user.rank}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.level} • {user.wins} chiến thắng</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900 text-lg">{user.points} điểm</div>
                    <div className="text-sm text-gray-600">Streak: {user.streak}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Motivation Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8 text-white shadow-2xl">
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          
          <div className="relative z-10 text-center">
            <Sparkles className="w-16 h-16 mx-auto mb-6 animate-pulse" />
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              Bạn đang làm rất tốt!
            </h3>
            <p className="text-purple-100 mb-8 text-lg max-w-2xl mx-auto">
              Với {streakData.currentStreak} ngày học liên tiếp, bạn đang trên đường đến thành công.
              Hãy tiếp tục duy trì động lực này!
            </p>
            <div className="flex justify-center gap-6">
              <button className="px-8 py-4 bg-white/20 rounded-2xl hover:bg-white/30 transition-all duration-300 hover:scale-110 backdrop-blur-sm flex items-center gap-3 shadow-lg">
                <Target className="w-5 h-5" />
                Đặt mục tiêu mới
              </button>
              <button className="px-8 py-4 bg-white/20 rounded-2xl hover:bg-white/30 transition-all duration-300 hover:scale-110 backdrop-blur-sm flex items-center gap-3 shadow-lg">
                <Trophy className="w-5 h-5" />
                Xem thành tích
              </button>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard; 