import React, { useState } from 'react';
import { 
  Star, 
  Users, 
  Calendar, 
  Clock, 
  Heart, 
  Share2, 
  Play, 
  Lock,
  CheckCircle,
  FileText,
  MessageSquare,
  User,
  Gift,
  BookOpen,
  ArrowLeft,
  Settings,
  Search,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Edit,
  Trash2,
  Send
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CourseDetailPage = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [progress, setProgress] = useState(4);
  const [searchStudent, setSearchStudent] = useState('');
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState('');
  
  // Mock data for comments
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Nguyễn Văn A",
      avatar: "A",
      rating: 5,
      date: "2025-01-15",
      content: "Khóa học rất hay và bổ ích! Giảng viên giải thích rất dễ hiểu, các bài tập thực hành phong phú. Tôi đã cải thiện đáng kể kỹ năng tiếng Hàn sau khi học khóa này.",
      likes: 12,
      dislikes: 0,
      isMyComment: false
    },
    {
      id: 2,
      user: "Trần Thị B",
      avatar: "B", 
      rating: 5,
      date: "2025-01-10",
      content: "Nội dung khóa học được cấu trúc rất logic, từ cơ bản đến nâng cao. Đặc biệt là phần luyện thi TOPIK rất hữu ích cho tôi.",
      likes: 8,
      dislikes: 1,
      isMyComment: true
    },
    {
      id: 3,
      user: "Lê Minh C",
      avatar: "C",
      rating: 4,
      date: "2025-01-08", 
      content: "Khóa học tốt, tài liệu phong phú. Tuy nhiên tôi mong muốn có thêm nhiều bài tập thực hành hơn.",
      likes: 5,
      dislikes: 0,
      isMyComment: false
    }
  ]);

  // Mock data for students
  const allStudents = [
    { id: 1, name: "Nguyễn Văn A", avatar: "A", joinDate: "2025-01-15", progress: 85 },
    { id: 2, name: "Trần Thị B", avatar: "B", joinDate: "2025-01-14", progress: 92 },
    { id: 3, name: "Lê Minh C", avatar: "C", joinDate: "2025-01-13", progress: 78 },
    { id: 4, name: "Phạm Thị D", avatar: "D", joinDate: "2025-01-12", progress: 95 },
    { id: 5, name: "Hoàng Văn E", avatar: "E", joinDate: "2025-01-11", progress: 67 },
    { id: 6, name: "Ngô Thị F", avatar: "F", joinDate: "2025-01-10", progress: 88 },
    { id: 7, name: "Vũ Minh G", avatar: "G", joinDate: "2025-01-09", progress: 73 },
    { id: 8, name: "Đặng Thị H", avatar: "H", joinDate: "2025-01-08", progress: 91 }
  ];

  const filteredStudents = allStudents.filter(student =>
    student.name.toLowerCase().includes(searchStudent.toLowerCase())
  );

  const courseContent = [
    {
      title: "Giới thiệu khóa học",
      duration: "00:02:26",
      completion: "100%",
      isCompleted: true,
      completedDate: null
    },
    {
      title: "[Bài 1 - Phần đọc] Chọn ngữ pháp đúng điền vào ô trống [1~2]",
      duration: "00:18:04", 
      completion: "96%",
      isCompleted: false,
      completedDate: "2025-09-10 21:10"
    },
    {
      title: "[Bài 2 - Phần đọc] Chọn ngữ pháp có nghĩa tương tự [3~4]",
      duration: "00:15:18",
      completion: "0%",
      isCompleted: false,
      completedDate: null
    }
  ];

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        user: "Bạn",
        avatar: "U",
        rating: 5,
        date: new Date().toISOString().split('T')[0],
        content: newComment,
        likes: 0,
        dislikes: 0,
        isMyComment: true
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleEditComment = (id) => {
    const comment = comments.find(c => c.id === id);
    setEditingComment(id);
    setEditText(comment.content);
  };

  const handleSaveEdit = (id) => {
    setComments(comments.map(c => 
      c.id === id ? { ...c, content: editText } : c
    ));
    setEditingComment(null);
    setEditText('');
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter(c => c.id !== id));
  };

  const handleLikeComment = (id) => {
    setComments(comments.map(c =>
      c.id === id ? { ...c, likes: c.likes + 1 } : c
    ));
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'content':
        return (
          <div onClick={()=> navigate('/student/lessons/learning')} className="space-y-1">
            {courseContent.map((lesson, index) => (
              <div key={index} className="bg-white border border-gray-200 p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded flex items-center justify-center text-xs ${
                    lesson.isCompleted 
                      ? 'bg-white border-2 border-gray-300' 
                      : 'bg-white border-2 border-gray-300'
                  }`}>
                    {lesson.isCompleted ? (
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-black font-medium">{lesson.title}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Play className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{lesson.duration}</span>
                    <span className={`text-sm px-2 py-1 rounded text-xs ${
                      lesson.completion === '100%' ? 'text-green-600' :
                      lesson.completion === '0%' ? 'text-gray-500' : 'text-blue-600'
                    }`}>
                      {lesson.completion}
                    </span>
                  </div>
                  {lesson.completedDate && (
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      {lesson.completedDate}
                    </div>
                  )}
                  {lesson.isCompleted && (
                    <div className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                      Đã hoàn thành
                    </div>
                  )}
                  {!lesson.isCompleted && lesson.completion !== '0%' && (
                    <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                      Chưa hoàn thành
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            {/* Add Comment Section */}
            <div className="bg-white rounded-xl p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold text-black mb-4">Viết đánh giá của bạn</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Đánh giá:</span>
                  <div className="flex items-center">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400 cursor-pointer" />
                    ))}
                  </div>
                </div>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Chia sẻ trải nghiệm của bạn về khóa học này..."
                  className="w-full p-3 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                  rows="4"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-4 h-4 " />
                  Gửi đánh giá
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white rounded-xl p-6 border border-yellow-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-black font-semibold">{comment.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-semibold text-black">{comment.user}</h4>
                          <div className="flex items-center">
                            {[1,2,3,4,5].map((star) => (
                              <Star 
                                key={star} 
                                className={`w-4 h-4 ${star <= comment.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        {comment.isMyComment && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditComment(comment.id)}
                              className="text-gray-500 hover:text-blue-600"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="text-gray-500 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                      
                      {editingComment === comment.id ? (
                        <div className="space-y-3">
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                            rows="3"
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleSaveEdit(comment.id)}
                              className="bg-yellow-400 text-black px-4 py-1 rounded-lg text-sm font-semibold hover:bg-yellow-500"
                            >
                              Lưu
                            </button>
                            <button
                              onClick={() => setEditingComment(null)}
                              className="bg-gray-300 text-black px-4 py-1 rounded-lg text-sm font-semibold hover:bg-gray-400"
                            >
                              Hủy
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-gray-700 mb-3 leading-relaxed">{comment.content}</p>
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleLikeComment(comment.id)}
                              className="flex items-center space-x-1 text-gray-500 hover:text-blue-600"
                            >
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-sm">{comment.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600">
                              <ThumbsDown className="w-4 h-4" />
                              <span className="text-sm">{comment.dislikes}</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'students':
        return (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="bg-white rounded-xl p-4 border border-yellow-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm học viên..."
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>

            {/* Students Stats */}
            <div className="bg-white rounded-xl p-6 border border-yellow-200">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-black">{allStudents.length}</div>
                  <div className="text-sm text-gray-600">Tổng học viên</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {allStudents.filter(s => s.progress >= 80).length}
                  </div>
                  <div className="text-sm text-gray-600">Tiến độ tốt (≥80%)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(allStudents.reduce((acc, s) => acc + s.progress, 0) / allStudents.length)}%
                  </div>
                  <div className="text-sm text-gray-600">Tiến độ trung bình</div>
                </div>
              </div>
            </div>

            {/* Students List */}
            <div className="bg-white rounded-xl border border-yellow-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-black">
                  Danh sách học viên ({filteredStudents.length})
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                          <span className="text-black font-semibold">{student.avatar}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-black">{student.name}</h4>
                          <p className="text-sm text-gray-600">Tham gia: {student.joinDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className={`text-sm font-semibold ${
                              student.progress >= 80 ? 'text-green-600' :
                              student.progress >= 50 ? 'text-blue-600' : 'text-orange-600'
                            }`}>
                              {student.progress}%
                            </div>
                            <div className="text-xs text-gray-500">Tiến độ</div>
                          </div>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                student.progress >= 80 ? 'bg-green-500' :
                                student.progress >= 50 ? 'bg-blue-500' : 'bg-orange-500'
                              }`}
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

   const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between p-4 border border-gray-900">
                  <div className="flex items-center gap-3">
                    <ArrowLeft 
                      className="w-6 h-6 cursor-pointer" 
                      onClick={() => navigate(-1)}
                    />
                    <span className="text-lg font-medium">Quay lại</span>
                  </div>

                </div>

      {/* Header */}
      <div className="bg-white border border-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-black mb-4">
            [-24%] COMBO Khóa Luyện Thi TOPIK II + IBT MockTest
          </h1>
          
          <div className="flex items-center space-x-4 mb-4">
            <button className="bg-yellow-500 font-bold text-black px-4 py-2 rounded">
              Xoá lịch sử học tập
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-gray-600">
            <div className="space-y-2">
              <p>Thời gian học: 2025-06-25 ~ 2025-09-23 (90 Ngày)</p>
              <p>Thời gian ôn tập: +10 Ngày</p>
              <p>Tổng thời gian bài giảng: 144:1:32</p>
            </div>
            <div className="space-y-2">
              <p>Bài học hoàn thành: 1/46</p>
              <p>Tiến độ: {progress}% <span className="inline-block w-20 bg-gray-200 rounded-full h-2 ml-2">
                <span className="block bg-blue-500 h-2 rounded-full" style={{width: `${progress}%`}}></span>
              </span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className=" font-white rounded-lg border border-gray-400 mb-6">
          <div className="border">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'content', label: 'Nội dung khóa học' },
                { id: 'reviews', label: 'Đánh giá khóa học' },
                { id: 'students', label: 'Danh sách học viên' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4  font-medium text-sm ${
                    activeTab === tab.id
                      ? 'borderlack text-black-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CourseDetailPage;