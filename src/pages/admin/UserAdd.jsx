import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Calendar, CreditCard, UserCheck, Shield, Eye, EyeOff, Star, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    userType: 'guest', // guest, user, admin
    paymentStatus: 'unpaid', // unpaid, paid, expired
    subscriptionPlan: 'basic', // basic, premium, pro
    koreanLevel: 'beginner', // beginner, intermediate, advanced
    notes: '',
    subscriptionExpiry: '',
    amountPaid: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ tên không được để trống';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Họ tên phải có ít nhất 2 ký tự';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email không được để trống';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!formData.phone) {
      newErrors.phone = 'Số điện thoại không được để trống';
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Số điện thoại phải có 10-11 chữ số';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Ngày sinh không được để trống';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13) {
        newErrors.dateOfBirth = 'Người dùng phải từ 13 tuổi trở lên';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Auto-update user type based on payment status
    if (name === 'paymentStatus') {
      if (value === 'paid') {
        setFormData(prev => ({
          ...prev,
          userType: 'user'
        }));
      } else if (value === 'unpaid') {
        setFormData(prev => ({
          ...prev,
          userType: 'guest'
        }));
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    // Simulate API call
    setTimeout(() => {
      console.log('User data to be submitted:', formData);
      
      setSubmitMessage(`✅ Tạo tài khoản ${getUserTypeText(formData.userType)} thành công cho ${formData.fullName}!`);
      
      // Reset form after successful submission
      resetForm();
      setIsSubmitting(false);
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
      userType: 'guest',
      paymentStatus: 'unpaid',
      subscriptionPlan: 'basic',
      koreanLevel: 'beginner',
      notes: '',
      subscriptionExpiry: '',
      amountPaid: ''
    });
    setErrors({});
    setSubmitMessage('');
  };

  // Get user type display text
  const getUserTypeText = (type) => {
    const types = {
      guest: 'Khách',
      user: 'Người dùng',
      admin: 'Quản trị viên'
    };
    return types[type] || 'Khách';
  };

  // Get user type badge color
  const getUserTypeBadge = (type) => {
    const badges = {
      guest: 'bg-gray-100 text-gray-800 border-gray-300',
      user: 'bg-blue-100 text-blue-800 border-blue-300',
      admin: 'bg-red-100 text-red-800 border-red-300'
    };
    return badges[type] || badges.guest;
  };

  // Get payment status badge color
  const getPaymentStatusBadge = (status) => {
    const badges = {
      unpaid: 'bg-red-100 text-red-800 border-red-300',
      paid: 'bg-green-100 text-green-800 border-green-300',
      expired: 'bg-yellow-100 text-yellow-800 border-yellow-300'
    };
    return badges[status] || badges.unpaid;
  };

  // Get subscription plan details
  const getSubscriptionDetails = (plan) => {
    const plans = {
      basic: { name: 'Cơ bản', price: '99,000đ/tháng', features: ['Bài học cơ bản', 'Từ vựng hàng ngày'] },
      premium: { name: 'Cao cấp', price: '199,000đ/tháng', features: ['Tất cả bài học', 'Luyện nói AI', 'Thi thử TOPIK'] },
      pro: { name: 'Chuyên nghiệp', price: '299,000đ/tháng', features: ['Học 1-1 với giáo viên', 'Chứng chỉ hoàn thành', 'Hỗ trợ 24/7'] }
    };
    return plans[plan] || plans.basic;
  };

  return (
    <AdminLayout>
              <div className="max-w-6xl mx-auto p-6  min-h-screen">
          <div className="bg-white rounded-2xl  overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r  px-8 py-6 text-black">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Thêm người dùng mới</h1>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Status Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 p-6  rounded-xl border border-black">
                <div className="text-center">
                  <div className="text-2xl mb-2">👤</div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Loại tài khoản</div>
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${getUserTypeBadge(formData.userType)}`}>
                    {getUserTypeText(formData.userType)}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl mb-2">💳</div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Thanh toán</div>
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${getPaymentStatusBadge(formData.paymentStatus)}`}>
                    {formData.paymentStatus === 'unpaid' ? 'Chưa thanh toán' : 
                    formData.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Hết hạn'}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl mb-2">📦</div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Gói học</div>
                  <div className="text-sm font-semibold text-indigo-600">
                    {getSubscriptionDetails(formData.subscriptionPlan).name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {getSubscriptionDetails(formData.subscriptionPlan).price}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl mb-2">📈</div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Trình độ</div>
                  <div className="text-sm font-semibold text-green-600">
                    {formData.koreanLevel === 'beginner' ? '초급 (Sơ cấp)' :
                    formData.koreanLevel === 'intermediate' ? '중급 (Trung cấp)' : '고급 (Nâng cao)'}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* Personal Information */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <User className="mr-2 text-blue-600" size={24} />
                    Thông tin cá nhân
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                        }`}
                        placeholder="VD: Nguyễn Văn A"
                      />
                      {errors.fullName && <p className="mt-1 text-sm text-red-600 flex items-center">
                        <span className="mr-1">⚠️</span>{errors.fullName}
                      </p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                        }`}
                        placeholder="example@gmail.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600 flex items-center">
                        <span className="mr-1">⚠️</span>{errors.email}
                      </p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                        }`}
                        placeholder="0123456789"
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600 flex items-center">
                        <span className="mr-1">⚠️</span>{errors.phone}
                      </p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ngày sinh *
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.dateOfBirth ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                        }`}
                      />
                      {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600 flex items-center">
                        <span className="mr-1">⚠️</span>{errors.dateOfBirth}
                      </p>}
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Lock className="mr-2 text-green-600" size={24} />
                    Bảo mật tài khoản
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mật khẩu *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                          }`}
                          placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.password && <p className="mt-1 text-sm text-red-600 flex items-center">
                        <span className="mr-1">⚠️</span>{errors.password}
                      </p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Xác nhận mật khẩu *
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                          }`}
                          placeholder="Nhập lại mật khẩu"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="mt-1 text-sm text-red-600 flex items-center">
                        <span className="mr-1">⚠️</span>{errors.confirmPassword}
                      </p>}
                    </div>
                  </div>
                </div>

                {/* Account Settings */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <CreditCard className="mr-2 text-purple-600" size={24} />
                    Cài đặt tài khoản & Thanh toán
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loại tài khoản
                      </label>
                      <select
                        name="userType"
                        value={formData.userType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-colors"
                      >
                        <option value="guest">👤 Khách (Guest User)</option>
                        <option value="user">👨‍🎓 Người dùng (User)</option>
                        <option value="admin">👨‍💼 Quản trị viên (Admin)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Trạng thái thanh toán
                      </label>
                      <select
                        name="paymentStatus"
                        value={formData.paymentStatus}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-colors"
                      >
                        <option value="unpaid">❌ Chưa thanh toán</option>
                        <option value="paid">✅ Đã thanh toán</option>
                        <option value="expired">⏰ Hết hạn</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gói đăng ký
                      </label>
                      <select
                        name="subscriptionPlan"
                        value={formData.subscriptionPlan}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-colors"
                      >
                        <option value="basic">📘 Cơ bản (99,000đ/tháng)</option>
                        <option value="premium">📗 Cao cấp (199,000đ/tháng)</option>
                        <option value="pro">📕 Chuyên nghiệp (299,000đ/tháng)</option>
                      </select>
                      <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800 font-medium">
                          {getSubscriptionDetails(formData.subscriptionPlan).features.map((feature, index) => (
                            <span key={index} className="block">• {feature}</span>
                          ))}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Trình độ tiếng Hàn hiện tại
                      </label>
                      <select
                        name="koreanLevel"
                        value={formData.koreanLevel}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-colors"
                      >
                        <option value="beginner">🌱 초급 - Người mới bắt đầu</option>
                        <option value="intermediate">🌿 중급 - Trung cấp</option>
                        <option value="advanced">🌳 고급 - Nâng cao</option>
                      </select>
                    </div>

                    {formData.paymentStatus === 'paid' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số tiền đã thanh toán
                          </label>
                          <input
                            type="number"
                            name="amountPaid"
                            value={formData.amountPaid}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-colors"
                            placeholder="VD: 199000"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ngày hết hạn
                          </label>
                          <input
                            type="date"
                            name="subscriptionExpiry"
                            value={formData.subscriptionExpiry}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-colors"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <BookOpen className="mr-2 text-orange-600" size={24} />
                    Ghi chú thêm
                  </h3>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-colors"
                    placeholder="Thêm ghi chú về người dùng, mục tiêu học tập, yêu cầu đặc biệt..."
                  />
                </div>

                {/* Submit Message */}
                {submitMessage && (
                  <div className={`p-6 rounded-xl border-l-4 ${
                    submitMessage.includes('thành công') 
                      ? 'bg-green-50 border-green-500 text-green-800' 
                      : 'bg-red-50 border-red-500 text-red-800'
                  }`}>
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">
                        {submitMessage.includes('thành công') ? '🎉' : '❌'}
                      </span>
                      <span className="font-medium">{submitMessage}</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-8 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all flex items-center justify-center"
                  >
                    🔄 Làm mới form
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Đang tạo tài khoản...
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-5 h-5 mr-2" />
                        Tạo tài khoản
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </AdminLayout>
  );
};

export default AddUser;