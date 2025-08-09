import React, { useState } from 'react';
import { 
  UserPlus, 
  ArrowLeft, 
  Eye, 
  EyeOff,
  Upload,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import AdminLayout from '../components/layout/AdminLayout';

const AddUser = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    level: 'beginner',
    status: 'active',
    avatar: null
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    { id: 'student', name: 'Học viên', description: 'Người dùng học tiếng Hàn' },
    { id: 'teacher', name: 'Giáo viên', description: 'Giáo viên hướng dẫn' },
    { id: 'moderator', name: 'Điều hành viên', description: 'Quản lý diễn đàn và nội dung' },
    { id: 'admin', name: 'Quản trị viên', description: 'Quản trị hệ thống' }
  ];

  const levels = [
    { id: 'beginner', name: 'Cơ bản', description: 'Mới bắt đầu học' },
    { id: 'intermediate', name: 'Trung cấp', description: 'Đã có kiến thức cơ bản' },
    { id: 'advanced', name: 'Nâng cao', description: 'Trình độ cao cấp' }
  ];

  const statuses = [
    { id: 'active', name: 'Hoạt động', description: 'Tài khoản đang hoạt động' },
    { id: 'inactive', name: 'Không hoạt động', description: 'Tài khoản bị tạm khóa' },
    { id: 'pending', name: 'Chờ xác thực', description: 'Chờ xác thực email' }
  ];

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Họ là bắt buộc';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'Họ phải có ít nhất 2 ký tự';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Tên là bắt buộc';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Tên phải có ít nhất 2 ký tự';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10,11}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Tên đăng nhập là bắt buộc';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, avatar: 'File quá lớn. Kích thước tối đa là 5MB' }));
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, avatar: 'Chỉ chấp nhận file hình ảnh' }));
        return;
      }
      setFormData(prev => ({ ...prev, avatar: file }));
      setErrors(prev => ({ ...prev, avatar: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - redirect to users list
      window.location.href = '/admin/users';
    } catch (error) {
      console.error('Error creating user:', error);
      setErrors({ submit: 'Có lỗi xảy ra khi tạo người dùng. Vui lòng thử lại.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const labels = ['Rất yếu', 'Yếu', 'Trung bình', 'Mạnh', 'Rất mạnh'];
    const colors = ['text-red-500', 'text-orange-500', 'text-yellow-500', 'text-blue-500', 'text-green-500'];
    
    return {
      strength: Math.min(strength, 5),
      label: labels[strength - 1] || '',
      color: colors[strength - 1] || ''
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/admin/users"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Quay lại
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Thêm người dùng mới</h1>
              <p className="text-gray-600">Tạo tài khoản người dùng mới cho hệ thống</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <UserPlus className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Personal Information */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin cá nhân</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Họ <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Nhập họ"
                        error={errors.firstName}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Nhập tên"
                        error={errors.lastName}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="example@email.com"
                      error={errors.email}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="0123456789"
                      error={errors.phone}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ảnh đại diện
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                        {formData.avatar ? (
                          <img
                            src={URL.createObjectURL(formData.avatar)}
                            alt="Avatar preview"
                            className="w-20 h-20 rounded-full object-cover"
                          />
                        ) : (
                          <UserPlus className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="avatar-upload"
                        />
                        <label
                          htmlFor="avatar-upload"
                          className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Tải ảnh lên
                        </label>
                        {errors.avatar && (
                          <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Account Information */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin tài khoản</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên đăng nhập <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      placeholder="username"
                      error={errors.username}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mật khẩu <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Nhập mật khẩu"
                        error={errors.password}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                passwordStrength.strength <= 2 ? 'bg-red-500' :
                                passwordStrength.strength <= 3 ? 'bg-yellow-500' :
                                passwordStrength.strength <= 4 ? 'bg-blue-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                            />
                          </div>
                          <span className={`text-sm font-medium ${passwordStrength.color}`}>
                            {passwordStrength.label}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Xác nhận mật khẩu <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder="Nhập lại mật khẩu"
                        error={errors.confirmPassword}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Role and Level */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vai trò và cấp độ</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vai trò <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>
                          {role.name} - {role.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cấp độ tiếng Hàn
                    </label>
                    <select
                      value={formData.level}
                      onChange={(e) => handleInputChange('level', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {levels.map(level => (
                        <option key={level.id} value={level.id}>
                          {level.name} - {level.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trạng thái tài khoản
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {statuses.map(status => (
                        <option key={status.id} value={status.id}>
                          {status.name} - {status.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </Card>

              {/* Summary */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Họ và tên:</span>
                    <span className="font-medium">
                      {formData.firstName} {formData.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tên đăng nhập:</span>
                    <span className="font-medium">{formData.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vai trò:</span>
                    <span className="font-medium">
                      {roles.find(r => r.id === formData.role)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cấp độ:</span>
                    <span className="font-medium">
                      {levels.find(l => l.id === formData.level)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trạng thái:</span>
                    <span className="font-medium">
                      {statuses.find(s => s.id === formData.status)?.name}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <XCircle className="w-5 h-5 text-red-400 mr-2" />
                <p className="text-red-800">{errors.submit}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Link to="/admin/users">
              <Button variant="outline" type="button">
                Hủy
              </Button>
            </Link>
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang tạo...
                </div>
              ) : (
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Tạo người dùng
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddUser; 