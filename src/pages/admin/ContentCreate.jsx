import React, { useState, useRef } from 'react';
import { Plus, Trash2, Save, ArrowLeft, Upload, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';

const ContentCreate = () => {
  const navigate = useNavigate();
  const [lesson, setLesson] = useState({
    title: '',
    level: '',
    duration: '',
    videoUrl: '',
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

  const fileInputRef = useRef(null);

  const handleBasicInfoChange = (field, value) => {
    setLesson(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVocabularyChange = (index, field, value) => {
    const updatedVocabulary = [...lesson.vocabulary];
    updatedVocabulary[index][field] = value;
    setLesson(prev => ({
      ...prev,
      vocabulary: updatedVocabulary
    }));
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
          // Parse JSON file
          vocabularyData = JSON.parse(text);
        } else if (file.name.endsWith('.csv')) {
          // Parse CSV file
          const lines = text.split('\n').filter(line => line.trim());
          const headers = lines[0].split(',').map(h => h.trim());
          
          vocabularyData = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
            const vocab = {};
            
            // Map CSV columns to vocabulary fields
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
          setLesson(prev => ({
            ...prev,
            vocabulary: vocabularyData
          }));
          alert(`Đã import thành công ${vocabularyData.length} từ vựng!`);
        } else {
          alert('Không tìm thấy dữ liệu từ vựng hợp lệ trong file!');
        }
      } catch (error) {
        console.error('Error parsing file:', error);
        alert('Lỗi khi đọc file. Vui lòng kiểm tra định dạng file.');
      }
    };
    reader.readAsText(file);
    
    // Reset input
    event.target.value = '';
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
  };

  const handleGrammarExampleChange = (grammarIndex, exampleIndex, value) => {
    const updatedGrammar = [...lesson.grammar];
    updatedGrammar[grammarIndex].examples[exampleIndex] = value;
    setLesson(prev => ({
      ...prev,
      grammar: updatedGrammar
    }));
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
  };

  const handleExerciseOptionChange = (exerciseIndex, optionIndex, value) => {
    const updatedExercises = [...lesson.exercises];
    updatedExercises[exerciseIndex].options[optionIndex] = value;
    setLesson(prev => ({
      ...prev,
      exercises: updatedExercises
    }));
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


  return (
    <AdminLayout>
          <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Tạo Nội Dung Mới</h1>
            </div>
            <button
              onClick={()=> navigate('/admin/content')} 
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Lưu Bài Học
            </button>
          </div>
        </div>

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
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: Bài 1: Chào hỏi cơ bản"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cấp độ *
                </label>
                <select
                  value={lesson.level}
                  onChange={(e) => handleBasicInfoChange('level', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Chọn cấp độ</option>
                  <option value="Sơ cấp 1">Sơ cấp 1</option>
                  <option value="Sơ cấp 2">Sơ cấp 2</option>
                  <option value="Trung cấp 1">Trung cấp 1</option>
                  <option value="Trung cấp 2">Trung cấp 2</option>
                  <option value="Cao cấp">Cao cấp</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thời lượng *
                </label>
                <input
                  type="text"
                  value={lesson.duration}
                  onChange={(e) => handleBasicInfoChange('duration', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: 45 phút"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Video
                </label>
                <input
                  type="url"
                  value={lesson.videoUrl}
                  onChange={(e) => handleBasicInfoChange('videoUrl', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/video.mp4"
                />
              </div>
            </div>
          </div>

          {/* Vocabulary Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Từ Vựng</h2>
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
                    className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Template
                  </button>
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <button
                      type="button"
                      onClick={() => exportVocabularyTemplate('csv')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                    >
                      Tải CSV Template
                    </button>
                    <button
                      type="button"
                      onClick={() => exportVocabularyTemplate('json')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg"
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
              <h3 className="font-medium text-blue-900 mb-2">Hướng dẫn Import:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>CSV:</strong> Các cột: Korean, Vietnamese, Pronunciation, Example</li>
                <li>• <strong>JSON:</strong> Array các object với keys: korean, vietnamese, pronunciation, example</li>
                <li>• Tải template mẫu để xem định dạng chính xác</li>
                <li>• File sẽ thay thế hoàn toàn danh sách từ vựng hiện tại</li>
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
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="안녕하세요"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tiếng Việt *
                      </label>
                      <input
                        type="text"
                        value={vocab.vietnamese}
                        onChange={(e) => handleVocabularyChange(index, 'vietnamese', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Xin chào"
                        required
                      />
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
              <h2 className="text-lg font-semibold text-gray-900">Ngữ Pháp</h2>
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
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Cấu trúc chào hỏi"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Giải thích *
                      </label>
                      <textarea
                        value={grammar.explanation}
                        onChange={(e) => handleGrammarChange(grammarIndex, 'explanation', e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="안녕하세요 được sử dụng để chào hỏi một cách lịch sự"
                        required
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Ví dụ
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
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="안녕하세요, 저는 [이름]입니다. (Xin chào, tôi là [tên])"
                          />
                          <button
                            type="button"
                            onClick={() => removeGrammarExample(grammarIndex, exampleIndex)}
                            className="text-red-600 hover:text-red-700 p-2"
                            disabled={grammar.examples.length === 1}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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
              <h2 className="text-lg font-semibold text-gray-900">Bài Tập</h2>
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
                    <h3 className="font-medium text-gray-900">Bài tập #{index + 1}</h3>
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
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Cách chào hỏi lịch sự trong tiếng Hàn là gì?"
                        required
                      />
                    </div>
                    {exercise.type === 'multiple_choice' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Các lựa chọn *
                        </label>
                        {exercise.options.map((option, optionIndex) => (
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
                              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder={`Lựa chọn ${optionIndex + 1}`}
                              required
                            />
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
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="입니다"
                          required
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default ContentCreate;