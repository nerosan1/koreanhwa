import React, { useState } from 'react';
import { 
  ArrowLeft,
  Award,
  FileText, 
  Edit, 
  Trash, 
  Eye, 
  Plus, 
  Search, 
  Filter, 
  User,
  Calendar,
  Tag
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Card = ({ children, className = "" }) => {
  return <div className={`shadow-lg ${className}`}>{children}</div>;
};

const ManageBlog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Phương pháp học từ vựng hiệu quả',
      category: 'vocabulary',
      date: '2025-08-01',
      views: 120,
      tags: ['từ vựng', 'học tập'],
    },
    {
      id: 2,
      title: 'Văn hóa Hàn Quốc qua phim ảnh',
      category: 'culture',
      date: '2025-07-28',
      views: 85,
      tags: ['văn hóa', 'phim'],
    },
    {
      id: 3,
      title: 'Ngữ pháp cơ bản cho người mới',
      category: 'grammar',
      date: '2025-07-15',
      views: 200,
      tags: ['ngữ pháp', 'sơ cấp'],
    },
  ]);

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'learning', name: 'Học tập' },
    { id: 'culture', name: 'Văn hóa' },
    { id: 'grammar', name: 'Ngữ pháp' },
    { id: 'vocabulary', name: 'Từ vựng' },
    { id: 'tips', name: 'Mẹo học' },
  ];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  const handleEdit = (id) => {
    console.log(`Editing blog with id: ${id}`);
  };

  return (
      <div className="min-h-screen bg-gray-900  relative">
        <div onClick={() => navigate(-1)} className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ArrowLeft 
              className="w-6 h-6 text-white cursor-pointer" 
            />
            <span className="text-lg text-white font-medium">Quay lại</span>
          </div>
      </div>
        <div className="relative z-10 max-w-6xl mx-auto space-y-8 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-yellow-400">
                Quản lý Blog Của Bạn
              </h1>
              <p className="text-gray-400 mt-2 text-lg">Xem và quản lý các bài viết của bạn</p>
            </div>
            <button 
              onClick={() => console.log('Navigate to create blog')}
              className="flex items-center space-x-2 px-6 py-3 bg-yellow-600 text-white font-semibold rounded-2xl hover:bg-yellow-700 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Tạo bài viết mới</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 bg-gray-800 rounded-2xl hover:shadow-xl transition-all duration-300 border border-yellow-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-400">{blogs.length}</p>
                  <p className="text-sm text-gray-400">Tổng bài viết</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-gray-800 rounded-2xl hover:shadow-xl transition-all duration-300 border border-yellow-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-400">{blogs.reduce((sum, blog) => sum + blog.views, 0)}</p>
                  <p className="text-sm text-gray-400">Lượt xem</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-gray-800 rounded-2xl hover:shadow-xl transition-all duration-300 border border-yellow-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                  <Tag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-400">{blogs.reduce((sum, blog) => sum + blog.tags.length, 0)}</p>
                  <p className="text-sm text-gray-400">Tổng thẻ</p>
                </div>
              </div>
            </Card>
             <Card className="p-6 bg-gray-800 rounded-2xl hover:shadow-xl transition-all duration-300 border border-yellow-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" /> {/* Thay Eye bằng Award để phù hợp với "điểm" */}
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-400">{blogs.reduce((sum) => sum + 10, 0)}</p> {/* Ví dụ: 10 điểm cho mỗi blog */}
                  <p className="text-sm text-gray-400">Tổng số điểm nhận được khi viết Blog</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Filters */}
          <Card className="p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Tìm kiếm</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm bài viết..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 bg-gray-900 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Danh mục</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 bg-gray-900 text-white"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          {/* Blog List */}
          <div className="space-y-6">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map(blog => (
                <Card key={blog.id} className="p-6 bg-gray-800 rounded-2xl hover:shadow-xl transition-all duration-300 border border-yellow-700 hover:border-yellow-600">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">{blog.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{new Date(blog.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          <span>{blog.views} lượt xem</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {blog.tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-700 text-yellow-400 text-xs rounded-full border border-yellow-800">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleEdit(blog.id)}
                        className="p-2 text-gray-400 hover:text-yellow-400 rounded-full hover:bg-yellow-900 transition-all duration-300"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 text-gray-400 hover:text-red-400 rounded-full hover:bg-red-900 transition-all duration-300"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 bg-gray-800 rounded-2xl text-center shadow-lg border border-yellow-700">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Không có bài viết</h3>
                <p className="text-gray-400 mb-4">Hãy tạo bài viết đầu tiên của bạn!</p>
                <button
                  onClick={() => console.log('Navigate to create blog')}
                  className="px-6 py-3 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Tạo bài viết mới
                </button>
              </Card>
            )}
          </div>
        </div>
      </div>

  );
};

export default ManageBlog;