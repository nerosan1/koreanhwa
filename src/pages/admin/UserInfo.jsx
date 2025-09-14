import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  CreditCard, 
  Award, 
  BookOpen, 
  Trophy, 
  Star, 
  Edit2, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Eye, 
  EyeOff, 
  Save, 
  X, 
  Plus,
  Coins,
  TrendingUp,
  Target,
  Activity,
  DollarSign,
  Gift,
  Crown,
  Users,
  Bell,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';

const UserInfo = () => {
    const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');


  // Mock data
  const [users] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0123456789',
      address: 'Hà Nội, Việt Nam',
      role: 'guest',
      status: 'active',
      joinDate: '2024-01-15',
      lastLogin: '2024-09-14',
      avatar: null,
      progress: 25,
      coursesCompleted: 0,
      coursesEnrolled: 2,
      totalCourses: 8,
      paymentStatus: 'pending',
      paymentHistory: [
        { id: 1, amount: 299000, date: '2024-09-10', status: 'pending', method: 'banking' }
      ],
      points: 150,
      level: 'Bronze',
      streak: 5,
      achievements: ['first_login', 'week_streak'],
      learningStats: {
        totalHours: 12,
        weeklyHours: 3,
        avgScore: 0,
        vocabularyLearned: 45
      }
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0987654321',
      address: 'TP.HCM, Việt Nam',
      role: 'user',
      status: 'active',
      joinDate: '2024-02-20',
      lastLogin: '2024-09-13',
      avatar: null,
      progress: 75,
      coursesCompleted: 3,
      coursesEnrolled: 5,
      totalCourses: 8,
      paymentStatus: 'confirmed',
      paymentHistory: [
        { id: 1, amount: 599000, date: '2024-02-20', status: 'confirmed', method: 'momo' },
        { id: 2, amount: 299000, date: '2024-08-15', status: 'confirmed', method: 'banking' }
      ],
      points: 2450,
      level: 'Gold',
      streak: 32,
      achievements: ['first_course', 'month_streak', 'high_score', 'vocabulary_master'],
      learningStats: {
        totalHours: 145,
        weeklyHours: 8,
        avgScore: 87,
        vocabularyLearned: 456
      }
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@email.com',
      phone: '0369852147',
      address: 'Đà Nẵng, Việt Nam',
      role: 'admin',
      status: 'active',
      joinDate: '2023-12-01',
      lastLogin: '2024-09-14',
      avatar: null,
      progress: 100,
      coursesCompleted: 8,
      coursesEnrolled: 8,
      totalCourses: 8,
      paymentStatus: 'admin',
      paymentHistory: [],
      points: 5000,
      level: 'Platinum',
      streak: 120,
      achievements: ['admin', 'all_courses', 'perfect_score', 'mentor', 'top_learner'],
      learningStats: {
        totalHours: 320,
        weeklyHours: 12,
        avgScore: 95,
        vocabularyLearned: 1200
      }
    }
  ]);

  // Learning progress data for charts
  const progressData = [
    { week: 'Tuần 1', hours: 5, score: 75 },
    { week: 'Tuần 2', hours: 8, score: 82 },
    { week: 'Tuần 3', hours: 6, score: 78 },
    { week: 'Tuần 4', hours: 10, score: 89 },
    { week: 'Tuần 5', hours: 7, score: 85 },
    { week: 'Tuần 6', hours: 12, score: 92 },
    { week: 'Tuần 7', hours: 9, score: 88 },
    { week: 'Tuần 8', hours: 14, score: 94 }
  ];

  const courseProgressData = [
    { course: 'Cơ bản', completed: 100, total: 100 },
    { course: 'Trung cấp', completed: 75, total: 100 },
    { course: 'Nâng cao', completed: 30, total: 100 },
    { course: 'Giao tiếp', completed: 60, total: 100 }
  ];

  useEffect(() => {
    // Set first user as selected by default
    if (users.length > 0) {
      setSelectedUser(users[0]);
      setEditedUser(users[0]);
    }
  }, [users]);

  // Helper functions
  const getLevelColor = (level) => {
    switch (level) {
      case 'Bronze': return 'text-orange-600 bg-orange-100';
      case 'Silver': return 'text-gray-600 bg-gray-100';
      case 'Gold': return 'text-yellow-600 bg-yellow-100';
      case 'Platinum': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Đã xác nhận</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Chờ xác nhận</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Từ chối</span>;
      case 'admin':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Admin</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Chưa thanh toán</span>;
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Crown className="w-5 h-5 text-yellow-500" />;
      case 'user': return <Star className="w-5 h-5 text-green-500" />;
      default: return <User className="w-5 h-5 text-gray-500" />;
    }
  };


  const handleSave = () => {
    // Here you would typically send the data to your API
    console.log('Saving user data:', editedUser);
    setSelectedUser(editedUser);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedUser(selectedUser);
    setEditMode(false);
  };

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const confirmPayment = (paymentId) => {
    console.log('Confirming payment:', paymentId);
    // Update payment status
  };

  const rejectPayment = (paymentId) => {
    console.log('Rejecting payment:', paymentId);
    // Update payment status
  };

  if (!selectedUser) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thông tin người dùng</h1>
          <p className="text-gray-600">Quản lý chi tiết thông tin và hoạt động của người dùng</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* User Selection Sidebar */}
          {/* Main Content */}
          <div className="col-span-9">
            {/* User Profile Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{selectedUser.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h2>
                    <p className="text-gray-600">{selectedUser.email}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        {getRoleIcon(selectedUser.role)}
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {selectedUser.role === 'guest' ? 'Guest User' : 
                           selectedUser.role === 'user' ? 'Paid User' : 'Admin'}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(selectedUser.level)}`}>
                        {selectedUser.level}
                      </span>
                      {getPaymentStatusBadge(selectedUser.paymentStatus)}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!editMode ? (
                    <>
                      <button
                        onClick={()=> navigate('/admin/users/update')}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Chỉnh sửa
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        <Trash2 className="w-4 h-4" />
                        Xóa
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Lưu
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Hủy
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Coins className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">{selectedUser.points}</p>
                  <p className="text-sm text-gray-600">Điểm tích lũy</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">{selectedUser.streak}</p>
                  <p className="text-sm text-gray-600">Ngày liên tục</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">{selectedUser.coursesCompleted}</p>
                  <p className="text-sm text-gray-600">Khóa hoàn thành</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-orange-600">{selectedUser.learningStats.totalHours}</p>
                  <p className="text-sm text-gray-600">Giờ học</p>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="border-b">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', name: 'Tổng quan', icon: Activity },
                    { id: 'personal', name: 'Thông tin cá nhân', icon: User },
                    { id: 'payment', name: 'Thanh toán', icon: CreditCard },
                    { id: 'learning', name: 'Học tập', icon: BookOpen },
                    { id: 'achievements', name: 'Thành tích', icon: Trophy }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tiến độ học tập theo tuần</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={progressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="hours" stroke="#3b82f6" name="Giờ học" />
                        <Line type="monotone" dataKey="score" stroke="#10b981" name="Điểm số" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tiến độ khóa học</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={courseProgressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="course" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="completed" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Thông tin cá nhân</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                      {editMode ? (
                        <input
                          type="text"
                          value={editedUser.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedUser.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      {editMode ? (
                        <input
                          type="email"
                          value={editedUser.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedUser.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                      {editMode ? (
                        <input
                          type="tel"
                          value={editedUser.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedUser.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                      {editMode ? (
                        <input
                          type="text"
                          value={editedUser.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedUser.address}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
                      {editMode ? (
                        <select
                          value={editedUser.role}
                          onChange={(e) => handleInputChange('role', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="guest">Guest User</option>
                          <option value="user">Paid User</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        <div className="flex items-center gap-2">
                          {getRoleIcon(selectedUser.role)}
                          <span className="capitalize">
                            {selectedUser.role === 'guest' ? 'Guest User' : 
                             selectedUser.role === 'user' ? 'Paid User' : 'Admin'}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                      {editMode ? (
                        <select
                          value={editedUser.status}
                          onChange={(e) => handleInputChange('status', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="active">Hoạt động</option>
                          <option value="inactive">Không hoạt động</option>
                        </select>
                      ) : (
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          selectedUser.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedUser.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ngày tham gia</label>
                      <p className="text-gray-900">{new Date(selectedUser.joinDate).toLocaleDateString('vi-VN')}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Đăng nhập cuối</label>
                      <p className="text-gray-900">{new Date(selectedUser.lastLogin).toLocaleDateString('vi-VN')}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Tab */}
              {activeTab === 'payment' && (
                <div className="space-y-6">
                  {/* Payment Status */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Trạng thái thanh toán</h3>
                      {getPaymentStatusBadge(selectedUser.paymentStatus)}
                    </div>
                    
                    {selectedUser.paymentStatus === 'pending' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-yellow-800">Chờ xác nhận thanh toán</p>
                            <p className="text-sm text-yellow-600 mt-1">
                              Người dùng đã gửi yêu cầu thanh toán, cần xác nhận để kích hoạt tài khoản
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => confirmPayment(selectedUser.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Xác nhận
                            </button>
                            <button
                              onClick={() => rejectPayment(selectedUser.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                              Từ chối
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment History */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Lịch sử thanh toán</h3>
                    {selectedUser.paymentHistory.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ngày
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Số tiền
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Phương thức
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trạng thái
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {selectedUser.paymentHistory.map((payment) => (
                              <tr key={payment.id}>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {new Date(payment.date).toLocaleDateString('vi-VN')}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {payment.amount.toLocaleString('vi-VN')} VND
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                  {payment.method}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  {getPaymentStatusBadge(payment.status)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Chưa có lịch sử thanh toán</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Learning Tab */}
              {activeTab === 'learning' && (
                <div className="space-y-6">
                  {/* Learning Overview */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Tổng quan học tập</h3>
                    <div className="grid grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Clock className="w-8 h-8 text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{selectedUser.learningStats.totalHours}</p>
                        <p className="text-sm text-gray-600">Tổng giờ học</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <TrendingUp className="w-8 h-8 text-green-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{selectedUser.learningStats.avgScore}</p>
                        <p className="text-sm text-gray-600">Điểm trung bình</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <BookOpen className="w-8 h-8 text-purple-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{selectedUser.learningStats.vocabularyLearned}</p>
                        <p className="text-sm text-gray-600">Từ vựng đã học</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Calendar className="w-8 h-8 text-orange-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{selectedUser.learningStats.weeklyHours}</p>
                        <p className="text-sm text-gray-600">Giờ học tuần này</p>
                      </div>
                    </div>
                  </div>

                  {/* Course Progress */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tiến độ khóa học</h3>
                    <div className="space-y-4">
                      {courseProgressData.map((course, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Tiếng Hàn {course.course}</p>
                              <p className="text-sm text-gray-500">{course.completed}/{course.total} bài học</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${course.completed}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-600">{course.completed}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Weekly Activity Chart */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động học tập hàng tuần</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={progressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="hours" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Giờ học" />
                        <Area type="monotone" dataKey="score" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Điểm số" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Achievements Tab */}
              {activeTab === 'achievements' && (
                <div className="space-y-6">
                  {/* Points and Level */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Điểm số và cấp độ</h3>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg text-white">
                        <Crown className="w-12 h-12 mx-auto mb-3" />
                        <p className="text-3xl font-bold">{selectedUser.level}</p>
                        <p className="text-sm opacity-90">Cấp độ hiện tại</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg text-white">
                        <Coins className="w-12 h-12 mx-auto mb-3" />
                        <p className="text-3xl font-bold">{selectedUser.points.toLocaleString()}</p>
                        <p className="text-sm opacity-90">Điểm tích lũy</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg text-white">
                        <Target className="w-12 h-12 mx-auto mb-3" />
                        <p className="text-3xl font-bold">{selectedUser.streak}</p>
                        <p className="text-sm opacity-90">Ngày liên tục</p>
                      </div>
                    </div>
                  </div>

                  {/* Achievement Badges */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Huy hiệu thành tích</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {[
                        { id: 'first_login', name: 'Đăng nhập đầu tiên', icon: '👋', earned: selectedUser.achievements.includes('first_login') },
                        { id: 'week_streak', name: '7 ngày liên tục', icon: '🔥', earned: selectedUser.achievements.includes('week_streak') },
                        { id: 'first_course', name: 'Khóa học đầu tiên', icon: '📚', earned: selectedUser.achievements.includes('first_course') },
                        { id: 'month_streak', name: '30 ngày liên tục', icon: '⚡', earned: selectedUser.achievements.includes('month_streak') },
                        { id: 'high_score', name: 'Điểm cao', icon: '🏆', earned: selectedUser.achievements.includes('high_score') },
                        { id: 'vocabulary_master', name: 'Bậc thầy từ vựng', icon: '📖', earned: selectedUser.achievements.includes('vocabulary_master') },
                        { id: 'all_courses', name: 'Hoàn thành tất cả', icon: '🎓', earned: selectedUser.achievements.includes('all_courses') },
                        { id: 'perfect_score', name: 'Điểm tuyệt đối', icon: '⭐', earned: selectedUser.achievements.includes('perfect_score') },
                        { id: 'mentor', name: 'Người cố vấn', icon: '👨‍🏫', earned: selectedUser.achievements.includes('mentor') },
                        { id: 'top_learner', name: 'Học viên xuất sắc', icon: '👑', earned: selectedUser.achievements.includes('top_learner') },
                        { id: 'admin', name: 'Quản trị viên', icon: '🛡️', earned: selectedUser.achievements.includes('admin') }
                      ].map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`p-4 rounded-lg border-2 text-center transition-all ${
                            achievement.earned
                              ? 'border-yellow-300 bg-yellow-50 shadow-md'
                              : 'border-gray-200 bg-gray-50 opacity-50'
                          }`}
                        >
                          <div className="text-3xl mb-2">{achievement.icon}</div>
                          <p className="text-sm font-medium text-gray-900">{achievement.name}</p>
                          {achievement.earned && (
                            <div className="mt-2">
                              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress to Next Level */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tiến độ lên cấp tiếp theo</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Tiến độ đến {selectedUser.level === 'Bronze' ? 'Silver' : selectedUser.level === 'Silver' ? 'Gold' : selectedUser.level === 'Gold' ? 'Platinum' : 'Master'}</span>
                        <span className="text-sm text-gray-500">
                          {selectedUser.points} / {selectedUser.level === 'Bronze' ? '1000' : selectedUser.level === 'Silver' ? '2500' : selectedUser.level === 'Gold' ? '5000' : '10000'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                          style={{ 
                            width: `${
                              selectedUser.level === 'Bronze' ? (selectedUser.points / 1000) * 100 :
                              selectedUser.level === 'Silver' ? (selectedUser.points / 2500) * 100 :
                              selectedUser.level === 'Gold' ? (selectedUser.points / 5000) * 100 :
                              selectedUser.level === 'Platinum' ? (selectedUser.points / 10000) * 100 : 100
                            }%` 
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0</span>
                        <span>
                          {selectedUser.level === 'Bronze' ? '1,000' : 
                           selectedUser.level === 'Silver' ? '2,500' : 
                           selectedUser.level === 'Gold' ? '5,000' : '10,000'} điểm
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
    </AdminLayout>
  );
};

export default UserInfo;