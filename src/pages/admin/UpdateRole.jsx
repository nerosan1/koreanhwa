import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Save,
  Shield,
  Users,
  Settings,
  CheckCircle,
  AlertCircle,
  Info,
  Trash2,
  Eye,
  Lock,
  Database,
  BarChart3,
  MessageSquare,
  BookOpen,
  TrendingUp,
  Loader,
  Edit3,
  Clock,
  Calendar,
  Activity
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';

const RoleUpdate = () => {
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    status: 'active',
    permissions: [],
    userCount: 0,
    createdAt: '',
    lastUpdated: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock existing role data
  useEffect(() => {
    const loadRoleData = () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const existingRole = {
          id: 2,
          name: 'Moderator',
          description: 'Điều hành viên diễn đàn và nội dung với quyền quản lý các hoạt động của người dùng',
          status: 'active',
          permissions: ['content_manage', 'forum_manage', 'reports_view', 'content_edit', 'forum_moderate'],
          userCount: 12,
          createdAt: '2023-03-10',
          lastUpdated: '2024-01-18'
        };
        setFormData(existingRole);
        setLoading(false);
      }, 1500);
    };

    loadRoleData();
  }, []);

  // Available permissions with categories
  const permissionCategories = [
    {
      id: 'user_management',
      name: 'Quản lý người dùng',
      icon: Users,
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      permissions: [
        { id: 'user_manage', name: 'User Management', description: 'Quản lý người dùng, tạo, sửa, xóa tài khoản' },
        { id: 'user_view', name: 'User View', description: 'Xem thông tin người dùng' },
        { id: 'user_permissions', name: 'User Permissions', description: 'Phân quyền cho người dùng' }
      ]
    },
    {
      id: 'content_management',
      name: 'Quản lý nội dung',
      icon: BookOpen,
      color: 'bg-green-100 text-green-800 border-green-200',
      permissions: [
        { id: 'content_manage', name: 'Content Management', description: 'Quản lý nội dung bài viết, khóa học' },
        { id: 'content_create', name: 'Content Create', description: 'Tạo nội dung mới' },
        { id: 'content_edit', name: 'Content Edit', description: 'Chỉnh sửa nội dung' },
        { id: 'content_delete', name: 'Content Delete', description: 'Xóa nội dung' }
      ]
    },
    {
      id: 'forum_management',
      name: 'Quản lý diễn đàn',
      icon: MessageSquare,
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      permissions: [
        { id: 'forum_manage', name: 'Forum Management', description: 'Quản lý diễn đàn, chủ đề, bình luận' },
        { id: 'forum_moderate', name: 'Forum Moderate', description: 'Kiểm duyệt nội dung diễn đàn' },
        { id: 'forum_ban', name: 'Forum Ban', description: 'Cấm người dùng trên diễn đàn' }
      ]
    },
    {
      id: 'system_management',
      name: 'Quản lý hệ thống',
      icon: Settings,
      color: 'bg-red-100 text-red-800 border-red-200',
      permissions: [
        { id: 'system_manage', name: 'System Management', description: 'Quản lý cấu hình hệ thống' },
        { id: 'system_backup', name: 'System Backup', description: 'Sao lưu dữ liệu hệ thống' },
        { id: 'system_logs', name: 'System Logs', description: 'Xem nhật ký hệ thống' }
      ]
    },
    {
      id: 'reports_analytics',
      name: 'Báo cáo & Thống kê',
      icon: BarChart3,
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      permissions: [
        { id: 'reports_view', name: 'Reports View', description: 'Xem báo cáo thống kê' },
        { id: 'analytics_view', name: 'Analytics View', description: 'Xem phân tích dữ liệu' },
        { id: 'export_data', name: 'Export Data', description: 'Xuất dữ liệu báo cáo' }
      ]
    },
    {
      id: 'learning_access',
      name: 'Truy cập học tập',
      icon: BookOpen,
      color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      permissions: [
        { id: 'lesson_view', name: 'Lesson View', description: 'Xem bài học' },
        { id: 'progress_view', name: 'Progress View', description: 'Xem tiến độ học tập' },
        { id: 'certificate_view', name: 'Certificate View', description: 'Xem chứng chỉ' }
      ]
    }
  ];

  const allPermissions = permissionCategories.flatMap(cat => cat.permissions);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Tên vai trò là bắt buộc';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Tên vai trò phải có ít nhất 2 ký tự';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Mô tả vai trò là bắt buộc';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Mô tả phải có ít nhất 10 ký tự';
    }
    
    if (formData.permissions.length === 0) {
      newErrors.permissions = 'Phải chọn ít nhất một quyền hạn';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      const roleData = {
        ...formData,
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Updated role:', roleData);
      alert('Vai trò đã được cập nhật thành công!');
      
    } catch (error) {
      alert('Có lỗi xảy ra khi cập nhật vai trò!');
    } finally {
      setSaving(false);
    }
  };

  const handlePermissionToggle = (permissionId) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
    
    // Clear permission error when user selects permissions
    if (errors.permissions && !formData.permissions.includes(permissionId)) {
      setErrors(prev => ({ ...prev, permissions: undefined }));
    }
  };

  const handleSelectAllCategory = (categoryPermissions) => {
    const categoryIds = categoryPermissions.map(p => p.id);
    const allSelected = categoryIds.every(id => formData.permissions.includes(id));
    
    setFormData(prev => ({
      ...prev,
      permissions: allSelected 
        ? prev.permissions.filter(p => !categoryIds.includes(p))
        : [...new Set([...prev.permissions, ...categoryIds])]
    }));
  };

  const getPermissionName = (permissionId) => {
    const permission = allPermissions.find(p => p.id === permissionId);
    return permission ? permission.name : permissionId;
  };

  const renderPreview = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <Eye className="w-6 h-6 text-blue-500" />
        Xem trước vai trò
      </h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              {formData.name || 'Tên vai trò'}
            </h4>
            <p className="text-gray-600 mt-1">
              {formData.description || 'Mô tả vai trò'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              formData.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {formData.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
            </span>
            <div className="text-sm text-gray-500">
              <span className="font-medium">{formData.userCount}</span> người dùng
            </div>
          </div>
        </div>

        <div>
          <h5 className="font-semibold text-gray-900 mb-3">
            Quyền hạn ({formData.permissions.length})
          </h5>
          <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
            {formData.permissions.length > 0 ? (
              formData.permissions.map(permissionId => (
                <div key={permissionId} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-800">
                    {getPermissionName(permissionId)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm italic">Chưa chọn quyền hạn nào</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{formData.userCount}</div>
            <div className="text-sm text-gray-500">Người dùng</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{formData.permissions.length}</div>
            <div className="text-sm text-gray-500">Quyền hạn</div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-6" />
            <div className="absolute inset-0 w-12 h-12 bg-blue-200 rounded-full animate-ping mx-auto opacity-20"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Đang tải dữ liệu vai trò</h3>
          <p className="text-gray-500">Vui lòng chờ trong giây lát...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Cập Nhật Vai Trò</h1>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>ID: {formData.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Tạo: {formData.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Cập nhật: {formData.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{formData.userCount} người dùng</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  showPreview
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Eye className="w-4 h-4" />
                {showPreview ? 'Ẩn xem trước' : 'Xem trước'}
              </button>
              
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 shadow-lg transition-all"
              >
                {saving ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? 'Đang cập nhật...' : 'Cập nhật vai trò'}
              </button>
            </div>
          </div>
        </div>

        <div className={`grid ${showPreview ? 'grid-cols-2' : 'grid-cols-1'} gap-8`}>
          {/* Form */}
          <div className="space-y-8">
            {/* Role Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Activity className="w-6 h-6 text-green-500" />
                Thống kê vai trò
              </h2>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{formData.userCount}</div>
                  <div className="text-sm text-blue-800 font-medium">Người dùng</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{formData.permissions.length}</div>
                  <div className="text-sm text-purple-800 font-medium">Quyền hạn</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {formData.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                  </div>
                  <div className="text-sm text-green-800 font-medium">Trạng thái</div>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Edit3 className="w-6 h-6 text-blue-500" />
                Thông tin cơ bản
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Tên vai trò *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, name: e.target.value }));
                      if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                    }}
                    placeholder="Nhập tên vai trò"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Mô tả vai trò *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, description: e.target.value }));
                      if (errors.description) setErrors(prev => ({ ...prev, description: undefined }));
                    }}
                    placeholder="Mô tả chi tiết về vai trò và trách nhiệm..."
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                      errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {errors.description && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.description}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Trạng thái
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                  </select>
                  <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    {formData.userCount > 0 && formData.status === 'inactive' && 
                      `Cẩn thận: ${formData.userCount} người dùng đang sử dụng vai trò này`
                    }
                    {formData.userCount === 0 && 
                      "Vai trò không hoạt động sẽ không thể gán cho người dùng mới"
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-purple-500" />
                  Quyền hạn
                </h2>
                <div className="text-sm text-gray-500">
                  Đã chọn: <span className="font-semibold text-purple-600">{formData.permissions.length}</span> quyền
                </div>
              </div>

              {errors.permissions && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.permissions}
                  </p>
                </div>
              )}
              
              <div className="space-y-6">
                {permissionCategories.map(category => {
                  const categoryPermissions = category.permissions;
                  const selectedCount = categoryPermissions.filter(p => 
                    formData.permissions.includes(p.id)
                  ).length;
                  const allSelected = selectedCount === categoryPermissions.length;
                  
                  return (
                    <div key={category.id} className="border border-gray-200 rounded-xl overflow-hidden">
                      <div className={`p-4 ${category.color} border-b border-gray-200`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <category.icon className="w-5 h-5" />
                            <h3 className="font-semibold">{category.name}</h3>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">
                              {selectedCount}/{categoryPermissions.length}
                            </span>
                            <button
                              onClick={() => handleSelectAllCategory(categoryPermissions)}
                              className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                                allSelected 
                                  ? 'bg-white text-gray-800' 
                                  : 'bg-white text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {allSelected ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 space-y-3">
                        {categoryPermissions.map(permission => (
                          <div key={permission.id} className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              id={permission.id}
                              checked={formData.permissions.includes(permission.id)}
                              onChange={() => handlePermissionToggle(permission.id)}
                              className="mt-1 w-5 h-5 text-blue-500 rounded border-2 border-gray-300 focus:ring-2 focus:ring-blue-500"
                            />
                            <label htmlFor={permission.id} className="flex-1 cursor-pointer">
                              <div className="font-medium text-gray-900">
                                {permission.name}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                {permission.description}
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {formData.permissions.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3">Quyền đã chọn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.permissions.map(permissionId => (
                      <span key={permissionId} className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        <CheckCircle className="w-3 h-3" />
                        {getPermissionName(permissionId)}
                        <button
                          onClick={() => handlePermissionToggle(permissionId)}
                          className="hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Danger Zone */}
            {formData.userCount > 0 && (
              <div className="bg-white border-2 border-red-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-3">
                  <AlertCircle className="w-6 h-6" />
                  Khu vực nguy hiểm
                </h2>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-red-700 mb-3">
                    <strong>Cảnh báo:</strong> Vai trò này đang được sử dụng bởi {formData.userCount} người dùng.
                  </p>
                  <p className="text-sm text-red-600">
                    Việc thay đổi quyền hạn hoặc vô hiệu hóa vai trò có thể ảnh hưởng đến quyền truy cập của họ.
                    Vui lòng cân nhắc kỹ trước khi thực hiện thay đổi.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Preview */}
          {showPreview && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Xem trước</h3>
              {renderPreview()}
            </div>
          )}
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default RoleUpdate;