import React, { useState } from 'react';
import { Plus, Edit, Trash, Star, BookOpen, Tag, Calendar, Upload } from 'lucide-react';
import Card from '../../components/common/Card';
import StudentLayout from '../../components/layout/StudentLayout';

const AddVocabulary = () => {
  const [vocabularyList, setVocabularyList] = useState([]);
  const [formData, setFormData] = useState({
    korean: '',
    vietnamese: '',
    pronunciation: '',
    english: '',
    category: 'all',
    level: 'beginner',
    example: '',
    exampleTranslation: '',
    dateAdded: new Date().toISOString().split('T')[0],
    isFavorite: false
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [importFeedback, setImportFeedback] = useState('');

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'family', name: 'Gia đình' },
    { id: 'food', name: 'Thức ăn' },
    { id: 'travel', name: 'Du lịch' },
    { id: 'business', name: 'Kinh doanh' },
    { id: 'emotions', name: 'Cảm xúc' },
    { id: 'colors', name: 'Màu sắc' },
    { id: 'numbers', name: 'Số đếm' }
  ];

  const levels = [
    { id: 'beginner', name: 'Sơ cấp' },
    { id: 'intermediate', name: 'Trung cấp' },
    { id: 'advanced', name: 'Cao cấp' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddOrUpdateVocabulary = () => {
    if (editingIndex !== null) {
      const updatedList = [...vocabularyList];
      updatedList[editingIndex] = formData;
      setVocabularyList(updatedList);
      setEditingIndex(null);
    } else {
      setVocabularyList([...vocabularyList, formData]);
    }
    setFormData({
      korean: '',
      vietnamese: '',
      pronunciation: '',
      english: '',
      category: 'all',
      level: 'beginner',
      example: '',
      exampleTranslation: '',
      dateAdded: new Date().toISOString().split('T')[0],
      isFavorite: false
    });
  };

  const handleEdit = (index) => {
    setFormData(vocabularyList[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setVocabularyList(vocabularyList.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setFormData({
        korean: '',
        vietnamese: '',
        pronunciation: '',
        english: '',
        category: 'all',
        level: 'beginner',
        example: '',
        exampleTranslation: '',
        dateAdded: new Date().toISOString().split('T')[0],
        isFavorite: false
      });
    }
  };

  const handleFavoriteToggle = (index) => {
    const updatedList = [...vocabularyList];
    updatedList[index].isFavorite = !updatedList[index].isFavorite;
    setVocabularyList(updatedList);
  };

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        let newVocabulary = [];

        if (file.type === 'application/json') {
          newVocabulary = JSON.parse(text).map(item => ({
            ...item,
            dateAdded: item.dateAdded || new Date().toISOString().split('T')[0],
            isFavorite: item.isFavorite || false
          }));
        } else if (file.type === 'text/csv') {
          const lines = text.split('\n').filter(line => line.trim());
          newVocabulary = lines.map(line => {
            const [korean, vietnamese, pronunciation, english, category, level, example, exampleTranslation] = line.split(',');
            return {
              korean: korean.trim() || '',
              vietnamese: vietnamese.trim() || '',
              pronunciation: pronunciation.trim() || '',
              english: english.trim() || '',
              category: category.trim() || 'all',
              level: level.trim() || 'beginner',
              example: example.trim() || '',
              exampleTranslation: exampleTranslation.trim() || '',
              dateAdded: new Date().toISOString().split('T')[0],
              isFavorite: false
            };
          });
        } else {
          setImportFeedback('Định dạng file không hỗ trợ. Vui lòng dùng JSON hoặc CSV.');
          return;
        }

        if (newVocabulary.length > 0) {
          setVocabularyList(prev => [...prev, ...newVocabulary]);
          setImportFeedback('Nhập file thành công!');
          setTimeout(() => setImportFeedback(''), 2000);
        } else {
          setImportFeedback('File không chứa dữ liệu hợp lệ.');
        }
      } catch (error) {
        setImportFeedback('Lỗi khi xử lý file: ' + error.message);
      }
    };
    reader.readAsText(file);
  };

  const handleClearAll = () => {
    setVocabularyList([]);
    setEditingIndex(null);
    setFormData({
      korean: '',
      vietnamese: '',
      pronunciation: '',
      english: '',
      category: 'all',
      level: 'beginner',
      example: '',
      exampleTranslation: '',
      dateAdded: new Date().toISOString().split('T')[0],
      isFavorite: false
    });
    setImportFeedback('');
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tạo từ vựng</h1>
            <p className="text-gray-600">Tạo và quản lý bộ từ vựng của bạn</p>
          </div>
        </div>

        {/* Form */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Thêm từ mới
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tiếng Hàn</label>
              <input
                type="text"
                name="korean"
                value={formData.korean}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập từ tiếng Hàn"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tiếng Việt</label>
              <input
                type="text"
                name="vietnamese"
                value={formData.vietnamese}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập nghĩa tiếng Việt"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tiếng Anh</label>
              <input
                type="text"
                name="english"
                value={formData.english}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập nghĩa tiếng Anh"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Cấp độ</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {levels.map(level => (
                  <option key={level.id} value={level.id}>{level.name}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2 flex items-center space-x-4">
              <button
                onClick={handleAddOrUpdateVocabulary}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {editingIndex !== null ? 'Cập nhật' : 'Thêm'}
              </button>
              {editingIndex !== null && (
                <button
                  onClick={() => {
                    setEditingIndex(null);
                    setFormData({
                      korean: '',
                      vietnamese: '',
                      pronunciation: '',
                      english: '',
                      category: 'all',
                      level: 'beginner',
                      example: '',
                      exampleTranslation: '',
                      dateAdded: new Date().toISOString().split('T')[0],
                      isFavorite: false
                    });
                  }}
                  className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-300"
                >
                  Hủy
                </button>
              )}
              <label className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer">
                <Upload className="w-5 h-5 mr-2" />
                <span>Nhập file</span>
                <input type="file" accept=".json,.csv" onChange={handleFileImport} className="hidden" />
              </label>
              <button
                onClick={handleClearAll}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Xóa tất cả
              </button>
            </div>
            {importFeedback && (
              <p className={`col-span-2 mt-2 text-sm ${importFeedback.includes('thành công') ? 'text-green-600' : 'text-red-600'}`}>
                {importFeedback}
              </p>
            )}
          </div>
        </Card>

        {/* Vocabulary List */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Danh sách từ vựng
          </h3>
          <div className="space-y-4">
            {vocabularyList.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Chưa có từ vựng nào. Hãy thêm từ mới!</p>
              </div>
            ) : (
              vocabularyList.map((word, index) => (
                <div key={index} className="p-4 bg-white rounded-xl shadow-md flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{word.korean}</h3>
                      <button
                        onClick={() => handleFavoriteToggle(index)}
                        className={`p-1 rounded ${
                          word.isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                        }`}
                      >
                        <Star className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-1">{word.vietnamese}</p>
                    <p className="text-sm text-gray-500 mb-2">{word.pronunciation} • {word.english}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Tag className="w-3 h-3" />
                        <span>{categories.find(c => c.id === word.category)?.name}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{levels.find(l => l.id === word.level)?.name}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{word.dateAdded}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleEdit(index)} className="p-2 text-gray-400 hover:text-blue-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(index)} className="p-2 text-gray-400 hover:text-red-600">
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default AddVocabulary;