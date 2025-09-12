import React, { useState } from 'react';
import { 
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
import Card from '../../components/common/Card';
import StudentLayout from '../../components/layout/StudentLayout';

const ManageBlog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'learning', name: 'Học tập' },
    { id: 'culture', name: 'Văn hóa' },
    { id: 'grammar', name: 'Ngữ pháp' },
    { id: 'vocabulary', name: 'Từ vựng' },
    { id: 'tips', name: 'Mẹo học' },
  ];

  const mockBlogs = [
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
  ];

  const filteredBlogs = mockBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id) => {
    // Simulate delete action
    console.log(`Deleted blog with id: ${id}`);
  };

  const handleEdit = (id) => {
    // Simulate edit navigation
    console.log(`Editing blog with id: ${id}`);
  };

  return (
    <StudentLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-8 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-teal-400/20 to-lime-400/20 rounded-full blur-2xl animate-bounce"></div>

        <div className="relative z-10 max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Quản lý Blog Của Bạn
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Xem và quản lý các bài viết của bạn</p>
            </div>
            <button 
              onClick={() => console.log('Navigate to create blog')}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Tạo bài viết mới</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{mockBlogs.length}</p>
                  <p className="text-sm text-gray-500">Tổng bài viết</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-lime-500 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{mockBlogs.reduce((sum, blog) => sum + blog.views, 0)}</p>
                  <p className="text-sm text-gray-500">Lượt xem</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
                  <Tag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{mockBlogs.reduce((sum, blog) => sum + blog.tags.length, 0)}</p>
                  <p className="text-sm text-gray-500">Tổng thẻ</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Filters */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tìm kiếm</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm bài viết..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Danh mục</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
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
                <Card key={blog.id} className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{blog.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
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
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleEdit(blog.id)}
                        className="p-2 text-gray-400 hover:text-green-600 rounded-full hover:bg-green-100 transition-all duration-300"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-100 transition-all duration-300"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl text-center shadow-lg animate-fadeIn">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Không có bài viết</h3>
                <p className="text-gray-500 mb-4">Hãy tạo bài viết đầu tiên của bạn!</p>
                <button
                  onClick={() => console.log('Navigate to create blog')}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Tạo bài viết mới
                </button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default ManageBlog;