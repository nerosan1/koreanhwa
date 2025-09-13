import React, { useState } from 'react';
import { 
  FileText, 
  Image, 
  Tag, 
  Save, 
  XCircle, 
  Sparkles, 
  Upload, 
  Eye, 
  EyeOff, 
  CheckCircle,
  ArrowLeft,
  Edit,
  Plus,
  Bold,
  Italic,
  Underline,
  Code,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';
import Card from '../../components/common/Card';
import {useNavigate} from 'react-router-dom';


const CreateBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    blocks: [{ type: 'text', content: '', style: {} }],
    category: '',
    tags: [],
    featuredImage: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock categories
  const categories = [
    { id: 'learning', name: 'Học tập' },
    { id: 'culture', name: 'Văn hóa' },
    { id: 'grammar', name: 'Ngữ pháp' },
    { id: 'vocabulary', name: 'Từ vựng' },
    { id: 'tips', name: 'Mẹo học' },
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, featuredImage: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle tag input
  const handleTagInput = (e) => {
    setTagInput(e.target.value);
  };

  // Add tag on Enter key
  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  // Remove tag
  const removeTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  // Handle block content change
  const handleBlockChange = (index, content) => {
    const newBlocks = [...formData.blocks];
    newBlocks[index].content = content;
    setFormData((prev) => ({ ...prev, blocks: newBlocks }));
  };

  // Add new block
  const addBlock = (type = 'text') => {
    setFormData((prev) => ({
      ...prev,
      blocks: [...prev.blocks, { type, content: '', style: {} }],
    }));
  };

  // Remove block
  const removeBlock = (index) => {
    const newBlocks = formData.blocks.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, blocks: newBlocks }));
  };

  // Apply style to block
  const applyStyle = (index, style) => {
    const newBlocks = [...formData.blocks];
    newBlocks[index].style = { ...newBlocks[index].style, ...style };
    setFormData((prev) => ({ ...prev, blocks: newBlocks }));
  };

  // Handle image block upload
  const handleImageBlockUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newBlocks = [...formData.blocks];
      newBlocks[index] = { type: 'image', content: URL.createObjectURL(file), style: {} };
      setFormData((prev) => ({ ...prev, blocks: newBlocks }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Blog Data:', formData);
      setIsSubmitting(false);
      setFormData({
        title: '',
        blocks: [{ type: 'text', content: '', style: {} }],
        category: '',
        tags: [],
        featuredImage: null,
      });
      setPreviewImage(null);
      setIsPreviewVisible(false);
    }, 1000);
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8 relative ">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-2xl animate-bounce"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-black text-white hover:bg-yellow-500 transition-all duration-300 hover:scale-110">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold  bg-clip-text ">
                  Tạo Bài Blog Mới
                </h1>
                <p className="text-sm text-gray-600 mt-2">Chia sẻ kiến thức và kinh nghiệm học tiếng Hàn của bạn</p>
              </div>
            </div>
            <button 
              onClick={() => setIsPreviewVisible(!isPreviewVisible)}
              className="p-3 rounded-full text-black bg-yellow-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-110"
            >
              {isPreviewVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Editor Section */}
            <div className="lg:col-span-2">
              <Card className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tiêu đề</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Nhập tiêu đề bài blog..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-2xl font-bold"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Danh mục</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      required
                    >
                      <option value="">Chọn danh mục</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Blocks Editor */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nội dung</label>
                    <div className="space-y-4">
                      {formData.blocks.map((block, index) => (
                        <div key={index} className="relative p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-500 transition-all duration-300">
                          {block.type === 'text' && (
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <button onClick={() => applyStyle(index, { bold: !block.style.bold })} className="p-1 hover:bg-gray-100 rounded"><Bold className="w-4 h-4" /></button>
                                <button onClick={() => applyStyle(index, { italic: !block.style.italic })} className="p-1 hover:bg-gray-100 rounded"><Italic className="w-4 h-4" /></button>
                                <button onClick={() => applyStyle(index, { underline: !block.style.underline })} className="p-1 hover:bg-gray-100 rounded"><Underline className="w-4 h-4" /></button>
                                <button onClick={() => applyStyle(index, { code: !block.style.code })} className="p-1 hover:bg-gray-100 rounded"><Code className="w-4 h-4" /></button>
                                <button onClick={() => applyStyle(index, { align: 'left' })} className="p-1 hover:bg-gray-100 rounded"><AlignLeft className="w-4 h-4" /></button>
                                <button onClick={() => applyStyle(index, { align: 'center' })} className="p-1 hover:bg-gray-100 rounded"><AlignCenter className="w-4 h-4" /></button>
                                <button onClick={() => applyStyle(index, { align: 'right' })} className="p-1 hover:bg-gray-100 rounded"><AlignRight className="w-4 h-4" /></button>
                                <button onClick={() => applyStyle(index, { list: !block.style.list })} className="p-1 hover:bg-gray-100 rounded"><List className="w-4 h-4" /></button>
                              </div>
                              <textarea
                                value={block.content}
                                onChange={(e) => handleBlockChange(index, e.target.value)}
                                placeholder="Nhập văn bản..."
                                className={`w-full px-3 py-2 border-none focus:outline-none resize-y ${block.style.bold ? 'font-bold' : ''} ${block.style.italic ? 'italic' : ''} ${block.style.underline ? 'underline' : ''} ${block.style.code ? 'bg-gray-100 font-mono' : ''} ${block.style.align ? `text-${block.style.align}` : 'text-left'} ${block.style.list ? 'list-disc pl-5' : ''}`}
                                rows="3"
                              />
                            </div>
                          )}
                          {block.type === 'image' && (
                            <div>
                              <img src={block.content} alt="Block" className="w-full h-auto rounded-lg" />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageBlockUpload(index, e)}
                                className="mt-2"
                              />
                            </div>
                          )}
                          <button onClick={() => removeBlock(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><XCircle className="w-5 h-5" /></button>
                        </div>
                      ))}
                      <button onClick={() => addBlock('text')} className="w-full p-3 bg-black text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                        <Plus className="w-5 h-5" /> Thêm khối văn bản
                      </button>
                      <button onClick={() => addBlock('image')} className="w-full p-3 bg-yellow-500 text-black rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                        <Image className="w-5 h-5" /> Thêm hình ảnh
                      </button>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Thẻ</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={handleTagInput}
                        onKeyPress={handleTagKeyPress}
                        placeholder="Nhập thẻ và nhấn Enter..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      />
                      <Tag className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-full text-sm"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="hover:text-red-200 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Featured Image */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ảnh nổi bật</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-white/80 backdrop-blur-sm hover:bg-gray-50 transition-all duration-300">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">
                            Kéo và thả hoặc nhấn để tải ảnh lên
                          </p>
                          <p className="text-xs text-gray-400">PNG, JPG (tối đa 5MB)</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {previewImage && (
                      <div className="mt-4">
                        <img
                          src={previewImage}
                          alt="Featured"
                          className="w-full h-48 object-cover rounded-xl shadow-lg"
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      className="px-6 py-3 bg-black text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Hủy
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-3 bg-yellow-500 text-black rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <Save className="w-5 h-5" />
                      {isSubmitting ? 'Đang lưu...' : 'Lưu bài viết'}
                    </button>
                  </div>
                </form>
              </Card>
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-1">
              <Card className="p-6 bg-white  rounded-3xl shadow-2xl">
                <h3 className="text-xl font-bold  bg-clip-text  mb-4">
                  Xem trước
                </h3>
                {isPreviewVisible && (
                  <div className="space-y-4 animate-fadeIn">
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Featured Preview"
                        className="w-full h-40 object-cover rounded-xl shadow-lg"
                      />
                    )}
                    <h4 className="text-lg font-semibold text-gray-900">
                      {formData.title || 'Tiêu đề bài viết'}
                    </h4>
                    {formData.blocks.map((block, index) => (
                      <div key={index} className={`mb-2 ${block.style.align ? `text-${block.style.align}` : 'text-left'}`}>
                        {block.type === 'text' && (
                          <p className={`${block.style.bold ? 'font-bold' : ''} ${block.style.italic ? 'italic' : ''} ${block.style.underline ? 'underline' : ''} ${block.style.code ? 'bg-gray-100 font-mono' : ''} ${block.style.list ? 'list-disc pl-5' : ''}`}>
                            {block.content || 'Nội dung khối văn bản...'}
                          </p>
                        )}
                        {block.type === 'image' && (
                          <img src={block.content} alt="Block Preview" className="w-full h-40 object-cover rounded-lg" />
                        )}
                      </div>
                    ))}
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-black text-white rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      Danh mục: {categories.find((cat) => cat.id === formData.category)?.name || 'Chưa chọn'}
                    </p>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <FileText className="w-4 h-4" />
                      <span className="text-xs">Đăng bởi bạn</span>
                    </div>
                  </div>
                )}
                {!isPreviewVisible && (
                  <div className="text-center text-gray-500">
                    <EyeOff className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Bật xem trước để thấy nội dung bài viết</p>
                  </div>
                )}
              </Card>
            </div>
          </div>

        </div>
      </div>
  );
};

export default CreateBlog;