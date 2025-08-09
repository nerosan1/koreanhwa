import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  Eye,
  Download,
  Upload,
  Filter,
  BookOpen,
  File,
  Folder,
  CheckCircle,
  XCircle,
  Clock
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

const MaterialsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    description: '',
    type: 'document',
    level: 'beginner',
    category: 'grammar',
    fileUrl: '',
    fileSize: '',
    downloads: 0,
    status: 'active'
  });

  // Mock materials data
  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: 'Ngữ pháp tiếng Hàn cơ bản',
      description: 'Tài liệu tổng hợp ngữ pháp tiếng Hàn cho người mới bắt đầu',
      type: 'document',
      level: 'beginner',
      category: 'grammar',
      fileUrl: '/materials/grammar-basic.pdf',
      fileSize: '2.5 MB',
      downloads: 1250,
      status: 'active',
      uploadedBy: 'admin',
      uploadedDate: '2024-01-15',
      lastUpdated: '2024-01-20',
      tags: ['ngữ pháp', 'cơ bản', 'tiếng Hàn']
    },
    {
      id: 2,
      title: 'Từ vựng theo chủ đề - Gia đình',
      description: 'Danh sách từ vựng tiếng Hàn về chủ đề gia đình',
      type: 'document',
      level: 'beginner',
      category: 'vocabulary',
      fileUrl: '/materials/vocab-family.pdf',
      fileSize: '1.8 MB',
      downloads: 890,
      status: 'active',
      uploadedBy: 'teacher1',
      uploadedDate: '2024-01-18',
      lastUpdated: '2024-01-19',
      tags: ['từ vựng', 'gia đình', 'chủ đề']
    },
    {
      id: 3,
      title: 'Bài tập luyện nghe - Trung cấp',
      description: 'Tài liệu luyện nghe tiếng Hàn trình độ trung cấp',
      type: 'audio',
      level: 'intermediate',
      category: 'listening',
      fileUrl: '/materials/listening-intermediate.mp3',
      fileSize: '15.2 MB',
      downloads: 456,
      status: 'active',
      uploadedBy: 'teacher2',
      uploadedDate: '2024-01-16',
      lastUpdated: '2024-01-17',
      tags: ['luyện nghe', 'trung cấp', 'audio']
    },
    {
      id: 4,
      title: 'Video bài giảng - Phát âm nâng cao',
      description: 'Video hướng dẫn phát âm tiếng Hàn nâng cao',
      type: 'video',
      level: 'advanced',
      category: 'pronunciation',
      fileUrl: '/materials/pronunciation-advanced.mp4',
      fileSize: '45.6 MB',
      downloads: 234,
      status: 'pending',
      uploadedBy: 'teacher3',
      uploadedDate: '2024-01-20',
      lastUpdated: '2024-01-20',
      tags: ['phát âm', 'nâng cao', 'video']
    }
  ]);

  // Chart data
  const materialTypeData = [
    { type: 'Document', count: 45, downloads: 12500, color: '#0088FE' },
    { type: 'Video', count: 23, downloads: 8900, color: '#00C49F' },
    { type: 'Audio', count: 18, downloads: 5600, color: '#FFBB28' },
    { type: 'Image', count: 12, downloads: 3200, color: '#FF8042' }
  ];

  const categoryData = [
    { category: 'Grammar', count: 25, downloads: 6800, color: '#0088FE' },
    { category: 'Vocabulary', count: 20, downloads: 5200, color: '#00C49F' },
    { category: 'Listening', count: 15, downloads: 3800, color: '#FFBB28' },
    { category: 'Speaking', count: 12, downloads: 2900, color: '#FF8042' },
    { category: 'Reading', count: 10, downloads: 2400, color: '#8884D8' }
  ];

  const monthlyUploads = [
    { month: 'Jan', uploads: 12, downloads: 8500 },
    { month: 'Feb', uploads: 15, downloads: 9200 },
    { month: 'Mar', uploads: 18, downloads: 10800 },
    { month: 'Apr', uploads: 14, downloads: 9500 },
    { month: 'May', uploads: 20, downloads: 12500 },
    { month: 'Jun', uploads: 16, downloads: 11000 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const materialTypes = [
    { id: 'document', name: 'Document', icon: FileText, color: 'bg-blue-100 text-blue-800' },
    { id: 'video', name: 'Video', icon: File, color: 'bg-green-100 text-green-800' },
    { id: 'audio', name: 'Audio', icon: File, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'image', name: 'Image', icon: File, color: 'bg-purple-100 text-purple-800' }
  ];

  const levels = [
    { id: 'beginner', name: 'Cơ bản', color: 'bg-green-100 text-green-800' },
    { id: 'intermediate', name: 'Trung cấp', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'advanced', name: 'Nâng cao', color: 'bg-red-100 text-red-800' }
  ];

  const categories = [
    { id: 'grammar', name: 'Grammar', color: 'bg-blue-100 text-blue-800' },
    { id: 'vocabulary', name: 'Vocabulary', color: 'bg-green-100 text-green-800' },
    { id: 'listening', name: 'Listening', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'speaking', name: 'Speaking', color: 'bg-purple-100 text-purple-800' },
    { id: 'reading', name: 'Reading', color: 'bg-pink-100 text-pink-800' },
    { id: 'pronunciation', name: 'Pronunciation', color: 'bg-orange-100 text-orange-800' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Hoạt động' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Chờ duyệt' },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Không hoạt động' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getTypeBadge = (typeId) => {
    const type = materialTypes.find(t => t.id === typeId);
    if (!type) return null;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${type.color}`}>
        {type.name}
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

  const getCategoryBadge = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return null;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${category.color}`}>
        {category.name}
      </span>
    );
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || material.type === filterType;
    const matchesLevel = filterLevel === 'all' || material.level === filterLevel;
    return matchesSearch && matchesType && matchesLevel;
  });

  const handleAddMaterial = () => {
    if (newMaterial.title && newMaterial.description) {
      const material = {
        id: materials.length + 1,
        ...newMaterial,
        downloads: 0,
        uploadedBy: 'admin',
        uploadedDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        tags: []
      };
      setMaterials([...materials, material]);
      setNewMaterial({
        title: '',
        description: '',
        type: 'document',
        level: 'beginner',
        category: 'grammar',
        fileUrl: '',
        fileSize: '',
        downloads: 0,
        status: 'active'
      });
      setShowAddModal(false);
    }
  };

  const handleEditMaterial = (material) => {
    setEditingMaterial(material);
    setNewMaterial({
      title: material.title,
      description: material.description,
      type: material.type,
      level: material.level,
      category: material.category,
      fileUrl: material.fileUrl,
      fileSize: material.fileSize,
      downloads: material.downloads,
      status: material.status
    });
    setShowAddModal(true);
  };

  const handleUpdateMaterial = () => {
    if (editingMaterial && newMaterial.title && newMaterial.description) {
      const updatedMaterials = materials.map(material => 
        material.id === editingMaterial.id 
          ? { ...material, ...newMaterial, lastUpdated: new Date().toISOString().split('T')[0] }
          : material
      );
      setMaterials(updatedMaterials);
      setEditingMaterial(null);
      setNewMaterial({
        title: '',
        description: '',
        type: 'document',
        level: 'beginner',
        category: 'grammar',
        fileUrl: '',
        fileSize: '',
        downloads: 0,
        status: 'active'
      });
      setShowAddModal(false);
    }
  };

  const handleDeleteMaterial = (materialId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài liệu này?')) {
      setMaterials(materials.filter(material => material.id !== materialId));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý tài liệu học tập</h1>
            <p className="text-gray-600">Upload, phân loại, cập nhật tài liệu học tập</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm tài liệu
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
                <p className="text-sm text-gray-500">Tổng tài liệu</p>
                <p className="text-lg font-semibold text-gray-900">{materials.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Download className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Tổng lượt tải</p>
                <p className="text-lg font-semibold text-gray-900">
                  {materials.reduce((sum, m) => sum + m.downloads, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Đã duyệt</p>
                <p className="text-lg font-semibold text-gray-900">
                  {materials.filter(m => m.status === 'active').length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Folder className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Danh mục</p>
                <p className="text-lg font-semibold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Material Type Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố loại tài liệu</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={materialTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, count }) => `${type}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {materialTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Category Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố theo danh mục</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Monthly Uploads Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload và tải xuống hàng tháng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyUploads}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="uploads" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="Số upload"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="downloads" 
                stroke="#82ca9d" 
                strokeWidth={2}
                name="Lượt tải"
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
                  placeholder="Tìm theo tên hoặc mô tả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loại tài liệu</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả loại</option>
                {materialTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
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

        {/* Materials Table */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Danh sách tài liệu</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tài liệu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cấp độ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Danh mục
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thống kê
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
                {filteredMaterials.map((material) => (
                  <tr key={material.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="text-sm font-medium text-gray-900">{material.title}</div>
                          <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {material.description}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {material.fileSize} • {material.uploadedBy}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getTypeBadge(material.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getLevelBadge(material.level)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getCategoryBadge(material.category)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{material.downloads} lượt tải</div>
                      <div className="text-xs text-gray-500">{material.uploadedDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(material.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {material.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEditMaterial(material)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => window.open(material.fileUrl, '_blank')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMaterial(material.id)}
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
                  {editingMaterial ? 'Chỉnh sửa tài liệu' : 'Thêm tài liệu mới'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên tài liệu
                    </label>
                    <Input
                      type="text"
                      value={newMaterial.title}
                      onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                      placeholder="Nhập tên tài liệu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mô tả
                    </label>
                    <textarea
                      value={newMaterial.description}
                      onChange={(e) => setNewMaterial({...newMaterial, description: e.target.value})}
                      placeholder="Nhập mô tả tài liệu"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Loại tài liệu
                      </label>
                      <select
                        value={newMaterial.type}
                        onChange={(e) => setNewMaterial({...newMaterial, type: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {materialTypes.map(type => (
                          <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cấp độ
                      </label>
                      <select
                        value={newMaterial.level}
                        onChange={(e) => setNewMaterial({...newMaterial, level: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {levels.map(level => (
                          <option key={level.id} value={level.id}>{level.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Danh mục
                    </label>
                    <select
                      value={newMaterial.category}
                      onChange={(e) => setNewMaterial({...newMaterial, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL tài liệu
                    </label>
                    <Input
                      type="text"
                      value={newMaterial.fileUrl}
                      onChange={(e) => setNewMaterial({...newMaterial, fileUrl: e.target.value})}
                      placeholder="Nhập URL tài liệu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kích thước file
                    </label>
                    <Input
                      type="text"
                      value={newMaterial.fileSize}
                      onChange={(e) => setNewMaterial({...newMaterial, fileSize: e.target.value})}
                      placeholder="VD: 2.5 MB"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingMaterial(null);
                      setNewMaterial({
                        title: '',
                        description: '',
                        type: 'document',
                        level: 'beginner',
                        category: 'grammar',
                        fileUrl: '',
                        fileSize: '',
                        downloads: 0,
                        status: 'active'
                      });
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    variant="primary"
                    onClick={editingMaterial ? handleUpdateMaterial : handleAddMaterial}
                  >
                    {editingMaterial ? 'Cập nhật' : 'Thêm'}
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

export default MaterialsManagement; 