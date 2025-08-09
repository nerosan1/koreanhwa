import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Lock, 
  Unlock, 
  Edit, 
  Trash, 
  Eye,
  Shield,
  UserCheck,
  UserX,
  Plus
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
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import AdminLayout from '../components/layout/AdminLayout';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock user data
  const users = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0123456789',
      role: 'student',
      status: 'active',
      joinDate: '2024-01-15',
      lastLogin: '2024-01-20 14:30',
      progress: 75,
      lessonsCompleted: 24,
      achievements: 8
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0987654321',
      role: 'teacher',
      status: 'active',
      joinDate: '2023-12-01',
      lastLogin: '2024-01-20 16:45',
      progress: 0,
      lessonsCompleted: 0,
      achievements: 0
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@email.com',
      phone: '0369852147',
      role: 'student',
      status: 'suspended',
      joinDate: '2024-01-10',
      lastLogin: '2024-01-18 09:15',
      progress: 45,
      lessonsCompleted: 12,
      achievements: 3
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      email: 'phamthid@email.com',
      phone: '0521478963',
      role: 'admin',
      status: 'active',
      joinDate: '2023-11-15',
      lastLogin: '2024-01-20 18:20',
      progress: 0,
      lessonsCompleted: 0,
      achievements: 0
    }
  ];

  // Chart data
  const userRoleData = [
    { role: 'Học viên', count: 1050, color: '#0088FE' },
    { role: 'Giáo viên', count: 120, color: '#00C49F' },
    { role: 'Admin', count: 15, color: '#FFBB28' },
    { role: 'Moderator', count: 65, color: '#FF8042' }
  ];

  const userStatusData = [
    { status: 'Hoạt động', count: 890, color: '#00C49F' },
    { status: 'Tạm khóa', count: 45, color: '#FF8042' },
    { status: 'Không hoạt động', count: 315, color: '#8884D8' }
  ];

  const monthlyRegistrations = [
    { month: 'Jan', registrations: 120, activeUsers: 800 },
    { month: 'Feb', registrations: 140, activeUsers: 920 },
    { month: 'Mar', registrations: 130, activeUsers: 1050 },
    { month: 'Apr', registrations: 100, activeUsers: 1150 },
    { month: 'May', registrations: 50, activeUsers: 1200 },
    { month: 'Jun', registrations: 50, activeUsers: 1250 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const getRoleBadge = (role) => {
    const roleConfig = {
      student: { color: 'bg-blue-100 text-blue-800', label: 'Học viên' },
      teacher: { color: 'bg-green-100 text-green-800', label: 'Giáo viên' },
      admin: { color: 'bg-purple-100 text-purple-800', label: 'Admin' },
      moderator: { color: 'bg-orange-100 text-orange-800', label: 'Moderator' }
    };
    const config = roleConfig[role] || roleConfig.student;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Hoạt động' },
      suspended: { color: 'bg-red-100 text-red-800', label: 'Tạm khóa' },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Không hoạt động' }
    };
    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUserAction = (userId, action) => {
    console.log(`Action ${action} for user ${userId}`);
    // Implement actual action logic here
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
            <p className="text-gray-600">Quản lý tài khoản người dùng trong hệ thống</p>
          </div>
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            Thêm người dùng
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Tổng người dùng</p>
                <p className="text-lg font-semibold text-gray-900">{users.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Hoạt động</p>
                <p className="text-lg font-semibold text-gray-900">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <UserX className="w-5 h-5 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Tạm khóa</p>
                <p className="text-lg font-semibold text-gray-900">
                  {users.filter(u => u.status === 'suspended').length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Admin/Teacher</p>
                <p className="text-lg font-semibold text-gray-900">
                  {users.filter(u => u.role === 'admin' || u.role === 'teacher').length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Role Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố vai trò người dùng</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userRoleData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ role, count }) => `${role}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {userRoleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* User Status Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trạng thái người dùng</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Monthly Registrations Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Đăng ký và hoạt động hàng tháng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRegistrations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="registrations" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="Đăng ký mới"
              />
              <Line 
                type="monotone" 
                dataKey="activeUsers" 
                stroke="#82ca9d" 
                strokeWidth={2}
                name="Người dùng hoạt động"
              />
            </LineChart>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả vai trò</option>
                <option value="student">Học viên</option>
                <option value="teacher">Giáo viên</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
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
                <option value="suspended">Tạm khóa</option>
                <option value="inactive">Không hoạt động</option>
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

        {/* Users Table */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Danh sách người dùng</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người dùng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vai trò
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiến độ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Đăng nhập cuối
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-gray-400">{user.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.role === 'student' ? (
                        <div>
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${user.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{user.progress}%</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {user.lessonsCompleted} bài học | {user.achievements} thành tích
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleUserAction(user.id, 'view')}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUserAction(user.id, 'edit')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {user.status === 'active' ? (
                          <button
                            onClick={() => handleUserAction(user.id, 'suspend')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Lock className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUserAction(user.id, 'activate')}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Unlock className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleUserAction(user.id, 'delete')}
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
      </div>
    </AdminLayout>
  );
};

export default UserManagement; 