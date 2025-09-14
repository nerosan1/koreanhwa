import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Calendar,
  Filter,
  Eye,
  FileText,
  TrendingUp,
  Users,
  BookOpen,
  Award,
  Clock,
  Target
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  AreaChart,
  Area,
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

const ReportsManagement = () => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('month');
  const [showReportModal, setShowReportModal] = useState(false);

  // Mock report data
  const overviewData = {
    totalStudents: 1250,
    activeStudents: 890,
    totalLessons: 156,
    completedLessons: 12400,
    averageScore: 84,
    averageProgress: 76,
    totalHours: 8900,
    achievements: 5600
  };

  const monthlyProgressData = [
    { month: 'Jan', students: 1200, progress: 72, score: 81, hours: 850 },
    { month: 'Feb', students: 1250, progress: 75, score: 83, hours: 920 },
    { month: 'Mar', students: 1280, progress: 78, score: 85, hours: 980 },
    { month: 'Apr', students: 1300, progress: 80, score: 86, hours: 1020 },
    { month: 'May', students: 1320, progress: 82, score: 87, hours: 1080 },
    { month: 'Jun', students: 1350, progress: 84, score: 88, hours: 1150 }
  ];

  const levelPerformanceData = [
    { level: 'Cơ bản', students: 850, avgProgress: 68, avgScore: 78, completion: 72 },
    { level: 'Trung cấp', students: 320, avgProgress: 82, avgScore: 85, completion: 88 },
    { level: 'Nâng cao', students: 180, avgProgress: 91, avgScore: 92, completion: 95 }
  ];

  const lessonCompletionData = [
    { lesson: 'Bài 1: Chào hỏi', completed: 1200, avgScore: 85, avgTime: 15 },
    { lesson: 'Bài 2: Gia đình', completed: 1150, avgScore: 82, avgTime: 18 },
    { lesson: 'Bài 3: Số đếm', completed: 1100, avgScore: 88, avgTime: 12 },
    { lesson: 'Bài 4: Thời gian', completed: 1050, avgScore: 80, avgTime: 20 },
    { lesson: 'Bài 5: Màu sắc', completed: 1000, avgScore: 86, avgTime: 14 }
  ];

  const achievementData = [
    { achievement: 'First Lesson', earned: 1200, percentage: 96 },
    { achievement: 'Week Streak', earned: 850, percentage: 68 },
    { achievement: 'Perfect Score', earned: 650, percentage: 52 },
    { achievement: 'Grammar Master', earned: 480, percentage: 38 },
    { achievement: 'Vocabulary Expert', earned: 420, percentage: 34 }
  ];

  const weeklyActivityData = [
    { week: 'Tuần 1', activeUsers: 850, lessonsCompleted: 4200, avgScore: 82, totalHours: 2100 },
    { week: 'Tuần 2', activeUsers: 920, lessonsCompleted: 4600, avgScore: 84, totalHours: 2300 },
    { week: 'Tuần 3', activeUsers: 880, lessonsCompleted: 4400, avgScore: 86, totalHours: 2200 },
    { week: 'Tuần 4', activeUsers: 950, lessonsCompleted: 4800, avgScore: 85, totalHours: 2400 },
    { week: 'Tuần 5', activeUsers: 900, lessonsCompleted: 4500, avgScore: 87, totalHours: 2250 },
    { week: 'Tuần 6', activeUsers: 870, lessonsCompleted: 4350, avgScore: 86, totalHours: 2175 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const reportTypes = [
    { id: 'overview', name: 'Tổng quan', icon: BarChart3 },
    { id: 'progress', name: 'Tiến độ học tập', icon: TrendingUp },
    { id: 'performance', name: 'Hiệu suất', icon: Target },
    { id: 'achievements', name: 'Thành tích', icon: Award },
    { id: 'activity', name: 'Hoạt động', icon: Clock }
  ];

  const generateReport = () => {
    setShowReportModal(true);
  };

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Tổng học viên</p>
              <p className="text-lg font-semibold text-gray-900">{overviewData.totalStudents}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Tiến độ TB</p>
              <p className="text-lg font-semibold text-gray-900">{overviewData.averageProgress}%</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Target className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Điểm TB</p>
              <p className="text-lg font-semibold text-gray-900">{overviewData.averageScore}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Tổng giờ học</p>
              <p className="text-lg font-semibold text-gray-900">{overviewData.totalHours}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Monthly Progress Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tiến độ học tập hàng tháng</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={monthlyProgressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="progress" 
              stackId="1" 
              stroke="#8884d8" 
              fill="#8884d8" 
              fillOpacity={0.6}
              name="Tiến độ TB (%)"
            />
            <Area 
              yAxisId="right"
              type="monotone" 
              dataKey="score" 
              stackId="2" 
              stroke="#82ca9d" 
              fill="#82ca9d" 
              fillOpacity={0.6}
              name="Điểm TB"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="students" 
              stroke="#ff8042" 
              strokeWidth={2}
              name="Số học viên"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Level Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hiệu suất theo cấp độ</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={levelPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="level" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgProgress" fill="#8884d8" name="Tiến độ TB (%)" />
            <Bar dataKey="avgScore" fill="#82ca9d" name="Điểm TB" />
            <Bar dataKey="completion" fill="#ff8042" name="Tỷ lệ hoàn thành (%)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );

  const renderProgressReport = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tiến độ hoàn thành bài học</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={lessonCompletionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="lesson" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" fill="#8884d8" name="Số học viên hoàn thành" />
            <Bar dataKey="avgScore" fill="#82ca9d" name="Điểm TB" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );

  const renderAchievementReport = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố thành tích</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={achievementData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ achievement, earned }) => `${achievement}: ${earned}`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="earned"
            >
              {achievementData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );

  const renderActivityReport = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động học tập hàng tuần</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={weeklyActivityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="activeUsers" 
              stroke="#8884d8" 
              strokeWidth={2}
              name="Học viên hoạt động"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="lessonsCompleted" 
              stroke="#82ca9d" 
              strokeWidth={2}
              name="Bài học hoàn thành"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="totalHours" 
              stroke="#ff8042" 
              strokeWidth={2}
              name="Tổng giờ học"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'overview':
        return renderOverviewReport();
      case 'progress':
        return renderProgressReport();
      case 'achievements':
        return renderAchievementReport();
      case 'activity':
        return renderActivityReport();
      default:
        return renderOverviewReport();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tạo báo cáo học tập</h1>
            <p className="text-gray-600">Biểu đồ, thống kê điểm số, phân tích dữ liệu</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Chọn khoảng thời gian
            </Button>
            <Button variant="primary" onClick={generateReport}>
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </Button>
          </div>
        </div>

        {/* Report Type Selection */}
        <Card className="p-6">
          <div className="flex flex-wrap gap-4">
            {reportTypes.map((report) => {
              const IconComponent = report.icon;
              return (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg border transition-colors ${
                    selectedReport === report.id
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{report.name}</span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Date Range Filter */}
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Khoảng thời gian</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">Tuần này</option>
                <option value="month">Tháng này</option>
                <option value="quarter">Quý này</option>
                <option value="year">Năm nay</option>
                <option value="custom">Tùy chỉnh</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Áp dụng
              </Button>
            </div>
          </div>
        </Card>

        {/* Report Content */}
        {renderReportContent()}

        {/* Report Generation Modal */}
        {showReportModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Xuất báo cáo</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loại báo cáo
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                      <option value="csv">CSV</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Khoảng thời gian
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="week">Tuần này</option>
                      <option value="month">Tháng này</option>
                      <option value="quarter">Quý này</option>
                      <option value="year">Năm nay</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bao gồm
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-2 text-sm text-gray-700">Biểu đồ</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-2 text-sm text-gray-700">Thống kê chi tiết</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-2 text-sm text-gray-700">Phân tích xu hướng</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowReportModal(false)}
                  >
                    Hủy
                  </Button>
                  <Button variant="primary">
                    <Download className="w-4 h-4 mr-2" />
                    Xuất báo cáo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ReportsManagement; 