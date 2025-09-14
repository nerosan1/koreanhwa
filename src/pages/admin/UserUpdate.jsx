import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Eye, 
  EyeOff, 
  Save, 
  X, 
  Upload,
  Camera,
  Crown,
  Star,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle,
  Lock,
  Unlock,
  CreditCard,
  Award,
  BookOpen,
  Target,
  Coins,
  Settings,
  RefreshCw,
  Bell
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useNavigate } from 'react-router-dom';

const EditUser = ({ userId, onSave, onCancel, onDelete }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'guest',
    status: 'active',
    avatar: null,
    password: '',
    confirmPassword: '',
    joinDate: '',
    lastLogin: '',
    paymentStatus: 'none',
    points: 0,
    level: 'Bronze',
    streak: 0,
    coursesCompleted: 0,
    coursesEnrolled: 0,
    totalHours: 0,
    avgScore: 0,
    vocabularyLearned: 0,
    achievements: [],
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Mock data for users
  const mockUsers = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0123456789',
      address: 'Hà Nội, Việt Nam',
      role: 'guest',
      status: 'active',
      avatar: null,
      password: '',
      joinDate: '2024-01-15',
      lastLogin: '2024-09-14',
      paymentStatus: 'pending',
      points: 150,
      level: 'Bronze',
      streak: 5,
      coursesCompleted: 0,
      coursesEnrolled: 2,
      totalHours: 12,
      avgScore: 0,
      vocabularyLearned: 45,
      achievements: ['first_login', 'week_streak'],
      notes: 'Người dùng mới, có tiềm năng phát triển'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0987654321',
      address: 'TP.HCM, Việt Nam',
      role: 'user',
      status: 'active',
      avatar: null,
      password: '',
      joinDate: '2024-02-20',
      lastLogin: '2024-09-13',
      paymentStatus: 'confirmed',
      points: 2450,
      level: 'Gold',
      streak: 32,
      coursesCompleted: 3,
      coursesEnrolled: 5,
      totalHours: 145,
      avgScore: 87,
      vocabularyLearned: 456,
      achievements: ['first_course', 'month_streak', 'high_score', 'vocabulary_master'],
      notes: 'Học viên xuất sắc, tích cực tham gia các hoạt động'
    }
  ];

  // Mock notifications data for the user
  const notifications = [
    { id: 1, message: `Người dùng ${formData.name} vừa đăng nhập!`, type: 'new' },
    { id: 2, message: `Thanh toán của ${formData.name} đang chờ xác nhận.`, type: 'pending' },
    { id: 3, message: `${formData.name} đạt thành tích mới!`, type: 'warning' },
    { id: 4, message: `Cảnh báo: Tài khoản của ${formData.name} cần cập nhật bảo mật.`, type: 'violation' },
    { id: 5, message: `Khóa học mới được gợi ý cho ${formData.name}.`, type: 'urgent' },
  ];

  // Function to get notification styles based on type
  const getNotificationStyle = (type) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-500 animate-pulse';
      case 'warning':
        return 'bg-orange-500';
      case 'violation':
        return 'bg-red-600';
      case 'pending':
        return 'bg-yellow-500';
      case 'new':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  useEffect(() => {
    // Load user data based on userId
    const userData = mockUsers.find(user => user.id === userId) || mockUsers[0];
    setFormData(userData);
    if (userData.avatar) {
      setAvatarPreview(userData.avatar);
    }
  }, [userId]);

  // Validation rules
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Họ tên không được để trống';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Họ tên phải có ít nhất 2 ký tự';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Số điện thoại không được để trống';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ (10-11 số)';
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu không khớp';
    }

    if (formData.points < 0) {
      newErrors.points = 'Điểm tích lũy không được âm';
    }

    if (formData.streak < 0) {
      newErrors.streak = 'Streak không được âm';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, avatar: 'Kích thước file không được vượt quá 5MB' }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
        setFormData(prev => ({ ...prev, avatar: e.target.result }));
      };
      reader.readAsDataURL(file);

      setErrors(prev => ({ ...prev, avatar: '' }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSave) {
        onSave(formData);
      }
    } catch (error) {
      console.error('Error saving user:', error);
      setErrors({ submit: 'Có lỗi xảy ra khi lưu thông tin' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = () => {
    setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
  };

  const handleDeleteUser = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác.')) {
      if (onDelete) {
        onDelete(formData.id);
      }
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Bronze': return 'text-orange-600 bg-orange-100';
      case 'Silver': return 'text-gray-600 bg-gray-100';
      case 'Gold': return 'text-yellow-600 bg-yellow-100';
      case 'Platinum': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Crown className="w-5 h-5 text-yellow-500" />;
      case 'user': return <Star className="w-5 h-5 text-green-500" />;
      default: return <Users className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <AdminLayout>
          <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-white">{formData.name.charAt(0) || 'U'}</span>
              )}
            </div>
            <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
              <Camera className="w-3 h-3 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {formData.id ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
            </h1>
            <p className="text-gray-600">{formData.name || 'Người dùng mới'}</p>
            {formData.id && (
              <div className="flex items-center gap-2 mt-1">
                {getRoleIcon(formData.role)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(formData.level)}`}>
                  {formData.level}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <div className="relative">
            <div
              className="relative cursor-pointer"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <Bell className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              {notifications.length > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
                <div className="py-2">
                  <h3 className="px-4 py-2 text-sm font-semibold text-gray-700">
                    Thông báo ({notifications.length})
                  </h3>
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="px-4 py-2 text-sm text-gray-500">
                        Không có thông báo
                      </p>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <span
                            className={`w-2 h-2 rounded-full mr-2 ${getNotificationStyle(
                              notification.type
                            )}`}
                          ></span>
                          <span>{notification.message}</span>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="px-4 py-2 text-sm text-blue-500 hover:text-blue-700 cursor-pointer border-t">
                    Xóa tất cả thông báo
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isLoading ? 'Đang lưu...' : 'Lưu'}
            </button>
            <button
              onClick={onCancel}
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
              Hủy
            </button>
            {formData.id && (
              <button
                onClick={()=> navigate('/admin/users')} 
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                Xóa
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {errors.submit && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="w-5 h-5" />
            <span>{errors.submit}</span>
          </div>
        </div>
      )}

      {errors.avatar && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="w-5 h-5" />
            <span>{errors.avatar}</span>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'basic', name: 'Thông tin cơ bản', icon: User },
            { id: 'security', name: 'Bảo mật', icon: Shield },
            { id: 'learning', name: 'Học tập', icon: BookOpen },
            { id: 'advanced', name: 'Nâng cao', icon: Settings }
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

      {/* Tab Content */}
      <div className="space-y-8">
        {/* Basic Information Tab */}
        {activeTab === 'basic' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập họ và tên"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0123456789"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa chỉ
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập địa chỉ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vai trò
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="guest">Guest User</option>
                <option value="user">Paid User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái tài khoản
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
                <option value="suspended">Tạm khóa</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ghi chú
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ghi chú về người dùng..."
              />
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-800 mb-2">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Bảo mật tài khoản</span>
              </div>
              <p className="text-sm text-blue-600">
                Thay đổi mật khẩu và cài đặt bảo mật cho tài khoản người dùng
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu mới
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập mật khẩu mới (để trống nếu không đổi)"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập lại mật khẩu mới"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái thanh toán
                </label>
                <select
                  value={formData.paymentStatus}
                  onChange={(e) => handleInputChange('paymentStatus', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="none">Chưa thanh toán</option>
                  <option value="pending">Chờ xác nhận</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="rejected">Từ chối</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleResetPassword}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Đặt lại mật khẩu
              </button>
            </div>
          </div>
        )}

        {/* Learning Tab */}
        {activeTab === 'learning' && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-800 mb-2">
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">Thông tin học tập</span>
              </div>
              <p className="text-sm text-green-600">
                Quản lý tiến độ học tập và thành tích của người dùng
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Điểm tích lũy
                </label>
                <div className="relative">
                  <Coins className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    min="0"
                    value={formData.points}
                    onChange={(e) => handleInputChange('points', parseInt(e.target.value) || 0)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.points ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.points && (
                  <p className="mt-1 text-sm text-red-600">{errors.points}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cấp độ
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => handleInputChange('level', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Bronze">Bronze</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinum">Platinum</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Streak (ngày)
                </label>
                <div className="relative">
                  <Target className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    min="0"
                    value={formData.streak}
                    onChange={(e) => handleInputChange('streak', parseInt(e.target.value) || 0)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.streak ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.streak && (
                  <p className="mt-1 text-sm text-red-600">{errors.streak}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Khóa hoàn thành
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.coursesCompleted}
                  onChange={(e) => handleInputChange('coursesCompleted', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Khóa đang học
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.coursesEnrolled}
                  onChange={(e) => handleInputChange('coursesEnrolled', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tổng giờ học
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.totalHours}
                  onChange={(e) => handleInputChange('totalHours', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Điểm trung bình
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.avgScore}
                  onChange={(e) => handleInputChange('avgScore', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Từ vựng đã học
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.vocabularyLearned}
                  onChange={(e) => handleInputChange('vocabularyLearned', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Achievements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Thành tích đã đạt được
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { id: 'first_login', name: 'Đăng nhập đầu tiên', icon: '👋' },
                  { id: 'week_streak', name: '7 ngày liên tục', icon: '🔥' },
                  { id: 'first_course', name: 'Khóa học đầu tiên', icon: '📚' },
                  { id: 'month_streak', name: '30 ngày liên tục', icon: '⚡' },
                  { id: 'high_score', name: 'Điểm cao', icon: '🏆' },
                  { id: 'vocabulary_master', name: 'Bậc thầy từ vựng', icon: '📖' },
                  { id: 'all_courses', name: 'Hoàn thành tất cả', icon: '🎓' },
                  { id: 'perfect_score', name: 'Điểm tuyệt đối', icon: '⭐' },
                  { id: 'mentor', name: 'Người cố vấn', icon: '👨‍🏫' },
                  { id: 'top_learner', name: 'Học viên xuất sắc', icon: '👑' },
                  { id: 'admin', name: 'Quản trị viên', icon: '🛡️' }
                ].map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={achievement.id}
                      checked={formData.achievements.includes(achievement.id)}
                      onChange={(e) => {
                        const newAchievements = e.target.checked
                          ? [...formData.achievements, achievement.id]
                          : formData.achievements.filter(a => a !== achievement.id);
                        handleInputChange('achievements', newAchievements);
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={achievement.id} className="flex items-center gap-2 text-sm cursor-pointer">
                      <span>{achievement.icon}</span>
                      <span>{achievement.name}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Advanced Tab */}
        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-purple-800 mb-2">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Cài đặt nâng cao</span>
              </div>
              <p className="text-sm text-purple-600">
                Các cài đặt hệ thống và thông tin kỹ thuật
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày tham gia
                </label>
                <input
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => handleInputChange('joinDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đăng nhập cuối
                </label>
                <input
                  type="datetime-local"
                  value={formData.lastLogin}
                  onChange={(e) => handleInputChange('lastLogin', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* User Statistics Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt thống kê</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <Coins className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{formData.points}</p>
                  <p className="text-sm text-gray-600">Điểm tích lũy</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{formData.streak}</p>
                  <p className="text-sm text-gray-600">Ngày liên tục</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{formData.coursesCompleted}</p>
                  <p className="text-sm text-gray-600">Khóa hoàn thành</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{formData.achievements.length}</p>
                  <p className="text-sm text-gray-600">Thành tích</p>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Vùng nguy hiểm
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-900">Đặt lại tất cả dữ liệu học tập</p>
                    <p className="text-sm text-red-600">Xóa toàn bộ tiến độ học tập của người dùng</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Bạn có chắc chắn muốn đặt lại tất cả dữ liệu học tập?')) {
                        setFormData(prev => ({
                          ...prev,
                          points: 0,
                          streak: 0,
                          coursesCompleted: 0,
                          coursesEnrolled: 0,
                          totalHours: 0,
                          avgScore: 0,
                          vocabularyLearned: 0,
                          achievements: [],
                          level: 'Bronze'
                        }));
                      }
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Đặt lại
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-900">Vô hiệu hóa tài khoản</p>
                    <p className="text-sm text-red-600">Tạm khóa tài khoản người dùng</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInputChange('status', formData.status === 'active' ? 'suspended' : 'active')}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                      formData.status === 'active' 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {formData.status === 'active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    {formData.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                  </button>
                </div>

                {formData.id && (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-red-900">Xóa tài khoản vĩnh viễn</p>
                      <p className="text-sm text-red-600">Không thể hoàn tác sau khi xóa</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleDeleteUser}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Xóa tài khoản
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CheckCircle className="w-4 h-4" />
            <span>Thay đổi sẽ được lưu tự động</span>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default EditUser;