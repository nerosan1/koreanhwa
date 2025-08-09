import React, { useState } from 'react';
import { 
  Target, 
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
  TrendingUp,
  Award,
  Heart,
  Target as TargetIcon,
  Bookmark,
  Share2,
  Download,
  Eye,
  EyeOff,
  Calendar,
  MapPin,
  Users,
  BookOpen as BookIcon,
  Play,
  Lock,
  Unlock,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  RotateCcw,
  Settings,
  Bell,
  BellOff,
  ShoppingBag,
  Car,
  Briefcase,
  Music,
  Building,
  GraduationCap,
  Smartphone,
  Palette
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

const MyRoadmap = () => {
  const [showStreakDetails, setShowStreakDetails] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentView, setCurrentView] = useState('roadmap'); // roadmap, stats, achievements

  // Enhanced learning levels data
  const learningLevels = [
    {
      id: 1,
      name: 'Sơ cấp 1',
      description: 'Nền tảng cơ bản tiếng Hàn',
      progress: 100,
      completedDate: '2024-01-10',
      totalLessons: 20,
      completedLessons: 20,
      skills: [
        { name: 'Bảng chữ cái', progress: 100, icon: BookOpen },
        { name: 'Số đếm', progress: 100, icon: Target },
        { name: 'Chào hỏi', progress: 100, icon: Users },
        { name: 'Giới thiệu', progress: 100, icon: Mic }
      ],
      achievements: [
        { name: 'Người mới bắt đầu', icon: Star, color: 'from-yellow-400 to-orange-500' },
        { name: 'Hoàn thành cơ bản', icon: Trophy, color: 'from-blue-400 to-cyan-500' }
      ],
      nextLesson: null,
      previewLessons: [],
      color: 'from-green-400 to-emerald-500',
      status: 'completed'
    },
    {
      id: 2,
      name: 'Sơ cấp 2',
      description: 'Giao tiếp cơ bản hàng ngày',
      progress: 75,
      completedDate: null,
      totalLessons: 25,
      completedLessons: 19,
      skills: [
        { name: 'Thời gian', progress: 100, icon: Clock },
        { name: 'Địa điểm', progress: 80, icon: MapPin },
        { name: 'Mua sắm', progress: 60, icon: ShoppingBag },
        { name: 'Giao thông', progress: 40, icon: Car }
      ],
      achievements: [
        { name: 'Giao tiếp cơ bản', icon: Users, color: 'from-green-400 to-emerald-500' }
      ],
      nextLesson: {
        title: 'Bài 20: Đặt món ăn',
        description: 'Học cách đặt món ăn tại nhà hàng Hàn Quốc',
        duration: '30 phút',
        difficulty: 'Trung bình'
      },
      previewLessons: [
        { title: 'Bài 21: Mua sắm', duration: '25 phút' },
        { title: 'Bài 22: Du lịch', duration: '35 phút' }
      ],
      color: 'from-blue-400 to-cyan-500',
      status: 'in-progress'
    },
    {
      id: 3,
      name: 'Sơ cấp 3',
      description: 'Giao tiếp nâng cao và văn hóa',
      progress: 0,
      completedDate: null,
      totalLessons: 30,
      completedLessons: 0,
      skills: [
        { name: 'Văn hóa Hàn Quốc', progress: 0, icon: Heart },
        { name: 'Công việc', progress: 0, icon: Briefcase },
        { name: 'Sức khỏe', progress: 0, icon: Activity },
        { name: 'Giải trí', progress: 0, icon: Music }
      ],
      achievements: [],
      nextLesson: null,
      previewLessons: [
        { title: 'Bài 1: Văn hóa chào hỏi', duration: '30 phút' },
        { title: 'Bài 2: Phong tục tập quán', duration: '35 phút' }
      ],
      color: 'from-purple-400 to-pink-500',
      status: 'locked'
    },
    {
      id: 4,
      name: 'Trung cấp 1',
      description: 'Giao tiếp chuyên sâu và kinh doanh',
      progress: 0,
      completedDate: null,
      totalLessons: 35,
      completedLessons: 0,
      skills: [
        { name: 'Kinh doanh', progress: 0, icon: Building },
        { name: 'Học thuật', progress: 0, icon: GraduationCap },
        { name: 'Công nghệ', progress: 0, icon: Smartphone },
        { name: 'Nghệ thuật', progress: 0, icon: Palette }
      ],
      achievements: [],
      nextLesson: null,
      previewLessons: [
        { title: 'Bài 1: Giao tiếp kinh doanh', duration: '40 phút' },
        { title: 'Bài 2: Thuyết trình', duration: '45 phút' }
      ],
      color: 'from-orange-400 to-red-500',
      status: 'locked'
    }
  ];

  // Enhanced streak data
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

  // Enhanced learning stats
  const learningStats = {
    totalStudyTime: 156,
    totalLessons: 39,
    totalVocabulary: 850,
    totalGrammar: 45,
    skillDistribution: [
      { name: 'Nghe', value: 35, color: '#8884d8' },
      { name: 'Nói', value: 25, color: '#82ca9d' },
      { name: 'Đọc', value: 30, color: '#ffc658' },
      { name: 'Viết', value: 10, color: '#ff7300' }
    ],
    weeklyProgress: [
      { week: 'Tuần 1', lessons: 5, vocabulary: 50, grammar: 3 },
      { week: 'Tuần 2', lessons: 7, vocabulary: 75, grammar: 5 },
      { week: 'Tuần 3', lessons: 6, vocabulary: 60, grammar: 4 },
      { week: 'Tuần 4', lessons: 8, vocabulary: 90, grammar: 6 },
      { week: 'Tuần 5', lessons: 7, vocabulary: 80, grammar: 5 },
      { week: 'Tuần 6', lessons: 6, vocabulary: 70, grammar: 4 }
    ]
  };

  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              My Roadmap
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Hành trình học tiếng Hàn của bạn</p>
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

        {/* View Toggle */}
        <div className="flex items-center justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
            <div className="flex gap-2">
              {[
                { id: 'roadmap', name: 'Roadmap', icon: Target },
                { id: 'stats', name: 'Thống kê', icon: BarChart3 },
                { id: 'achievements', name: 'Thành tích', icon: Trophy }
              ].map((view) => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.id}
                    onClick={() => setCurrentView(view.id)}
                    className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                      currentView === view.id
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {view.name}
                  </button>
                );
              })}
        </div>
      </div>
        </div>

        {/* Content based on current view */}
        {currentView === 'roadmap' && (
          <div className="space-y-8">
            {/* Learning Levels */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Các cấp độ học tập
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {learningLevels.map((level, index) => (
                  <div 
                    key={level.id}
                    className={`relative overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:scale-105 cursor-pointer ${
                      level.status === 'completed' 
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-2xl' 
                        : level.status === 'in-progress' 
                        ? 'bg-gradient-to-br from-blue-400 to-cyan-500 text-white shadow-2xl' 
                        : 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-600 shadow-lg'
                    }`}
                    onClick={() => setSelectedLevel(selectedLevel === level.id ? null : level.id)}
                  >
                    {/* Animated background elements */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                    <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl animate-bounce"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`p-4 rounded-2xl backdrop-blur-sm ${
                            level.status === 'completed' ? 'bg-white/20' : level.status === 'in-progress' ? 'bg-white/20' : 'bg-white/10'
                          }`}>
                            {level.status === 'completed' ? (
                              <CheckCircle className="w-8 h-8 text-white" />
                            ) : level.status === 'in-progress' ? (
                              <Activity className="w-8 h-8 text-white animate-pulse" />
                            ) : (
                              <Lock className="w-8 h-8 text-gray-500" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold mb-1">{level.name}</h3>
                            <p className={`text-sm ${level.status === 'completed' ? 'text-green-100' : level.status === 'in-progress' ? 'text-blue-100' : 'text-gray-500'}`}>
                              {level.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">{level.progress}%</div>
                          <div className="text-sm opacity-80">Hoàn thành</div>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-white/20 rounded-full h-3 mb-4 overflow-hidden">
                        <div 
                          className={`h-3 rounded-full transition-all duration-1000 ease-out shadow-lg ${
                            level.status === 'completed' ? 'bg-white' : level.status === 'in-progress' ? 'bg-white' : 'bg-gray-400'
            }`}
            style={{ width: `${level.progress}%` }}
          ></div>
        </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                          <div className="text-lg font-bold">{level.completedLessons}</div>
                          <div className="text-xs opacity-80">Bài học</div>
                        </div>
                        <div className="text-center p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                          <div className="text-lg font-bold">{level.totalLessons}</div>
                          <div className="text-xs opacity-80">Tổng cộng</div>
                        </div>
                        <div className="text-center p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                          <div className="text-lg font-bold">{level.skills.length}</div>
                          <div className="text-xs opacity-80">Kỹ năng</div>
                        </div>
                      </div>

                      {/* Skills preview */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {level.skills.slice(0, 4).map((skill, skillIndex) => (
                          <div key={skillIndex} className="flex items-center gap-2 p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                            <skill.icon className="w-4 h-4" />
                            <div className="flex-1">
                              <div className="text-xs font-medium truncate">{skill.name}</div>
                              <div className="text-xs opacity-80">{skill.progress}%</div>
                            </div>
                          </div>
                        ))}
      </div>

                      {/* Achievements */}
                      {level.achievements.length > 0 && (
                        <div className="flex gap-2 mb-4">
                          {level.achievements.map((achievement, achievementIndex) => (
                            <div key={achievementIndex} className={`p-2 rounded-xl bg-gradient-to-br ${achievement.color}`}>
                              <achievement.icon className="w-4 h-4 text-white" />
        </div>
                          ))}
                        </div>
                      )}

                      {/* Next lesson or preview */}
                      {level.status === 'in-progress' && level.nextLesson && (
                        <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm mb-4">
                          <h4 className="font-semibold mb-2">Bài học tiếp theo:</h4>
                          <div className="text-sm">
                            <div className="font-medium">{level.nextLesson.title}</div>
                            <div className="opacity-80">{level.nextLesson.description}</div>
                            <div className="flex items-center gap-4 mt-2 text-xs">
                              <span>⏱️ {level.nextLesson.duration}</span>
                              <span>📊 {level.nextLesson.difficulty}</span>
          </div>
        </div>
        </div>
      )}

                      {/* Expandable details */}
                      {selectedLevel === level.id && (
                        <div className="mt-4 pt-4 border-t border-white/20 animate-fadeIn">
                          <div className="space-y-4">
                            {/* Detailed skills */}
                            <div>
                              <h4 className="font-semibold mb-3">Kỹ năng chi tiết:</h4>
                              <div className="grid grid-cols-2 gap-3">
                                {level.skills.map((skill, skillIndex) => (
                                  <div key={skillIndex} className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                      <skill.icon className="w-5 h-5" />
                                      <span className="font-medium">{skill.name}</span>
                                    </div>
                                    <div className="w-full bg-white/20 rounded-full h-2">
                                      <div 
                                        className="bg-white h-2 rounded-full transition-all duration-1000"
                                        style={{ width: `${skill.progress}%` }}
                                      ></div>
                                    </div>
                                    <div className="text-xs mt-1">{skill.progress}% hoàn thành</div>
                                  </div>
          ))}
        </div>
      </div>

                            {/* Preview lessons */}
                            {level.previewLessons.length > 0 && (
                              <div>
                                <h4 className="font-semibold mb-3">Bài học sắp tới:</h4>
                                <div className="space-y-2">
                                  {level.previewLessons.map((lesson, lessonIndex) => (
                                    <div key={lessonIndex} className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
                                          <div className="font-medium">{lesson.title}</div>
                                          <div className="text-sm opacity-80">⏱️ {lesson.duration}</div>
          </div>
                                        <Lock className="w-4 h-4 opacity-50" />
          </div>
        </div>
                                  ))}
                                </div>
              </div>
                            )}
              </div>
            </div>
                      )}

                      {/* Action button */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm opacity-80">
                          {level.status === 'completed' ? 'Đã hoàn thành' : level.status === 'in-progress' ? 'Đang học' : 'Chưa mở khóa'}
                        </span>
                        <button className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                          level.status === 'completed' 
                            ? 'bg-white/20 hover:bg-white/30' 
                            : level.status === 'in-progress' 
                            ? 'bg-white/20 hover:bg-white/30' 
                            : 'bg-gray-500/20 hover:bg-gray-500/30'
                        }`}>
                          {level.status === 'completed' ? 'Xem lại' : level.status === 'in-progress' ? 'Tiếp tục' : 'Mở khóa'}
                        </button>
              </div>
              </div>
            </div>
                ))}
              </div>
            </div>

            {/* Streak and Stats Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Streak Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 p-6 text-white shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-bounce"></div>
                
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
                </div>
              </div>

              {/* Stats Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-6 text-white shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl animate-bounce"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                      Thống kê học tập
                    </h3>
                    <button className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                      Xem chi tiết
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                      <div className="text-2xl font-bold">{learningStats.totalStudyTime}h</div>
                      <div className="text-sm text-purple-100">Tổng thời gian học</div>
              </div>
                    <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                      <div className="text-2xl font-bold">{learningStats.totalLessons}</div>
                      <div className="text-sm text-purple-100">Bài học đã hoàn thành</div>
            </div>
                    <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                      <div className="text-2xl font-bold">{learningStats.totalVocabulary}</div>
                      <div className="text-sm text-purple-100">Từ vựng đã học</div>
          </div>
                    <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                      <div className="text-2xl font-bold">{learningStats.totalGrammar}</div>
                      <div className="text-sm text-purple-100">Cấu trúc ngữ pháp</div>
          </div>
        </div>

                  {/* Skills Chart */}
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={learningStats.skillDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {learningStats.skillDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                <Tooltip />
                      </RechartsPieChart>
            </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'stats' && (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-blue-50 to-purple-50 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-2xl animate-bounce"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                Thống kê chi tiết
              </h2>
              
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Thống kê chi tiết</h3>
                <p className="text-gray-600">Các biểu đồ và phân tích chi tiết sẽ được hiển thị ở đây</p>
              </div>
            </div>
          </div>
        )}

        {currentView === 'achievements' && (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-50 to-orange-50 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-red-400/20 to-pink-400/20 rounded-full blur-2xl animate-bounce"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-8">
                Thành tích và huy hiệu
              </h2>
              
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Thành tích</h3>
                <p className="text-gray-600">Danh sách thành tích và huy hiệu sẽ được hiển thị ở đây</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default MyRoadmap; 