import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  Eye,
  ThumbsUp,
  MessageCircle,
  Flag,
  Pin,
  CheckCircle,
  XCircle,
  Filter
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
import AdminLayout from '../../components/layout/AdminLayout';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const ForumManagement = () => {
    const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Mock forum data
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Cách học từ vựng hiệu quả',
      author: 'Nguyễn Văn A',
      authorId: 1,
      category: 'study_tips',
      content: 'Chia sẻ kinh nghiệm học từ vựng tiếng Hàn hiệu quả...',
      likes: 45,
      comments: 12,
      views: 234,
      status: 'approved',
      isPinned: true,
      isReported: false,
      createdAt: '2024-01-15',
      lastActivity: '2024-01-20 14:30'
    },
    {
      id: 2,
      title: 'Tài liệu luyện thi TOPIK',
      author: 'Trần Thị B',
      authorId: 2,
      category: 'resources',
      content: 'Tổng hợp tài liệu luyện thi TOPIK từ cơ bản đến nâng cao...',
      likes: 67,
      comments: 23,
      views: 456,
      status: 'pending',
      isPinned: false,
      isReported: false,
      createdAt: '2024-01-18',
      lastActivity: '2024-01-19 16:45'
    },
    {
      id: 3,
      title: 'Thắc mắc về ngữ pháp',
      author: 'Lê Văn C',
      authorId: 3,
      category: 'grammar',
      content: 'Mình có thắc mắc về cách sử dụng thì trong tiếng Hàn...',
      likes: 23,
      comments: 8,
      views: 123,
      status: 'approved',
      isPinned: false,
      isReported: true,
      createdAt: '2024-01-16',
      lastActivity: '2024-01-18 09:15'
    },
    {
      id: 4,
      title: 'Spam content',
      author: 'Spam User',
      authorId: 999,
      category: 'spam',
      content: 'Buy cheap products now...',
      likes: 0,
      comments: 0,
      views: 5,
      status: 'rejected',
      isPinned: false,
      isReported: true,
      createdAt: '2024-01-20',
      lastActivity: '2024-01-20 10:00'
    }
  ]);

  // Chart data
  const postStatusData = [
    { status: 'Đã duyệt', count: 156, color: '#00C49F' },
    { status: 'Chờ duyệt', count: 23, color: '#FFBB28' },
    { status: 'Từ chối', count: 8, color: '#FF8042' },
    { status: 'Bị báo cáo', count: 5, color: '#FF0000' }
  ];

  const categoryData = [
    { category: 'Study Tips', count: 45, color: '#0088FE' },
    { category: 'Resources', count: 38, color: '#00C49F' },
    { category: 'Grammar', count: 32, color: '#FFBB28' },
    { category: 'Vocabulary', count: 28, color: '#FF8042' },
    { category: 'Culture', count: 15, color: '#8884D8' }
  ];

  const weeklyActivityData = [
    { day: 'T2', posts: 12, comments: 45, reports: 2 },
    { day: 'T3', posts: 15, comments: 52, reports: 1 },
    { day: 'T4', posts: 18, comments: 67, reports: 3 },
    { day: 'T5', posts: 14, comments: 48, reports: 1 },
    { day: 'T6', posts: 20, comments: 73, reports: 4 },
    { day: 'T7', posts: 16, comments: 58, reports: 2 },
    { day: 'CN', posts: 13, comments: 42, reports: 1 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const categories = [
    { id: 'study_tips', name: 'Study Tips', color: 'bg-blue-100 text-blue-800' },
    { id: 'resources', name: 'Resources', color: 'bg-green-100 text-green-800' },
    { id: 'grammar', name: 'Grammar', color: 'bg-purple-100 text-purple-800' },
    { id: 'vocabulary', name: 'Vocabulary', color: 'bg-orange-100 text-orange-800' },
    { id: 'culture', name: 'Culture', color: 'bg-pink-100 text-pink-800' },
    { id: 'spam', name: 'Spam', color: 'bg-red-100 text-red-800' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: { color: 'bg-green-100 text-green-800', label: 'Đã duyệt' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Chờ duyệt' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Từ chối' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
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

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleApprovePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, status: 'approved', lastActivity: new Date().toISOString().split('T')[0] }
        : post
    ));
  };

  const handleRejectPost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, status: 'rejected', lastActivity: new Date().toISOString().split('T')[0] }
        : post
    ));
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const handleTogglePin = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isPinned: !post.isPinned }
        : post
    ));
  };

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý diễn đàn</h1>
            <p className="text-gray-600">Duyệt bài, xoá vi phạm, ghim nổi bật</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Flag className="w-4 h-4 mr-2" />
              Báo cáo vi phạm
            </Button>
            <Button onClick={()=> navigate('/admin/forum/create')}   variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Tạo bài viết
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Tổng bài viết</p>
                <p className="text-lg font-semibold text-gray-900">{posts.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Đã duyệt</p>
                <p className="text-lg font-semibold text-gray-900">
                  {posts.filter(p => p.status === 'approved').length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <MessageCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Chờ duyệt</p>
                <p className="text-lg font-semibold text-gray-900">
                  {posts.filter(p => p.status === 'pending').length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Flag className="w-5 h-5 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Bị báo cáo</p>
                <p className="text-lg font-semibold text-gray-900">
                  {posts.filter(p => p.isReported).length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Post Status Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trạng thái bài viết</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={postStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, count }) => `${status}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {postStatusData.map((entry, index) => (
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

        {/* Weekly Activity Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động tuần</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="posts" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="Bài viết"
              />
              <Line 
                type="monotone" 
                dataKey="comments" 
                stroke="#82ca9d" 
                strokeWidth={2}
                name="Bình luận"
              />
              <Line 
                type="monotone" 
                dataKey="reports" 
                stroke="#ff8042" 
                strokeWidth={2}
                name="Báo cáo"
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
                  placeholder="Tìm theo tiêu đề hoặc tác giả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="approved">Đã duyệt</option>
                <option value="pending">Chờ duyệt</option>
                <option value="rejected">Từ chối</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả danh mục</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
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

        {/* Posts Table */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Danh sách bài viết</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bài viết
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tác giả
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Danh mục
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tương tác
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-medium text-gray-900">{post.title}</h4>
                            {post.isPinned && (
                              <Pin className="w-4 h-4 text-yellow-500" />
                            )}
                            {post.isReported && (
                              <Flag className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {post.content}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{post.author}</div>
                      <div className="text-xs text-gray-500">ID: {post.authorId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getCategoryBadge(post.category)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {post.likes}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.comments}
                        </div>
                        <div>{post.views} lượt xem</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(post.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {post.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleViewPost(post)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {post.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprovePost(post.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRejectPost(post.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleTogglePin(post.id)}
                          className={`${post.isPinned ? 'text-yellow-600' : 'text-gray-600'} hover:text-yellow-900`}
                        >
                          <Pin className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
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

        {/* Post Detail Modal */}
        {showPostModal && selectedPost && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-3/4 max-w-4xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Chi tiết bài viết</h3>
                  <button
                    onClick={() => setShowPostModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{selectedPost.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span>Tác giả: {selectedPost.author}</span>
                      <span>Danh mục: {getCategoryBadge(selectedPost.category)}</span>
                      <span>Ngày tạo: {selectedPost.createdAt}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{selectedPost.content}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>❤️ {selectedPost.likes}</span>
                      <span>💬 {selectedPost.comments}</span>
                      <span>👁️ {selectedPost.views}</span>
                    </div>
                    <div className="flex space-x-2">
                      {selectedPost.status === 'pending' && (
                        <>
                          <Button variant="primary" size="sm" onClick={() => handleApprovePost(selectedPost.id)}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Duyệt
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleRejectPost(selectedPost.id)}>
                            <XCircle className="w-4 h-4 mr-1" />
                            Từ chối
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm" onClick={() => setShowPostModal(false)}>
                        Đóng
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ForumManagement; 