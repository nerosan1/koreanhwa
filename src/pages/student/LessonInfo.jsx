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
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CourseDetailPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('intro');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 23,
    minutes: 59,
    seconds: 4
  });

  const tabs = [
    { id: 'intro', label: 'Giới thiệu', icon: FileText },
    { id: 'content', label: 'Nội dung', icon: BookOpen },
    { id: 'instructor', label: 'Giảng viên', icon: User },
    { id: 'gifts', label: 'Quà tặng', icon: Gift },
    { id: 'reviews', label: 'Đánh giá', icon: Star }
  ];

  const courseContent = [
    {
      title: "Giới thiệu khóa học",
      duration: "00:02:26",
      isUnlocked: true,
      isCompleted: false
    },
    {
      title: "[Bài 1 - Phần đọc] Chọn ngữ pháp đúng điền vào ô trống [1~2]",
      duration: "00:18:04",
      isUnlocked: true,
      isCompleted: false
    },
    {
      title: "[Bài 2 - Phần đọc] Chọn ngữ pháp có nghĩa tương tự [3~4]",
      duration: "00:15:18",
      isUnlocked: true,
      isCompleted: false
    },
    {
      title: "[Bài 3 - Phần đọc] Hiểu nội dung đoạn văn ngắn [5~8]",
      duration: "00:22:45",
      isUnlocked: false,
      isCompleted: false
    },
    {
      title: "[Bài 4 - Phần đọc] Đọc hiểu đoạn văn dài [9~12]",
      duration: "00:28:30",
      isUnlocked: false,
      isCompleted: false
    },
    {
      title: "[Bài 5 - Phần nghe] Nghe hiểu nội dung cơ bản [13~16]",
      duration: "00:25:15",
      isUnlocked: false,
      isCompleted: false
    }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'intro':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-yellow-200">
              <h3 className="text-xl font-bold text-black mb-4">Về khóa học này</h3>
              <div className="prose prose-black max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Khóa học COMBO Luyện Thi TOPIK II + IBT MockTest được thiết kế dành riêng cho những học viên muốn đạt điểm cao trong kỳ thi TOPIK II. 
                  Khóa học kết hợp giữa lý thuyết và thực hành với các bài thi thử IBT MockTest chính thức.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Với sự hướng dẫn của giảng viên Ninh Thị Thúy - chuyên gia có nhiều năm kinh nghiệm trong việc giảng dạy tiếng Hàn, 
                  bạn sẽ được trang bị đầy đủ kiến thức và kỹ năng cần thiết để chinh phục kỳ thi TOPIK II.
                </p>
                <h4 className="text-lg font-semibold text-black mb-3">Điểm nổi bật của khóa học:</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>45 bài giảng chi tiết với tổng thời lượng 90 ngày học</li>
                  <li>Hơn 3,463 học viên đã đăng ký và đạt kết quả tốt</li>
                  <li>Bài thi thử IBT MockTest chính thức</li>
                  <li>Phương pháp học hiệu quả, tập trung vào từng kỹ năng</li>
                  <li>Hỗ trợ học viên 24/7 trong suốt quá trình học</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'content':
        return (
          <div className="space-y-4">
            {courseContent.map((lesson, index) => (
              <div key={index} className="bg-white rounded-xl border border-yellow-200 overflow-hidden">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      lesson.isCompleted 
                        ? 'bg-green-500 text-white' 
                        : lesson.isUnlocked 
                          ? 'bg-yellow-400 text-black' 
                          : 'bg-gray-300 text-gray-600'
                    }`}>
                      {lesson.isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : lesson.isUnlocked ? (
                        <Play className="w-4 h-4" />
                      ) : (
                        <Lock className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-black">{lesson.title}</h4>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{lesson.duration}</span>
                    {lesson.isUnlocked && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'instructor':
        return (
          <div className="bg-white rounded-xl p-6 border border-yellow-200">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">Ninh Thị Thúy</h3>
                <p className="text-gray-600">Giảng viên chuyên môn TOPIK</p>
              </div>
            </div>
            <div className="prose prose-black max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Cô Ninh Thị Thúy là giảng viên có hơn 8 năm kinh nghiệm trong việc giảng dạy tiếng Hàn và luyện thi TOPIK. 
                Cô đã giúp hàng nghìn học viên đạt điểm cao trong kỳ thi TOPIK II.
              </p>
              <h4 className="text-lg font-semibold text-black mb-3">Thành tích nổi bật:</h4>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Thạc sĩ Ngôn ngữ Hàn Quốc - Đại học Quốc gia Seoul</li>
                <li>Chứng chỉ giảng dạy tiếng Hàn cho người nước ngoài</li>
                <li>Tác giả của 5 cuốn sách luyện thi TOPIK bestseller</li>
                <li>95% học viên đạt điểm mục tiêu sau khóa học</li>
              </ul>
            </div>
          </div>
        );
      case 'gifts':
        return (
          <div className="bg-white rounded-xl p-6 border border-yellow-200">
            <h3 className="text-xl font-bold text-black mb-6">Quà tặng đặc biệt</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-yellow-100 rounded-lg p-4">
                <Gift className="w-8 h-8 text-yellow-600 mb-3" />
                <h4 className="font-semibold text-black mb-2">Tài liệu PDF độc quyền</h4>
                <p className="text-sm text-gray-700">Bộ tài liệu tổng hợp ngữ pháp TOPIK II đầy đủ nhất</p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-4">
                <Gift className="w-8 h-8 text-yellow-600 mb-3" />
                <h4 className="font-semibold text-black mb-2">Đề thi thử độc quyền</h4>
                <p className="text-sm text-gray-700">10 đề thi thử TOPIK II với đáp án chi tiết</p>
              </div>
            </div>
          </div>
        );
      case 'reviews':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 border border-yellow-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-black">Đánh giá từ học viên</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-semibold text-black">5.0</span>
                  <span className="text-gray-600">(2 đánh giá)</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-black font-semibold text-sm">H</span>
                    </div>
                    <div>
                      <p className="font-medium text-black">Học viên A</p>
                      <div className="flex items-center">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">Khóa học rất hay, giảng viên nhiệt tình. Tôi đã đạt TOPIK II level 5 sau khi học xong khóa này!</p>
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-black font-semibold text-sm">M</span>
                    </div>
                    <div>
                      <p className="font-medium text-black">Học viên B</p>
                      <div className="flex items-center">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">Nội dung chi tiết, bài tập phong phú. Đặc biệt là phần IBT MockTest rất hữu ích!</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-start items-center gap-5">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-black text-white hover:bg-yellow-500 transition-all duration-300 hover:scale-110">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Trang chủ</span>
            <span></span>
            <span>Danh sách khóa học</span>
            <span></span>
            <span>TOPIK</span>
            <span></span>
            <span className="text-black font-medium">[-24%] COMBO Khóa Luyện Thi TOPIK II + IBT MockTest</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="bg-black rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 opacity-20">
                <img src="/api/placeholder/300/300" alt="Instructor" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-yellow-400/20 rounded-lg p-3">
                    <BookOpen className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="bg-yellow-400/20 rounded-lg p-3">
                    <FileText className="w-8 h-8 text-yellow-400" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold mb-4">
                  COMBO <span className="text-yellow-400">Khóa Luyện Thi TOPIK II</span><br />
                  + IBT MockTest
                </h1>
                <div className="bg-yellow-400/20 rounded-lg p-3 inline-block">
                  <p className="text-lg font-semibold text-yellow-400">Giảng viên: Ninh Thị Thúy</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-yellow-200 mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                          activeTab === tab.id
                            ? 'border-yellow-400 text-yellow-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border-2 border-yellow-300 p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-black mb-4">
                [-24%] COMBO Khóa Luyện Thi TOPIK II + IBT MockTest
              </h2>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-semibold text-black">5</span>
                <span className="text-gray-600">- 2 Đánh giá</span>
              </div>

              {/* Teacher */}
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">Ninh Thị Thúy</span>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">45 Bài giảng</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">90 Ngày</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">3,463 học viên đã đăng ký</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-black">1,430,000 đ</span>
                  <span className="text-lg text-gray-500 line-through">1,881,579 đ</span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    (-24%)
                  </span>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">⏰ Thời gian ưu đãi còn lại</p>
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-black text-yellow-400 rounded-lg p-2 text-center">
                    <div className="text-lg font-bold">{timeLeft.days}</div>
                    <div className="text-xs">Ngày</div>
                  </div>
                  <div className="bg-black text-yellow-400 rounded-lg p-2 text-center">
                    <div className="text-lg font-bold">{timeLeft.hours}</div>
                    <div className="text-xs">giờ</div>
                  </div>
                  <div className="bg-black text-yellow-400 rounded-lg p-2 text-center">
                    <div className="text-lg font-bold">{timeLeft.minutes}</div>
                    <div className="text-xs">phút</div>
                  </div>
                  <div className="bg-black text-yellow-400 rounded-lg p-2 text-center">
                    <div className="text-lg font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                    <div className="text-xs">giây</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/student/lessons/classroom')}
                  className="w-full bg-yellow-400 text-black py-3 px-4 rounded-xl font-semibold hover:bg-yellow-500 transition-all duration-300"
                >
                  KHOÁ HỌC ĐĂNG KÝ<br />
                  <span className="text-sm">(Đi Đến Phòng Học)</span>
                </button>
                
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-full py-3 px-4 rounded-xl font-semibold border-2 transition-all duration-300 ${
                    isWishlisted 
                      ? 'bg-black border-black text-white' 
                      : 'bg-white border-gray-300 text-gray-700 hover:border-black hover:text-black'
                  }`}
                >
                  <Heart className={`w-4 h-4 inline mr-2 ${isWishlisted ? 'fill-current text-white' : ''}`} />
                  {isWishlisted ? 'ĐÃ LƯU KHOÁ HỌC' : 'LƯU KHOÁ HỌC'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;