import React, { useState } from 'react';
import { 
  FileText, 
  ArrowLeft, 
  Upload,
  Video,
  Image,
  File,
  CheckCircle,
  XCircle,
  Plus,
  Trash
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const CreateContent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'video',
    level: 'beginner',
    category: 'grammar',
    duration: '',
    tags: [],
    content: '',
    thumbnail: null,
    attachments: [],
    isPublished: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTag, setNewTag] = useState('');

  const contentTypes = [
    { id: 'video', name: 'Video', icon: Video, description: 'Video bài giảng' },
    { id: 'document', name: 'Tài liệu', icon: FileText, description: 'Tài liệu PDF, Word' },
    { id: 'image', name: 'Hình ảnh', icon: Image, description: 'Hình ảnh, infographic' },
    { id: 'audio', name: 'Âm thanh', icon: File, description: 'File âm thanh' }
  ];

  const levels = [
    { id: 'beginner', name: 'Cơ bản', description: 'Cho người mới bắt đầu' },
    { id: 'intermediate', name: 'Trung cấp', description: 'Cho người đã có kiến thức cơ bản' },
    { id: 'advanced', name: 'Nâng cao', description: 'Cho người có trình độ cao' }
  ];

  const categories = [
    { id: 'grammar', name: 'Ngữ pháp', description: 'Bài học về ngữ pháp' },
    { id: 'vocabulary', name: 'Từ vựng', description: 'Học từ vựng theo chủ đề' },
    { id: 'listening', name: 'Luyện nghe', description: 'Bài tập luyện nghe' },
    { id: 'speaking', name: 'Luyện nói', description: 'Bài tập luyện nói' },
    { id: 'reading', name: 'Đọc hiểu', description: 'Bài đọc và hiểu' },
    { id: 'writing', name: 'Viết', description: 'Bài tập viết' },
    { id: 'culture', name: 'Văn hóa', description: 'Văn hóa Hàn Quốc' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề là bắt buộc';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Tiêu đề phải có ít nhất 5 ký tự';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Mô tả là bắt buộc';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Mô tả phải có ít nhất 20 ký tự';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Nội dung là bắt buộc';
    }

    if (formData.type === 'video' && !formData.duration) {
      newErrors.duration = 'Thời lượng video là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    
    if (field === 'thumbnail') {
      const file = files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          setErrors(prev => ({ ...prev, thumbnail: 'File quá lớn. Kích thước tối đa là 5MB' }));
          return;
        }
        if (!file.type.startsWith('image/')) {
          setErrors(prev => ({ ...prev, thumbnail: 'Chỉ chấp nhận file hình ảnh' }));
          return;
        }
        setFormData(prev => ({ ...prev, thumbnail: file }));
        setErrors(prev => ({ ...prev, thumbnail: '' }));
      }
    } else if (field === 'attachments') {
      const validFiles = files.filter(file => {
        if (file.size > 50 * 1024 * 1024) {
          setErrors(prev => ({ ...prev, attachments: 'File quá lớn. Kích thước tối đa là 50MB' }));
          return false;
        }
        return true;
      });
      
      if (validFiles.length > 0) {
        setFormData(prev => ({ 
          ...prev, 
          attachments: [...prev.attachments, ...validFiles] 
        }));
        setErrors(prev => ({ ...prev, attachments: '' }));
      }
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({ 
        ...prev, 
        tags: [...prev.tags, newTag.trim()] 
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleRemoveAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - redirect to content list
      window.location.href = '/admin/content';
    } catch (error) {
      console.error('Error creating content:', error);
      setErrors({ submit: 'Có lỗi xảy ra khi tạo nội dung. Vui lòng thử lại.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/admin/content"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Quay lại
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tạo nội dung mới</h1>
              <p className="text-gray-600">Tạo bài học, video hoặc tài liệu mới</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin cơ bản</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiêu đề <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Nhập tiêu đề nội dung"
                      error={errors.title}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Mô tả ngắn gọn về nội dung"
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loại nội dung <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {contentTypes.map(type => (
                          <option key={type.id} value={type.id}>
                            {type.name} - {type.description}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cấp độ <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.level}
                        onChange={(e) => handleInputChange('level', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {levels.map(level => (
                          <option key={level.id} value={level.id}>
                            {level.name} - {level.description}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Danh mục <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name} - {category.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.type === 'video' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thời lượng (phút) <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="number"
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        placeholder="Nhập thời lượng video"
                        min="1"
                        max="300"
                        error={errors.duration}
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <Input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Nhập tag và nhấn Enter"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleAddTag}
                          disabled={!newTag.trim()}
                        >
                          <Plus className="w-4 h-4" />
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
                                onClick={() => handleRemoveTag(tag)}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                              >
                                <XCircle className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Content Editor */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Nội dung</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung chi tiết <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Nhập nội dung chi tiết..."
                    rows="12"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.content && (
                    <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                  )}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Thumbnail Upload */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ảnh đại diện</h3>
                <div className="space-y-4">
                  <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    {formData.thumbnail ? (
                      <img
                        src={URL.createObjectURL(formData.thumbnail)}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center">
                        <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Chưa có ảnh đại diện</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'thumbnail')}
                      className="hidden"
                      id="thumbnail-upload"
                    />
                    <label
                      htmlFor="thumbnail-upload"
                      className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full justify-center"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Tải ảnh lên
                    </label>
                    {errors.thumbnail && (
                      <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>
                    )}
                  </div>
                </div>
              </Card>

              {/* File Attachments */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tệp đính kèm</h3>
                <div className="space-y-4">
                  <div>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleFileChange(e, 'attachments')}
                      className="hidden"
                      id="attachments-upload"
                    />
                    <label
                      htmlFor="attachments-upload"
                      className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full justify-center"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Thêm tệp
                    </label>
                    {errors.attachments && (
                      <p className="text-red-500 text-sm mt-1">{errors.attachments}</p>
                    )}
                  </div>

                  {formData.attachments.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Tệp đã chọn:</p>
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveAttachment(index)}
                            className="ml-2 text-red-600 hover:text-red-800"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>

              {/* Publishing Options */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tùy chọn xuất bản</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isPublished"
                      checked={formData.isPublished}
                      onChange={(e) => handleInputChange('isPublished', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="isPublished" className="ml-2 text-sm text-gray-700">
                      Xuất bản ngay
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    Nếu không chọn, nội dung sẽ được lưu dưới dạng bản nháp
                  </p>
                </div>
              </Card>

              {/* Summary */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loại:</span>
                    <span className="font-medium">
                      {contentTypes.find(t => t.id === formData.type)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cấp độ:</span>
                    <span className="font-medium">
                      {levels.find(l => l.id === formData.level)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Danh mục:</span>
                    <span className="font-medium">
                      {categories.find(c => c.id === formData.category)?.name}
                    </span>
                  </div>
                  {formData.type === 'video' && formData.duration && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Thời lượng:</span>
                      <span className="font-medium">{formData.duration} phút</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tags:</span>
                    <span className="font-medium">{formData.tags.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tệp đính kèm:</span>
                    <span className="font-medium">{formData.attachments.length}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <XCircle className="w-5 h-5 text-red-400 mr-2" />
                <p className="text-red-800">{errors.submit}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Link to="/admin/content">
              <Button variant="outline" type="button">
                Hủy
              </Button>
            </Link>
            <Button
              variant="outline"
              type="button"
              onClick={() => handleInputChange('isPublished', false)}
            >
              Lưu nháp
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang tạo...
                </div>
              ) : (
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {formData.isPublished ? 'Xuất bản' : 'Tạo nội dung'}
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateContent; 