import React from 'react';
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  TrendingUp, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  Award,
  Target,
  Eye,
  MessageSquare,
  FileText,
  Video,
  Headphones,
  PenTool,
  Brain
} from 'lucide-react';

const TeacherDashboard = () => {
  const stats = [
    { 
      name: 'Tổng học viên', 
      value: '156', 
      change: '+12%', 
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'Bài học đã tạo', 
      value: '89', 
      change: '+8%', 
      changeType: 'positive',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      name: 'Đánh giá trung bình', 
      value: '4.8', 
      change: '+0.2', 
      changeType: 'positive',
      icon: Star,
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      name: 'Tỷ lệ hoàn thành', 
      value: '92%', 
      change: '+5%', 
      changeType: 'positive',
      icon: Target,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'lesson_created',
      title: 'Tạo bài học mới',
      description: 'Bài 5: Ngữ pháp nâng cao',
      time: '2 giờ trước',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 2,
      type: 'student_joined',
      title: 'Học viên mới',
      description: 'Nguyễn Văn A đã tham gia khóa học',
      time: '4 giờ trước',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      type: 'assignment_graded',
      title: 'Chấm bài tập',
      description: 'Đã chấm 15 bài tập của học viên',
      time: '6 giờ trước',
      icon: CheckCircle,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      type: 'feedback_received',
      title: 'Nhận đánh giá',
      description: 'Học viên đánh giá 5 sao cho bài học',
      time: '1 ngày trước',
      icon: Star,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const upcomingClasses = [
    {
      id: 1,
      title: 'TOPIK I - Bài 3',
      students: 12,
      time: '09:00 - 10:30',
      date: 'Hôm nay',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Giao tiếp cơ bản',
      students: 8,
      time: '14:00 - 15:30',
      date: 'Hôm nay',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Ngữ pháp nâng cao',
      students: 15,
      time: '16:00 - 17:30',
      date: 'Ngày mai',
      status: 'upcoming'
    }
  ];

  const topStudents = [
    {
      id: 1,
      name: 'Nguyễn Thị A',
      avatar: 'A',
      progress: 95,
      level: 'Sơ cấp 2',
      lastActive: '2 giờ trước'
    },
    {
      id: 2,
      name: 'Trần Văn B',
      avatar: 'B',
      progress: 88,
      level: 'Sơ cấp 1',
      lastActive: '4 giờ trước'
    },
    {
      id: 3,
      name: 'Lê Thị C',
      avatar: 'C',
      progress: 82,
      level: 'Trung cấp 1',
      lastActive: '1 ngày trước'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Teacher Dashboard
          </h1>
          <p className="text-lg text-gray-600 mt-2">Chào mừng trở lại, Giáo viên!</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-700">Hôm nay, 15/12/2024</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-blue-50 p-6 shadow-xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.name}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <TrendingUp className={`w-4 h-4 ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={`text-sm font-semibold ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500">so với tháng trước</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-blue-50 p-8 shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Hoạt động gần đây
                </h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                  Xem tất cả
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className={`w-12 h-12 bg-gradient-to-r ${activity.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Classes */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-green-50 to-emerald-50 p-6 shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-xl animate-pulse"></div>
            
            <div className="relative z-10">
              <h3 className="font-bold text-gray-800 mb-4">Lịch dạy sắp tới</h3>
              <div className="space-y-3">
                {upcomingClasses.map((classItem) => (
                  <div key={classItem.id} className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{classItem.title}</h4>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {classItem.students} học viên
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{classItem.time}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{classItem.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Students */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-purple-50 to-pink-50 p-6 shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>
            
            <div className="relative z-10">
              <h3 className="font-bold text-gray-800 mb-4">Học viên xuất sắc</h3>
              <div className="space-y-3">
                {topStudents.map((student) => (
                  <div key={student.id} className="flex items-center space-x-3 p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-semibold">{student.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{student.name}</h4>
                      <p className="text-xs text-gray-500">{student.level}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-800">{student.progress}%</div>
                      <div className="text-xs text-gray-500">{student.lastActive}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard; 