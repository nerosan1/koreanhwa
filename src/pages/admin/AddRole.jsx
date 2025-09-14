import React, { useState } from 'react';
import { 
  Shield, 
  ArrowLeft, 
  CheckCircle,
  XCircle,
  Plus,
  Trash
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';


const AddRole = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [],
    color: '#3B82F6',
    isActive: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allPermissions = {
    'user_management': {
      name: 'Quản lý người dùng',
      permissions: [
        { id: 'users.view', name: 'Xem danh sách người dùng', description: 'Xem thông tin người dùng' },
        { id: 'users.create', name: 'Tạo người dùng mới', description: 'Thêm người dùng mới vào hệ thống' },
        { id: 'users.edit', name: 'Chỉnh sửa người dùng', description: 'Cập nhật thông tin người dùng' },
        { id: 'users.delete', name: 'Xóa người dùng', description: 'Xóa người dùng khỏi hệ thống' },
        { id: 'users.activate', name: 'Kích hoạt/Khóa người dùng', description: 'Thay đổi trạng thái người dùng' }
      ]
    },
    'content_management': {
      name: 'Quản lý nội dung',
      permissions: [
        { id: 'content.view', name: 'Xem nội dung', description: 'Xem bài học, video, tài liệu' },
        { id: 'content.create', name: 'Tạo nội dung', description: 'Tạo bài học, video mới' },
        { id: 'content.edit', name: 'Chỉnh sửa nội dung', description: 'Cập nhật nội dung bài học' },
        { id: 'content.delete', name: 'Xóa nội dung', description: 'Xóa bài học, video' },
        { id: 'content.publish', name: 'Xuất bản nội dung', description: 'Phê duyệt và xuất bản' }
      ]
    },
    'role_management': {
      name: 'Quản lý vai trò',
      permissions: [
        { id: 'roles.view', name: 'Xem vai trò', description: 'Xem danh sách vai trò' },
        { id: 'roles.create', name: 'Tạo vai trò', description: 'Tạo vai trò mới' },
        { id: 'roles.edit', name: 'Chỉnh sửa vai trò', description: 'Cập nhật quyền hạn vai trò' },
        { id: 'roles.delete', name: 'Xóa vai trò', description: 'Xóa vai trò khỏi hệ thống' }
      ]
    },
    'forum_management': {
      name: 'Quản lý diễn đàn',
      permissions: [
        { id: 'forum.view', name: 'Xem bài viết', description: 'Xem tất cả bài viết trong diễn đàn' },
        { id: 'forum.moderate', name: 'Điều hành diễn đàn', description: 'Duyệt, xóa bài viết' },
        { id: 'forum.pin', name: 'Ghim bài viết', description: 'Ghim bài viết quan trọng' },
        { id: 'forum.ban', name: 'Cấm người dùng', description: 'Cấm người dùng vi phạm' }
      ]
    },
    'dictionary_management': {
      name: 'Quản lý từ điển',
      permissions: [
        { id: 'dictionary.view', name: 'Xem từ điển', description: 'Xem danh sách từ vựng' },
        { id: 'dictionary.add', name: 'Thêm từ mới', description: 'Thêm từ vựng vào từ điển' },
        { id: 'dictionary.edit', name: 'Chỉnh sửa từ', description: 'Cập nhật thông tin từ vựng' },
        { id: 'dictionary.approve', name: 'Duyệt từ gửi lên', description: 'Phê duyệt từ do người dùng gửi' }
      ]
    },
    'exam_management': {
      name: 'Quản lý kỳ thi',
      permissions: [
        { id: 'exam.view', name: 'Xem kỳ thi', description: 'Xem danh sách kỳ thi' },
        { id: 'exam.create', name: 'Tạo kỳ thi', description: 'Tạo kỳ thi mới' },
        { id: 'exam.edit', name: 'Chỉnh sửa kỳ thi', description: 'Cập nhật thông tin kỳ thi' },
        { id: 'exam.delete', name: 'Xóa kỳ thi', description: 'Xóa kỳ thi' },
        { id: 'exam.results', name: 'Xem kết quả', description: 'Xem kết quả kỳ thi' }
      ]
    },
    'reports_management': {
      name: 'Quản lý báo cáo',
      permissions: [
        { id: 'reports.view', name: 'Xem báo cáo', description: 'Xem các báo cáo thống kê' },
        { id: 'reports.export', name: 'Xuất báo cáo', description: 'Xuất báo cáo ra file' },
        { id: 'reports.analytics', name: 'Phân tích dữ liệu', description: 'Truy cập công cụ phân tích' }
      ]
    },
    'system_settings': {
      name: 'Cài đặt hệ thống',
      permissions: [
        { id: 'settings.view', name: 'Xem cài đặt', description: 'Xem cài đặt hệ thống' },
        { id: 'settings.edit', name: 'Chỉnh sửa cài đặt', description: 'Thay đổi cài đặt hệ thống' },
        { id: 'settings.backup', name: 'Sao lưu dữ liệu', description: 'Tạo và khôi phục sao lưu' }
      ]
    }
  };

  const colorOptions = [
    { value: '#3B82F6', name: 'Xanh dương', class: 'bg-blue-500' },
    { value: '#10B981', name: 'Xanh lá', class: 'bg-green-500' },
    { value: '#F59E0B', name: 'Vàng', class: 'bg-yellow-500' },
    { value: '#EF4444', name: 'Đỏ', class: 'bg-red-500' },
    { value: '#8B5CF6', name: 'Tím', class: 'bg-purple-500' },
    { value: '#F97316', name: 'Cam', class: 'bg-orange-500' },
    { value: '#06B6D4', name: 'Xanh cyan', class: 'bg-cyan-500' },
    { value: '#EC4899', name: 'Hồng', class: 'bg-pink-500' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tên vai trò là bắt buộc';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Tên vai trò phải có ít nhất 3 ký tự';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Mô tả là bắt buộc';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Mô tả phải có ít nhất 10 ký tự';
    }

    if (formData.permissions.length === 0) {
      newErrors.permissions = 'Phải chọn ít nhất một quyền hạn';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePermissionChange = (permissionId, checked) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        permissions: [...prev.permissions, permissionId]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(id => id !== permissionId)
      }));
    }
    
    if (errors.permissions) {
      setErrors(prev => ({ ...prev, permissions: '' }));
    }
  };

  const handleSelectAllPermissions = (category) => {
    const categoryPermissions = allPermissions[category].permissions.map(p => p.id);
    const allSelected = categoryPermissions.every(id => formData.permissions.includes(id));
    
    if (allSelected) {
      // Unselect all
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(id => !categoryPermissions.includes(id))
      }));
    } else {
      // Select all
      setFormData(prev => ({
        ...prev,
        permissions: [...new Set([...prev.permissions, ...categoryPermissions])]
      }));
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
      
      // Success - redirect to roles list
      window.location.href = '/admin/roles';
    } catch (error) {
      console.error('Error creating role:', error);
      setErrors({ submit: 'Có lỗi xảy ra khi tạo vai trò. Vui lòng thử lại.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPermissionCount = (category) => {
    const categoryPermissions = allPermissions[category].permissions.map(p => p.id);
    return formData.permissions.filter(id => categoryPermissions.includes(id)).length;
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/admin/roles"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Quay lại
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Thêm vai trò mới</h1>
              <p className="text-gray-600">Tạo vai trò mới với các quyền hạn tùy chỉnh</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Basic Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin cơ bản</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên vai trò <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Nhập tên vai trò"
                      error={errors.name}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Mô tả chức năng của vai trò này"
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Màu sắc
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => handleInputChange('color', color.value)}
                          className={`w-8 h-8 rounded-full border-2 ${
                            formData.color === color.value 
                              ? 'border-gray-900' 
                              : 'border-gray-300'
                          } ${color.class}`}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => handleInputChange('isActive', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                      Vai trò đang hoạt động
                    </label>
                  </div>
                </div>
              </Card>

              {/* Summary */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tên vai trò:</span>
                    <span className="font-medium">{formData.name || 'Chưa nhập'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trạng thái:</span>
                    <span className="font-medium">
                      {formData.isActive ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số quyền hạn:</span>
                    <span className="font-medium">{formData.permissions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Màu sắc:</span>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: formData.color }}
                      />
                      <span className="font-medium">{formData.color}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Permissions */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Quyền hạn</h3>
                  {errors.permissions && (
                    <p className="text-red-500 text-sm">{errors.permissions}</p>
                  )}
                </div>
                
                <div className="space-y-6">
                  {Object.entries(allPermissions).map(([category, categoryData]) => (
                    <div key={category} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{categoryData.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">
                            {getPermissionCount(category)}/{categoryData.permissions.length}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleSelectAllPermissions(category)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            {getPermissionCount(category) === categoryData.permissions.length 
                              ? 'Bỏ chọn tất cả' 
                              : 'Chọn tất cả'
                            }
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {categoryData.permissions.map((permission) => (
                          <div key={permission.id} className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              id={permission.id}
                              checked={formData.permissions.includes(permission.id)}
                              onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <div className="flex-1">
                              <label 
                                htmlFor={permission.id}
                                className="text-sm font-medium text-gray-900 cursor-pointer"
                              >
                                {permission.name}
                              </label>
                              <p className="text-xs text-gray-500 mt-1">
                                {permission.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
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
            <Link to="/admin/roles">
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
                  Tạo vai trò
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddRole; 