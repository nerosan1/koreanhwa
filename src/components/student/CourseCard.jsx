import React from 'react';
import { 
  Heart, 
  User, 
  Calendar, 
  BookOpen, 
  Clock,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CourseCards = () => {
    const navigate = useNavigate();
  const courses = [
    {
      id: 1,
      title: '[KienGuru] COMBO Khóa Luyện Thi TOPIK II + IBT MockTest',
      instructor: 'Ninh Thị Thúy',
      category: 'COMBO',
      image: '/api/placeholder/300/270',
      registrationPeriod: '2025-06-25 ~ 2025-09-23',
      lessons: 45,
      duration: 90,
      progress: 4,
      price: null,
      isCombo: true,
      features: ['Khóa Luyện Thi TOPIK II', 'IBT MockTest', 'Giảng viên Kim Thị Thủy']
    },
    {
      id: 2,
      title: 'Lý thuyết Biến - Phiên dịch tiếng Hàn',
      instructor: 'Hoàng Thị Thảo',
      category: 'Khóa học',
      image: '/api/placeholder/300/270',
      registrationPeriod: '2025-09-02 ~ 2026-01-01',
      lessons: null,
      duration: 120,
      progress: 5,
      price: null,
      tag: 'Dành riêng cho thi trường HSK-Quốc tế'
    },
    {
      id: 3,
      title: 'Khóa IT Business Analyst',
      instructor: 'Nguyễn Quốc Uy',
      category: 'Khóa học',
      image: '/api/placeholder/300/270',
      registrationPeriod: '2025-06-02 ~ 2025-09-30',
      lessons: 29,
      duration: 120,
      progress: 0,
      price: null,
      description: 'Tự tin chinh phục lĩnh vực IT BA chỉ sau 3 tháng'
    }
  ];

  return (
    <div className="mb-10">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-yellow-200 overflow-hidden group max-h-[400px] w-[270px] flex flex-col"
              style={{ maxHeight: '400px', width: '270px' }}
            >
              {/* Course Image */}
              <div className="relative h-24 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden flex-shrink-0">
                {course.isCombo && (
                  <div className="absolute top-1 left-1 bg-yellow-400 text-black px-2 py-0.5 rounded-full text-xs font-bold">
                    COMBO
                  </div>
                )}
                {course.tag && (
                  <div className="absolute top-1 left-1 bg-yellow-400 text-black px-2 py-0.5 rounded text-xs font-medium truncate max-w-[120px]">
                    {course.tag}
                  </div>
                )}
                <div className="absolute top-1 right-1">
                  <button className="p-1 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Heart className="w-3 h-3 text-gray-600 hover:text-red-500" />
                  </button>
                </div>
                
                {/* Mock course content */}
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                  <div className="text-center text-white">
                    <BookOpen className="w-8 h-8 mx-auto mb-1 opacity-80" />
                    <p className="text-xs opacity-90">Preview</p>
                  </div>
                </div>

                {course.isCombo && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-1">
                    <div className="space-y-0.5 text-xs truncate">
                      {course.features?.map((feature, index) => (
                        <div key={index} className="flex items-center truncate">
                          <div className="w-0.5 h-0.5 bg-yellow-400 rounded-full mr-1"></div>
                          <span className="truncate max-w-[100px]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Course Content */}
              <div className="p-3 flex-1 flex flex-col overflow-hidden">
                {/* Instructor */}
                <div className="flex items-center text-xs text-gray-600 mb-1 truncate">
                  <User className="w-3 h-3 mr-1" />
                  <span className="truncate max-w-[120px]">{course.instructor}</span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-black mb-1 line-clamp-2 group-hover:text-yellow-600 transition-colors overflow-hidden">
                  {course.title}
                </h3>

                {/* Description */}
                {course.description && (
                  <p className="text-xs text-gray-600 mb-2 line-clamp-1 overflow-hidden">
                    {course.description}
                  </p>
                )}

                {/* Registration Period */}
                <div className="flex items-center text-xs text-gray-600 mb-2 truncate">
                  <span className="font-medium truncate max-w-[100px]">Thời gian:</span>
                </div>
                <div className="text-xs text-black mb-2 line-clamp-1 overflow-hidden">
                  {course.registrationPeriod}
                </div>

                {/* Course Stats */}
                <div className="flex items-center justify-between text-xs text-gray-600 mb-2 overflow-hidden">
                  <div className="flex items-center space-x-2 truncate">
                    {course.lessons && (
                      <div className="flex items-center truncate">
                        <BookOpen className="w-3 h-3 mr-1" />
                        <span className="font-medium truncate max-w-[60px]">{course.lessons} Bài</span>
                      </div>
                    )}
                    <div className="flex items-center truncate">
                      <Clock className="w-3 h-3 mr-1" />
                      <span className="font-medium truncate max-w-[60px]">{course.duration} Ngày</span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-2 overflow-hidden">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium">Tiến độ {course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-yellow-400 h-1.5 rounded-full transition-all duration-300" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={() => navigate('/student/lessons/info')}
                 className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg text-xs hover:bg-yellow-500 transition-all duration-300 hover:scale-105 mt-auto">
                  Vào học
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCards;