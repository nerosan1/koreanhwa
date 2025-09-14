import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  Eye,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  Upload
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

const DictionaryManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingWord, setEditingWord] = useState(null);
  const [newWord, setNewWord] = useState({
    korean: '',
    vietnamese: '',
    english: '',
    pronunciation: '',
    level: 'beginner',
    category: 'general',
    example: '',
    status: 'approved'
  });

  // Mock dictionary data
  const [words, setWords] = useState([
    {
      id: 1,
      korean: '안녕하세요',
      vietnamese: 'Xin chào',
      english: 'Hello',
      pronunciation: 'an-nyeong-ha-se-yo',
      level: 'beginner',
      category: 'greetings',
      example: '안녕하세요, 만나서 반갑습니다.',
      status: 'approved',
      submittedBy: 'user123',
      submittedDate: '2024-01-15',
      approvedBy: 'admin',
      approvedDate: '2024-01-16',
      views: 1250,
      favorites: 45
    },
    {
      id: 2,
      korean: '감사합니다',
      vietnamese: 'Cảm ơn',
      english: 'Thank you',
      pronunciation: 'gam-sa-ham-ni-da',
      level: 'beginner',
      category: 'greetings',
      example: '도와주셔서 감사합니다.',
      status: 'approved',
      submittedBy: 'user456',
      submittedDate: '2024-01-14',
      approvedBy: 'admin',
      approvedDate: '2024-01-15',
      views: 980,
      favorites: 32
    },
    {
      id: 3,
      korean: '학생',
      vietnamese: 'Học sinh',
      english: 'Student',
      pronunciation: 'hak-saeng',
      level: 'beginner',
      category: 'education',
      example: '저는 한국어 학생입니다.',
      status: 'pending',
      submittedBy: 'user789',
      submittedDate: '2024-01-20',
      approvedBy: null,
      approvedDate: null,
      views: 0,
      favorites: 0
    },
    {
      id: 4,
      korean: '잘못된 단어',
      vietnamese: 'Từ sai',
      english: 'Wrong word',
      pronunciation: 'jal-mot-doen dan-eo',
      level: 'intermediate',
      category: 'general',
      example: '잘못된 예시입니다.',
      status: 'rejected',
      submittedBy: 'user999',
      submittedDate: '2024-01-19',
      approvedBy: 'admin',
      approvedDate: '2024-01-20',
      views: 5,
      favorites: 0
    }
  ]);

  // Chart data
  const wordLevelData = [
    { level: 'Cơ bản', count: 1250, color: '#00C49F' },
    { level: 'Trung cấp', count: 890, color: '#FFBB28' },
    { level: 'Nâng cao', count: 456, color: '#FF8042' }
  ];

  const categoryData = [
    { category: 'Greetings', count: 234, color: '#0088FE' },
    { category: 'Education', count: 189, color: '#00C49F' },
    { category: 'Food', count: 156, color: '#FFBB28' },
    { category: 'Family', count: 123, color: '#FF8042' },
    { category: 'Travel', count: 98, color: '#8884D8' },
    { category: 'General', count: 456, color: '#82CA9D' }
  ];

  const weeklySubmissions = [
    { week: 'Tuần 1', submissions: 45, approved: 38, rejected: 7 },
    { week: 'Tuần 2', submissions: 52, approved: 45, rejected: 7 },
    { week: 'Tuần 3', submissions: 38, approved: 32, rejected: 6 },
    { week: 'Tuần 4', submissions: 61, approved: 54, rejected: 7 },
    { week: 'Tuần 5', submissions: 48, approved: 42, rejected: 6 },
    { week: 'Tuần 6', submissions: 55, approved: 48, rejected: 7 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const levels = [
    { id: 'beginner', name: 'Cơ bản', color: 'bg-green-100 text-green-800' },
    { id: 'intermediate', name: 'Trung cấp', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'advanced', name: 'Nâng cao', color: 'bg-red-100 text-red-800' }
  ];

  const categories = [
    { id: 'greetings', name: 'Greetings', color: 'bg-blue-100 text-blue-800' },
    { id: 'education', name: 'Education', color: 'bg-green-100 text-green-800' },
    { id: 'food', name: 'Food', color: 'bg-orange-100 text-orange-800' },
    { id: 'family', name: 'Family', color: 'bg-purple-100 text-purple-800' },
    { id: 'travel', name: 'Travel', color: 'bg-pink-100 text-pink-800' },
    { id: 'general', name: 'General', color: 'bg-gray-100 text-gray-800' }
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

  const filteredWords = words.filter(word => {
    const matchesSearch = word.korean.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         word.vietnamese.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         word.english.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || word.level === filterLevel;
    const matchesStatus = filterStatus === 'all' || word.status === filterStatus;
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const handleAddWord = () => {
    if (newWord.korean && newWord.vietnamese && newWord.english) {
      const word = {
        id: words.length + 1,
        ...newWord,
        submittedBy: 'admin',
        submittedDate: new Date().toISOString().split('T')[0],
        approvedBy: newWord.status === 'approved' ? 'admin' : null,
        approvedDate: newWord.status === 'approved' ? new Date().toISOString().split('T')[0] : null,
        views: 0,
        favorites: 0
      };
      setWords([...words, word]);
      setNewWord({
        korean: '',
        vietnamese: '',
        english: '',
        pronunciation: '',
        level: 'beginner',
        category: 'general',
        example: '',
        status: 'approved'
      });
      setShowAddModal(false);
    }
  };

  const handleEditWord = (word) => {
    setEditingWord(word);
    setNewWord({
      korean: word.korean,
      vietnamese: word.vietnamese,
      english: word.english,
      pronunciation: word.pronunciation,
      level: word.level,
      category: word.category,
      example: word.example,
      status: word.status
    });
    setShowAddModal(true);
  };

  const handleUpdateWord = () => {
    if (editingWord && newWord.korean && newWord.vietnamese && newWord.english) {
      const updatedWords = words.map(word => 
        word.id === editingWord.id 
          ? { 
              ...word, 
              ...newWord, 
              approvedBy: newWord.status === 'approved' ? 'admin' : word.approvedBy,
              approvedDate: newWord.status === 'approved' ? new Date().toISOString().split('T')[0] : word.approvedDate
            }
          : word
      );
      setWords(updatedWords);
      setEditingWord(null);
      setNewWord({
        korean: '',
        vietnamese: '',
        english: '',
        pronunciation: '',
        level: 'beginner',
        category: 'general',
        example: '',
        status: 'approved'
      });
      setShowAddModal(false);
    }
  };

  const handleDeleteWord = (wordId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa từ này?')) {
      setWords(words.filter(word => word.id !== wordId));
    }
  };

  const handleApproveWord = (wordId) => {
    setWords(words.map(word => 
      word.id === wordId 
        ? { 
            ...word, 
            status: 'approved', 
            approvedBy: 'admin',
            approvedDate: new Date().toISOString().split('T')[0]
          }
        : word
    ));
  };

  const handleRejectWord = (wordId) => {
    setWords(words.map(word => 
      word.id === wordId 
        ? { 
            ...word, 
            status: 'rejected', 
            approvedBy: 'admin',
            approvedDate: new Date().toISOString().split('T')[0]
          }
        : word
    ));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý từ điển</h1>
            <p className="text-gray-600">Cập nhật từ mới, duyệt từ gửi lên</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm từ mới
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Tổng từ vựng</p>
                <p className="text-lg font-semibold text-gray-900">{words.length}</p>
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
                  {words.filter(w => w.status === 'approved').length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Eye className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Chờ duyệt</p>
                <p className="text-lg font-semibold text-gray-900">
                  {words.filter(w => w.status === 'pending').length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Tổng lượt xem</p>
                <p className="text-lg font-semibold text-gray-900">
                  {words.reduce((sum, word) => sum + word.views, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Word Level Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố theo cấp độ</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={wordLevelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ level, count }) => `${level}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {wordLevelData.map((entry, index) => (
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

        {/* Weekly Submissions Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Đăng ký và duyệt hàng tuần</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklySubmissions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="submissions" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="Đăng ký"
              />
              <Line 
                type="monotone" 
                dataKey="approved" 
                stroke="#82ca9d" 
                strokeWidth={2}
                name="Đã duyệt"
              />
              <Line 
                type="monotone" 
                dataKey="rejected" 
                stroke="#ff8042" 
                strokeWidth={2}
                name="Từ chối"
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
                  placeholder="Tìm theo từ tiếng Hàn, Việt, Anh..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-1" />
                Lọc
              </Button>
            </div>
          </div>
        </Card>

        {/* Words Table */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Danh sách từ vựng</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Từ vựng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nghĩa
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
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredWords.map((word) => (
                  <tr key={word.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="text-sm font-medium text-gray-900">{word.korean}</div>
                          <div className="text-xs text-gray-500">{word.pronunciation}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900">{word.vietnamese}</div>
                        <div className="text-xs text-gray-500">{word.english}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getLevelBadge(word.level)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getCategoryBadge(word.category)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{word.views} lượt xem</div>
                      <div className="text-xs text-gray-500">{word.favorites} yêu thích</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(word.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEditWord(word)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {word.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproveWord(word.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRejectWord(word.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDeleteWord(word.id)}
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
                  {editingWord ? 'Chỉnh sửa từ vựng' : 'Thêm từ vựng mới'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Từ tiếng Hàn
                    </label>
                    <Input
                      type="text"
                      value={newWord.korean}
                      onChange={(e) => setNewWord({...newWord, korean: e.target.value})}
                      placeholder="Nhập từ tiếng Hàn"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nghĩa tiếng Việt
                    </label>
                    <Input
                      type="text"
                      value={newWord.vietnamese}
                      onChange={(e) => setNewWord({...newWord, vietnamese: e.target.value})}
                      placeholder="Nhập nghĩa tiếng Việt"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nghĩa tiếng Anh
                    </label>
                    <Input
                      type="text"
                      value={newWord.english}
                      onChange={(e) => setNewWord({...newWord, english: e.target.value})}
                      placeholder="Nhập nghĩa tiếng Anh"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phát âm
                    </label>
                    <Input
                      type="text"
                      value={newWord.pronunciation}
                      onChange={(e) => setNewWord({...newWord, pronunciation: e.target.value})}
                      placeholder="Nhập phát âm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cấp độ
                      </label>
                      <select
                        value={newWord.level}
                        onChange={(e) => setNewWord({...newWord, level: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {levels.map(level => (
                          <option key={level.id} value={level.id}>{level.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Danh mục
                      </label>
                      <select
                        value={newWord.category}
                        onChange={(e) => setNewWord({...newWord, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ví dụ
                    </label>
                    <textarea
                      value={newWord.example}
                      onChange={(e) => setNewWord({...newWord, example: e.target.value})}
                      placeholder="Nhập ví dụ sử dụng"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingWord(null);
                      setNewWord({
                        korean: '',
                        vietnamese: '',
                        english: '',
                        pronunciation: '',
                        level: 'beginner',
                        category: 'general',
                        example: '',
                        status: 'approved'
                      });
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    variant="primary"
                    onClick={editingWord ? handleUpdateWord : handleAddWord}
                  >
                    {editingWord ? 'Cập nhật' : 'Thêm'}
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

export default DictionaryManagement; 