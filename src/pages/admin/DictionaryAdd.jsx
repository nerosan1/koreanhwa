
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeft, BookOpen, Eye, EyeOff, Plus, Trash, Upload, Volume2, X, CheckCircle, XCircle } from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import AdminLayout from '../../components/layout/AdminLayout'; // Adjust path as needed

const DictionaryAdd = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    korean: '',
    pronunciation: '',
    vietnamese: '',
    examples: [''],
    partOfSpeech: 'noun',
    level: 'beginner',
    lessonId: '',
    image: null,
    audio: null,
    tags: [],
    isActive: true,
    price: 0,
    originalPrice: 0,
    isFree: false,
    pointsRequired: 0
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [importing, setImporting] = useState(false);
  const [quizletId, setQuizletId] = useState('');
  const [importedTerms, setImportedTerms] = useState([]); // List of imported terms
  const [importText, setImportText] = useState(''); // Fallback text import

  // Mock lessons data (giữ nguyên)
  const lessons = [
    { id: 1, title: 'Bài 1: Chào hỏi cơ bản', level: 'beginner' },
    { id: 2, title: 'Bài 2: Giới thiệu bản thân', level: 'beginner' },
    { id: 3, title: 'Bài 3: Gia đình và họ hàng', level: 'beginner' },
    { id: 4, title: 'Bài 4: Số đếm và thời gian', level: 'intermediate' },
    { id: 5, title: 'Bài 5: Mua sắm và giá cả', level: 'intermediate' },
    { id: 6, title: 'Bài 6: Thức ăn và đồ uống', level: 'intermediate' },
    { id: 7, title: 'Bài 7: Du lịch và giao thông', level: 'advanced' },
    { id: 8, title: 'Bài 8: Công việc và sự nghiệp', level: 'advanced' },
  ];

  const partOfSpeechOptions = [
    { value: 'noun', label: 'Danh từ', color: 'bg-blue-100 text-blue-800' },
    { value: 'verb', label: 'Động từ', color: 'bg-green-100 text-green-800' },
    { value: 'adjective', label: 'Tính từ', color: 'bg-purple-100 text-purple-800' },
    { value: 'adverb', label: 'Trạng từ', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'pronoun', label: 'Đại từ', color: 'bg-pink-100 text-pink-800' },
    { value: 'preposition', label: 'Giới từ', color: 'bg-gray-100 text-gray-800' },
    { value: 'conjunction', label: 'Liên từ', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'interjection', label: 'Thán từ', color: 'bg-red-100 text-red-800' },
  ];

  const levelOptions = [
    { value: 'beginner', label: 'Sơ cấp', color: 'bg-green-100 text-green-800' },
    { value: 'intermediate', label: 'Trung cấp', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'advanced', label: 'Cao cấp', color: 'bg-red-100 text-red-800' },
  ];

  const suggestedTags = [
    'chào hỏi', 'gia đình', 'thức ăn', 'đồ uống', 'màu sắc', 'số đếm',
    'thời gian', 'ngày tháng', 'thời tiết', 'quần áo', 'cơ thể', 'động vật',
    'giao thông', 'mua sắm', 'học tập', 'công việc', 'sở thích', 'cảm xúc',
    'toiec', 'english', 'vocabulary' // Thêm tags TOEIC
  ];

  // Dữ liệu mẫu từ set "600 Essential Words For The TOEIC" (ID 80071253) - Parse từ document
  const sampleToEicTerms = [
    {
      korean: 'Abide by',
      pronunciation: "/ə'baid/ /bai/",
      vietnamese: 'To comply with (Tuan theo, dong y lam theo)',
      examples: [
        'To comply with the rules (Tuan theo quy tac)',
        'To refuse to comply (Tu choi ko tuan theo)',
        'To comply with request (Dong y lam theo yeu cau)',
        'To conform (Lam cho phu hop)',
        'To conform to the low (Tuan theo phap luat)',
        'To conform to fashion (Theo thoi trang)',
        'To respect (Ton trong, kinh trong)'
      ],
      image: null,
      audio: null,
      tags: ['toiec', 'compliance']
    },
    {
      korean: 'Agreement',
      pronunciation: "/ə'gri:mənt/",
      vietnamese: 'Agree (V) Dong y (to st/ with sb on st)',
      examples: [
        'Agree to the terms (Dong y theo cac dieu khoan)',
        'Agreeable (Adj) Tan thanh',
        'Agreeable to the terms (Dong y theo dieu khoan)',
        'A contract (Ban hop dong)',
        'According to the agreement (Theo hop dong)'
      ],
      image: null,
      audio: null,
      tags: ['toiec', 'contract']
    },
    {
      korean: 'Assurance',
      pronunciation: "/ə´ʃuərəns/",
      vietnamese: 'A guarantee, Confidence',
      examples: [
        'The sales associate gave his assurance that the missing keyboard would replaced the next day'
      ],
      image: null,
      audio: null,
      tags: ['toiec', 'guarantee']
    },
    {
      korean: 'Assure',
      pronunciation: "/ə´ʃuə/",
      vietnamese: 'Qua quyet, cam doan',
      examples: [
        'I assure you that...'
      ],
      image: null,
      audio: null,
      tags: ['toiec', 'confidence']
    },
    {
      korean: 'Assuredly',
      pronunciation: "/ə´ʃuəridli/",
      vietnamese: 'Chac chan, nhat dinh, tat nhien',
      examples: [
        'he spoke assuredly.....'
      ],
      image: null,
      audio: null,
      tags: ['toiec', 'certainty']
    },
    {
      korean: 'Cancellation',
      pronunciation: "/¸kænsə´leiʃən/",
      vietnamese: 'Huy bo, bai bo, xoa bo, Stop, Annulment',
      examples: [
        'The cancellation clause(dieu khoan) appears(trinh bay) at the back of the contract.'
      ],
      image: null,
      audio: null,
      tags: ['toiec', 'contract']
    },
    {
      korean: 'Cancel',
      pronunciation: "/´kænsəl/",
      vietnamese: 'Huy bo, bai bo',
      examples: [
        'I canceled my magazine subcription(su dang ky mua) and got my money back.'
      ],
      image: null,
      audio: null,
      tags: ['toiec', 'cancellation']
    },
    {
      korean: 'Cancelled',
      pronunciation: "/´kænsəld/",
      vietnamese: 'Da huy bo',
      examples: [],
      image: null,
      audio: null,
      tags: ['toiec', 'status']
    },
    {
      korean: 'Determine',
      pronunciation: "/di'tз:min/",
      vietnamese: 'Dinh ro, xac dinh, dinh doat, To find out, to influence',
      examples: [
        'I was still unable to determine'
      ],
      image: null,
      audio: null,
      tags: ['toiec', 'decision']
    },
    {
      korean: 'Determined',
      pronunciation: "/di'tз:mind/",
      vietnamese: 'Kien quyet, nhat quyet, da duoc dinh ro',
      examples: [
        'I am determined to stop smoking'
      ],
      image: null,
      audio: null,
      tags: ['toiec', 'determination']
    },
    {
      korean: 'Engagement',
      pronunciation: "",
      vietnamese: 'Su tham gia, su cam ket, su rang buoc, su hua hon, Participation, Acommitment, An event',
      examples: [
        'The entire/in\'taiə/ office was invited to her engagement party'
      ],
      image: null,
      audio: null,
      tags: ['toiec', 'commitment']
    }
    // Có thể thêm 11 terms còn lại nếu cần
  ];

  // Mock pronunciation generator (giữ nguyên)
  const generatePronunciation = (korean) => {
    const romanizationMap = {
      'Abide by': "/ə'baid/ /bai/",
      'Agreement': "/ə'gri:mənt/",
      // Thêm mapping từ sample nếu cần
    };
    return romanizationMap[korean] || '';
  };

  // Import từ Quizlet API (đã disable, chỉ hiển thị hướng dẫn fallback)
  const importFromQuizlet = () => {
    toast.error('Quizlet API hiện không khả dụng (lỗi 403 - bị chặn). Vui lòng sử dụng "Import từ Text Export" bên dưới. Hướng dẫn: Vào Quizlet > Set > More > Export > Copy text và dán vào textarea.');
    setQuizletId('');
  };

  // Import từ text export (cải thiện parsing cho TOEIC format)
  const importFromText = () => {
    if (!importText.trim()) {
      setErrors({ importText: 'Vui lòng dán nội dung export từ Quizlet' });
      toast.error('Vui lòng dán nội dung export từ Quizlet');
      return;
    }

    try {
      const lines = importText.split('\n').filter(line => line.trim());
      const terms = lines.map(line => {
        // Parse format TOEIC: Term (V/N/Adj) /pron/ - definition (examples)
        const match = line.match(/^(.*?)(?:\s*\(.*?\/.*?\))?\s*\/(.*?)\/\s*-\s*(.*)$/);
        if (match) {
          const [, korean, pronunciation, rest] = match;
          const vietnamese = rest.split('(')[0].trim(); // Lấy nghĩa chính
          const examples = rest.split(/\n|- /).filter(ex => ex.trim() && ex.includes('To ') || ex.includes('The ')).map(ex => ex.trim());
          return {
            korean: korean.trim(),
            vietnamese,
            pronunciation,
            examples: examples.length > 0 ? examples : [vietnamese],
            image: null,
            audio: null,
            tags: ['toiec'],
          };
        } else {
          // Fallback: tab-separated
          const [korean, vietnamese] = line.split('\t').map(item => item.trim());
          return {
            korean,
            vietnamese,
            pronunciation: generatePronunciation(korean),
            examples: vietnamese.split(';').filter(ex => ex.trim()) || [vietnamese],
            image: null,
            audio: null,
            tags: ['toiec'],
          };
        }
      }).filter(term => term.korean); // Lọc terms hợp lệ

      if (terms.length === 0) {
        throw new Error('Không parse được terms từ text. Kiểm tra format.');
      }

      setImportedTerms(terms);
      toast.success(`Đã import ${terms.length} từ vựng từ text! Chọn từ danh sách để thêm.`);

      // Pre-fill với term đầu tiên
      if (terms.length > 0) {
        const firstTerm = terms[0];
        setFormData({
          ...formData,
          korean: firstTerm.korean,
          pronunciation: firstTerm.pronunciation,
          vietnamese: firstTerm.vietnamese,
          examples: firstTerm.examples,
          tags: firstTerm.tags,
        });
      }

      setImportText('');

    } catch (error) {
      console.error('Lỗi import text:', error);
      const errMsg = 'Lỗi khi xử lý text. Hãy đảm bảo format đúng (term\tdefinition hoặc term /pron/ - definition).';
      setErrors({ importText: errMsg });
      toast.error(errMsg);
    }
  };

  // Load mẫu TOEIC (từ set 80071253)
  const loadSampleToEic = () => {
    setImportedTerms(sampleToEicTerms);
    toast.success(`Đã load ${sampleToEicTerms.length} từ mẫu TOEIC! Chọn từ danh sách để thêm.`);

    // Pre-fill term đầu tiên
    if (sampleToEicTerms.length > 0) {
      const firstTerm = sampleToEicTerms[0];
      setFormData({
        ...formData,
        korean: firstTerm.korean,
        pronunciation: firstTerm.pronunciation,
        vietnamese: firstTerm.vietnamese,
        examples: firstTerm.examples,
        tags: firstTerm.tags,
      });
    }
  };

  // Chọn term từ danh sách import (giữ nguyên)
  const selectImportedTerm = (term) => {
    setFormData({
      ...formData,
      korean: term.korean,
      pronunciation: term.pronunciation || generatePronunciation(term.korean),
      vietnamese: term.vietnamese,
      examples: term.examples,
      image: term.image,
      audio: term.audio,
      tags: term.tags,
    });
    toast.info(`Đã chọn từ: ${term.korean}`);
  };

  // Các hàm khác giữ nguyên (validateForm, handleInputChange, v.v.)
  const validateForm = () => {
    const newErrors = {};

    if (!formData.korean.trim()) newErrors.korean = 'Từ tiếng Hàn là bắt buộc';
    if (!formData.pronunciation.trim()) newErrors.pronunciation = 'Phiên âm là bắt buộc';
    if (!formData.vietnamese.trim()) newErrors.vietnamese = 'Nghĩa tiếng Việt là bắt buộc';
    if (!formData.lessonId) newErrors.lessonId = 'Phải chọn bài học';
    if (formData.examples.filter(ex => ex.trim()).length === 0) newErrors.examples = 'Phải có ít nhất một ví dụ';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleExampleChange = (index, value) => {
    const newExamples = [...formData.examples];
    newExamples[index] = value;
    setFormData(prev => ({ ...prev, examples: newExamples }));
    if (errors.examples) setErrors(prev => ({ ...prev, examples: '' }));
  };

  const addExample = () => {
    setFormData(prev => ({
      ...prev,
      examples: [...prev.examples, '']
    }));
  };

  const removeExample = (index) => {
    if (formData.examples.length > 1) {
      const newExamples = formData.examples.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, examples: newExamples }));
    }
  };

  const addTag = (tag = currentTag) => {
    if (tag.trim() && !formData.tags.includes(tag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()]
      }));
      setCurrentTag('');
      toast.success(`Đã thêm tag: #${tag.trim()}`);
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
    toast.info(`Đã xóa tag: #${tagToRemove}`);
  };

  const handleFileUpload = async (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'image' ? 'image/*' : 'audio/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            [type]: { file, url: e.target.result, name: file.name }
          }));
          toast.success(`Đã tải ${type}: ${file.name}`);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Convert image/audio URLs to files nếu cần (từ import)
      const finalFormData = { ...formData };
      if (formData.image?.url?.startsWith('http')) {
        finalFormData.image = await convertUrlToFile(formData.image.url, formData.image.name, 'image');
      }
      if (formData.audio?.url?.startsWith('http')) {
        finalFormData.audio = await convertUrlToFile(formData.audio.url, formData.audio.name, 'audio');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Created vocabulary:', finalFormData);
      toast.success('Từ vựng đã được tạo thành công!');
      navigate('/admin/dictionary');
    } catch (error) {
      console.error('Error creating vocabulary:', error);
      const errMsg = 'Có lỗi xảy ra khi tạo từ vựng. Vui lòng thử lại.';
      setErrors({ submit: errMsg });
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper: Convert URL to File (giữ nguyên)
  const convertUrlToFile = async (url, name, type) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], name, { type: type === 'image' ? 'image/jpeg' : 'audio/mpeg' });
    } catch (error) {
      console.error(`Lỗi convert ${type} URL:`, error);
      return null;
    }
  };

  const getSelectedLesson = () => {
    return lessons.find(lesson => lesson.id === parseInt(formData.lessonId));
  };

  const renderPreview = () => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Eye className="w-5 h-5 text-blue-500" />
        Xem trước từ vựng
      </h3>
      <div className="space-y-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900 mb-2">{formData.korean || 'Từ vựng'}</div>
          <div className="text-lg text-gray-600 mb-2">[{formData.pronunciation || 'Phiên âm'}]</div>
          <div className="text-lg font-medium text-blue-600">{formData.vietnamese || 'Nghĩa'}</div>
        </div>
        <div className="flex justify-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${partOfSpeechOptions.find(p => p.value === formData.partOfSpeech)?.color || 'bg-gray-100 text-gray-800'}`}>
            {partOfSpeechOptions.find(p => p.value === formData.partOfSpeech)?.label || 'Danh từ'}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${levelOptions.find(l => l.value === formData.level)?.color || 'bg-green-100 text-green-800'}`}>
            {levelOptions.find(l => l.value === formData.level)?.label || 'Sơ cấp'}
          </span>
        </div>
        {formData.image && (
          <div className="text-center">
            <img src={formData.image.url} alt={formData.korean} className="max-w-40 max-h-40 object-cover rounded-lg mx-auto" />
          </div>
        )}
        {formData.audio && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-800">Có file âm thanh</span>
            </div>
          </div>
        )}
        {formData.examples.some(ex => ex.trim()) && (
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Ví dụ:</h4>
            <div className="space-y-2">
              {formData.examples.filter(ex => ex.trim()).map((example, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-700">{example}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {getSelectedLesson() && (
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Bài học:</h4>
            <div className="p-3 bg-gray-100 rounded-lg">
              <div className="text-sm font-medium">{getSelectedLesson().title}</div>
            </div>
          </div>
        )}
        {formData.tags.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Thẻ:</h4>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/admin/dictionary">
              <Button variant="outline" type="button" className="flex items-center gap-3">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Quay lại</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Thêm từ vựng mới</h1>
              <p className="text-gray-600">Tạo hoặc import từ vựng tiếng Hàn/TOEIC từ Quizlet (fallback text export)</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <Button
              onClick={() => setShowPreview(!showPreview)}
              variant={showPreview ? 'primary' : 'outline'}
              className="flex items-center gap-2"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? 'Ẩn xem trước' : 'Xem trước'}
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className={`grid ${showPreview ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}>
            <div className="space-y-6">
              {/* Basic Information */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin cơ bản</h3>

                {/* Import Section - Fallback Focus */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="text-md font-medium text-blue-800 mb-3">Import từ Quizlet (Fallback Text Export)</h4>
                    <p className="text-sm text-blue-700 mb-3" dangerouslySetInnerHTML={{ __html: '<strong>Lưu ý:</strong> Quizlet API bị chặn (lỗi 403). Sử dụng export text từ Quizlet: Vào set &gt; More &gt; Export &gt; Copy và dán vào textarea bên dưới.' }} />
                  <div className="flex gap-2 mb-3">
                    <Input
                      type="text"
                      value={quizletId}
                      onChange={(e) => setQuizletId(e.target.value)}
                      placeholder="ID set (chỉ để tham khảo, hiện không dùng)"
                      disabled
                      className="flex-1 bg-gray-100"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={importFromQuizlet}
                      disabled
                      className="px-4 opacity-50 cursor-not-allowed"
                    >
                      Import API (Tắt)
                    </Button>
                  </div>
                  {errors.quizlet && <p className="text-red-500 text-sm mt-1">{errors.quizlet}</p>}

                  {/* Text Import */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">Dán text export từ Quizlet</h4>
                    <textarea
                      value={importText}
                      onChange={(e) => setImportText(e.target.value)}
                      placeholder="Ví dụ: Abide by\tTo comply with (Tuan theo...)\nAgreement\tAgree (V) Dong y..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                      rows={6}
                    />
                    <Button
                      type="button"
                      variant="primary"
                      onClick={importFromText}
                      className="mt-2"
                    >
                      Import từ Text
                    </Button>
                    {errors.importText && <p className="text-red-500 text-sm mt-1">{errors.importText}</p>}
                  </div>

                  {/* Mẫu TOEIC Button */}
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={loadSampleToEic}
                      className="w-full"
                    >
                      Load Mẫu TOEIC (600 Essential Words - 11 Terms)
                    </Button>
                    <p className="text-xs text-gray-600 mt-1">Tải mẫu từ set ID 80071253 để test nhanh</p>
                  </div>
                </div>

                {/* Imported Terms List */}
                {importedTerms.length > 0 && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="text-md font-medium text-gray-800 mb-3">Từ vựng đã import ({importedTerms.length})</h4>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {importedTerms.map((term, index) => (
                        <div
                          key={index}
                          onClick={() => selectImportedTerm(term)}
                          className="p-3 bg-white rounded-lg border border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors flex justify-between items-center"
                        >
                          <div>
                            <span className="font-medium text-gray-900">{term.korean}</span>
                            <span className="text-gray-600 ml-2">[{term.pronunciation || 'Chưa có'}]</span>
                          </div>
                          <span className="text-sm text-blue-600 truncate max-w-[150px]">{term.vietnamese}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setImportedTerms([])}
                      className="mt-2"
                    >
                      Xóa danh sách
                    </Button>
                  </div>
                )}

                {/* Form Fields */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Từ tiếng Anh/TOEIC <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        value={formData.korean}
                        onChange={(e) => handleInputChange('korean', e.target.value)}
                        placeholder="Ví dụ: Abide by"
                        error={errors.korean}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phiên âm <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        value={formData.pronunciation}
                        onChange={(e) => handleInputChange('pronunciation', e.target.value)}
                        placeholder="Ví dụ: /ə'baid/ /bai/"
                        error={errors.pronunciation}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nghĩa tiếng Việt <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      value={formData.vietnamese}
                      onChange={(e) => handleInputChange('vietnamese', e.target.value)}
                      placeholder="Ví dụ: To comply with (Tuan theo...)"
                      error={errors.vietnamese}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Từ loại</label>
                      <select
                        value={formData.partOfSpeech}
                        onChange={(e) => handleInputChange('partOfSpeech', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {partOfSpeechOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cấp độ</label>
                      <select
                        value={formData.level}
                        onChange={(e) => handleInputChange('level', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {levelOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bài học <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.lessonId}
                        onChange={(e) => handleInputChange('lessonId', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lessonId ? 'border-red-300' : 'border-gray-300'}`}
                      >
                        <option value="">Chọn bài học</option>
                        {lessons.map(lesson => (
                          <option key={lesson.id} value={lesson.id}>
                            {lesson.title}
                          </option>
                        ))}
                      </select>
                      {errors.lessonId && <p className="text-red-500 text-sm mt-1">{errors.lessonId}</p>}
                    </div>
                  </div>

                  {/* Pricing Section */}
                  <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-800 mb-4">Thiết lập giá cả</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Giá (điểm)
                        </label>
                        <Input
                          type="number"
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                          placeholder="0"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Giá gốc (điểm)
                        </label>
                        <Input
                          type="number"
                          value={formData.originalPrice}
                          onChange={(e) => handleInputChange('originalPrice', parseInt(e.target.value) || 0)}
                          placeholder="0"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Điểm cần thiết
                        </label>
                        <Input
                          type="number"
                          value={formData.pointsRequired}
                          onChange={(e) => handleInputChange('pointsRequired', parseInt(e.target.value) || 0)}
                          placeholder="0"
                          min="0"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isFree"
                          checked={formData.isFree}
                          onChange={(e) => {
                            const isFree = e.target.checked;
                            handleInputChange('isFree', isFree);
                            if (isFree) {
                              handleInputChange('price', 0);
                              handleInputChange('originalPrice', 0);
                              handleInputChange('pointsRequired', 0);
                            }
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isFree" className="ml-2 block text-sm text-gray-700">
                          Miễn phí
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => handleInputChange('isActive', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                      Từ vựng đang hoạt động
                    </label>
                  </div>
                </div>
              </Card>

              {/* Examples, Media, Tags - Giữ nguyên */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Ví dụ <span className="text-red-500">*</span>
                  </h3>
                  <Button type="button" variant="outline" size="sm" onClick={addExample}>
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm ví dụ
                  </Button>
                </div>
                {errors.examples && <p className="text-red-500 text-sm mb-3">{errors.examples}</p>}
                <div className="space-y-3">
                  {formData.examples.map((example, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={example}
                        onChange={(e) => handleExampleChange(index, e.target.value)}
                        placeholder={`Ví dụ ${index + 1}: To comply with the rules`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {formData.examples.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeExample(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Phương tiện</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh minh họa</label>
                    {formData.image ? (
                      <div className="relative">
                        <img src={formData.image.url} alt="Preview" className="w-full h-32 object-cover rounded-lg border" />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleFileUpload('image')}
                        className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-colors"
                      >
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Tải lên hình ảnh</p>
                        </div>
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">File âm thanh</label>
                    {formData.audio ? (
                      <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Volume2 className="w-5 h-5 text-blue-500" />
                          <span className="text-sm text-gray-700">{formData.audio.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, audio: null }))}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleFileUpload('audio')}
                        className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-colors"
                      >
                        <div className="text-center">
                          <Volume2 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Tải lên âm thanh</p>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thẻ từ khóa</h3>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        #{tag}
                        <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-600">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Nhập thẻ mới (ví dụ: toiec)..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button type="button" variant="primary" onClick={() => addTag()}>
                    Thêm
                  </Button>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Thẻ gợi ý:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTags.map((tag, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => addTag(tag)}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-blue-100 hover:text-blue-800 transition-colors"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {showPreview && <div className="space-y-6">{renderPreview()}</div>}
          </div>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <XCircle className="w-5 h-5 text-red-400 mr-2" />
                <p className="text-red-800">{errors.submit}</p>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <Link to="/admin/dictionary">
              <Button variant="outline" type="button">
                Hủy
              </Button>
            </Link>
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
                  Tạo từ vựng
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default DictionaryAdd;