import React, { useState } from 'react';
import { 
  FolderOpen, 
  Download, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  FileText, 
  Video, 
  BookOpen, 
  Lock, 
  Unlock,
  Eye,
  BookMarked,
  TrendingUp,
  Calendar,
  Tag,
  Award,
  CheckCircle
} from 'lucide-react';
import Card from '../../components/common/Card';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../components/layout/StudentLayout';

const MaterialsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [userPoints, setUserPoints] = useState(1250);

  const levels = [
    { id: 'all', name: 'Tất cả cấp độ' },
    { id: 'beginner', name: 'Sơ cấp' },
    { id: 'intermediate', name: 'Trung cấp' },
    { id: 'advanced', name: 'Cao cấp' }
  ];

  const skills = [
    { id: 'all', name: 'Tất cả kỹ năng' },
    { id: 'listening', name: 'Nghe' },
    { id: 'speaking', name: 'Nói' },
    { id: 'reading', name: 'Đọc' },
    { id: 'writing', name: 'Viết' }
  ];

  const types = [
    { id: 'all', name: 'Tất cả loại' },
    { id: 'pdf', name: 'PDF' },
    { id: 'video', name: 'Video' },
    { id: 'audio', name: 'Audio' },
    { id: 'lesson', name: 'Bài giảng' }
  ];

  const mockMaterials = [
    {
      id: 1,
      title: 'Từ vựng cơ bản TOPIK I',
      description: 'Bộ từ vựng cơ bản cho kỳ thi TOPIK I, bao gồm 500 từ thường gặp nhất',
      type: 'pdf',
      skill: 'vocabulary',
      level: 'beginner',
      points: 50,
      downloads: 1240,
      rating: 4.8,
      size: '2.5 MB',
      duration: null,
      thumbnail: '📚',
      isDownloaded: false,
      isFeatured: true
    },
    {
      id: 2,
      title: 'Luyện nghe cơ bản - Bài 1-10',
      description: '10 bài luyện nghe cơ bản với file audio và transcript',
      type: 'audio',
      skill: 'listening',
      level: 'beginner',
      points: 75,
      downloads: 890,
      rating: 4.6,
      size: '45 MB',
      duration: '2 giờ 30 phút',
      thumbnail: '🎧',
      isDownloaded: true,
      isFeatured: false
    },
    {
      id: 3,
      title: 'Ngữ pháp trung cấp - Phần 1',
      description: 'Tài liệu ngữ pháp trung cấp với ví dụ và bài tập',
      type: 'pdf',
      skill: 'grammar',
      level: 'intermediate',
      points: 100,
      downloads: 567,
      rating: 4.9,
      size: '3.2 MB',
      duration: null,
      thumbnail: '📖',
      isDownloaded: false,
      isFeatured: false
    },
    {
      id: 4,
      title: 'Video bài giảng - Giao tiếp hàng ngày',
      description: 'Video bài giảng về các tình huống giao tiếp thường gặp',
      type: 'video',
      skill: 'speaking',
      level: 'intermediate',
      points: 120,
      downloads: 432,
      rating: 4.7,
      size: '156 MB',
      duration: '1 giờ 45 phút',
      thumbnail: '🎥',
      isDownloaded: false,
      isFeatured: true
    },
    {
      id: 5,
      title: 'Bài tập viết TOPIK II',
      description: 'Bộ bài tập viết cho kỳ thi TOPIK II với đáp án chi tiết',
      type: 'pdf',
      skill: 'writing',
      level: 'advanced',
      points: 150,
      downloads: 234,
      rating: 4.5,
      size: '4.1 MB',
      duration: null,
      thumbnail: '✍️',
      isDownloaded: false,
      isFeatured: false
    },
    {
      id: 6,
      title: 'Audio luyện phát âm chuẩn',
      description: 'File audio luyện phát âm với hướng dẫn chi tiết',
      type: 'audio',
      skill: 'speaking',
      level: 'beginner',
      points: 60,
      downloads: 678,
      rating: 4.8,
      size: '28 MB',
      duration: '1 giờ 15 phút',
      thumbnail: '🎤',
      isDownloaded: false,
      isFeatured: false
    }
  ];

  const filteredMaterials = mockMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || material.level === selectedLevel;
    const matchesSkill = selectedSkill === 'all' || material.skill === selectedSkill;
    const matchesType = selectedType === 'all' || material.type === selectedType;
    
    return matchesSearch && matchesLevel && matchesSkill && matchesType;
  });

  const featuredMaterials = mockMaterials.filter(material => material.isFeatured);
  const downloadedMaterials = mockMaterials.filter(material => material.isDownloaded);

  const handleDownload = (material) => {
    if (userPoints >= material.points) {
      navigate(`/student/materials/detail`);
    } else {
      alert('Bạn không đủ điểm để tải tài liệu này!');
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'audio': return <BookOpen className="w-5 h-5" />;
      case 'lesson': return <BookMarked className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
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

  const renderMaterialCard = (material) => (
    <Card key={material.id} className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="text-4xl">{material.thumbnail}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{material.title}</h3>
            {material.isDownloaded && (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
          </div>
          <p className="text-gray-600 mb-3">{material.description}</p>
          
          <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillColor(material.skill)}`}>
              {skills.find(s => s.id === material.skill)?.name}
            </span>
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
              {levels.find(l => l.id === material.level)?.name}
            </span>
            <span className="flex items-center space-x-1">
              {getTypeIcon(material.type)}
              <span>{types.find(t => t.id === material.type)?.name}</span>
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <Download className="w-4 h-4" />
                <span>{material.downloads}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{material.rating}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{material.size}</span>
              </span>
              {material.duration && (
                <span className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{material.duration}</span>
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {material.isDownloaded ? (
                <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                  Đã tải
                </button>
              ) : (
                <button
                  onClick={() => handleDownload(material)}
                  disabled={userPoints < material.points}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                    userPoints >= material.points
                      ? 'bg-black text-white hover:bg-yellow-500'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {userPoints >= material.points ? (
                    <>
                      <Download className="w-4 h-4" />
                      <span>{material.points} điểm</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Thiếu {material.points - userPoints} điểm</span>
                    </>
                  )}
                </button>
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
            <h1 className="text-2xl font-bold text-gray-900">Tài liệu học tập</h1>
            <p className="text-gray-600">Tải về tài liệu học tập chất lượng cao</p>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-600" />
            <span className="text-lg font-semibold text-gray-900">{userPoints} điểm</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{mockMaterials.length}</p>
                <p className="text-sm text-gray-500">Tổng tài liệu</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Download className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{downloadedMaterials.length}</p>
                <p className="text-sm text-gray-500">Đã tải</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{featuredMaterials.length}</p>
                <p className="text-sm text-gray-500">Nổi bật</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.7</p>
                <p className="text-sm text-gray-500">Đánh giá TB</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Featured Materials */}
        {featuredMaterials.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tài liệu nổi bật</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {featuredMaterials.map(material => renderMaterialCard(material))}
            </div>
          </div>
        )}

        {/* Filters */}
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm tài liệu..."
                  className="w-full pl-10 pr-3 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cấp độ</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {levels.map(level => (
                  <option key={level.id} value={level.id}>{level.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kỹ năng</label>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {skills.map(skill => (
                  <option key={skill.id} value={skill.id}>{skill.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loại tài liệu</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {types.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
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

        {/* Materials List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Tất cả tài liệu</h2>
            <span className="text-sm text-gray-500">{filteredMaterials.length} tài liệu</span>
          </div>
          
          <div className="space-y-4">
            {filteredMaterials.map(material => renderMaterialCard(material))}
          </div>
        </div>

        {/* Empty State */}
        {filteredMaterials.length === 0 && (
          <Card className="p-8 text-center">
            <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy tài liệu</h3>
            <p className="text-gray-500 mb-4">Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác</p>
          </Card>
        )}

        {/* Downloaded Materials */}
        {downloadedMaterials.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tài liệu đã tải</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {downloadedMaterials.map(material => renderMaterialCard(material))}
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default MaterialsPage; 