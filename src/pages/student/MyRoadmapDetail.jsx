import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Lock, CheckCircle, Clock, Target, BookOpen, Award, Headphones, MapPin, Image, Users, ArrowLeft } from 'lucide-react';

const TOPIKTimeline = () => {
    const navigate = useNavigate();
  const [completedDays, setCompletedDays] = useState(new Set([1]));
  
  const timelineData = [
    {
      period: "Ngày 1 - 6",
      title: "Chọn đáp án đúng",
      target: "Mục tiêu: 11 điểm",
      icon: <Headphones className="w-5 h-5" />,
      color: "bg-yellow-500",
      days: [
        { day: 1, type: "Luyện tập", questions: "15 câu hỏi", status: "completed", hasTest: false },
        { day: 2, type: "Luyện tập", questions: "15 câu hỏi", status: "available", hasTest: true },
        { day: 3, type: "Luyện tập", questions: "15 câu hỏi", status: "locked", hasTest: false },
        { day: 4, type: "Luyện tập", questions: "15 câu hỏi", status: "locked", hasTest: true },
        { day: 5, type: "Luyện tập", questions: "15 câu hỏi", status: "locked", hasTest: false },
        { day: 6, type: "Luyện tập", questions: "15 câu hỏi", status: "locked", hasTest: true },
      ]
    },
    {
      period: "Ngày 7 - 9",
      title: "Tìm câu nói tiếp",
      target: "Mục tiêu: 4 điểm",
      icon: <Users className="w-5 h-5" />,
      color: "bg-yellow-500",
      days: []
    },
    {
      period: "Ngày 10 - 15",
      title: "Tìm địa điểm",
      target: "Mục tiêu: 10 điểm",
      icon: <MapPin className="w-5 h-5" />,
      color: "bg-yellow-500",
      days: []
    },
    {
      period: "Ngày 16",
      title: "Bài thi thử số 1",
      target: "",
      icon: <Award className="w-5 h-5" />,
      color: "bg-yellow-600",
      isTest: true,
      days: []
    },
    {
      period: "Ngày 17 - 18",
      title: "Chọn tranh đúng",
      target: "Mục tiêu: 4 điểm",
      icon: <Image className="w-5 h-5" />,
      color: "bg-yellow-500",
      days: []
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'available':
        return <Play className="w-4 h-4 text-yellow-400" />;
      case 'locked':
        return <Lock className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'border-green-400 bg-green-400 bg-opacity-10';
      case 'available':
        return 'border-yellow-400 bg-yellow-400 bg-opacity-10';
      case 'locked':
        return 'border-gray-600 bg-gray-800 bg-opacity-50';
      default:
        return 'border-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Header */}
      <div className="bg-black bg-opacity-50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
             <button 
                onClick={() => navigate('/student/dashboard')}
                className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors">
                <ArrowLeft size={20} className="mr-2" />
                <span>Quay lại Home</span>
                </button>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-300">
                <Target className="inline w-4 h-4 mr-1" />
                Tiến độ: {completedDays.size}/18 ngày
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600"></div>

          {/* Timeline Items */}
          <div className="space-y-8">
            {timelineData.map((section, sectionIndex) => (
              <div key={sectionIndex} className="relative">
                {/* Section Header */}
                <div className="flex items-start space-x-6">
                  {/* Timeline Node */}
                  <div className={`relative z-10 flex items-center justify-center w-16 h-16 ${section.color} rounded-full shadow-lg`}>
                    {section.icon}
                  </div>
                  
                  {/* Section Content */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
                      {/* Section Info */}
                      <div className="p-6 border-b border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                              {section.period}
                            </span>
                            {section.isTest && (
                              <span className="text-xs font-bold text-black bg-yellow-400 px-2 py-1 rounded-full">
                                Nghỉ hưu
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-orange-400 text-sm font-medium bg-orange-900 bg-opacity-30 px-3 py-1 rounded-full">
                              Nghỉ hưu
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-white mb-2">{section.title}</h3>
                        {section.target && (
                          <p className="text-gray-300 text-sm">{section.target}</p>
                        )}
                      </div>
                      
                      {/* Days List */}
                      {section.days.length > 0 && (
                        <div className="p-6">
                          <div className="space-y-3">
                            {section.days.map((day, dayIndex) => (
                              <div key={dayIndex} className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${getStatusColor(day.status)} hover:bg-opacity-20`}>
                                <div className="flex items-center space-x-4">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                                    day.status === 'completed' ? 'bg-green-400 text-black' :
                                    day.status === 'available' ? 'bg-yellow-400 text-black' :
                                    'bg-gray-700 text-gray-400'
                                  }`}>
                                    {dayIndex === 0 && day.status === 'completed' ? (
                                      <CheckCircle className="w-5 h-5" />
                                    ) : (
                                      `${day.day}`
                                    )}
                                  </div>
                                  
                                  <div>
                                    <div className="text-white font-medium">{day.type}</div>
                                    <div className="text-gray-400 text-sm">{day.questions}</div>
                                    {day.hasTest && (
                                      <div className="text-yellow-400 text-xs">• Đánh giá</div>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                  {day.status === 'available' && (
                                    <button
                                    onClick={() => navigate('/student/topik/TestForm', {
                                      state: { testType: 'topik' }
                                    })}
                                     className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                                      <Play className="w-4 h-4" />
                                      <span>Bắt đầu</span>
                                    </button>
                                  )}
                                  
                                  {getStatusIcon(day.status)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Special Test Day */}
                      {section.isTest && (
                        <div className="p-6">
                          <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-lg p-6 text-black">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-bold text-lg mb-2">Kiểm tra tổng hợp</h4>
                                <p className="text-sm opacity-80">Đánh giá toàn diện kiến thức đã học</p>
                              </div>
                              <div className="text-right">
                                <Award className="w-8 h-8 mb-2" />
                                <div className="text-xs opacity-80">Bài thi thử</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Summary */}
        <div className="mt-12 bg-black bg-opacity-40 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">1</div>
              <div className="text-gray-400 text-sm">Ngày hoàn thành</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">15</div>
              <div className="text-gray-400 text-sm">Câu hỏi đã làm</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">6%</div>
              <div className="text-gray-400 text-sm">Tiến độ tổng thể</div>
            </div>
          </div>
        </div>

        {/* Mascot */}
        <div className="fixed bottom-6 right-6 z-20">
          <div className="bg-yellow-400 text-black p-4 rounded-full shadow-lg animate-bounce cursor-pointer">
            <div className="text-2xl">🧙‍♂️</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TOPIKTimeline;