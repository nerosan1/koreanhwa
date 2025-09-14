import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  Eye,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Filter,
  Award,
  Target,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  LineChart, 
  Line,
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

const ExamManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [newExam, setNewExam] = useState({
    title: '',
    description: '',
    level: 'beginner',
    duration: 60,
    totalQuestions: 50,
    passingScore: 70,
    startDate: '',
    endDate: '',
    status: 'draft'
  });

  // Mock exam data
  const [exams, setExams] = useState([
    {
      id: 1,
      title: 'Kỳ thi TOPIK I - Cấp độ 1',
      description: 'Kỳ thi năng lực tiếng Hàn cơ bản cho người mới bắt đầu',
      level: 'beginner',
      duration: 90,
      totalQuestions: 40,
      passingScore: 60,
      startDate: '2024-02-15',
      endDate: '2024-02-20',
      status: 'active',
      registeredStudents: 125,
      completedStudents: 98,
      averageScore: 75,
      createdBy: 'admin',
      createdAt: '2024-01-15',
      lastUpdated: '2024-01-20'
    },
    {
      id: 2,
      title: 'Kỳ thi TOPIK II - Cấp độ 3',
      description: 'Kỳ thi năng lực tiếng Hàn trung cấp',
      level: 'intermediate',
      duration: 120,
      totalQuestions: 50,
      passingScore: 70,
      startDate: '2024-03-01',
      endDate: '2024-03-05',
      status: 'upcoming',
      registeredStudents: 89,
      completedStudents: 0,
      averageScore: 0,
      createdBy: 'admin',
      createdAt: '2024-01-18',
      lastUpdated: '2024-01-19'
    },
    {
      id: 3,
      title: 'Kỳ thi thử nghiệm - Ngữ pháp nâng cao',
      description: 'Bài kiểm tra ngữ pháp tiếng Hàn nâng cao',
      level: 'advanced',
      duration: 60,
      totalQuestions: 30,
      passingScore: 80,
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      status: 'completed',
      registeredStudents: 67,
      completedStudents: 67,
      averageScore: 82,
      createdBy: 'teacher1',
      createdAt: '2024-01-10',
      lastUpdated: '2024-01-26'
    },
    {
      id: 4,
      title: 'Kỳ thi từ vựng - Chủ đề gia đình',
      description: 'Kiểm tra từ vựng tiếng Hàn về chủ đề gia đình',
      level: 'beginner',
      duration: 45,
      totalQuestions: 25,
      passingScore: 70,
      startDate: '2024-02-01',
      endDate: '2024-02-02',
      status: 'draft',
      registeredStudents: 0,
      completedStudents: 0,
      averageScore: 0,
      createdBy: 'teacher2',
      createdAt: '2024-01-20',
      lastUpdated: '2024-01-20'
    }
  ]);

  // Chart data
  const examStatusData = [
    { status: 'Đang diễn ra', count: 1, color: '#00C49F' },
    { status: 'Sắp diễn ra', count: 1, color: '#FFBB28' },
    { status: 'Đã hoàn thành', count: 1, color: '#0088FE' },
    { status: 'Nháp', count: 1, color: '#FF8042' }
  ];

  const examLevelData = [
    { level: 'Cơ bản', count: 2, avgScore: 75, completion: 78 },
    { level: 'Trung cấp', count: 1, avgScore: 0, completion: 0 },
    { level: 'Nâng cao', count: 1, avgScore: 82, completion: 100 }
  ];

  const monthlyExams = [
    { month: 'Jan', exams: 3, registrations: 156, completions: 98 },
    { month: 'Feb', exams: 2, registrations: 125, completions: 0 },
    { month: 'Mar', exams: 1, registrations: 89, completions: 0 },
    { month: 'Apr', exams: 4, registrations: 234, completions: 0 },
    { month: 'May', exams: 3, registrations: 189, completions: 0 },
    { month: 'Jun', exams: 2, registrations: 145, completions: 0 }
  ];

  const scoreDistributionData = [
    { range: '0-50', students: 12, percentage: 12.2 },
    { range: '51-60', students: 15, percentage: 15.3 },
    { range: '61-70', students: 25, percentage: 25.5 },
    { range: '71-80', students: 30, percentage: 30.6 },
    { range: '81-90', students: 12, percentage: 12.2 },
    { range: '91-100', students: 4, percentage: 4.1 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const levels = [
    { id: 'beginner', name: 'Cơ bản', color: 'bg-green-100 text-green-800' },
    { id: 'intermediate', name: 'Trung cấp', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'advanced', name: 'Nâng cao', color: 'bg-red-100 text-red-800' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Đang diễn ra' },
      upcoming: { color: 'bg-yellow-100 text-yellow-800', label: 'Sắp diễn ra' },
      completed: { color: 'bg-blue-100 text-blue-800', label: 'Đã hoàn thành' },
      draft: { color: 'bg-gray-100 text-gray-800', label: 'Nháp' }
    };
    const config = statusConfig[status] || statusConfig.draft;
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

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || exam.status === filterStatus;
    const matchesLevel = filterLevel === 'all' || exam.level === filterLevel;
    return matchesSearch && matchesStatus && matchesLevel;
  });

  const handleAddExam = () => {
    if (newExam.title && newExam.description && newExam.startDate && newExam.endDate) {
      const exam = {
        id: exams.length + 1,
        ...newExam,
        registeredStudents: 0,
        completedStudents: 0,
        averageScore: 0,
        createdBy: 'admin',
        createdAt: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setExams([...exams, exam]);
      setNewExam({
        title: '',
        description: '',
        level: 'beginner',
        duration: 60,
        totalQuestions: 50,
        passingScore: 70,
        startDate: '',
        endDate: '',
        status: 'draft'
      });
      setShowAddModal(false);
    }
  };

  const handleEditExam = (exam) => {
    setEditingExam(exam);
    setNewExam({
      title: exam.title,
      description: exam.description,
      level: exam.level,
      duration: exam.duration,
      totalQuestions: exam.totalQuestions,
      passingScore: exam.passingScore,
      startDate: exam.startDate,
      endDate: exam.endDate,
      status: exam.status
    });
    setShowAddModal(true);
  };

  const handleUpdateExam = () => {
    if (editingExam && newExam.title && newExam.description) {
      const updatedExams = exams.map(exam => 
        exam.id === editingExam.id 
          ? { ...exam, ...newExam, lastUpdated: new Date().toISOString().split('T')[0] }
          : exam
      );
      setExams(updatedExams);
      setEditingExam(null);
      setNewExam({
        title: '',
        description: '',
        level: 'beginner',
        duration: 60,
        totalQuestions: 50,
        passingScore: 70,
        startDate: '',
        endDate: '',
        status: 'draft'
      });
      setShowAddModal(false);
    }
  };

  const handleDeleteExam = (examId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa kỳ thi này?')) {
      setExams(exams.filter(exam => exam.id !== examId));
    }
  };

  const totalExams = exams.length;
  const activeExams = exams.filter(e => e.status === 'active').length;
  const totalRegistrations = exams.reduce((sum, e) => sum + e.registeredStudents, 0);
  const totalCompletions = exams.reduce((sum, e) => sum + e.completedStudents, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tổ chức kỳ thi</h1>
            <p className="text-gray-600">Tạo, quản lý và theo dõi các kỳ thi</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Báo cáo
            </Button>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Tạo kỳ thi
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Tổng kỳ thi</p>
                <p className="text-lg font-semibold text-gray-900">{totalExams}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Đang diễn ra</p>
                <p className="text-lg font-semibold text-gray-900">{activeExams}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Users className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Đăng ký</p>
                <p className="text-lg font-semibold text-gray-900">{totalRegistrations}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Hoàn thành</p>
                <p className="text-lg font-semibold text-gray-900">{totalCompletions}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Exam Status Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trạng thái kỳ thi</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={examStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, count }) => `${status}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {examStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Exam Level Performance */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hiệu suất theo cấp độ</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={examLevelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="level" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgScore" fill="#8884d8" name="Điểm TB" />
                <Bar dataKey="completion" fill="#82ca9d" name="Tỷ lệ hoàn thành (%)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Monthly Exams Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Kỳ thi và đăng ký hàng tháng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyExams}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="exams" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="Số kỳ thi"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="registrations" 
                stroke="#82ca9d" 
                strokeWidth={2}
                name="Đăng ký"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="completions" 
                stroke="#ff8042" 
                strokeWidth={2}
                name="Hoàn thành"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Score Distribution Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố điểm số</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreDistributionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#8884d8" />
            </BarChart>
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
                  placeholder="Tìm theo tên hoặc mô tả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang diễn ra</option>
                <option value="upcoming">Sắp diễn ra</option>
                <option value="completed">Đã hoàn thành</option>
                <option value="draft">Nháp</option>
              </select>
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
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-1" />
                Lọc
              </Button>
            </div>
          </div>
        </Card>

        {/* Exams Table */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Danh sách kỳ thi</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kỳ thi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cấp độ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thống kê
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày thi
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredExams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="text-sm font-medium text-gray-900">{exam.title}</div>
                          <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {exam.description}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {exam.totalQuestions} câu hỏi • {exam.duration} phút
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getLevelBadge(exam.level)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{exam.duration} phút</div>
                      <div className="text-xs text-gray-500">Điểm đạt: {exam.passingScore}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div>Đăng ký: {exam.registeredStudents}</div>
                        <div>Hoàn thành: {exam.completedStudents}</div>
                        {exam.averageScore > 0 && (
                          <div>Điểm TB: {exam.averageScore}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(exam.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{exam.startDate}</div>
                      <div>đến {exam.endDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEditExam(exam)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteExam(exam.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingExam ? 'Chỉnh sửa kỳ thi' : 'Tạo kỳ thi mới'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên kỳ thi
                    </label>
                    <Input
                      type="text"
                      value={newExam.title}
                      onChange={(e) => setNewExam({...newExam, title: e.target.value})}
                      placeholder="Nhập tên kỳ thi"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mô tả
                    </label>
                    <textarea
                      value={newExam.description}
                      onChange={(e) => setNewExam({...newExam, description: e.target.value})}
                      placeholder="Nhập mô tả kỳ thi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cấp độ
                      </label>
                      <select
                        value={newExam.level}
                        onChange={(e) => setNewExam({...newExam, level: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {levels.map(level => (
                          <option key={level.id} value={level.id}>{level.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Thời gian (phút)
                      </label>
                      <Input
                        type="number"
                        value={newExam.duration}
                        onChange={(e) => setNewExam({...newExam, duration: parseInt(e.target.value)})}
                        min="15"
                        max="180"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Số câu hỏi
                      </label>
                      <Input
                        type="number"
                        value={newExam.totalQuestions}
                        onChange={(e) => setNewExam({...newExam, totalQuestions: parseInt(e.target.value)})}
                        min="10"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Điểm đạt
                      </label>
                      <Input
                        type="number"
                        value={newExam.passingScore}
                        onChange={(e) => setNewExam({...newExam, passingScore: parseInt(e.target.value)})}
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ngày bắt đầu
                      </label>
                      <Input
                        type="date"
                        value={newExam.startDate}
                        onChange={(e) => setNewExam({...newExam, startDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ngày kết thúc
                      </label>
                      <Input
                        type="date"
                        value={newExam.endDate}
                        onChange={(e) => setNewExam({...newExam, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingExam(null);
                      setNewExam({
                        title: '',
                        description: '',
                        level: 'beginner',
                        duration: 60,
                        totalQuestions: 50,
                        passingScore: 70,
                        startDate: '',
                        endDate: '',
                        status: 'draft'
                      });
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    variant="primary"
                    onClick={editingExam ? handleUpdateExam : handleAddExam}
                  >
                    {editingExam ? 'Cập nhật' : 'Tạo'}
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

export default ExamManagement; 