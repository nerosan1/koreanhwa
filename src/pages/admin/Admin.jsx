import React from 'react';
import { 
  Users, 
  BookOpen, 
  MessageSquare, 
  FileText,
  TrendingUp,
  Award,
  Eye,
  Plus,
  Download
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import AdminLayout from '../../components/layout/AdminLayout';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Admin = () => {
  // Mock data
  const systemStats = {
    totalUsers: 1250,
    activeUsers: 890,
    totalLessons: 156,
    totalContent: 2340,
    forumPosts: 567,
    dictionaryEntries: 8900
  };

  const recentActivities = [
    { id: 1, type: 'user', action: 'New user registered', user: 'john.doe@email.com', time: '2 minutes ago' },
    { id: 2, type: 'content', action: 'Lesson updated', user: 'admin', time: '15 minutes ago' },
    { id: 3, type: 'forum', action: 'Post approved', user: 'moderator', time: '1 hour ago' },
    { id: 4, type: 'dictionary', action: 'New word added', user: 'teacher', time: '2 hours ago' }
  ];

  const quickActions = [
    {
      title: 'Thêm người dùng mới',
      description: 'Tạo tài khoản cho học viên hoặc giáo viên',
      icon: Plus,
      color: 'blue',
      path: '/admin/users'
    },
    {
      title: 'Upload nội dung',
      description: 'Thêm video bài giảng hoặc tài liệu mới',
      icon: BookOpen,
      color: 'green',
      path: '/admin/content'
    },
    {
      title: 'Duyệt bài viết',
      description: 'Kiểm tra và phê duyệt bài viết trên diễn đàn',
      icon: MessageSquare,
      color: 'orange',
      path: '/admin/forum'
    },
    {
      title: 'Xuất báo cáo',
      description: 'Tạo báo cáo thống kê học tập',
      icon: Download,
      color: 'purple',
      path: '/admin/reports'
    }
  ];

  // Chart data
  const userGrowthData = [
    { month: 'Jan', users: 800, newUsers: 120 },
    { month: 'Feb', users: 920, newUsers: 140 },
    { month: 'Mar', users: 1050, newUsers: 130 },
    { month: 'Apr', users: 1150, newUsers: 100 },
    { month: 'May', users: 1200, newUsers: 50 },
    { month: 'Jun', users: 1250, newUsers: 50 }
  ];

  const contentStatsData = [
    { type: 'Video', count: 45, percentage: 28.8 },
    { type: 'Từ vựng', count: 38, percentage: 24.4 },
    { type: 'Ngữ pháp', count: 32, percentage: 20.5 },
    { type: 'Bài tập', count: 25, percentage: 16.0 },
    { type: 'Văn hóa', count: 16, percentage: 10.3 }
  ];

  const weeklyActivityData = [
    { day: 'T2', lessons: 45, users: 120, posts: 23 },
    { day: 'T3', lessons: 52, users: 135, posts: 28 },
    { day: 'T4', lessons: 48, users: 128, posts: 25 },
    { day: 'T5', lessons: 61, users: 142, posts: 32 },
    { day: 'T6', lessons: 55, users: 138, posts: 29 },
    { day: 'T7', lessons: 67, users: 156, posts: 35 },
    { day: 'CN', lessons: 58, users: 145, posts: 31 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Tổng quan hệ thống KoreanHwa</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Quick Action
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-lg font-semibold text-gray-900">{systemStats.totalUsers}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Active Users</p>
                <p className="text-lg font-semibold text-gray-900">{systemStats.activeUsers}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Lessons</p>
                <p className="text-lg font-semibold text-gray-900">{systemStats.totalLessons}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FileText className="w-5 h-5 text-orange-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Content</p>
                <p className="text-lg font-semibold text-gray-900">{systemStats.totalContent}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Forum Posts</p>
                <p className="text-lg font-semibold text-gray-900">{systemStats.forumPosts}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Dictionary</p>
                <p className="text-lg font-semibold text-gray-900">{systemStats.dictionaryEntries}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tăng trưởng người dùng</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stackId="1" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.6}
                  name="Tổng người dùng"
                />
                <Area 
                  type="monotone" 
                  dataKey="newUsers" 
                  stackId="1" 
                  stroke="#82ca9d" 
                  fill="#82ca9d" 
                  fillOpacity={0.6}
                  name="Người dùng mới"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Content Distribution Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố nội dung</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contentStatsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, percentage }) => `${type}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {contentStatsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Weekly Activity Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động tuần</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="lessons" fill="#8884d8" name="Bài học" />
              <Bar dataKey="users" fill="#82ca9d" name="Người dùng" />
              <Bar dataKey="posts" fill="#ffc658" name="Bài viết" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-${action.color}-100`}>
                      <IconComponent className={`w-6 h-6 text-${action.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Access
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'user' ? 'bg-blue-500' :
                      activity.type === 'content' ? 'bg-green-500' :
                      activity.type === 'forum' ? 'bg-orange-500' : 'bg-purple-500'
                    }`}></div>
                    <span className="text-sm text-gray-900">{activity.action}</span>
                    <span className="text-xs text-gray-500">by {activity.user}</span>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hệ thống trạng thái</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Server Status</span>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">AI Services</span>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Backup Status</span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  Last: 2h ago
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin; 