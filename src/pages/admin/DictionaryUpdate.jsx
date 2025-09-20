import React, { useState } from 'react';
import { ChevronDown, Edit2, Save, X, Plus } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';

const UpdateDictionary = () => {
  // Mock data cho bài học
  const mockLessons = [
    { id: 1, title: "Bài 1: Greetings and Introductions" },
    { id: 2, title: "Bài 2: Family and Relationships" },
    { id: 3, title: "Bài 3: Food and Drinks" },
    { id: 4, title: "Bài 4: Colors and Shapes" }
  ];

  // Mock data cho từ vựng
  const mockVocabulary = {
    1: [
      { id: 1, word: "Hello", pronunciation: "/həˈloʊ/", meaning: "Xin chào", example: "Hello, how are you?" },
      { id: 2, word: "Goodbye", pronunciation: "/ɡʊdˈbaɪ/", meaning: "Tạm biệt", example: "Goodbye, see you later!" },
      { id: 3, word: "Thank you", pronunciation: "/θæŋk juː/", meaning: "Cảm ơn", example: "Thank you for your help." }
    ],
    2: [
      { id: 4, word: "Mother", pronunciation: "/ˈmʌðər/", meaning: "Mẹ", example: "My mother is a teacher." },
      { id: 5, word: "Father", pronunciation: "/ˈfɑːðər/", meaning: "Bố", example: "My father works in a bank." },
      { id: 6, word: "Sister", pronunciation: "/ˈsɪstər/", meaning: "Chị/Em gái", example: "I have one sister." }
    ],
    3: [
      { id: 7, word: "Apple", pronunciation: "/ˈæpəl/", meaning: "Táo", example: "I eat an apple every day." },
      { id: 8, word: "Water", pronunciation: "/ˈwɔːtər/", meaning: "Nước", example: "Please give me a glass of water." },
      { id: 9, word: "Rice", pronunciation: "/raɪs/", meaning: "Cơm", example: "We eat rice for dinner." }
    ],
    4: [
      { id: 10, word: "Red", pronunciation: "/red/", meaning: "Màu đỏ", example: "The rose is red." },
      { id: 11, word: "Blue", pronunciation: "/bluː/", meaning: "Màu xanh dương", example: "The sky is blue." },
      { id: 12, word: "Circle", pronunciation: "/ˈsɜːrkəl/", meaning: "Hình tròn", example: "Draw a circle on the paper." }
    ]
  };

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedVocab, setSelectedVocab] = useState(null);
  const [editingVocab, setEditingVocab] = useState(null);
  const [vocabulary, setVocabulary] = useState(mockVocabulary);
  const [showLessonDropdown, setShowLessonDropdown] = useState(false);

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setSelectedVocab(null);
    setEditingVocab(null);
    setShowLessonDropdown(false);
  };

  const handleVocabSelect = (vocab) => {
    setSelectedVocab(vocab);
    setEditingVocab({ ...vocab });
  };

  const handleSaveVocab = () => {
    if (!editingVocab || !selectedLesson) return;

    const updatedVocab = { ...vocabulary };
    const lessonVocab = updatedVocab[selectedLesson.id];
    const index = lessonVocab.findIndex(v => v.id === editingVocab.id);
    
    if (index !== -1) {
      lessonVocab[index] = editingVocab;
      setVocabulary(updatedVocab);
      setSelectedVocab(editingVocab);
    }
  };

  const handleCancelEdit = () => {
    setSelectedVocab(null);
    setEditingVocab(null);
  };

  const handleInputChange = (field, value) => {
    setEditingVocab(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getCurrentVocabulary = () => {
    return selectedLesson ? vocabulary[selectedLesson.id] || [] : [];
  };

  return (
    <AdminLayout>
            <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Cập Nhật Từ Vựng</h1>
        
        {/* Lesson Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Chọn Bài Học</h2>
          <div className="relative">
            <button
              onClick={() => setShowLessonDropdown(!showLessonDropdown)}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex justify-between items-center hover:border-blue-400 transition-colors"
            >
              <span className="text-gray-700">
                {selectedLesson ? selectedLesson.title : "Chọn bài học..."}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showLessonDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showLessonDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {mockLessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonSelect(lesson)}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    {lesson.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Vocabulary Table */}
        {selectedLesson && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Từ Vựng - {selectedLesson.title}
            </h2>
            
            {getCurrentVocabulary().length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left text-gray-700 font-medium">Từ vựng</th>
                      <th className="border border-gray-300 px-4 py-3 text-left text-gray-700 font-medium">Phát âm</th>
                      <th className="border border-gray-300 px-4 py-3 text-left text-gray-700 font-medium">Nghĩa</th>
                      <th className="border border-gray-300 px-4 py-3 text-left text-gray-700 font-medium">Ví dụ</th>
                      <th className="border border-gray-300 px-4 py-3 text-center text-gray-700 font-medium">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCurrentVocabulary().map((vocab) => (
                      <tr 
                        key={vocab.id} 
                        className={`hover:bg-blue-50 transition-colors ${selectedVocab?.id === vocab.id ? 'bg-blue-100' : ''}`}
                      >
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{vocab.word}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-600">{vocab.pronunciation}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">{vocab.meaning}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-600 italic">{vocab.example}</td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          <button
                            onClick={() => handleVocabSelect(vocab)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-colors inline-flex items-center gap-1"
                          >
                            <Edit2 className="w-4 h-4" />
                            Sửa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Không có từ vựng nào trong bài học này
              </div>
            )}
          </div>
        )}

        {/* Edit Form */}
        {selectedVocab && editingVocab && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Edit2 className="w-5 h-5" />
              Chỉnh Sửa Từ Vựng
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Từ vựng
                </label>
                <input
                  type="text"
                  value={editingVocab.word}
                  onChange={(e) => handleInputChange('word', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập từ vựng..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phát âm
                </label>
                <input
                  type="text"
                  value={editingVocab.pronunciation}
                  onChange={(e) => handleInputChange('pronunciation', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập phát âm..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nghĩa
                </label>
                <input
                  type="text"
                  value={editingVocab.meaning}
                  onChange={(e) => handleInputChange('meaning', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập nghĩa của từ..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ví dụ
                </label>
                <input
                  type="text"
                  value={editingVocab.example}
                  onChange={(e) => handleInputChange('example', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập câu ví dụ..."
                />
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSaveVocab}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Lưu thay đổi
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Hủy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
};

export default UpdateDictionary;