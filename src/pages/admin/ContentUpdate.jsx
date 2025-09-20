import AdminLayout from '../../components/layout/AdminLayout';
import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, Save, ArrowLeft, Upload, Download, Loader, Bell } from 'lucide-react';

const ContentUpdate = () => {
  const [lesson, setLesson] = useState({
    id: null,
    title: '',
    level: '',
    duration: '',
    progress: 0,
    videoUrl: '',
    price: 0,
    originalPrice: 0,
    isFree: false,
    pointsRequired: 0,
    vocabulary: [
      {
        korean: '',
        vietnamese: '',
        pronunciation: '',
        example: ''
      }
    ],
    grammar: [
      {
        title: '',
        explanation: '',
        examples: ['']
      }
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: '',
        options: ['', '', '', ''],
        correct: 0
      }
    ]
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const fileInputRef = useRef(null);

  // Mock notifications for lesson updates
  const notifications = [
    { id: 1, message: `Đang chỉnh sửa bài học: ${lesson.title || 'Bài học mới'}.`, type: 'new' },
    { id: 2, message: 'Cần kiểm tra tính hợp lệ của video URL.', type: 'pending' },
    { id: 3, message: 'Cảnh báo: Đảm bảo tất cả từ vựng có ví dụ.', type: 'warning' },
    { id: 4, message: 'Cập nhật bài tập cần xác nhận trước khi lưu.', type: 'urgent' }
  ];

  // Function to get notification styles based on type
  const getNotificationStyle = (type) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-500 animate-pulse';
      case 'warning':
        return 'bg-orange-500';
      case 'violation':
        return 'bg-red-600';
      case 'pending':
        return 'bg-yellow-500';
      case 'new':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Simulate loading existing lesson data (replace with actual API call)
  useEffect(() => {
    const loadLessonData = () => {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const existingLessonData = {
          id: 1,
          title: 'Bài 1: Chào hỏi cơ bản',
          level: 'Sơ cấp 1',
          duration: '45 phút',
          progress: 60,
          videoUrl: 'https://example.com/video.mp4',
          price: 15,
          originalPrice: 20,
          isFree: false,
          pointsRequired: 15,
          vocabulary: [
            {
              korean: '안녕하세요',
              vietnamese: 'Xin chào',
              pronunciation: 'an-nyeong-ha-se-yo',
              example: '안녕하세요, 저는 마이클입니다.'
            },
            {
              korean: '감사합니다',
              vietnamese: 'Cảm ơn',
              pronunciation: 'gam-sa-ham-ni-da',
              example: '감사합니다, 선생님.'
            },
            {
              korean: '안녕히 가세요',
              vietnamese: 'Tạm biệt',
              pronunciation: 'an-nyeong-hi ga-se-yo',
              example: '안녕히 가세요, 내일 봐요.'
            }
          ],
          grammar: [
            {
              title: 'Cấu trúc chào hỏi',
              explanation: '안녕하세요 được sử dụng để chào hỏi một cách lịch sự',
              examples: [
                '안녕하세요, 저는 [이름]입니다. (Xin chào, tôi là [tên])',
                '안녕하세요, 만나서 반갑습니다. (Xin chào, rất vui được gặp bạn)'
              ]
            }
          ],
          exercises: [
            {
              id: 1,
              type: 'multiple_choice',
              question: 'Cách chào hỏi lịch sự trong tiếng Hàn là gì?',
              options: ['안녕', '안녕하세요', '안녕히 가세요', '감사합니다'],
              correct: 1
            },
            {
              id: 2,
              type: 'fill_blank',
              question: 'Điền từ thích hợp: "안녕하세요, 저는 마이클___입니다."',
              answer: '입니다'
            }
          ]
        };
        setLesson(existingLessonData);
        setLoading(false);
      }, 1000);
    };

    loadLessonData();
  }, []);

  // Validate form before saving
  const validateForm = () => {
    const newErrors = {};

    if (!lesson.title.trim()) {
      newErrors.title = 'Tiêu đề bài học không được để trống';
    }

    if (!lesson.level) {
      newErrors.level = 'Vui lòng chọn cấp độ';
    }

    if (!lesson.duration.trim()) {
      newErrors.duration = 'Thời lượng không được để trống';
    }

    if (lesson.videoUrl && !/^(https?:\/\/)/.test(lesson.videoUrl)) {
      newErrors.videoUrl = 'URL video không hợp lệ';
    }

    lesson.vocabulary.forEach((vocab, index) => {
      if (!vocab.korean.trim()) {
        newErrors[`vocab_korean_${index}`] = `Từ vựng tiếng Hàn #${index + 1} không được để trống`;
      }
      if (!vocab.vietnamese.trim()) {
        newErrors[`vocab_vietnamese_${index}`] = `Từ vựng tiếng Việt #${index + 1} không được để trống`;
      }
    });

    lesson.grammar.forEach((grammar, index) => {
      if (!grammar.title.trim()) {
        newErrors[`grammar_title_${index}`] = `Tiêu đề ngữ pháp #${index + 1} không được để trống`;
      }
      if (!grammar.explanation.trim()) {
        newErrors[`grammar_explanation_${index}`] = `Giải thích ngữ pháp #${index + 1} không được để trống`;
      }
      grammar.examples.forEach((example, exIndex) => {
        if (!example.trim()) {
          newErrors[`grammar_example_${index}_${exIndex}`] = `Ví dụ ngữ pháp #${index + 1}.${exIndex + 1} không được để trống`;
        }
      });
    });

    lesson.exercises.forEach((exercise, index) => {
      if (!exercise.question.trim()) {
        newErrors[`exercise_question_${index}`] = `Câu hỏi bài tập #${index + 1} không được để trống`;
      }
      if (exercise.type === 'multiple_choice') {
        exercise.options.forEach((option, optIndex) => {
          if (!option.trim()) {
            newErrors[`exercise_option_${index}_${optIndex}`] = `Lựa chọn #${optIndex + 1} của bài tập #${index + 1} không được để trống`;
          }
        });
      } else if (exercise.type === 'fill_blank' && !exercise.answer?.trim()) {
        newErrors[`exercise_answer_${index}`] = `Đáp án bài tập #${index + 1} không được để trống`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBasicInfoChange = (field, value) => {
    setLesson(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleVocabularyChange = (index, field, value) => {
    const updatedVocabulary = [...lesson.vocabulary];
    updatedVocabulary[index][field] = value;
    setLesson(prev => ({
      ...prev,
      vocabulary: updatedVocabulary
    }));
    if (errors[`vocab_${field}_${index}`]) {
      setErrors(prev => ({ ...prev, [`vocab_${field}_${index}`]: '' }));
    }
  };

  const addVocabulary = () => {
    setLesson(prev => ({
      ...prev,
      vocabulary: [...prev.vocabulary, {
        korean: '',
        vietnamese: '',
        pronunciation: '',
        example: ''
      }]
    }));
  };

  const removeVocabulary = (index) => {
    if (lesson.vocabulary.length > 1) {
      setLesson(prev => ({
        ...prev,
        vocabulary: prev.vocabulary.filter((_, i) => i !== index)
      }));
    }
  };

  // Import vocabulary from file
  const handleImportVocabulary = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        let vocabularyData = [];

        if (file.name.endsWith('.json')) {
          vocabularyData = JSON.parse(text);
        } else if (file.name.endsWith('.csv')) {
          const lines = text.split('\n').filter(line => line.trim());
          const headers = lines[0].split(',').map(h => h.trim());
          
          vocabularyData = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
            const vocab = {};
            
            headers.forEach((header, index) => {
              const normalizedHeader = header.toLowerCase();
              if (normalizedHeader.includes('korean') || normalizedHeader.includes('hàn')) {
                vocab.korean = values[index] || '';
              } else if (normalizedHeader.includes('vietnamese') || normalizedHeader.includes('việt')) {
                vocab.vietnamese = values[index] || '';
              } else if (normalizedHeader.includes('pronunciation') || normalizedHeader.includes('phát âm')) {
                vocab.pronunciation = values[index] || '';
              } else if (normalizedHeader.includes('example') || normalizedHeader.includes('ví dụ')) {
                vocab.example = values[index] || '';
              }
            });

            return {
              korean: vocab.korean || '',
              vietnamese: vocab.vietnamese || '',
              pronunciation: vocab.pronunciation || '',
              example: vocab.example || ''
            };
          }).filter(vocab => vocab.korean || vocab.vietnamese);
        }

        if (vocabularyData.length > 0) {
          const confirmed = window.confirm(
            `Bạn có chắc muốn thay thế ${lesson.vocabulary.length} từ vựng hiện tại bằng ${vocabularyData.length} từ vựng mới?`
          );
          if (confirmed) {
            setLesson(prev => ({
              ...prev,
              vocabulary: vocabularyData
            }));
            alert(`Đã import thành công ${vocabularyData.length} từ vựng!`);
          }
        } else {
          alert('Không tìm thấy dữ liệu từ vựng hợp lệ trong file!');
        }
      } catch (error) {
        console.error('Error parsing file:', error);
        alert('Lỗi khi đọc file. Vui lòng kiểm tra định dạng file.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  // Export current vocabulary
  const exportCurrentVocabulary = (format) => {
    let content = '';
    let filename = '';
    let mimeType = '';

    if (format === 'csv') {
      content = 'Korean,Vietnamese,Pronunciation,Example\n';
      lesson.vocabulary.forEach(vocab => {
        content += `"${vocab.korean}","${vocab.vietnamese}","${vocab.pronunciation}","${vocab.example}"\n`;
      });
      filename = `vocabulary-lesson-${lesson.id || 'current'}.csv`;
      mimeType = 'text/csv';
    } else if (format === 'json') {
      content = JSON.stringify(lesson.vocabulary, null, 2);
      filename = `vocabulary-lesson-${lesson.id || 'current'}.json`;
      mimeType = 'application/json';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Export vocabulary template
  const exportVocabularyTemplate = (format) => {
    let content = '';
    let filename = '';
    let mimeType = '';

    if (format === 'csv') {
      content = 'Korean,Vietnamese,Pronunciation,Example\n';
      content += '안녕하세요,Xin chào,an-nyeong-ha-se-yo,"안녕하세요, 저는 마이클입니다."\n';
      content += '감사합니다,Cảm ơn,gam-sa-ham-ni-da,"감사합니다, 선생님."\n';
      filename = 'vocabulary-template.csv';
      mimeType = 'text/csv';
    } else if (format === 'json') {
      const template = [
        {
          korean: '안녕하세요',
          vietnamese: 'Xin chào',
          pronunciation: 'an-nyeong-ha-se-yo',
          example: '안녕하세요, 저는 마이클입니다.'
        },
        {
          korean: '감사합니다',
          vietnamese: 'Cảm ơn',
          pronunciation: 'gam-sa-ham-ni-da',
          example: '감사합니다, 선생님.'
        }
      ];
      content = JSON.stringify(template, null, 2);
      filename = 'vocabulary-template.json';
      mimeType = 'application/json';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGrammarChange = (index, field, value) => {
    const updatedGrammar = [...lesson.grammar];
    updatedGrammar[index][field] = value;
    setLesson(prev => ({
      ...prev,
      grammar: updatedGrammar
    }));
    if (errors[`grammar_${field}_${index}`]) {
      setErrors(prev => ({ ...prev, [`grammar_${field}_${index}`]: '' }));
    }
  };

  const handleGrammarExampleChange = (grammarIndex, exampleIndex, value) => {
    const updatedGrammar = [...lesson.grammar];
    updatedGrammar[grammarIndex].examples[exampleIndex] = value;
    setLesson(prev => ({
      ...prev,
      grammar: updatedGrammar
    }));
    if (errors[`grammar_example_${grammarIndex}_${exampleIndex}`]) {
      setErrors(prev => ({ ...prev, [`grammar_example_${grammarIndex}_${exampleIndex}`]: '' }));
    }
  };

  const addGrammarExample = (grammarIndex) => {
    const updatedGrammar = [...lesson.grammar];
    updatedGrammar[grammarIndex].examples.push('');
    setLesson(prev => ({
      ...prev,
      grammar: updatedGrammar
    }));
  };

  const removeGrammarExample = (grammarIndex, exampleIndex) => {
    const updatedGrammar = [...lesson.grammar];
    if (updatedGrammar[grammarIndex].examples.length > 1) {
      updatedGrammar[grammarIndex].examples.splice(exampleIndex, 1);
      setLesson(prev => ({
        ...prev,
        grammar: updatedGrammar
      }));
    }
  };

  const addGrammar = () => {
    setLesson(prev => ({
      ...prev,
      grammar: [...prev.grammar, {
        title: '',
        explanation: '',
        examples: ['']
      }]
    }));
  };

  const removeGrammar = (index) => {
    if (lesson.grammar.length > 1) {
      setLesson(prev => ({
        ...prev,
        grammar: prev.grammar.filter((_, i) => i !== index)
      }));
    }
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...lesson.exercises];
    updatedExercises[index][field] = value;
    setLesson(prev => ({
      ...prev,
      exercises: updatedExercises
    }));
    if (errors[`exercise_${field}_${index}`]) {
      setErrors(prev => ({ ...prev, [`exercise_${field}_${index}`]: '' }));
    }
  };

  const handleExerciseOptionChange = (exerciseIndex, optionIndex, value) => {
    const updatedExercises = [...lesson.exercises];
    updatedExercises[exerciseIndex].options[optionIndex] = value;
    setLesson(prev => ({
      ...prev,
      exercises: updatedExercises
    }));
    if (errors[`exercise_option_${exerciseIndex}_${optionIndex}`]) {
      setErrors(prev => ({ ...prev, [`exercise_option_${exerciseIndex}_${optionIndex}`]: '' }));
    }
  };

  const addExercise = () => {
    setLesson(prev => ({
      ...prev,
      exercises: [...prev.exercises, {
        type: 'multiple_choice',
        question: '',
        options: ['', '', '', ''],
        correct: 0
      }]
    }));
  };

  const removeExercise = (index) => {
    if (lesson.exercises.length > 1) {
      setLesson(prev => ({
        ...prev,
        exercises: prev.exercises.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Vui lòng kiểm tra và điền đầy đủ các trường bắt buộc!');
      return;
    }

    setSaving(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Updated lesson data:', lesson);
      alert('Bài học đã được cập nhật thành công!');
    } catch (error) {
      console.error('Error saving lesson:', error);
      alert('Có lỗi xảy ra khi cập nhật bài học!');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Đang tải dữ liệu bài học...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
            <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Cập Nhật Nội Dung</h1>
                <p className="text-gray-600 mt-1">ID: {lesson.id || 'Mới'} • Tiến độ: {lesson.progress}%</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <div className="relative">
                <div
                  className="relative cursor-pointer"
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                >
                  <Bell className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  {notifications.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
                    <div className="py-2">
                      <h3 className="px-4 py-2 text-sm font-semibold text-gray-700">
                        Thông báo ({notifications.length})
                      </h3>
                      <div className="max-h-60 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="px-4 py-2 text-sm text-gray-500">
                            Không có thông báo
                          </p>
                        ) : (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            >
                              <span
                                className={`w-2 h-2 rounded-full mr-2 ${getNotificationStyle(
                                  notification.type
                                )}`}
                              ></span>
                              <span>{notification.message}</span>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="px-4 py-2 text-sm text-blue-500 hover:text-blue-700 cursor-pointer border-t">
                        Xóa tất cả thông báo
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Save Button */}
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Cập Nhật Bài Học
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              <span>Vui lòng kiểm tra và sửa các lỗi sau:</span>
            </div>
            <ul className="mt-2 text-sm text-red-600 list-disc pl-5">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông Tin Cơ Bản</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề bài học *
                </label>
                <input
                  type="text"
                  value={lesson.title}
                  onChange={(e) => handleBasicInfoChange('title', e.target.value)}
                  className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ví dụ: Bài 1: Chào hỏi cơ bản"
                  required
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cấp độ *
                </label>
                <select
                  value={lesson.level}
                  onChange={(e) => handleBasicInfoChange('level', e.target.value)}
                  className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.level ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Chọn cấp độ</option>
                  <option value="Sơ cấp 1">Sơ cấp 1</option>
                  <option value="Sơ cấp 2">Sơ cấp 2</option>
                  <option value="Trung cấp 1">Trung cấp 1</option>
                  <option value="Trung cấp 2">Trung cấp 2</option>
                  <option value="Cao cấp">Cao cấp</option>
                </select>
                {errors.level && (
                  <p className="mt-1 text-sm text-red-600">{errors.level}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thời lượng *
                </label>
                <input
                  type="text"
                  value={lesson.duration}
                  onChange={(e) => handleBasicInfoChange('duration', e.target.value)}
                  className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.duration ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ví dụ: 45 phút"
                  required
                />
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Video
                </label>
                <input
                  type="url"
                  value={lesson.videoUrl}
                  onChange={(e) => handleBasicInfoChange('videoUrl', e.target.value)}
                  className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.videoUrl ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="https://example.com/video.mp4"
                />
                {errors.videoUrl && (
                  <p className="mt-1 text-sm text-red-600">{errors.videoUrl}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiến độ (%)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={lesson.progress}
                    onChange={(e) => handleBasicInfoChange('progress', parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-16 text-center bg-gray-100 rounded px-3 py-1 text-sm font-medium">
                    {lesson.progress}%
                  </span>
                </div>
              </div>
            </div>
            
            {/* Pricing Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá (điểm)
                </label>
                <input
                  type="number"
                  value={lesson.price}
                  onChange={(e) => handleBasicInfoChange('price', parseInt(e.target.value) || 0)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá gốc (điểm)
                </label>
                <input
                  type="number"
                  value={lesson.originalPrice}
                  onChange={(e) => handleBasicInfoChange('originalPrice', parseInt(e.target.value) || 0)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Điểm cần thiết
                </label>
                <input
                  type="number"
                  value={lesson.pointsRequired}
                  onChange={(e) => handleBasicInfoChange('pointsRequired', parseInt(e.target.value) || 0)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFree"
                  checked={lesson.isFree}
                  onChange={(e) => {
                    const isFree = e.target.checked;
                    handleBasicInfoChange('isFree', isFree);
                    if (isFree) {
                      handleBasicInfoChange('price', 0);
                      handleBasicInfoChange('originalPrice', 0);
                      handleBasicInfoChange('pointsRequired', 0);
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

          {/* Vocabulary Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Từ Vựng ({lesson.vocabulary.length} từ)</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4" />
                    Import File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.json"
                    onChange={handleImportVocabulary}
                    className="hidden"
                  />
                </div>
                <div className="relative group">
                  <button
                    type="button"
                    className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <button
                      type="button"
                      onClick={() => exportCurrentVocabulary('csv')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg whitespace-nowrap"
                    >
                      Xuất CSV hiện tại
                    </button>
                    <button
                      type="button"
                      onClick={() => exportCurrentVocabulary('json')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                    >
                      Xuất JSON hiện tại
                    </button>
                    <hr className="my-1" />
                    <button
                      type="button"
                      onClick={() => exportVocabularyTemplate('csv')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                    >
                      Tải CSV Template
                    </button>
                    <button
                      type="button"
                      onClick={() => exportVocabularyTemplate('json')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg whitespace-nowrap"
                    >
                      Tải JSON Template
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addVocabulary}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Thêm Từ Vựng
                </button>
              </div>
            </div>
            
            {/* Import Instructions */}
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Hướng dẫn:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Import:</strong> Thay thế toàn bộ từ vựng hiện tại</li>
                <li>• <strong>Export hiện tại:</strong> Tải về từ vựng đang có trong bài học</li>
                <li>• <strong>Template:</strong> File mẫu để tham khảo định dạng</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              {lesson.vocabulary.map((vocab, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">Từ vựng #{index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeVocabulary(index)}
                      className="text-red-600 hover:text-red-700 p-1"
                      disabled={lesson.vocabulary.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tiếng Hàn *
                      </label>
                      <input
                        type="text"
                        value={vocab.korean}
                        onChange={(e) => handleVocabularyChange(index, 'korean', e.target.value)}
                        className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors[`vocab_korean_${index}`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="안녕하세요"
                        required
                      />
                      {errors[`vocab_korean_${index}`] && (
                        <p className="mt-1 text-sm text-red-600">{errors[`vocab_korean_${index}`]}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tiếng Việt *
                      </label>
                      <input
                        type="text"
                        value={vocab.vietnamese}
                        onChange={(e) => handleVocabularyChange(index, 'vietnamese', e.target.value)}
                        className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors[`vocab_vietnamese_${index}`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Xin chào"
                        required
                      />
                      {errors[`vocab_vietnamese_${index}`] && (
                        <p className="mt-1 text-sm text-red-600">{errors[`vocab_vietnamese_${index}`]}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phát âm
                      </label>
                      <input
                        type="text"
                        value={vocab.pronunciation}
                        onChange={(e) => handleVocabularyChange(index, 'pronunciation', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="an-nyeong-ha-se-yo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ví dụ
                      </label>
                      <input
                        type="text"
                        value={vocab.example}
                        onChange={(e) => handleVocabularyChange(index, 'example', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="안녕하세요, 저는 마이클입니다."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grammar Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Ngữ Pháp ({lesson.grammar.length} mục)</h2>
              <button
                type="button"
                onClick={addGrammar}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Thêm Ngữ Pháp
              </button>
            </div>
            <div className="space-y-4">
              {lesson.grammar.map((grammar, grammarIndex) => (
                <div key={grammarIndex} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">Ngữ pháp #{grammarIndex + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeGrammar(grammarIndex)}
                      className="text-red-600 hover:text-red-700 p-1"
                      disabled={lesson.grammar.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tiêu đề *
                      </label>
                      <input
                        type="text"
                        value={grammar.title}
                        onChange={(e) => handleGrammarChange(grammarIndex, 'title', e.target.value)}
                        className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors[`grammar_title_${grammarIndex}`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Cấu trúc chào hỏi"
                        required
                      />
                      {errors[`grammar_title_${grammarIndex}`] && (
                        <p className="mt-1 text-sm text-red-600">{errors[`grammar_title_${grammarIndex}`]}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Giải thích *
                      </label>
                      <textarea
                        value={grammar.explanation}
                        onChange={(e) => handleGrammarChange(grammarIndex, 'explanation', e.target.value)}
                        rows={3}
                        className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors[`grammar_explanation_${grammarIndex}`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="안녕하세요 được sử dụng để chào hỏi một cách lịch sự"
                        required
                      />
                      {errors[`grammar_explanation_${grammarIndex}`] && (
                        <p className="mt-1 text-sm text-red-600">{errors[`grammar_explanation_${grammarIndex}`]}</p>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Ví dụ *
                        </label>
                        <button
                          type="button"
                          onClick={() => addGrammarExample(grammarIndex)}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          + Thêm ví dụ
                        </button>
                      </div>
                      {grammar.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={example}
                            onChange={(e) => handleGrammarExampleChange(grammarIndex, exampleIndex, e.target.value)}
                            className={`flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors[`grammar_example_${grammarIndex}_${exampleIndex}`] ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="안녕하세요, 저는 [이름]입니다. (Xin chào, tôi là [tên])"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => removeGrammarExample(grammarIndex, exampleIndex)}
                            className="text-red-600 hover:text-red-700 p-2"
                            disabled={grammar.examples.length === 1}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          {errors[`grammar_example_${grammarIndex}_${exampleIndex}`] && (
                            <p className="mt-1 text-sm text-red-600">{errors[`grammar_example_${grammarIndex}_${exampleIndex}`]}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exercises Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Bài Tập ({lesson.exercises.length} bài)</h2>
              <button
                type="button"
                onClick={addExercise}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Thêm Bài Tập
              </button>
            </div>
            <div className="space-y-4">
              {lesson.exercises.map((exercise, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">
                      Bài tập #{index + 1} 
                      {exercise.id && <span className="text-sm text-gray-500 ml-2">(ID: {exercise.id})</span>}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeExercise(index)}
                      className="text-red-600 hover:text-red-700 p-1"
                      disabled={lesson.exercises.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loại bài tập *
                      </label>
                      <select
                        value={exercise.type}
                        onChange={(e) => handleExerciseChange(index, 'type', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="multiple_choice">Trắc nghiệm</option>
                        <option value="fill_blank">Điền từ</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Câu hỏi *
                      </label>
                      <textarea
                        value={exercise.question}
                        onChange={(e) => handleExerciseChange(index, 'question', e.target.value)}
                        rows={2}
                        className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors[`exercise_question_${index}`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Cách chào hỏi lịch sự trong tiếng Hàn là gì?"
                        required
                      />
                      {errors[`exercise_question_${index}`] && (
                        <p className="mt-1 text-sm text-red-600">{errors[`exercise_question_${index}`]}</p>
                      )}
                    </div>
                    {exercise.type === 'multiple_choice' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Các lựa chọn *
                        </label>
                        {exercise.options?.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex gap-2 mb-2">
                            <input
                              type="radio"
                              name={`correct-${index}`}
                              checked={exercise.correct === optionIndex}
                              onChange={() => handleExerciseChange(index, 'correct', optionIndex)}
                              className="mt-2"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => handleExerciseOptionChange(index, optionIndex, e.target.value)}
                              className={`flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors[`exercise_option_${index}_${optionIndex}`] ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder={`Lựa chọn ${optionIndex + 1}`}
                              required
                            />
                            {errors[`exercise_option_${index}_${optionIndex}`] && (
                              <p className="mt-1 text-sm text-red-600">{errors[`exercise_option_${index}_${optionIndex}`]}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {exercise.type === 'fill_blank' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Đáp án *
                        </label>
                        <input
                          type="text"
                          value={exercise.answer || ''}
                          onChange={(e) => handleExerciseChange(index, 'answer', e.target.value)}
                          className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors[`exercise_answer_${index}`] ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="입니다"
                          required
                        />
                        {errors[`exercise_answer_${index}`] && (
                          <p className="mt-1 text-sm text-red-600">{errors[`exercise_answer_${index}`]}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Update History */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Lịch Sử Cập Nhật</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Tạo bài học</p>
                  <p className="text-sm text-gray-600">Admin • 15/03/2024 10:30</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Tạo mới
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Cập nhật từ vựng</p>
                  <p className="text-sm text-gray-600">Admin • 16/03/2024 14:15</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Chỉnh sửa
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Thêm bài tập mới</p>
                  <p className="text-sm text-gray-600">Admin • 17/03/2024 09:45</p>
                </div>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                  Bổ sung
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default ContentUpdate;