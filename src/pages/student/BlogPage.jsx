import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Heart, 
  MessageCircle, 
  Share, 
  MoreHorizontal,
  User,
  Calendar,
  Tag,
  Eye,
  ThumbsUp,
  Smile,
  Edit,
  Trash,
  BookOpen,
  Headphones,
  PenTool,
  Mic
} from 'lucide-react';
import Card from '../../components/common/Card';
import StudentLayout from '../../components/layout/StudentLayout';

const BlogPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const skills = [
    { id: 'all', name: 'Tất cả kỹ năng' },
    { id: 'listening', name: 'Nghe' },
    { id: 'speaking', name: 'Nói' },
    { id: 'reading', name: 'Đọc' },
    { id: 'writing', name: 'Viết' },
    { id: 'vocabulary', name: 'Từ vựng' },
    { id: 'grammar', name: 'Ngữ pháp' }
  ];

  const tabs = [
    { id: 'all', name: 'Tất cả bài viết' },
    { id: 'my', name: 'Bài viết của tôi' },
    { id: 'favorites', name: 'Yêu thích' }
  ];

  const mockPosts = [
    {
      id: 1,
      title: 'Cách học từ vựng hiệu quả cho người mới bắt đầu',
      content: 'Học từ vựng tiếng Hàn có thể là một thách thức lớn đối với người mới bắt đầu. Trong bài viết này, tôi sẽ chia sẻ những phương pháp học từ vựng hiệu quả mà tôi đã áp dụng...',
      author: {
        name: 'Nguyễn Thị Anh',
        avatar: 'A',
        level: 'Trung cấp 1'
      },
      skill: 'vocabulary',
      likes: 45,
      comments: 12,
      views: 234,
      date: '2024-01-20',
      tags: ['từ vựng', 'học tập', 'kinh nghiệm'],
      isLiked: false,
      isMyPost: false
    },
    {
      id: 2,
      title: 'Kinh nghiệm luyện nghe TOPIK I',
      content: 'Sau khi thi đạt TOPIK I với điểm số 180/200, tôi muốn chia sẻ những kinh nghiệm luyện nghe hiệu quả. Điều quan trọng nhất là phải luyện tập thường xuyên...',
      author: {
        name: 'Lê Văn Bình',
        avatar: 'B',
        level: 'Sơ cấp 3'
      },
      skill: 'listening',
      likes: 67,
      comments: 23,
      views: 456,
      date: '2024-01-19',
      tags: ['TOPIK', 'luyện nghe', 'kinh nghiệm'],
      isLiked: true,
      isMyPost: false
    },
    {
      id: 3,
      title: 'Phương pháp học ngữ pháp tiếng Hàn',
      content: 'Ngữ pháp tiếng Hàn có thể phức tạp, nhưng với phương pháp đúng, bạn có thể nắm vững nhanh chóng. Tôi sẽ chia sẻ cách học ngữ pháp hiệu quả...',
      author: {
        name: 'Trần Minh Cường',
        avatar: 'C',
        level: 'Trung cấp 2'
      },
      skill: 'grammar',
      likes: 34,
      comments: 8,
      views: 189,
      date: '2024-01-18',
      tags: ['ngữ pháp', 'học tập'],
      isLiked: false,
      isMyPost: true
    },
    {
      id: 4,
      title: 'Cách luyện phát âm chuẩn như người Hàn',
      content: 'Phát âm là một trong những kỹ năng quan trọng nhất khi học tiếng Hàn. Trong bài viết này, tôi sẽ hướng dẫn cách luyện phát âm chuẩn...',
      author: {
        name: 'Phạm Thị Dung',
        avatar: 'D',
        level: 'Sơ cấp 2'
      },
      skill: 'speaking',
      likes: 89,
      comments: 31,
      views: 567,
      date: '2024-01-17',
      tags: ['phát âm', 'nói', 'kinh nghiệm'],
      isLiked: false,
      isMyPost: false
    }
  ];

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkill === 'all' || post.skill === selectedSkill;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'my' && post.isMyPost) ||
                      (activeTab === 'favorites' && post.isLiked);
    
    return matchesSearch && matchesSkill && matchesTab;
  });

  const getSkillIcon = (skill) => {
    switch (skill) {
      case 'listening': return <Headphones className="w-4 h-4" />;
      case 'speaking': return <Mic className="w-4 h-4" />;
      case 'reading': return <BookOpen className="w-4 h-4" />;
      case 'writing': return <PenTool className="w-4 h-4" />;
      case 'vocabulary': return <FileText className="w-4 h-4" />;
      case 'grammar': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getSkillColor = (skill) => {
    switch (skill) {
      case 'listening': return 'text-blue-600 bg-blue-100';
      case 'speaking': return 'text-green-600 bg-green-100';
      case 'reading': return 'text-purple-600 bg-purple-100';
      case 'writing': return 'text-orange-600 bg-orange-100';
      case 'vocabulary': return 'text-pink-600 bg-pink-100';
      case 'grammar': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderPostCard = (post) => (
    <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold">{post.author.avatar}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{post.title}</h3>
              <div className="flex items-center space-x-3 text-sm text-gray-500 mb-2">
                <span className="font-medium">{post.author.name}</span>
                <span>•</span>
                <span>{post.author.level}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getSkillColor(post.skill)}`}>
                {getSkillIcon(post.skill)}
                <span>{skills.find(s => s.id === post.skill)?.name}</span>
              </span>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
          
          <div className="flex items-center space-x-4 mb-3">
            {post.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                #{tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <button className="flex items-center space-x-1 hover:text-red-500">
                <Heart className={`w-4 h-4 ${post.isLiked ? 'text-red-500 fill-current' : ''}`} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-500">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </button>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Share className="w-4 h-4" />
              </button>
              {post.isMyPost && (
                <>
                  <button className="p-2 text-gray-400 hover:text-blue-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600">
                    <Trash className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Blog học viên</h1>
            <p className="text-gray-600">Chia sẻ kinh nghiệm học tập và kết nối với cộng đồng</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo bài viết</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{mockPosts.length}</p>
                <p className="text-sm text-gray-500">Tổng bài viết</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-gray-500">Bài viết của tôi</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1</p>
                <p className="text-sm text-gray-500">Bài yêu thích</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Eye className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1,446</p>
                <p className="text-sm text-gray-500">Lượt xem</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm bài viết..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kỹ năng</label>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {skills.map(skill => (
                  <option key={skill.id} value={skill.id}>{skill.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Lọc</span>
              </button>
            </div>
          </div>
        </Card>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map(post => renderPostCard(post))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <Card className="p-8 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy bài viết</h3>
            <p className="text-gray-500 mb-4">Thử thay đổi bộ lọc hoặc tạo bài viết đầu tiên</p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Tạo bài viết đầu tiên
            </button>
          </Card>
        )}

        {/* Create Post Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Tạo bài viết mới</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                  <input
                    type="text"
                    placeholder="Nhập tiêu đề bài viết..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kỹ năng</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {skills.slice(1).map(skill => (
                      <option key={skill.id} value={skill.id}>{skill.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                  <textarea
                    rows="8"
                    placeholder="Viết nội dung bài viết của bạn..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <input
                    type="text"
                    placeholder="Nhập tags, phân cách bằng dấu phẩy..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Đăng bài
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default BlogPage; 