import React, { useState } from 'react';
import { 
  FileText, 
  Calendar,
  Clock,
  Users,
  Award,
  Target,
  Plus,
  X,
  Save,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const ExamMaterialAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'beginner',
    duration: 60,
    totalQuestions: 50,
    passingScore: 70,
    startDate: '',
    endDate: '',
    status: 'draft',
    entryFee: 0,
    totalPrize: 0,
    instructions: '',
    rules: [],
    image: '',
    thumbnail: '',
    questions: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    type: 'multiple-choice',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 1,
    explanation: ''
  });

  const levels = [
    { id: 'beginner', name: 'Cơ bản', color: 'bg-green-100 text-green-800' },
    { id: 'intermediate', name: 'Trung cấp', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'advanced', name: 'Nâng cao', color: 'bg-red-100 text-red-800' }
  ];

  const statusOptions = [
    { id: 'draft', name: 'Nháp', color: 'bg-gray-100 text-gray-800' },
    { id: 'upcoming', name: 'Sắp diễn ra', color: 'bg-blue-100 text-blue-800' },
    { id: 'active', name: 'Đang diễn ra', color: 'bg-green-100 text-green-800' },
    { id: 'completed', name: 'Đã hoàn thành', color: 'bg-purple-100 text-purple-800' }
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

  const handleRuleAdd = (rule) => {
    if (rule && !formData.rules.includes(rule)) {
      setFormData(prev => ({
        ...prev,
        rules: [...prev.rules, rule]
      }));
    }
  };

  const handleRuleRemove = (ruleToRemove) => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.filter(rule => rule !== ruleToRemove)
    }));
  };

  const handleQuestionAdd = () => {
    if (newQuestion.question.trim() && newQuestion.options.every(opt => opt.trim())) {
      const question = {
        id: Date.now(),
        ...newQuestion,
        options: newQuestion.options.filter(opt => opt.trim())
      };
      setFormData(prev => ({
        ...prev,
        questions: [...prev.questions, question],
        totalQuestions: prev.questions.length + 1
      }));
      setNewQuestion({
        question: '',
        type: 'multiple-choice',
        options: ['', '', '', ''],
        correctAnswer: 0,
        points: 1,
        explanation: ''
      });
    }
  };

  const handleQuestionRemove = (questionId) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId),
      totalQuestions: prev.questions.length - 1
    }));
  };

  const handleQuestionChange = (field, value) => {
    setNewQuestion(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOptionChange = (index, value) => {
    setNewQuestion(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Tên kỳ thi là bắt buộc';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Mô tả là bắt buộc';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Ngày bắt đầu là bắt buộc';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'Ngày kết thúc là bắt buộc';
    }

    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
    }

    if (formData.duration < 15 || formData.duration > 180) {
      newErrors.duration = 'Thời gian phải từ 15-180 phút';
    }

    if (formData.totalQuestions < 10 || formData.totalQuestions > 100) {
      newErrors.totalQuestions = 'Số câu hỏi phải từ 10-100';
    }

    if (formData.passingScore < 0 || formData.passingScore > 100) {
      newErrors.passingScore = 'Điểm đạt phải từ 0-100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      
      // Success - redirect to exam management
      navigate('/admin/exams');
    } catch (error) {
      console.error('Error creating exam:', error);
    } finally {
      setIsSubmitting(false);
    }
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

  const getStatusBadge = (statusId) => {
    const status = statusOptions.find(s => s.id === statusId);
    if (!status) return null;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${status.color}`}>
        {status.name}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/exams')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tạo kỳ thi mới</h1>
              <p className="text-gray-600">Thiết lập và cấu hình kỳ thi</p>
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
                      Tên kỳ thi *
                    </label>
                    <Input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Nhập tên kỳ thi"
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
                      placeholder="Nhập mô tả chi tiết về kỳ thi"
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Trạng thái
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {statusOptions.map(status => (
                          <option key={status.id} value={status.id}>{status.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Exam Configuration */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cấu hình kỳ thi</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thời gian (phút) *
                      </label>
                      <Input
                        type="number"
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                        min="15"
                        max="180"
                        className={errors.duration ? 'border-red-500' : ''}
                      />
                      {errors.duration && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.duration}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số câu hỏi *
                      </label>
                      <Input
                        type="number"
                        value={formData.totalQuestions}
                        onChange={(e) => handleInputChange('totalQuestions', parseInt(e.target.value))}
                        min="10"
                        max="100"
                        className={errors.totalQuestions ? 'border-red-500' : ''}
                      />
                      {errors.totalQuestions && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.totalQuestions}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Điểm đạt *
                      </label>
                      <Input
                        type="number"
                        value={formData.passingScore}
                        onChange={(e) => handleInputChange('passingScore', parseInt(e.target.value))}
                        min="0"
                        max="100"
                        className={errors.passingScore ? 'border-red-500' : ''}
                      />
                      {errors.passingScore && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.passingScore}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phí tham gia (VNĐ)
                      </label>
                      <Input
                        type="number"
                        value={formData.entryFee}
                        onChange={(e) => handleInputChange('entryFee', parseInt(e.target.value) || 0)}
                        min="0"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tổng giải thưởng (VNĐ)
                      </label>
                      <Input
                        type="number"
                        value={formData.totalPrize}
                        onChange={(e) => handleInputChange('totalPrize', parseInt(e.target.value) || 0)}
                        min="0"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Schedule */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lịch trình</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ngày bắt đầu *
                      </label>
                      <Input
                        type="datetime-local"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        className={errors.startDate ? 'border-red-500' : ''}
                      />
                      {errors.startDate && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.startDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ngày kết thúc *
                      </label>
                      <Input
                        type="datetime-local"
                        value={formData.endDate}
                        onChange={(e) => handleInputChange('endDate', e.target.value)}
                        className={errors.endDate ? 'border-red-500' : ''}
                      />
                      {errors.endDate && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.endDate}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Image Upload */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hình ảnh kỳ thi</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL hình ảnh
                    </label>
                    <Input
                      type="url"
                      value={formData.image}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  {formData.image && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Xem trước hình ảnh
                      </label>
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-300">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500 hidden">
                          Không thể tải hình ảnh
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Questions Management */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quản lý câu hỏi</h3>
                <div className="space-y-6">
                  {/* Add New Question */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-md font-medium text-gray-800 mb-4">Thêm câu hỏi mới</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Câu hỏi *
                        </label>
                        <textarea
                          value={newQuestion.question}
                          onChange={(e) => handleQuestionChange('question', e.target.value)}
                          placeholder="Nhập câu hỏi..."
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Loại câu hỏi
                          </label>
                          <select
                            value={newQuestion.type}
                            onChange={(e) => handleQuestionChange('type', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="multiple-choice">Trắc nghiệm</option>
                            <option value="true-false">Đúng/Sai</option>
                            <option value="fill-blank">Điền vào chỗ trống</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Điểm số *
                          </label>
                          <Input
                            type="number"
                            value={newQuestion.points}
                            onChange={(e) => handleQuestionChange('points', parseInt(e.target.value) || 1)}
                            min="1"
                            max="10"
                          />
                        </div>
                      </div>

                      {/* Options for multiple choice */}
                      {newQuestion.type === 'multiple-choice' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Các lựa chọn *
                          </label>
                          <div className="space-y-2">
                            {newQuestion.options.map((option, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name="correctAnswer"
                                  checked={newQuestion.correctAnswer === index}
                                  onChange={() => handleQuestionChange('correctAnswer', index)}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <Input
                                  type="text"
                                  value={option}
                                  onChange={(e) => handleOptionChange(index, e.target.value)}
                                  placeholder={`Lựa chọn ${index + 1}`}
                                  className="flex-1"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* True/False options */}
                      {newQuestion.type === 'true-false' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Đáp án đúng
                          </label>
                          <div className="flex space-x-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="correctAnswer"
                                checked={newQuestion.correctAnswer === 0}
                                onChange={() => handleQuestionChange('correctAnswer', 0)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              />
                              <span className="ml-2 text-sm text-gray-700">Đúng</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="correctAnswer"
                                checked={newQuestion.correctAnswer === 1}
                                onChange={() => handleQuestionChange('correctAnswer', 1)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              />
                              <span className="ml-2 text-sm text-gray-700">Sai</span>
                            </label>
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Giải thích (tùy chọn)
                        </label>
                        <textarea
                          value={newQuestion.explanation}
                          onChange={(e) => handleQuestionChange('explanation', e.target.value)}
                          placeholder="Giải thích cho đáp án..."
                          rows="2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <Button
                        type="button"
                        variant="primary"
                        onClick={handleQuestionAdd}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Thêm câu hỏi
                      </Button>
                    </div>
                  </div>

                  {/* Questions List */}
                  {formData.questions.length > 0 && (
                    <div>
                      <h4 className="text-md font-medium text-gray-800 mb-4">
                        Danh sách câu hỏi ({formData.questions.length})
                      </h4>
                      <div className="space-y-3">
                        {formData.questions.map((question, index) => (
                          <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-sm font-medium text-gray-600">
                                    Câu {index + 1}:
                                  </span>
                                  <span className="text-sm text-blue-600 font-medium">
                                    {question.points} điểm
                                  </span>
                                </div>
                                <p className="text-sm text-gray-900 mb-2">{question.question}</p>
                                
                                {question.type === 'multiple-choice' && (
                                  <div className="space-y-1">
                                    {question.options.map((option, optIndex) => (
                                      <div key={optIndex} className="flex items-center space-x-2">
                                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                                          optIndex === question.correctAnswer 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-gray-100 text-gray-600'
                                        }`}>
                                          {String.fromCharCode(65 + optIndex)}
                                        </span>
                                        <span className={`text-sm ${
                                          optIndex === question.correctAnswer 
                                            ? 'text-green-800 font-medium' 
                                            : 'text-gray-600'
                                        }`}>
                                          {option}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {question.type === 'true-false' && (
                                  <div className="text-sm text-gray-600">
                                    Đáp án: {question.correctAnswer === 0 ? 'Đúng' : 'Sai'}
                                  </div>
                                )}

                                {question.explanation && (
                                  <div className="mt-2 text-xs text-gray-500">
                                    <strong>Giải thích:</strong> {question.explanation}
                                  </div>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => handleQuestionRemove(question.id)}
                                className="text-red-600 hover:text-red-800 ml-2"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Instructions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hướng dẫn</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hướng dẫn làm bài
                    </label>
                    <textarea
                      value={formData.instructions}
                      onChange={(e) => handleInputChange('instructions', e.target.value)}
                      placeholder="Nhập hướng dẫn chi tiết cho thí sinh"
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quy định
                    </label>
                    <div className="flex space-x-2">
                      <Input
                        type="text"
                        placeholder="Nhập quy định và nhấn Enter"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleRuleAdd(e.target.value.trim());
                            e.target.value = '';
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const input = document.querySelector('input[placeholder="Nhập quy định và nhấn Enter"]');
                          if (input.value.trim()) {
                            handleRuleAdd(input.value.trim());
                            input.value = '';
                          }
                        }}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {formData.rules.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {formData.rules.map((rule, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                              <span className="text-sm text-gray-900">{rule}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRuleRemove(rule)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Preview */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Xem trước</h3>
                <div className="space-y-3">
                  {/* Image Preview */}
                  {formData.image && (
                    <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-300">
                      <img
                        src={formData.image}
                        alt="Exam preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500 hidden">
                        <FileText className="w-8 h-8" />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {formData.title || 'Tên kỳ thi'}
                      </div>
                      <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {formData.description || 'Mô tả kỳ thi'}
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        {getLevelBadge(formData.level)}
                        {getStatusBadge(formData.status)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{formData.duration} phút</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      <span>{formData.totalQuestions} câu hỏi</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      <span>Điểm đạt: {formData.passingScore}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Stats */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống kê nhanh</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Thời gian:</span>
                    <span className="text-sm font-medium text-gray-900">{formData.duration} phút</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Câu hỏi:</span>
                    <span className="text-sm font-medium text-gray-900">{formData.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Điểm đạt:</span>
                    <span className="text-sm font-medium text-gray-900">{formData.passingScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Phí tham gia:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formData.entryFee === 0 ? 'Miễn phí' : `${formData.entryFee.toLocaleString()}đ`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Giải thưởng:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formData.totalPrize === 0 ? 'Không có' : `${formData.totalPrize.toLocaleString()}đ`}
                    </span>
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
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Đang tạo...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Tạo kỳ thi
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/admin/exams')}
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

export default ExamMaterialAdd;
