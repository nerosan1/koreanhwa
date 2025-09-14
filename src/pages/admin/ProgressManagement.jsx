import React, { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  Filter,
  Eye,
  Download,
  Calendar,
  Clock,
  Award,
  BookOpen,
  Users,
  Target,
  CheckCircle
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

const ProgressManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Mock progress data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      level: 'beginner',
      status: 'active',
      joinDate: '2024-01-15',
      lastActive: '2024-01-20 14:30',
      totalLessons: 24,
      completedLessons: 18,
      totalHours: 45,
      averageScore: 85,
      currentStreak: 7,
      achievements: 8,
      progress: 75,
      weeklyProgress: [
        { week: 'Tuần 1', lessons: 5, hours: 12, score: 82 },
        { week: 'Tuần 2', lessons: 4, hours: 10, score: 85 },
        { week: 'Tuần 3', lessons: 6, hours: 15, score: 88 },
        { week: 'Tuần 4', lessons: 3, hours: 8, score: 85 }
      ]
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      level: 'intermediate',
      status: 'active',
      joinDate: '2023-12-01',
      lastActive: '2024-01-20 16:45',
      totalLessons: 45,
      completedLessons: 42,
      totalHours: 89,
      averageScore: 92,
      currentStreak: 12,
      achievements: 15,
      progress: 93,
      weeklyProgress: [
        { week: 'Tuần 1', lessons: 6, hours: 14, score: 90 },
        { week: 'Tuần 2', lessons: 5, hours: 12, score: 93 },
        { week: 'Tuần 3', lessons: 7, hours: 16, score: 95 },
        { week: 'Tuần 4', lessons: 4, hours: 10, score: 92 }
      ]
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@email.com',
      level: 'beginner',
      status: 'inactive',
      joinDate: '2024-01-10',
      lastActive: '2024-01-18 09:15',
      totalLessons: 12,
      completedLessons: 8,
      totalHours: 20,
      averageScore: 72,
      currentStreak: 0,
      achievements: 3,
      progress: 67,
      weeklyProgress: [
        { week: 'Tuần 1', lessons: 3, hours: 8, score: 75 },
        { week: 'Tuần 2', lessons: 2, hours: 6, score: 70 },
        { week: 'Tuần 3', lessons: 3, hours: 6, score: 72 }
      ]
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      email: 'phamthid@email.com',
      level: 'advanced',
      status: 'active',
      joinDate: '2023-11-15',
      lastActive: '2024-01-20 18:20',
      totalLessons: 78,
      completedLessons: 75,
      totalHours: 156,
      averageScore: 96,
      currentStreak: 21,
      achievements: 25,
      progress: 96,
      weeklyProgress: [
        { week: 'Tuần 1', lessons: 8, hours: 18, score: 95 },
        { week: 'Tuần 2', lessons: 7, hours: 16, score: 97 },
        { week: 'Tuần 3', lessons: 9, hours: 20, score: 98 },
        { week: 'Tuần 4', lessons: 6, hours: 14, score: 96 }
      ]
    }
  ]);

  // Chart data
  const levelProgressData = [
    { level: 'Cơ bản', students: 45, avgProgress: 68, avgScore: 78 },
    { level: 'Trung cấp', students: 32, avgProgress: 82, avgScore: 85 },
    { level: 'Nâng cao', students: 18, avgProgress: 91, avgScore: 92 }
  ];

  const weeklyActivityData = [
    { week: 'Tuần 1', activeStudents: 85, totalHours: 420, avgScore: 82 },
    { week: 'Tuần 2', activeStudents: 92, totalHours: 456, avgScore: 84 },
    { week: 'Tuần 3', activeStudents: 88, totalHours: 438, avgScore: 86 },
    { week: 'Tuần 4', activeStudents: 95, totalHours: 472, avgScore: 85 },
    { week: 'Tuần 5', activeStudents: 90, totalHours: 445, avgScore: 87 },
    { week: 'Tuần 6', activeStudents: 87, totalHours: 432, avgScore: 86 }
  ];

  const achievementData = [
    { achievement: 'First Lesson', count: 95, color: '#0088FE' },
    { achievement: 'Week Streak', count: 67, color: '#00C49F' },
    { achievement: 'Perfect Score', count: 45, color: '#FFBB28' },
    { achievement: 'Grammar Master', count: 32, color: '#FF8042' },
    { achievement: 'Vocabulary Expert', count: 28, color: '#8884D8' }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const levels = [
    { id: 'beginner', name: 'Cơ bản', color: 'bg-green-100 text-green-800' },
    { id: 'intermediate', name: 'Trung cấp', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'advanced', name: 'Nâng cao', color: 'bg-red-100 text-red-800' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Hoạt động' },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Không hoạt động' },
      suspended: { color: 'bg-red-100 text-red-800', label: 'Tạm khóa' }
    };
    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getLevelBadge = (levelId) => {
    const level = levels.find(l => l.id === levelId);
    if (!level) return null;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${level.color}`}>
        {level.name}
      </span>
    );
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || student.level === filterLevel;
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const handleViewDetail = (student) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const averageProgress = Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length);
  const averageScore = Math.round(students.reduce((sum, s) => sum + s.averageScore, 0) / students.length);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Theo dõi tiến trình học viên</h1>
            <p className="text-gray-600">Giám sát quá trình học tập của từng học viên</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </Button>
            <Button variant="primary">
              <Calendar className="w-4 h-4 mr-2" />
              Lịch học tập
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Tổng học viên</p>
                <p className="text-lg font-semibold text-gray-900">{totalStudents}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Đang hoạt động</p>
                <p className="text-lg font-semibold text-gray-900">{activeStudents}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Target className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Tiến độ TB</p>
                <p className="text-lg font-semibold text-gray-900">{averageProgress}%</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Điểm TB</p>
                <p className="text-lg font-semibold text-gray-900">{averageScore}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Level Progress Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tiến độ theo cấp độ</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={levelProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="level" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgProgress" fill="#8884d8" name="Tiến độ TB (%)" />
                <Bar dataKey="avgScore" fill="#82ca9d" name="Điểm TB" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Achievement Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố thành tích</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={achievementData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ achievement, count }) => `${achievement}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {achievementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Weekly Activity Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động học tập hàng tuần</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weeklyActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="activeStudents" 
                stackId="1" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.6}
                name="Học viên hoạt động"
              />
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="totalHours" 
                stackId="2" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                fillOpacity={0.6}
                name="Tổng giờ học"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="avgScore" 
                stroke="#ff8042" 
                strokeWidth={2}
                name="Điểm TB"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Filters and Search */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Tìm theo tên hoặc email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cấp độ</label>
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả cấp độ</option>
                {levels.map(level => (
                  <option key={level.id} value={level.id}>{level.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
                <option value="suspended">Tạm khóa</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-1" />
                Lọc
              </Button>
            </div>
          </div>
        </Card>

        {/* Students Table */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Danh sách học viên</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Học viên
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cấp độ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiến độ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thống kê
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thành tích
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hoạt động cuối
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getLevelBadge(student.level)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(student.progress)}`}
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div>Bài học: {student.completedLessons}/{student.totalLessons}</div>
                        <div>Giờ học: {student.totalHours}h</div>
                        <div>Điểm TB: {student.averageScore}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <Award className="w-4 h-4 mr-1 text-yellow-500" />
                          {student.achievements} thành tích
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-green-500" />
                          {student.currentStreak} ngày liên tiếp
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(student.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleViewDetail(student)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3 mr-1" />
                          Báo cáo
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Student Detail Modal */}
        {showDetailModal && selectedStudent && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-3/4 max-w-6xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Chi tiết tiến trình học tập</h3>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <CheckCircle className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Student Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Thông tin học viên</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Tên:</span> {selectedStudent.name}</div>
                      <div><span className="font-medium">Email:</span> {selectedStudent.email}</div>
                      <div><span className="font-medium">Cấp độ:</span> {getLevelBadge(selectedStudent.level)}</div>
                      <div><span className="font-medium">Ngày tham gia:</span> {selectedStudent.joinDate}</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Thống kê học tập</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Tiến độ:</span> {selectedStudent.progress}%</div>
                      <div><span className="font-medium">Bài học hoàn thành:</span> {selectedStudent.completedLessons}/{selectedStudent.totalLessons}</div>
                      <div><span className="font-medium">Tổng giờ học:</span> {selectedStudent.totalHours}h</div>
                      <div><span className="font-medium">Điểm trung bình:</span> {selectedStudent.averageScore}</div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Thành tích</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Thành tích đạt được:</span> {selectedStudent.achievements}</div>
                      <div><span className="font-medium">Chuỗi học liên tiếp:</span> {selectedStudent.currentStreak} ngày</div>
                      <div><span className="font-medium">Trạng thái:</span> {getStatusBadge(selectedStudent.status)}</div>
                      <div><span className="font-medium">Hoạt động cuối:</span> {selectedStudent.lastActive}</div>
                    </div>
                  </div>
                </div>

                {/* Progress Chart */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Tiến trình học tập hàng tuần</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={selectedStudent.weeklyProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="lessons" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        name="Số bài học"
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="hours" 
                        stroke="#82ca9d" 
                        strokeWidth={2}
                        name="Giờ học"
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="score" 
                        stroke="#ff8042" 
                        strokeWidth={2}
                        name="Điểm"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Xuất báo cáo
                  </Button>
                  <Button variant="primary">
                    <Calendar className="w-4 h-4 mr-2" />
                    Lịch học tập
                  </Button>
                  <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                    Đóng
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

export default ProgressManagement; 