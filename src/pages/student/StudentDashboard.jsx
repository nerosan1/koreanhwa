import React, { useState } from 'react';
import { motion } from "framer-motion";
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
  Minus,
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

import Card from '../../components/common/Card';
import StudentLayout from '../../components/layout/StudentLayout';
import PointInfor from '../../components/student/PointInfor';
import { POINT_SYSTEM, getStudentLevel, getProgressToNextLevel } from '../../utils/pointSystem';

const StudentDashboard = () => {
  const [showStreakDetails, setShowStreakDetails] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  
// Mock user data với hệ thống điểm số
const currentUser = {
  name: 'Nguyễn Văn A',
  points: 450,
  level: getStudentLevel(450),
  streak: 12,
  totalStudyDays: 89,
  avatar: 'A'
};

const courses = [
  {
    color: 'blue',
    date: '2025-09-01',
    title: 'Bài 1: Chào hỏi cơ bản',
    description: 'Học cách chào hỏi cơ bản trong tiếng Hàn',
    progress: 75,
    price: 15,
    originalPrice: 20,
    isFree: false,
    pointsRequired: 15,
    level: 'beginner',
    lessons: [
      { title: 'Học bảng chữ cái', progress: 100, completedDate: '2025-09-02', pointsEarned: 10 },
      { title: 'Từ vựng chào hỏi', progress: 50, completedDate: null, pointsEarned: 0 },
      { title: 'Ngữ pháp cơ bản', progress: 75, completedDate: null, pointsEarned: 0 },
    ],
  },
  {
    color: 'green',
    date: '2025-08-15',
    title: 'Bài 2: Giới thiệu bản thân',
    description: 'Học cách giới thiệu bản thân và người khác',
    progress: 90,
    price: 20,
    originalPrice: 25,
    isFree: false,
    pointsRequired: 20,
    level: 'beginner',
    lessons: [
      { title: 'Từ vựng gia đình', progress: 100, completedDate: '2025-08-16', pointsEarned: 15 },
      { title: 'Ngữ pháp giới thiệu', progress: 100, completedDate: '2025-08-20', pointsEarned: 20 },
      { title: 'Luyện tập hội thoại', progress: 70, completedDate: null, pointsEarned: 0 },
    ],
  },
  {
    color: 'purple',
    date: '2025-07-10',
    title: 'Bài 3: Số đếm và thời gian',
    description: 'Học cách đếm số và nói về thời gian',
    progress: 60,
    price: 0,
    originalPrice: 0,
    isFree: true,
    pointsRequired: 0,
    level: 'intermediate',
    lessons: [
      { title: 'Số đếm Hàn Quốc', progress: 100, completedDate: '2025-07-12', pointsEarned: 12 },
      { title: 'Cách nói thời gian', progress: 50, completedDate: null, pointsEarned: 0 },
      { title: 'Bài tập thực hành', progress: 30, completedDate: null, pointsEarned: 0 },
    ],
  },
];


  // Dữ liệu Learning Progress (sửa color để hợp với Tailwind)
  const learningProgress = [
    { skill: 'Nghe', progress: 75, hours: 24, target: 30, trend: 'up', change: 5, color: 'cyan' },
    { skill: 'Nói', progress: 60, hours: 18, target: 25, trend: 'up', change: 3, color: 'emerald' },
    { skill: 'Đọc', progress: 85, hours: 32, target: 35, trend: 'stable', change: 0, color: 'pink' },
    { skill: 'Viết', progress: 45, hours: 12, target: 20, trend: 'down', change: -2, color: 'red' }
  ];

  // Dữ liệu Daily Tasks
  const dailyTasks = [
    { id: 1, title: 'Học 20 từ vựng mới', completed: true, points: 50, type: 'vocabulary', difficulty: 'easy', color: 'from-blue-400 to-blue-600' },
    { id: 2, title: 'Luyện nghe 30 phút', completed: true, points: 30, type: 'listening', difficulty: 'medium', color: 'from-green-400 to-green-600' },
    { id: 3, title: 'Làm bài tập ngữ pháp', completed: false, points: 40, type: 'grammar', difficulty: 'hard', color: 'from-purple-400 to-purple-600' },
    { id: 4, title: 'Viết 1 đoạn văn ngắn', completed: false, points: 60, type: 'writing', difficulty: 'hard', color: 'from-orange-400 to-orange-600' },
    { id: 5, title: 'Luyện phát âm với AI', completed: false, points: 25, type: 'speaking', difficulty: 'medium', color: 'from-pink-400 to-pink-600' }
  ];

  // Dữ liệu Các bài đã học (giả lập từ yêu cầu trước)
  const [expandedCourses, setExpandedCourses] = useState({});

    // Toggle details for a specific course
    const toggleDetails = (index) => {
      setExpandedCourses((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    };
  // Dữ liệu Leaderboard với hệ thống điểm số
  const leaderboard = [
    { 
      rank: 1, 
      name: 'Trần Thị B', 
      level: getStudentLevel(2840), 
      points: 2840, 
      avatar: 'B', 
      streak: 15, 
      wins: 8, 
      color: 'from-yellow-400 to-yellow-600',
      weeklyPoints: 150,
      monthlyPoints: 600
    },
    { 
      rank: 2, 
      name: 'Lê Văn C', 
      level: getStudentLevel(2650), 
      points: 2650, 
      avatar: 'C', 
      streak: 12, 
      wins: 6, 
      color: 'from-gray-400 to-gray-600',
      weeklyPoints: 120,
      monthlyPoints: 480
    },
    { 
      rank: 3, 
      name: 'Phạm Thị D', 
      level: getStudentLevel(2480), 
      points: 2480, 
      avatar: 'D', 
      streak: 8, 
      wins: 5, 
      color: 'from-orange-400 to-orange-600',
      weeklyPoints: 100,
      monthlyPoints: 400
    },
    { 
      rank: 4, 
      name: 'Hoàng Văn E', 
      level: getStudentLevel(2320), 
      points: 2320, 
      avatar: 'E', 
      streak: 5, 
      wins: 4, 
      color: 'from-blue-400 to-blue-600',
      weeklyPoints: 80,
      monthlyPoints: 320
    },
    { 
      rank: 5, 
      name: 'Nguyễn Văn A', 
      level: getStudentLevel(450), 
      points: 450, 
      avatar: 'A', 
      streak: 12, 
      wins: 3, 
      color: 'from-green-400 to-green-600',
      weeklyPoints: 60,
      monthlyPoints: 240
    }
  ];

  // Dữ liệu Streak
  const streakData = {
    currentStreak: 12,
    longestStreak: 25,
    totalStudyDays: 89,
    todayGoal: 30,
    todayProgress: 25,
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

  // Dữ liệu Achievements
  const recentAchievements = [
    { id: 1, title: 'Hoàn thành 50 bài học', description: 'Đã hoàn thành 50 bài học đầu tiên', icon: BookOpen, points: 100, date: '2024-01-15', color: 'bg-orange-500' },
    { id: 2, title: 'Streak 10 ngày', description: 'Duy trì học tập 10 ngày liên tiếp', icon: Flame, points: 50, date: '2024-01-14', color: 'bg-pink-500' },
    { id: 3, title: 'Thành thạo 100 từ vựng', description: 'Học thuộc 100 từ vựng cơ bản', icon: Target, points: 75, date: '2024-01-13', color: 'bg-cyan-500' }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <TrendingUp className="w-4 h-4 text-gray-500" />;
    }
  };

  const renderStreakCard = () => (
    <div className="relative overflow-hidden rounded-2xl border border-gray-500 p-8 mb-8 bg-white">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-bounce"></div>
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/20 rounded-2xl backdrop-blur-sm">
              <Flame className="w-8 h-8 animate-pulse text-orange-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-orange-500">Streak học tập</h3>
              <p className="text-sm text-gray-600">Duy trì động lực học tập</p>
            </div>
          </div>
          <button 
            onClick={() => setShowStreakDetails(!showStreakDetails)}
            className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110"
          >
            {showStreakDetails ? <EyeOff className="w-6 h-6 text-orange-500" /> : <Eye className="w-6 h-6 text-orange-500" />}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="border border-orange-500 text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-orange-500 mb-1">{streakData.currentStreak}</div>
            <div className="text-sm text-gray-600">Ngày hiện tại</div>
          </div>
          <div className="border border-orange-500 text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-orange-500 mb-1">{streakData.longestStreak}</div>
            <div className="text-sm text-gray-600">Kỷ lục</div>
          </div>
          <div className="border border-orange-500 text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-orange-500 mb-1">{streakData.totalStudyDays}</div>
            <div className="text-sm text-gray-600">Tổng ngày học</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-3">
            <span className="font-medium text-gray-600">Tiến độ hôm nay</span>
            <span className="font-bold text-gray-900">{streakData.todayProgress}/{streakData.todayGoal} phút</span>
          </div>
          <div className="w-full rounded-full h-3 overflow-hidden bg-gray-200">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(streakData.todayProgress / streakData.todayGoal) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Còn {streakData.todayGoal - streakData.todayProgress} phút để hoàn thành mục tiêu
          </p>
        </div>

        {showStreakDetails && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h4 className="font-semibold mb-3 text-lg text-gray-900">Lịch sử 30 ngày gần nhất:</h4>
              <div className="grid grid-cols-10 gap-2">
                {streakData.streakHistory.slice(-30).map((day, index) => (
                  <div 
                    key={index}
                    className={`w-8 h-8 rounded-lg text-xs flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      day.studied ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                    title={`${day.date}: ${day.studied ? `${day.minutes} phút học` : 'Không học'}`}
                  >
                    {day.studied ? '✓' : '✗'}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-lg text-gray-900">Cột mốc streak:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {streakData.milestones.map((milestone, index) => {
                  const Icon = milestone.icon;
                  return (
                    <div 
                      key={index}
                      className={`p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                        milestone.achieved ? 'bg-orange-500/20' : 'bg-gray-100'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mb-2 ${milestone.achieved ? 'text-orange-500' : 'text-gray-400'}`} />
                      <div className="text-sm font-medium text-gray-900">{milestone.days} ngày</div>
                      <div className="text-xs text-gray-600">{milestone.reward}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg text-orange-500">
              Mục tiêu tiếp theo: {streakData.milestones.find(m => !m.achieved)?.days} ngày
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAchievementsCard = () => (
    <div className="relative overflow-hidden rounded-2xl border border-gray-500 p-8 bg-white mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-green-700">Thành tích gần đây</h3>
          <button className="text-green-700 hover:text-green-800 text-sm font-medium transition-colors">
            Xem tất cả
          </button>
        </div>
        
        <div className="space-y-4">
          {recentAchievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-gray-200"
            >
              <div className={`p-3 rounded-2xl ${achievement.color}`}>
                <achievement.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full font-medium text-gray-900">
                    +{achievement.points} điểm
                  </span>
                  <span className="text-xs text-gray-600">{achievement.date}</span>
                </div>
              </div>
              <Award className="w-6 h-6 text-yellow-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <StudentLayout>
      <div className="space-y-8 container mx-auto p-4">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Chào mừng trở lại! Hãy tiếp tục hành trình học tiếng Hàn của bạn</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-gradient-to-r rounded-lg bg-blue-700 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 flex items-center gap-2 text-white">
              <Share2 className="w-5 h-5" />
              Chia sẻ
            </button>
            <button className="px-6 py-3 bg-gradient-to-r r rounded-lg bg-gray-500  hover:from-gray-600 hover:to-gray-700 transition-all duration-300 hover:scale-105 flex items-center gap-2 text-white">
              <Download className="w-5 h-5" />
              Xuất báo cáo
            </button>
          </div>
        </div>

        {/* User Level & Points Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Cấp độ hiện tại</h3>
                <p className="text-2xl font-bold">{currentUser.level.name}</p>
                <p className="text-sm opacity-90">{currentUser.level.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{currentUser.points}</div>
                <div className="text-sm opacity-90">điểm</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-green-500 to-teal-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Tiến độ cấp độ</h3>
                <p className="text-sm opacity-90">
                  {getProgressToNextLevel(currentUser.points).target === 'Max' 
                    ? 'Đã đạt cấp cao nhất!' 
                    : `${getProgressToNextLevel(currentUser.points).current}/${getProgressToNextLevel(currentUser.points).target} điểm`
                  }
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{Math.round(getProgressToNextLevel(currentUser.points).progress)}%</div>
                <div className="w-16 h-2 bg-white/30 rounded-full mt-2">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${getProgressToNextLevel(currentUser.points).progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-orange-500 to-red-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Streak hiện tại</h3>
                <p className="text-2xl font-bold">{currentUser.streak} ngày</p>
                <p className="text-sm opacity-90">Tổng: {currentUser.totalStudyDays} ngày</p>
              </div>
              <div className="text-right">
                <Flame className="w-8 h-8 opacity-80" />
              </div>
            </div>
          </Card>
        </div>

        < PointInfor />

        {/* Streak Card */}
        {renderStreakCard()}

        {/* Two Columns: Learning Progress and Daily Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Learning Progress */}
          <div className="relative overflow-hidden rounded-3xl bg-white p-8 border border-gray-200">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-2xl animate-bounce"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-blue-500">Tiến độ học tập</h3>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="week">Tuần này</option>
                    <option value="month">Tháng này</option>
                    <option value="year">Năm nay</option>
                  </select>
                </div>
              </div>
              <div className="mb-8 text-gray-600">
                Đang trong quá trình học 
                <span className="text-blue-500 font-bold"> Tiếng Hàn trung cấp 3</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {learningProgress.map((skill, index) => (
                  <div 
                    key={index} 
                    className={`p-6 rounded-2xl border-2 border-${skill.color}-500 bg-white hover: transition-all duration-300 hover:scale-105 cursor-pointer`}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-lg text-gray-900">{skill.skill}</h4>
                      {getTrendIcon(skill.trend)}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold text-gray-900">{skill.progress}%</span>
                      <span className={`text-sm font-medium ${
                        skill.trend === 'up' ? 'text-green-600' : skill.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {skill.trend === 'up' ? '+' : ''}{skill.change}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className={`bg-${skill.color}-500 h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{skill.hours}h học</span>
                      <span>Mục tiêu: {skill.target}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Daily Tasks */}
          <div className="relative overflow-hidden rounded-3xl bg-white p-8 border border-gray-200">
            <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-2xl animate-bounce"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Nhiệm vụ hôm nay
                </h3>
                <span className="text-sm bg-green-100 px-3 py-1 rounded-full text-green-700 font-bold">
                  {dailyTasks.filter(task => task.completed).length}/{dailyTasks.length} hoàn thành
                </span>
              </div>

              <div className="space-y-4">
                {dailyTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                      task.completed
                        ? `bg-gradient-to-r ${task.color} `
                        : 'bg-white border border-green-200'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-2xl ${
                        task.completed ? 'bg-white/20' : 'bg-gray-100'
                      }`}
                    >
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
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            task.completed ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          +{task.points} điểm
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            task.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                            task.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}
                        >
                          {task.difficulty === 'easy' ? 'Dễ' : task.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                        </span>
                      </div>
                    </div>
                    {!task.completed && (
                      <button className="px-4 py-2 bg-blue-500 rounded-xl text-sm hover:bg-blue-600 transition-all duration-300 hover:scale-105 text-white">
                        Bắt đầu
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='border border-green-500 rounded-3xl p-12 bg-white mb-8 '>
          <h3 className="text-2xl font-bold text-green-700 mb-6">Các bài đã học</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl bg-${course.color}-100 border border-${course.color}-300`}
                >
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500">Start: {course.date}</p>
                    <h2 className={`text-lg font-semibold text-${course.color}-600`}>
                      {course.title}
                    </h2>
                    <p className="text-gray-600 text-sm">{course.description}</p>

                    {/* Pricing */}
                    <div className="flex items-center justify-between">
                      {course.isFree ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          Miễn phí
                        </span>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-blue-600">
                            {course.price} điểm
                          </span>
                          {course.originalPrice > course.price && (
                            <span className="text-sm text-gray-500 line-through">
                              {course.originalPrice} điểm
                            </span>
                          )}
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        Cần {course.pointsRequired} điểm
                      </div>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-${course.color}-500`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Details Button */}
                    <button
                      onClick={() => toggleDetails(index)}
                      className={`mt-3 text-${course.color}-600 hover:text-${course.color}-800 font-medium text-sm focus:outline-none`}
                    >
                      {expandedCourses[index] ? 'Ẩn Chi tiết' : 'Chi tiết'}
                    </button>

                    {/* Lessons Dropdown */}
                    {expandedCourses[index] && (
                      <div className="mt-4 space-y-3 transition-all duration-300 ease-in-out">
                        {course.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className={`flex items-center justify-between p-3 bg-${course.color}-50 rounded-lg hover:bg-${course.color}-100 transition-colors duration-200 border-l-4 border-${course.color}-300`}
                          >
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-semibold text-gray-800">
                                {lesson.title}
                              </p>
                              <p className="text-xs text-gray-600">
                                Hoàn thành: {lesson.completedDate || 'Chưa hoàn thành'}
                              </p>
                              {lesson.pointsEarned > 0 && (
                                <p className="text-xs text-green-600 font-medium">
                                  +{lesson.pointsEarned} điểm
                                </p>
                              )}
                              <p className="text-xs text-gray-600">
                                Tiến trình: {lesson.progress}%
                              </p>
                            </div>
                            <div
                              className={`text-lg font-bold ${
                                lesson.progress === 100
                                  ? `text-${course.color}-600`
                                  : 'text-red-500'
                              }`}
                            >
                              {lesson.progress === 100 ? '✔' : '✘'}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
        </div>

        {/* Achievements Card */}
        {renderAchievementsCard()}

      
       {/* Leaderboard */}
<div className="relative overflow-hidden rounded-3xl bg-white p-8 border border-gray-200 mx-auto">
  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
  <div className="relative z-10">
    <div className="flex items-center justify-between mb-8">
      <h3 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Bảng xếp hạng
      </h3>
      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold transition-colors">
        Xem tất cả
      </button>
    </div>
        {/* Top 3 users */}
    <div className="flex justify-center gap-10 mb-10">
      {leaderboard.slice(0, 3).map((user, idx) => (
        <div
          key={user.rank}
          className="relative bg-white shadow-lg rounded-3xl p-6 w-60 flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          {/* Rank badge (larger, with shadow and distinct color) */}
          <div
            className={`absolute -top-6 flex items-center justify-center w-14 h-14 rounded-full font-bold text-xl text-white shadow-lg ${
              idx === 0 ? "bg-yellow-400" : idx === 1 ? "bg-gray-400" : "bg-yellow-600"
            }`}
          >
            {user.rank}
          </div>
          {/* Avatar */}
          <img
            src={user.avatar || `https://i.pravatar.cc/150?img=${user.rank + 10}`}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-indigo-500"
          />
                    {/* Name */}
          <div className="font-semibold text-lg text-gray-900 mb-1">{user.name}</div>
          {/* Level và số chiến thắng */}
          <div className="text-sm text-gray-600 mb-2">{user.level.name} • {user.wins} chiến thắng</div>
          {/* Điểm và streak */}
          <div className="font-bold text-indigo-700 text-lg">{user.points} điểm</div>
          <div className="text-sm text-gray-500 mt-1">Streak: {user.streak} ngày</div>
        </div>
      ))}
    </div>
     {/* Danh sách người chơi thứ 4 trở đi */}
    <div className="space-y-5">
      {leaderboard.slice(3).map((user, i) => (
        <motion.div
          key={user.rank}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, type: "spring", stiffness: 100 }}
          className="flex items-center justify-between p-5 bg-white bg-opacity-90 backdrop-blur-md rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          {/* Left side */}
          <div className="flex items-center gap-5">
            {/* Avatar + Rank */}
            <div className="relative flex-shrink-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-14 h-14 rounded-full border-4 border-yellow-400 shadow-lg"
              />
              <span className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                {user.rank}
              </span>
            </div>

            {/* User info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 truncate max-w-xs">
                {user.name}
              </h3>
              <p className="text-sm text-gray-500">
                {user.level.name} • {user.wins} chiến thắng
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="text-right flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                {user.points} điểm
              </span>
              {user.trend === "up" && (
                <ArrowUp className="w-6 h-6 text-green-500" />
              )}
              {user.trend === "down" && (
                <ArrowDown className="w-6 h-6 text-red-500" />
              )}
              {user.trend === "same" && (
                <Minus className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <p className="text-sm text-gray-400 italic">Streak: {user.streak} ngày</p>
          </div>
        </motion.div>
      ))}
    </div>


      </div>
    </div>

      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;