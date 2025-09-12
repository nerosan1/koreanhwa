import React, { useState } from 'react';
import { CheckCircle, XCircle, Minus, MessageCircle, Edit3, Trash2, Send } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import StudentLayout from '../../components/layout/StudentLayout';
import { useNavigate } from 'react-router-dom';
import QuestionItem from '../../components/common/QuestionItem';// Import component mới
import AnswerTestResult from './AnswerTestForm';

export default function KoreanTestDashboard() {
  const navigate = useNavigate();
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Nguyễn Minh",
      avatar: "NM",
      content: "Mình thấy phần ngữ pháp về thì khá khó, có ai có tips không?",
      time: "2 giờ trước",
      isEditing: false
    },
    {
      id: 2,
      user: "Lê Thu Hà",
      avatar: "LH",
      content: "Cảm ơn bài test này, giúp mình nhận ra điểm yếu về danh từ. Sẽ ôn lại phần này!",
      time: "3 giờ trước",
      isEditing: false
    },
    {
      id: 3,
      user: "Park Min Soo",
      avatar: "PM",
      content: "한국어 문법이 정말 어려워요. 더 열심히 공부해야겠어요!",
      time: "5 giờ trước",
      isEditing: false
    }
  ]);
  
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState("");

  const testData = [
    {
      category: '[문법] Giới từ',
      correct: 0,
      wrong: 1,
      skipped: 0,
      accuracy: '0.00%',
      questions: [105]
    },
    {
      category: '[문법] Thì',
      correct: 2,
      wrong: 0,
      skipped: 0,
      accuracy: '100.00%',
      questions: [101, 102]
    },
    {
      category: '[문법] Danh từ',
      correct: 4,
      wrong: 2,
      skipped: 0,
      accuracy: '66.67%',
      questions: [103, 104, 125, 126, 127, 129]
    },
    {
      category: '[문법] Động từ nguyên mẫu có to',
      correct: 1,
      wrong: 0,
      skipped: 0,
      accuracy: '100.00%',
      questions: [128]
    },
    {
      category: '[문법] Cấu trúc so sánh',
      correct: 0,
      wrong: 2,
      skipped: 0,
      accuracy: '0.00%',
      questions: [115, 124]
    }
  ];

  // Data for charts
  const pieData = [
    { name: 'Đúng', value: 22, color: '#10B981' },
    { name: 'Sai', value: 8, color: '#EF4444' }
  ];

  const barData = testData.map(item => ({
    category: item.category.replace('[문법] ', ''),
    correct: item.correct,
    wrong: item.wrong,
    accuracy: parseFloat(item.accuracy)
  }));

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        user: "Bạn",
        avatar: "B",
        content: newComment,
        time: "Vừa xong",
        isEditing: false
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleEditComment = (id) => {
    setComments(comments.map(comment => 
      comment.id === id 
        ? { ...comment, isEditing: !comment.isEditing }
        : comment
    ));
    const comment = comments.find(c => c.id === id);
    if (comment) {
      setEditingComment(comment.content);
    }
  };

  const handleSaveEdit = (id) => {
    setComments(comments.map(comment => 
      comment.id === id 
        ? { ...comment, content: editingComment, isEditing: false }
        : comment
    ));
    setEditingComment("");
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  return (
    <StudentLayout>
      <div className="max-w-6xl mx-auto p-6 bg-white">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-black mb-4">
            Kết quả luyện tập: Tiếng Hàn TOPIK Test 1 
            <span className="bg-yellow-500 text-black px-2 py-1 rounded text-sm ml-2">Part 5</span>
          </h1>
          
          <div className="flex gap-4 mb-6">
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
              Xem đáp án
            </button>
            <button
              onClick={() => navigate(-1)}
             className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-50">
              Quay về trang đề thi
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="text-green-500" size={20} />
              <span className="text-gray-600">Kết quả làm bài</span>
            </div>
            <div className="text-2xl font-bold">22/30</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="text-green-500" size={32} />
            </div>
            <div className="text-center">
              <div className="text-green-500 text-sm mb-1">Trả lời đúng</div>
              <div className="text-2xl font-bold text-green-500">22</div>
              <div className="text-gray-500 text-sm">câu hỏi</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-center mb-2">
              <XCircle className="text-red-500" size={32} />
            </div>
            <div className="text-center">
              <div className="text-red-500 text-sm mb-1">Trả lời sai</div>
              <div className="text-2xl font-bold text-red-500">8</div>
              <div className="text-gray-500 text-sm">câu hỏi</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-center mb-2">
              <Minus className="text-gray-400" size={32} />
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-sm mb-1">Bỏ qua</div>
              <div className="text-2xl font-bold text-gray-400">0</div>
              <div className="text-gray-500 text-sm">câu hỏi</div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-xs">%</span>
              </div>
              <span className="text-gray-600">Độ chính xác</span>
            </div>
            <div className="text-2xl font-bold">73.3%</div>
            <div className="text-gray-500 text-sm">(+đúng/-sai)</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⏱</span>
              </div>
              <span className="text-gray-600">Thời gian hoàn thành</span>
            </div>
            <div className="text-2xl font-bold">0:11:14</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Phân bố kết quả</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Hiệu suất theo chủ đề</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="category" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="correct" fill="#10B981" name="Đúng" />
                  <Bar dataKey="wrong" fill="#EF4444" name="Sai" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black mb-4">Phân tích chi tiết</h2>
          <div className="flex gap-2">
            <button className="bg-yellow-100 border border-yellow-300 px-4 py-2 rounded text-black">
              Part 5
            </button>
            <button className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-50">
              Tổng quát
            </button>
          </div>
        </div>

        {/* Detailed Analysis Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">Phân loại câu hỏi</th>
                <th className="text-center p-4 font-medium text-gray-900">Số câu đúng</th>
                <th className="text-center p-4 font-medium text-gray-900">Số câu sai</th>
                <th className="text-center p-4 font-medium text-gray-900">Số câu bỏ qua</th>
                <th className="text-center p-4 font-medium text-gray-900">Độ chính xác</th>
                <th className="text-left p-4 font-medium text-gray-900">Danh sách câu hỏi</th>
              </tr>
            </thead>
            <tbody>
              {testData.map((row, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="p-4 text-gray-900">{row.category}</td>
                  <td className="p-4 text-center">{row.correct}</td>
                  <td className="p-4 text-center">{row.wrong}</td>
                  <td className="p-4 text-center">{row.skipped}</td>
                  <td className="p-4 text-center font-medium">{row.accuracy}</td>
                  <td className="p-4">
                    <div className="flex gap-1 flex-wrap">
                      {row.questions.map((q, qIndex) => {
                        let bgColor = 'bg-green-100 text-green-800';
                        if (row.category.includes('Giới từ') || row.category.includes('Cấu trúc so sánh')) {
                          bgColor = 'bg-red-100 text-red-800';
                        }
                        return (
                          <span 
                            key={qIndex}
                            className={`px-2 py-1 rounded-full text-xs ${bgColor} border`}
                          >
                            {q}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Answer Key Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-black mb-4">Đáp án</h3>
            <div className="flex gap-4 mb-4">
              <button 
              onClick={() => navigate('/student/topik/AnswerTestForm')}
              className="bg-black text-white px-4 py-2 rounded">
                Xem chi tiết đáp án
              </button>
              <button
                onClick={() => navigate('/student/topik/TestForm')}
               className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-50">
                Làm lại các câu sai
              </button>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">
                <strong>Chú ý:</strong> Khi làm lại các câu sai, điểm trung bình của bạn sẽ <strong>KHÔNG BỊ ẢNH HƯỞNG</strong>.
              </p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-2">
              <div className="text-green-600 mt-1">💡</div>
              <div>
                <strong className="text-green-800">Tips:</strong>
                <span className="text-green-700"> Khi xem chi tiết đáp án, bạn có thể tạo và lưu highlight từ vựng, keywords và tạo note để học và tra cứu khi có nhu cầu ôn lại đề thi này trong tương lai.</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium text-black mb-4">Part 5</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-3">
              <QuestionItem questionNumber={101} userAnswer="B" correctAnswer="B" isCorrect={true} />
              <QuestionItem questionNumber={102} userAnswer="A" correctAnswer="A" isCorrect={true} />
              <QuestionItem questionNumber={103} userAnswer="B" correctAnswer="B" isCorrect={true} />
              <QuestionItem questionNumber={104} userAnswer="A" correctAnswer="A" isCorrect={true} />
              <QuestionItem questionNumber={105} userAnswer="B" correctAnswer="D" isCorrect={false} />
              <QuestionItem questionNumber={106} userAnswer="C" correctAnswer="C" isCorrect={true} />
              <QuestionItem questionNumber={107} userAnswer="D" correctAnswer="D" isCorrect={true} />
              <QuestionItem questionNumber={108} userAnswer="B" correctAnswer="B" isCorrect={true} />
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              <QuestionItem questionNumber={116} userAnswer="D" correctAnswer="D" isCorrect={true} />
              <QuestionItem questionNumber={117} userAnswer="C" correctAnswer="A" isCorrect={false} />
              <QuestionItem questionNumber={118} userAnswer="B" correctAnswer="B" isCorrect={true} />
              <QuestionItem questionNumber={119} userAnswer="A" correctAnswer="A" isCorrect={true} />
              <QuestionItem questionNumber={120} userAnswer="A" correctAnswer="A" isCorrect={true} />
              <QuestionItem questionNumber={121} userAnswer="C" correctAnswer="C" isCorrect={true} />
              <QuestionItem questionNumber={122} userAnswer="C" correctAnswer="C" isCorrect={true} />
              <QuestionItem questionNumber={123} userAnswer="A" correctAnswer="A" isCorrect={true} />
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle className="text-gray-600" size={24} />
            <h3 className="text-xl font-semibold text-black">Bình luận ({comments.length})</h3>
          </div>

          {/* Add Comment */}
          <div className="mb-6">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-semibold">
                B
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Chia sẻ nhận xét của bạn về bài test này..."
                  className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  rows="3"
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleAddComment}
                    className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800"
                  >
                    <Send size={16} />
                    Gửi bình luận
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {comment.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold text-gray-900">{comment.user}</span>
                      <span className="text-gray-500 text-sm ml-2">{comment.time}</span>
                    </div>
                    {comment.user === "Bạn" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditComment(comment.id)}
                          className="text-gray-500 hover:text-yellow-600"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-gray-500 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  {comment.isEditing ? (
                    <div>
                      <textarea
                        value={editingComment}
                        onChange={(e) => setEditingComment(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        rows="2"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(comment.id)}
                          className="bg-yellow-500 text-black px-3 py-1 rounded text-sm hover:bg-yellow-600"
                        >
                          Lưu
                        </button>
                        <button
                          onClick={() => handleEditComment(comment.id)}
                          className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700">{comment.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}