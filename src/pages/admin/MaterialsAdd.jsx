import React, { useState } from 'react';
import { 
  FileText, 
  Upload,
  X,
  Save,
  ArrowLeft,
  Image,
  Video,
  Music,
  File,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const MaterialsAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'document',
    level: 'beginner',
    category: 'grammar',
    fileUrl: '',
    fileSize: '',
    tags: [],
    status: 'active'
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const materialTypes = [
    { id: 'document', name: 'Document', icon: FileText, color: 'bg-blue-100 text-blue-800' },
    { id: 'video', name: 'Video', icon: Video, color: 'bg-green-100 text-green-800' },
    { id: 'audio', name: 'Audio', icon: Music, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'image', name: 'Image', icon: Image, color: 'bg-purple-100 text-purple-800' }
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setFormData(prev => ({
        ...prev,
        fileSize: formatFileSize(file.size),
        fileUrl: file.name
      }));
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleTagAdd = (tag) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Tên tài liệu là bắt buộc';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Mô tả là bắt buộc';
    }
    
    if (!formData.fileUrl.trim()) {
      newErrors.fileUrl = 'File tài liệu là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsUploading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - redirect to materials management
      navigate('/admin/materials');
    } catch (error) {
      console.error('Error uploading material:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const getTypeIcon = (typeId) => {
    const type = materialTypes.find(t => t.id === typeId);
    return type ? type.icon : FileText;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/materials')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Thêm tài liệu mới</h1>
              <p className="text-gray-600">Upload và cấu hình tài liệu học tập</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin cơ bản</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên tài liệu *
                    </label>
                    <Input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Nhập tên tài liệu"
                      className={errors.title ? 'border-red-500' : ''}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Nhập mô tả chi tiết về tài liệu"
                      rows="4"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loại tài liệu
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {materialTypes.map(type => (
                          <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cấp độ
                      </label>
                      <select
                        value={formData.level}
                        onChange={(e) => handleInputChange('level', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {levels.map(level => (
                          <option key={level.id} value={level.id}>{level.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Danh mục
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </Card>

              {/* File Upload */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload tài liệu</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      File tài liệu *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx,.mp4,.mp3,.jpg,.jpeg,.png"
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <Upload className="w-12 h-12 text-gray-400 mb-4" />
                        <p className="text-lg font-medium text-gray-900 mb-2">
                          {uploadedFile ? uploadedFile.name : 'Chọn file hoặc kéo thả vào đây'}
                        </p>
                        <p className="text-sm text-gray-500">
                          PDF, DOC, MP4, MP3, JPG, PNG (Tối đa 100MB)
                        </p>
                      </label>
                    </div>
                    {errors.fileUrl && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.fileUrl}
                      </p>
                    )}
                  </div>

                  {uploadedFile && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {React.createElement(getTypeIcon(formData.type), { className: "w-8 h-8 text-blue-600" })}
                          <div>
                            <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                            <p className="text-sm text-gray-500">{formData.fileSize}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setUploadedFile(null);
                            setFormData(prev => ({ ...prev, fileUrl: '', fileSize: '' }));
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Tags */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Nhập tag và nhấn Enter"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleTagAdd(e.target.value.trim());
                          e.target.value = '';
                        }
                      }}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const input = document.querySelector('input[placeholder="Nhập tag và nhấn Enter"]');
                        if (input.value.trim()) {
                          handleTagAdd(input.value.trim());
                          input.value = '';
                        }
                      }}
                    >
                      Thêm
                    </Button>
                  </div>
                  
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleTagRemove(tag)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Preview */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Xem trước</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        {React.createElement(getTypeIcon(formData.type), { className: "w-5 h-5 text-blue-600" })}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {formData.title || 'Tên tài liệu'}
                      </div>
                      <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {formData.description || 'Mô tả tài liệu'}
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          materialTypes.find(t => t.id === formData.type)?.color || 'bg-gray-100 text-gray-800'
                        }`}>
                          {materialTypes.find(t => t.id === formData.type)?.name || 'Document'}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          levels.find(l => l.id === formData.level)?.color || 'bg-gray-100 text-gray-800'
                        }`}>
                          {levels.find(l => l.id === formData.level)?.name || 'Cơ bản'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hành động</h3>
                <div className="space-y-3">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Đang upload...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Lưu tài liệu
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/admin/materials')}
                  >
                    Hủy
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default MaterialsAdd;
