import React, { useState, useRef, useEffect } from 'react';
import {
  Plus,
  Save,
  ArrowLeft,
  Type,
  Image,
  FileText,
  Link,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Code,
  Hash,
  X,
  Upload,
  Eye,
  EyeOff,
  Loader,
  Clock,
  Users,
  ThumbsUp,
  MessageCircle,
  BarChart3
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const ForumUpdate = () => {
  const navigate = useNavigate();
  const { contentId } = useParams();
  const fileInputRef = useRef(null);
  const [post, setPost] = useState({
    id: null,
    title: '',
    author: {
      name: 'Admin',
      avatar: 'A',
      level: 'Administrator'
    },
    skill: 'general',
    content: [],
    tags: [],
    likes: 0,
    comments: 0,
    views: 0,
    date: '',
    isPublished: false,
    isLiked: false,
    isMyPost: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [activeBlock, setActiveBlock] = useState(null);

  // Simulate loading existing post data
  useEffect(() => {
    const loadPostData = () => {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const existingPost = {
          id: parseInt(contentId) || 3,
          title: 'Phương pháp học ngữ pháp tiếng Hàn',
          author: {
            name: 'Trần Minh Cường',
            avatar: 'C',
            level: 'Trung cấp 2'
          },
          skill: 'grammar',
          content: [
            {
              id: 1,
              type: 'text',
              content: 'Ngữ pháp tiếng Hàn có thể phức tạp, nhưng với phương pháp đúng, bạn có thể nắm vững nhanh chóng.',
              styles: {
                bold: false,
                italic: false,
                underline: false,
                alignment: 'left',
                fontSize: 'large'
              }
            },
            {
              id: 2,
              type: 'quote',
              content: 'Học ngữ pháp không chỉ là ghi nhớ quy tắc, mà còn là hiểu cách áp dụng trong giao tiếp thực tế.',
              styles: {
                bold: false,
                italic: true,
                underline: false,
                alignment: 'center',
                fontSize: 'medium'
              }
            },
            {
              id: 3,
              type: 'text',
              content: 'Dưới đây là 5 bước cơ bản để học ngữ pháp hiệu quả:\n\n1. Bắt đầu với cấu trúc câu cơ bản\n2. Thực hành với ví dụ cụ thể\n3. Áp dụng vào câu của riêng bạn\n4. Luyện tập qua bài tập\n5. Sử dụng trong giao tiếp',
              styles: {
                bold: false,
                italic: false,
                underline: false,
                alignment: 'left',
                fontSize: 'medium'
              }
            },
            {
              id: 4,
              type: 'image',
              src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdyYW1tYXIgQ2hhcnQ8L3RleHQ+PC9zdmc+',
              alt: 'Grammar Chart',
              caption: 'Biểu đồ cấu trúc ngữ pháp cơ bản'
            },
            {
              id: 5,
              type: 'code',
              content: '// Ví dụ cấu trúc câu cơ bản\n주어 + 목적어 + 동사\n나는 + 한국어를 + 공부해요\n(Tôi + tiếng Hàn + học)',
              styles: {}
            }
          ],
          tags: ['ngữ pháp', 'học tập', 'phương pháp', 'tiếng hàn'],
          likes: 34,
          comments: 8,
          views: 189,
          date: '2024-01-18',
          isPublished: true,
          isLiked: false,
          isMyPost: true
        };
        setPost(existingPost);
        setLoading(false);
      }, 1200);
    };

    loadPostData();
  }, [contentId]);

  const skillOptions = [
    { value: 'general', label: 'Tổng quát', color: 'bg-gray-100 text-gray-800' },
    { value: 'grammar', label: 'Ngữ pháp', color: 'bg-blue-100 text-blue-800' },
    { value: 'vocabulary', label: 'Từ vựng', color: 'bg-green-100 text-green-800' },
    { value: 'listening', label: 'Nghe', color: 'bg-purple-100 text-purple-800' },
    { value: 'speaking', label: 'Nói', color: 'bg-orange-100 text-orange-800' },
    { value: 'reading', label: 'Đọc', color: 'bg-pink-100 text-pink-800' },
    { value: 'writing', label: 'Viết', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'culture', label: 'Văn hóa', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const blockTypes = [
    { type: 'text', icon: Type, label: 'Văn bản' },
    { type: 'image', icon: Image, label: 'Hình ảnh' },
    { type: 'file', icon: FileText, label: 'Tài liệu' },
    { type: 'link', icon: Link, label: 'Liên kết' },
    { type: 'quote', icon: Quote, label: 'Trích dẫn' },
    { type: 'code', icon: Code, label: 'Code' }
  ];

  const textStyles = [
    { type: 'bold', icon: Bold, label: 'Bold' },
    { type: 'italic', icon: Italic, label: 'Italic' },
    { type: 'underline', icon: Underline, label: 'Underline' }
  ];

  const alignments = [
    { type: 'left', icon: AlignLeft, label: 'Left' },
    { type: 'center', icon: AlignCenter, label: 'Center' },
    { type: 'right', icon: AlignRight, label: 'Right' }
  ];

  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      content: type === 'text' || type === 'quote' || type === 'code' ? '' : null,
      styles: {
        bold: false,
        italic: false,
        underline: false,
        alignment: 'left',
        fontSize: 'medium'
      },
      ...(type === 'image' && { src: '', alt: '', caption: '' }),
      ...(type === 'file' && { name: '', url: '', fileType: '' }),
      ...(type === 'link' && { url: '', title: '', description: '' })
    };

    setPost(prev => ({
      ...prev,
      content: [...prev.content, newBlock]
    }));
    setActiveBlock(newBlock.id);
  };

  const updateBlock = (blockId, field, value) => {
    setPost(prev => ({
      ...prev,
      content: prev.content.map(block =>
        block.id === blockId ? { ...block, [field]: value } : block
      )
    }));
  };

  const updateBlockStyle = (blockId, style, value) => {
    setPost(prev => ({
      ...prev,
      content: prev.content.map(block =>
        block.id === blockId
          ? { ...block, styles: { ...block.styles, [style]: value } }
          : block
      )
    }));
  };

  const removeBlock = (blockId) => {
    if (window.confirm('Bạn có chắc muốn xóa khối nội dung này?')) {
      setPost(prev => ({
        ...prev,
        content: prev.content.filter(block => block.id !== blockId)
      }));
      if (activeBlock === blockId) setActiveBlock(null);
    }
  };

  const moveBlock = (blockId, direction) => {
    const currentIndex = post.content.findIndex(block => block.id === blockId);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === post.content.length - 1)
    ) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newContent = [...post.content];
    [newContent[currentIndex], newContent[newIndex]] = [newContent[newIndex], newContent[currentIndex]];
    setPost(prev => ({ ...prev, content: newContent }));
  };

  const handleImageUpload = (blockId) => {
    fileInputRef.current?.click();
    fileInputRef.current.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          updateBlock(blockId, 'src', e.target.result);
          updateBlock(blockId, 'alt', file.name);
        };
        reader.readAsDataURL(file);
      }
      fileInputRef.current.value = ''; // Reset file input
    };
  };

  const handleFileUpload = (blockId) => {
    fileInputRef.current?.click();
    fileInputRef.current.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        updateBlock(blockId, 'name', file.name);
        updateBlock(blockId, 'url', URL.createObjectURL(file));
        updateBlock(blockId, 'fileType', file.type.split('/')[1] || 'other');
      }
      fileInputRef.current.value = ''; // Reset file input
    };
  };

  const addTag = () => {
    if (currentTag.trim() && !post.tags.includes(currentTag.trim())) {
      setPost(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const togglePublishStatus = () => {
    setPost(prev => ({
      ...prev,
      isPublished: !prev.isPublished
    }));
  };

  const handleSubmit = async (publishNow = null) => {
    if (!post.title.trim()) {
      alert('Vui lòng nhập tiêu đề bài viết!');
      return;
    }
    if (!post.skill) {
      alert('Vui lòng chọn chuyên mục!');
      return;
    }
    if (post.content.length === 0) {
      alert('Vui lòng thêm ít nhất một khối nội dung!');
      return;
    }

    setSaving(true);
    try {
      const shouldPublish = publishNow !== null ? publishNow : post.isPublished;
      const postData = {
        ...post,
        isPublished: shouldPublish,
        updatedAt: new Date().toISOString()
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Updated post data:', postData);
      alert(shouldPublish ? 'Bài viết đã được cập nhật và đăng!' : 'Bài viết đã được cập nhật và lưu nháp!');
      navigate('/admin/content');
    } catch (error) {
      alert('Có lỗi xảy ra khi cập nhật bài viết!');
    } finally {
      setSaving(false);
    }
  };

  const renderBlock = (block) => {
    const isActive = activeBlock === block.id;

    return (
      <div
        key={block.id}
        className={`group relative border rounded-lg p-4 transition-all ${
          isActive ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => setActiveBlock(block.id)}
      >
        {/* Block Controls */}
        <div className={`absolute -top-2 -right-2 flex gap-1 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              moveBlock(block.id, 'up');
            }}
            disabled={post.content.findIndex(b => b.id === block.id) === 0}
          >
            ↑
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              moveBlock(block.id, 'down');
            }}
            disabled={post.content.findIndex(b => b.id === block.id) === post.content.length - 1}
          >
            ↓
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              removeBlock(block.id);
            }}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>

        {/* Style Controls for Text Blocks */}
        {(block.type === 'text' || block.type === 'quote') && isActive && (
          <div className="mb-3 flex flex-wrap gap-2 p-2 bg-gray-50 rounded border-b">
            {textStyles.map(style => (
              <Button
                key={style.type}
                variant={block.styles[style.type] ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateBlockStyle(block.id, style.type, !block.styles[style.type])}
              >
                <style.icon className="w-4 h-4" />
              </Button>
            ))}
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            {alignments.map(align => (
              <Button
                key={align.type}
                variant={block.styles.alignment === align.type ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateBlockStyle(block.id, 'alignment', align.type)}
              >
                <align.icon className="w-4 h-4" />
              </Button>
            ))}
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <select
              value={block.styles.fontSize}
              onChange={(e) => updateBlockStyle(block.id, 'fontSize', e.target.value)}
              className="px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="small">Nhỏ</option>
              <option value="medium">Vừa</option>
              <option value="large">Lớn</option>
              <option value="xlarge">Rất lớn</option>
            </select>
          </div>
        )}

        {/* Block Content */}
        {block.type === 'text' && (
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(block.id, 'content', e.target.value)}
            placeholder="Nhập nội dung văn bản..."
            className={`w-full min-h-[100px] border-0 resize-none focus:ring-0 bg-transparent ${
              block.styles.bold ? 'font-bold' : ''
            } ${
              block.styles.italic ? 'italic' : ''
            } ${
              block.styles.underline ? 'underline' : ''
            } ${
              block.styles.alignment === 'center' ? 'text-center' :
              block.styles.alignment === 'right' ? 'text-right' : 'text-left'
            } ${
              block.styles.fontSize === 'small' ? 'text-sm' :
              block.styles.fontSize === 'large' ? 'text-lg' :
              block.styles.fontSize === 'xlarge' ? 'text-xl' : 'text-base'
            }`}
          />
        )}

        {block.type === 'image' && (
          <div className="space-y-3">
            {block.src ? (
              <div className="relative">
                <img src={block.src} alt={block.alt} className="w-full rounded max-h-96 object-cover" />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => updateBlock(block.id, 'src', '')}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-gray-400 flex items-center justify-center"
                onClick={() => handleImageUpload(block.id)}
              >
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Tải lên hình ảnh</p>
                </div>
              </Button>
            )}
            <Input
              type="text"
              value={block.caption || ''}
              onChange={(e) => updateBlock(block.id, 'caption', e.target.value)}
              placeholder="Chú thích hình ảnh..."
              className="w-full"
            />
          </div>
        )}

        {block.type === 'file' && (
          <div className="space-y-3">
            {block.url ? (
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                <FileText className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">{block.name}</p>
                  <p className="text-sm text-gray-600">{block.fileType}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    updateBlock(block.id, 'url', '');
                    updateBlock(block.id, 'name', '');
                    updateBlock(block.id, 'fileType', '');
                  }}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-gray-400 flex items-center justify-center"
                onClick={() => handleFileUpload(block.id)}
              >
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Tải lên tài liệu</p>
                </div>
              </Button>
            )}
            <Input
              type="text"
              value={block.name || ''}
              onChange={(e) => updateBlock(block.id, 'name', e.target.value)}
              placeholder="Tên tài liệu..."
              className="w-full"
            />
            <Input
              type="url"
              value={block.url || ''}
              onChange={(e) => updateBlock(block.id, 'url', e.target.value)}
              placeholder="URL tài liệu..."
              className="w-full"
            />
            <select
              value={block.fileType || ''}
              onChange={(e) => updateBlock(block.id, 'fileType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Chọn loại tài liệu</option>
              <option value="pdf">PDF</option>
              <option value="doc">Word Document</option>
              <option value="ppt">PowerPoint</option>
              <option value="xls">Excel</option>
              <option value="other">Khác</option>
            </select>
          </div>
        )}

        {block.type === 'link' && (
          <div className="space-y-3">
            <Input
              type="url"
              value={block.url || ''}
              onChange={(e) => updateBlock(block.id, 'url', e.target.value)}
              placeholder="https://example.com"
              className="w-full"
            />
            <Input
              type="text"
              value={block.title || ''}
              onChange={(e) => updateBlock(block.id, 'title', e.target.value)}
              placeholder="Tiêu đề liên kết..."
              className="w-full"
            />
            <textarea
              value={block.description || ''}
              onChange={(e) => updateBlock(block.id, 'description', e.target.value)}
              placeholder="Mô tả liên kết..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {block.type === 'quote' && (
          <div className="border-l-4 border-blue-500 pl-4">
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, 'content', e.target.value)}
              placeholder="Nhập trích dẫn..."
              className={`w-full min-h-[80px] border-0 resize-none focus:ring-0 bg-transparent italic text-gray-700 ${
                block.styles.alignment === 'center' ? 'text-center' :
                block.styles.alignment === 'right' ? 'text-right' : 'text-left'
              } ${
                block.styles.fontSize === 'small' ? 'text-sm' :
                block.styles.fontSize === 'large' ? 'text-lg' :
                block.styles.fontSize === 'xlarge' ? 'text-xl' : 'text-base'
              }`}
            />
          </div>
        )}

        {block.type === 'code' && (
          <div className="bg-gray-900 rounded-lg p-4">
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, 'content', e.target.value)}
              placeholder="// Nhập code..."
              className="w-full min-h-[100px] bg-transparent text-green-400 font-mono text-sm border-0 resize-none focus:ring-0"
            />
          </div>
        )}
      </div>
    );
  };

  const renderPreview = () => (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{post.title || 'Tiêu đề bài viết'}</h2>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium">
            {post.author.avatar}
          </div>
          <div>
            <p className="font-medium text-gray-900">{post.author.name}</p>
            <p className="text-sm text-gray-600">{post.author.level}</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {post.date}
        </div>
      </div>
      <div className="flex items-center gap-4 mb-6">
        {skillOptions.find(s => s.value === post.skill) && (
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            skillOptions.find(s => s.value === post.skill).color
          }`}>
            {skillOptions.find(s => s.value === post.skill).label}
          </span>
        )}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            {post.likes}
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {post.comments}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {post.views}
          </div>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        {post.content.map((block) => (
          <div key={block.id}>
            {block.type === 'text' && (
              <div className={`${
                block.styles?.bold ? 'font-bold' : ''
              } ${
                block.styles?.italic ? 'italic' : ''
              } ${
                block.styles?.underline ? 'underline' : ''
              } ${
                block.styles?.alignment === 'center' ? 'text-center' :
                block.styles?.alignment === 'right' ? 'text-right' : 'text-left'
              } ${
                block.styles?.fontSize === 'small' ? 'text-sm' :
                block.styles?.fontSize === 'large' ? 'text-lg' :
                block.styles?.fontSize === 'xlarge' ? 'text-xl' : 'text-base'
              } whitespace-pre-line`}>
                {block.content}
              </div>
            )}
            {block.type === 'image' && block.src && (
              <div>
                <img src={block.src} alt={block.alt} className="rounded-lg max-w-full max-h-96 object-cover" />
                {block.caption && (
                  <p className="text-sm text-gray-600 mt-2 text-center italic">{block.caption}</p>
                )}
              </div>
            )}
            {block.type === 'quote' && (
              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
                {block.content}
              </blockquote>
            )}
            {block.type === 'code' && (
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                <code>{block.content}</code>
              </pre>
            )}
            {block.type === 'link' && block.url && (
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <a href={block.url} className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                  {block.title || block.url}
                </a>
                {block.description && (
                  <p className="text-gray-600 text-sm mt-1">{block.description}</p>
                )}
              </div>
            )}
            {block.type === 'file' && block.name && (
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                <FileText className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">{block.name}</p>
                  <p className="text-sm text-gray-600">{block.fileType}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              <Hash className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      )}
    </Card>
  );

  const renderStats = () => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống Kê Bài Viết</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <ThumbsUp className="w-6 h-6 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Lượt thích</p>
            <p className="text-lg font-semibold text-gray-900">{post.likes}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <MessageCircle className="w-6 h-6 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Bình luận</p>
            <p className="text-lg font-semibold text-gray-900">{post.comments}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Eye className="w-6 h-6 text-purple-600" />
          <div>
            <p className="text-sm text-gray-500">Lượt xem</p>
            <p className="text-lg font-semibold text-gray-900">{post.views}</p>
          </div>
        </div>
      </div>
    </Card>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Đang tải dữ liệu bài viết...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin/content')}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Cập Nhật Bài Viết</h1>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                  <span>ID: {post.id}</span>
                  <span>•</span>
                  <span>Ngày tạo: {post.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant={showStats ? 'default' : 'outline'}
                onClick={() => setShowStats(!showStats)}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                {showStats ? 'Ẩn Thống Kê' : 'Xem Thống Kê'}
              </Button>
              <Button
                variant={showPreview ? 'default' : 'outline'}
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showPreview ? 'Ẩn Preview' : 'Xem Preview'}
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleSubmit(false)}
                disabled={saving}
              >
                {saving && !post.isPublished ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Lưu Nháp
              </Button>
              <Button
                variant="primary"
                onClick={() => handleSubmit(true)}
                disabled={saving}
              >
                {saving && post.isPublished ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Cập Nhật & Đăng
              </Button>
            </div>
          </div>
        </Card>

        <div className={`grid ${showPreview || showStats ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}>
          {/* Editor */}
          <div className="space-y-6">
            {/* Basic Information */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông Tin Cơ Bản</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tiêu đề bài viết *
                  </label>
                  <Input
                    type="text"
                    value={post.title}
                    onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Nhập tiêu đề bài viết..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chuyên mục *
                  </label>
                  <select
                    value={post.skill}
                    onChange={(e) => setPost(prev => ({ ...prev, skill: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    {skillOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <Button
                    variant={post.isPublished ? 'primary' : 'secondary'}
                    onClick={togglePublishStatus}
                  >
                    {post.isPublished ? 'Đã xuất bản' : 'Bản nháp'}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Content Builder */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Nội Dung Bài Viết</h2>
                <div className="flex flex-wrap gap-2">
                  {blockTypes.map(blockType => (
                    <Button
                      key={blockType.type}
                      variant="outline"
                      size="sm"
                      onClick={() => addBlock(blockType.type)}
                    >
                      <blockType.icon className="w-4 h-4 mr-2" />
                      {blockType.label}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {post.content.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Type className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p>Chưa có nội dung nào. Thêm khối nội dung để bắt đầu chỉnh sửa.</p>
                  </div>
                ) : (
                  post.content.map(renderBlock)
                )}
              </div>
            </Card>

            {/* Tags */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Hashtags</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                  >
                    <Hash className="w-3 h-3" />
                    {tag}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  placeholder="Thêm hashtag..."
                />
                <Button
                  variant="primary"
                  onClick={addTag}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm
                </Button>
              </div>
            </Card>
          </div>

          {/* Preview or Stats */}
          {(showPreview || showStats) && (
            <div className="space-y-6">
              {showPreview && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Xem Trước</h3>
                  {renderPreview()}
                </>
              )}
              {showStats && renderStats()}
            </div>
          )}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
        className="hidden"
      />
    </AdminLayout>
  );
};

export default ForumUpdate;