import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  Eye,
  Users,
  Settings,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import AdminLayout from '../components/layout/AdminLayout';

const RoleManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: []
  });

  // Mock roles data
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Admin',
      description: 'Quản trị viên hệ thống với toàn quyền',
      userCount: 5,
      permissions: ['user_manage', 'content_manage', 'system_manage', 'reports_view'],
      status: 'active',
      createdAt: '2023-01-15',
      lastUpdated: '2024-01-20'
    },
    {
      id: 2,
      name: 'Moderator',
      description: 'Điều hành viên diễn đàn và nội dung',
      userCount: 12,
      permissions: ['content_manage', 'forum_manage', 'reports_view'],
      status: 'active',
      createdAt: '2023-03-10',
      lastUpdated: '2024-01-18'
    },
    {
      id: 3,
      name: 'Student',
      description: 'Học viên với quyền truy cập bài học',
      userCount: 1050,
      permissions: ['lesson_view', 'progress_view'],
      status: 'active',
      createdAt: '2023-01-01',
      lastUpdated: '2024-01-15'
    },
    {
      id: 4,
      name: 'Guest',
      description: 'Khách với quyền truy cập hạn chế',
      userCount: 183,
      permissions: ['lesson_view'],
      status: 'inactive',
      createdAt: '2023-02-20',
      lastUpdated: '2024-01-10'
    }
  ]);

  // Chart data
  const roleDistributionData = [
    { role: 'Student', count: 1050, color: '#0088FE' },
    { role: 'Guest', count: 183, color: '#00C49F' },
    { role: 'Moderator', count: 12, color: '#FFBB28' },
    { role: 'Admin', count: 5, color: '#FF8042' }
  ];

  const permissionData = [
    { permission: 'User Management', count: 17, color: '#0088FE' },
    { permission: 'Content Management', count: 17, color: '#00C49F' },
    { permission: 'Forum Management', count: 12, color: '#FFBB28' },
    { permission: 'System Management', count: 5, color: '#FF8042' },
    { permission: 'Reports View', count: 17, color: '#8884D8' }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const permissions = [
    { id: 'user_manage', name: 'User Management', description: 'Quản lý người dùng' },
    { id: 'content_manage', name: 'Content Management', description: 'Quản lý nội dung' },
    { id: 'forum_manage', name: 'Forum Management', description: 'Quản lý diễn đàn' },
    { id: 'system_manage', name: 'System Management', description: 'Quản lý hệ thống' },
    { id: 'reports_view', name: 'Reports View', description: 'Xem báo cáo' },
    { id: 'lesson_view', name: 'Lesson View', description: 'Xem bài học' },
    { id: 'progress_view', name: 'Progress View', description: 'Xem tiến độ' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Hoạt động' },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Không hoạt động' }
    };
    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const filteredRoles = roles.filter(role => {
    return role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           role.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleAddRole = () => {
    if (newRole.name && newRole.description) {
      const role = {
        id: roles.length + 1,
        ...newRole,
        userCount: 0,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setRoles([...roles, role]);
      setNewRole({ name: '', description: '', permissions: [] });
      setShowAddModal(false);
    }
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setNewRole({
      name: role.name,
      description: role.description,
      permissions: role.permissions
    });
    setShowAddModal(true);
  };

  const handleUpdateRole = () => {
    if (editingRole && newRole.name && newRole.description) {
      const updatedRoles = roles.map(role => 
        role.id === editingRole.id 
          ? { ...role, ...newRole, lastUpdated: new Date().toISOString().split('T')[0] }
          : role
      );
      setRoles(updatedRoles);
      setEditingRole(null);
      setNewRole({ name: '', description: '', permissions: [] });
      setShowAddModal(false);
    }
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa vai trò này?')) {
      setRoles(roles.filter(role => role.id !== roleId));
    }
  };

  const togglePermission = (permissionId) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Phân quyền hệ thống</h1>
            <p className="text-gray-600">Quản lý vai trò và quyền hạn người dùng</p>
          </div>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm vai trò mới
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Tổng vai trò</p>
                <p className="text-lg font-semibold text-gray-900">{roles.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Hoạt động</p>
                <p className="text-lg font-semibold text-gray-900">
                  {roles.filter(r => r.status === 'active').length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Tổng người dùng</p>
                <p className="text-lg font-semibold text-gray-900">
                  {roles.reduce((sum, role) => sum + role.userCount, 0)}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Settings className="w-5 h-5 text-orange-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Quyền hạn</p>
                <p className="text-lg font-semibold text-gray-900">{permissions.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Role Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố vai trò</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roleDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ role, count }) => `${role}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {roleDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Permission Usage */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sử dụng quyền hạn</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={permissionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="permission" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Tìm theo tên hoặc mô tả vai trò..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Roles Table */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Danh sách vai trò</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vai trò
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mô tả
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người dùng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quyền hạn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cập nhật
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRoles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{role.name}</div>
                          <div className="text-xs text-gray-500">ID: {role.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {role.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{role.userCount}</div>
                      <div className="text-xs text-gray-500">người dùng</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((permission, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                            {permission}
                          </span>
                        ))}
                        {role.permissions.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            +{role.permissions.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(role.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {role.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEditRole(role)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRole(role.id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={role.userCount > 0}
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
                  {editingRole ? 'Chỉnh sửa vai trò' : 'Thêm vai trò mới'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên vai trò
                    </label>
                    <Input
                      type="text"
                      value={newRole.name}
                      onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                      placeholder="Nhập tên vai trò"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mô tả
                    </label>
                    <textarea
                      value={newRole.description}
                      onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                      placeholder="Nhập mô tả vai trò"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quyền hạn
                    </label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {permissions.map((permission) => (
                        <label key={permission.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newRole.permissions.includes(permission.id)}
                            onChange={() => togglePermission(permission.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {permission.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingRole(null);
                      setNewRole({ name: '', description: '', permissions: [] });
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    variant="primary"
                    onClick={editingRole ? handleUpdateRole : handleAddRole}
                  >
                    {editingRole ? 'Cập nhật' : 'Thêm'}
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

export default RoleManagement; 