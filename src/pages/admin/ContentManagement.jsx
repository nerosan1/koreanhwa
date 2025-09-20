import React, { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash, 
  Eye,
  Upload,
  Play,
  Clock,
  Users
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  LineChart, 
  Line,
  AreaChart,
  Area,
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
import { useNavigate } from 'react-router-dom';

const ContentManagement = () => {
    const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');

  // Mock content data
  const contents = [
    {
      id: 1,
      title: 'Bài 1: Chào hỏi cơ bản',
      type: 'video',
      level: 'beginner',
      duration: '15:30',
      views: 1250,
      uploadDate: '2024-01-15',
      status: 'published',
      thumbnail: 'https://via.placeholder.com/120x80',
      description: 'Học cách chào hỏi cơ bản trong tiếng Hàn',
      price: 15, // điểm
      originalPrice: 20,
      isFree: false,
      pointsRequired: 15
    },
    {
      id: 2,
      title: 'Từ vựng: Gia đình',
      type: 'vocabulary',
      level: 'beginner',
      duration: '8:45',
      views: 890,
      uploadDate: '2024-01-14',
      status: 'published',
      thumbnail: 'https://via.placeholder.com/120x80',
      description: 'Từ vựng về các thành viên trong gia đình',
      price: 10, // điểm
      originalPrice: 15,
      isFree: false,
      pointsRequired: 10
    },
    {
      id: 3,
      title: 'Ngữ pháp: Thì hiện tại',
      type: 'grammar',
      level: 'intermediate',
      duration: '22:15',
      views: 567,
      uploadDate: '2024-01-13',
      status: 'draft',
      thumbnail: 'https://via.placeholder.com/120x80',
      description: 'Học cách sử dụng thì hiện tại trong tiếng Hàn',
      price: 25, // điểm
      originalPrice: 30,
      isFree: false,
      pointsRequired: 25
    },
    {
      id: 4,
      title: 'Bài tập: Luyện nghe',
      type: 'exercise',
      level: 'advanced',
      duration: '12:30',
      views: 234,
      uploadDate: '2024-01-12',
      status: 'published',
      thumbnail: 'https://via.placeholder.com/120x80',
      description: 'Bài tập luyện kỹ năng nghe hiểu',
      price: 0, // miễn phí
      originalPrice: 0,
      isFree: true,
      pointsRequired: 0
    },
    {
      id: 5,
      title: 'Video phát âm chuẩn',
      type: 'video',
      level: 'intermediate',
      duration: '18:20',
      views: 2100,
      uploadDate: '2024-01-10',
      status: 'published',
      thumbnail: 'https://via.placeholder.com/120x80',
      description: 'Hướng dẫn phát âm chuẩn tiếng Hàn',
      price: 20, // điểm
      originalPrice: 25,
      isFree: false,
      pointsRequired: 20
    },
    {
      id: 6,
      title: 'Từ vựng: Du lịch',
      type: 'vocabulary',
      level: 'intermediate',
      duration: '12:15',
      views: 1500,
      uploadDate: '2024-01-08',
      status: 'published',
      thumbnail: 'https://via.placeholder.com/120x80',
      description: 'Từ vựng về du lịch và giao thông',
      price: 18, // điểm
      originalPrice: 22,
      isFree: false,
      pointsRequired: 18
    }
  ];

  // Chart data
  const contentTypeData = [
    { type: 'Video', count: 45, views: 12500, color: '#0088FE' },
    { type: 'Từ vựng', count: 38, views: 8900, color: '#00C49F' },
    { type: 'Ngữ pháp', count: 32, views: 6700, color: '#FFBB28' },
    { type: 'Bài tập', count: 25, views: 4200, color: '#FF8042' },
    { type: 'Văn hóa', count: 16, views: 2800, color: '#8884D8' }
  ];

  const contentLevelData = [
    { level: 'Cơ bản', count: 52, percentage: 33.3 },
    { level: 'Trung cấp', count: 68, percentage: 43.6 },
    { level: 'Nâng cao', count: 36, percentage: 23.1 }
  ];

  const monthlyUploads = [
    { month: 'Jan', uploads: 12, views: 8500 },
    { month: 'Feb', uploads: 15, views: 9200 },
    { month: 'Mar', uploads: 18, views: 10800 },
    { month: 'Apr', uploads: 14, views: 9500 },
    { month: 'May', uploads: 20, views: 12500 },
    { month: 'Jun', uploads: 16, views: 11000 }
  ];

  const weeklyViews = [
    { day: 'T2', views: 1200, uploads: 3 },
    { day: 'T3', views: 1350, uploads: 2 },
    { day: 'T4', views: 1280, uploads: 4 },
    { day: 'T5', views: 1420, uploads: 1 },
    { day: 'T6', views: 1380, uploads: 3 },
    { day: 'T7', views: 1560, uploads: 2 },
    { day: 'CN', views: 1450, uploads: 1 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const getTypeBadge = (type) => {
    const typeConfig = {
      video: { color: 'bg-blue-100 text-blue-800', label: 'Video', icon: Video },
      vocabulary: { color: 'bg-green-100 text-green-800', label: 'Từ vựng', icon: FileText },
      grammar: { color: 'bg-purple-100 text-purple-800', label: 'Ngữ pháp', icon: BookOpen },
      exercise: { color: 'bg-orange-100 text-orange-800', label: 'Bài tập', icon: Play }
    };
    const config = typeConfig[type] || typeConfig.video;
    const IconComponent = config.icon;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color} flex items-center space-x-1`}>
        <IconComponent className="w-3 h-3" />
        <span>{config.label}</span>
      </span>
    );
  };

  const getLevelBadge = (level) => {
    const levelConfig = {
      beginner: { color: 'bg-green-100 text-green-800', label: 'Cơ bản' },
      intermediate: { color: 'bg-yellow-100 text-yellow-800', label: 'Trung cấp' },
      advanced: { color: 'bg-red-100 text-red-800', label: 'Nâng cao' }
    };
    const config = levelConfig[level] || levelConfig.beginner;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { color: 'bg-green-100 text-green-800', label: 'Đã xuất bản' },
      draft: { color: 'bg-gray-100 text-gray-800', label: 'Bản nháp' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Chờ duyệt' }
    };
    const config = statusConfig[status] || statusConfig.draft;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Thêm state quản lý contents thay vì const
  const [contentList, setContentList] = useState(contents);

  const filteredContents = contentList.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || content.type === filterType;
    const matchesLevel = filterLevel === 'all' || content.level === filterLevel;
    return matchesSearch && matchesType && matchesLevel;
  });
// Hàm xóa
    const handleDeleteContent = (id) => {
      if (window.confirm("Bạn có chắc chắn muốn xóa nội dung này?")) {
        setContentList(prev => prev.filter(c => c.id !== id));
      }
    };

    // Hàm sửa
    const handleEditContent = () => {
      navigate('/admin/content/update');
    };


  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý nội dung bài học</h1>
            <p className="text-gray-600">Quản lý video, từ vựng, bài tập và tài liệu học tập</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
            <Button onClick={()=> navigate('/admin/content/create')} variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Tạo nội dung mới
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Video className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Tổng nội dung</p>
                <p className="text-lg font-semibold text-gray-900">{contents.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Play className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Đã xuất bản</p>
                <p className="text-lg font-semibold text-gray-900">
                  {contents.filter(c => c.status === 'published').length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Bản nháp</p>
                <p className="text-lg font-semibold text-gray-900">
                  {contents.filter(c => c.status === 'draft').length}
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
                <p className="text-sm text-gray-500">Tổng lượt xem</p>
                <p className="text-lg font-semibold text-gray-900">
                  {contents.reduce((sum, c) => sum + c.views, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content Type Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố loại nội dung</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, count }) => `${type}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Content Level Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố theo cấp độ</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={contentLevelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="level" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Monthly Uploads and Views */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload và lượt xem hàng tháng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyUploads}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="uploads" 
                stackId="1" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.6}
                name="Số lượng upload"
              />
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="views" 
                stackId="2" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                fillOpacity={0.6}
                name="Lượt xem"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Weekly Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động tuần</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyViews}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="views" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="Lượt xem"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="uploads" 
                stroke="#82ca9d" 
                strokeWidth={2}
                name="Upload mới"
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
                  placeholder="Tìm theo tiêu đề hoặc mô tả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loại nội dung</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả loại</option>
                <option value="video">Video</option>
                <option value="vocabulary">Từ vựng</option>
                <option value="grammar">Ngữ pháp</option>
                <option value="exercise">Bài tập</option>
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
                <option value="beginner">Cơ bản</option>
                <option value="intermediate">Trung cấp</option>
                <option value="advanced">Nâng cao</option>
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

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContents.map((content) => (
            <Card key={content.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={content.thumbnail} 
                  alt={content.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 left-2">
                  {getTypeBadge(content.type)}
                </div>
                <div className="absolute top-2 right-2">
                  {getLevelBadge(content.level)}
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {content.duration}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {content.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {content.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{content.views.toLocaleString()} lượt xem</span>
                    <span>{content.uploadDate}</span>
                  </div>
                  {getStatusBadge(content.status)}
                </div>
                
                {/* Pricing */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {content.isFree ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Miễn phí
                      </span>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-blue-600">
                          {content.price} điểm
                        </span>
                        {content.originalPrice > content.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {content.originalPrice} điểm
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    Cần {content.pointsRequired} điểm
                  </div>
                </div>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {/* Eye - disable */}
                      <button
                        disabled
                        className="text-gray-400 cursor-not-allowed"
                        title="Không thể xem trực tiếp"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => handleEditContent()}
                        className="text-green-600 hover:text-green-900"
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteContent(content.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Xóa"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>

                    <Button variant="outline" size="sm">
                      <Play className="w-3 h-3 mr-1" />
                      Preview
                    </Button>
                  </div>

              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredContents.length === 0 && (
          <Card className="p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy nội dung</h3>
            <p className="text-gray-500 mb-4">Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác</p>
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Tạo nội dung mới
            </Button>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default ContentManagement; 