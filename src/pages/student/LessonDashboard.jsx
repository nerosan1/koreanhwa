import React, { useState } from 'react';
import { 
  BarChart3, 
  BookOpen, 
  Play, 
  FileText, 
  Calendar, 
  Clock, 
  User,
  Star,
  Trophy
} from 'lucide-react';
import StudentLayout from "../../components/layout/StudentLayout";
import { useNavigate } from 'react-router-dom';
import CourseCard from '../../components/student/CourseCard';

const MyCourseDashboard = () => {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: '[Gonggatm] Tiếng Hàn Sơ Cấp 2 (100 Bài Giảng)',
      subtitle: '(Sơ Cấp)',
      totalLessons: 100,
      progress: 4,
      duration: '2025-08-22 ~ 2026-03-20',
      status: 'Còn 189 ngày',
      statusType: 'active'
    },
    {
      id: 2,
      title: '[-30%] Tiếng Hàn Sơ Cấp 1 (100 Bài Giảng) - OFF',
      subtitle: '(Mới)',
      totalLessons: 100,
      progress: 0,
      duration: '2025-06-25 ~ 2030-12-16',
      status: 'Còn 1.943 ngày',
      statusType: 'new'
    },
    {
      id: 3,
      title: '[-30%] Tiếng Hàn Sơ Cấp 1 (100 Bài Giảng*)',
      subtitle: '(Mới)',
      totalLessons: 100,
      progress: 7,
      duration: '2025-08-22 ~ 2026-03-21',
      status: 'Còn 190 ngày',
      statusType: 'active'
    },
    {
      id: 4,
      title: '[NEW_Học thử MIỄN PHÍ] Bằng chữ cái tiếng Hàn (8 bài giảng)',
      subtitle: '(Sơ Cấp)',
      totalLessons: 8,
      progress: 21,
      duration: '2025-08-14 ~ 2025-09-22',
      status: 'Còn 10 ngày',
      statusType: 'urgent'
    }
  ];

  const stats = {
    totalCourses: 80,
    completedCourses: 0,
    totalVideos: 2572,
    watchedVideos: 82,
    totalExams: 36,
    completedExams: 18
  };

  const videoStats = {
    totalWatchTime: '737:23:52',
    completedWatchTime: '56:26:54',
    lastAccess: '2025-09-13 19:13:56',
    endDate: '4762-07-11'
  };

  return (
    <StudentLayout>
          <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-6">Khóa học của tôi</h1>
          <div className="border-b-2 border-yellow-300 mb-4">
            <div className="h-1 bg-yellow-400 w-20"></div>
          </div>
        </div>


        {/* Dashboard Notice */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-yellow-200 p-4 mb-6">
          <p className="text-center text-gray-700">
            Dữ liệu dashboard có thể mất '1 ~ 2 phút' để tự động cập nhật những chỉ số mới nhất!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Stats Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-yellow-200 p-6 shadow-lg">
              <div className="space-y-6">
                {/* Course Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-black" />
                    <span className="text-black font-medium">Số khóa học đăng ký: <span className="font-bold">{stats.totalCourses}</span></span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-6 relative">
                      <div className="bg-yellow-400 h-6 rounded-full" style={{ width: '1%' }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-black font-semibold">
                        <span className="text-yellow-600">{stats.completedCourses}</span>
                        <span className="mx-2 text-gray-600">{stats.totalCourses}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Play className="w-5 h-5 text-black" />
                    <span className="text-black font-medium">Số video bài giảng: <span className="font-bold">{stats.totalVideos}</span></span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-6 relative">
                      <div className="bg-yellow-400 h-6 rounded-full" style={{ width: '3%' }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-black font-semibold">
                        <span className="text-yellow-600">{stats.watchedVideos}</span>
                        <span className="mx-2 text-gray-600">{stats.totalVideos}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exam Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-black" />
                    <span className="text-black font-medium">Số đề thi: <span className="font-bold">{stats.totalExams}</span></span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-6 relative">
                      <div className="bg-yellow-400 h-6 rounded-full" style={{ width: '50%' }}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-black font-semibold">
                        <span className="text-yellow-600">{stats.completedExams}</span>
                        <span className="mx-2 text-gray-600">{stats.totalExams}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center space-x-6 pt-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm text-black font-medium">Hoàn thành</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-600">Chưa hoàn thành</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Circle */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-yellow-200 p-6 shadow-lg h-full flex flex-col items-center justify-center">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#fbbf24"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset="243.16"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-black font-bold text-lg">Tiến độ</span>
                  <span className="text-yellow-600 font-bold text-xl">3.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Stats Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-yellow-200 p-6 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Tổng thời lượng video bài giảng:</p>
                  <p className="text-lg font-bold text-black">{videoStats.totalWatchTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tổng thời lượng video đã học:</p>
                  <p className="text-lg font-bold text-yellow-600">{videoStats.completedWatchTime}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-yellow-200 p-6 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Nghề giáng gần nhất:</p>
                  <p className="text-lg font-bold text-black">{videoStats.lastAccess}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Kết thúc khóa học cuối:</p>
                  <p className="text-lg font-bold text-yellow-600">{videoStats.endDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* { Course đang học} */}
        <div className='my-2'>
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h1 className="text-3xl font-bold text-black my-6">Khóa học đang học</h1>
              <div className="border-b-2 border-yellow-300 mb-4">
                <div className="h-1 bg-yellow-400 w-20"></div>
              </div>
            </div>
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-black text-yellow-400 font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105">
              Xem thêm khóa học
            </button>
          </div>
          </div>
          <CourseCard></CourseCard>
        </div>


         {/* { Course đang học} */}
        <div className='my-2'>
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h1 className="text-3xl font-bold text-black my-6">Khóa học đã học </h1>
              <div className="border-b-2 border-yellow-300 mb-4">
                <div className="h-1 bg-yellow-400 w-20"></div>
              </div>
            </div>
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-black text-yellow-400 font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105">
              Xem thêm khóa học
            </button>
          </div>
          </div>
          <CourseCard></CourseCard>
        </div>

         {/* { Course đang học} */}
        <div className='my-2'>
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h1 className="text-3xl font-bold text-black my-6">Khóa học quan tâm</h1>
              <div className="border-b-2 border-yellow-300 mb-4">
                <div className="h-1 bg-yellow-400 w-20"></div>
              </div>
            </div>
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-black text-yellow-400 font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105">
              Xem thêm khóa học
            </button>
          </div>
          </div>
          <CourseCard></CourseCard>
        </div>

        {/* Course Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-yellow-200 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-yellow-400">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black">#</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-black">Tên khóa học</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-black">Số bài giảng</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-black">Tiến độ</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-black">Thời gian học</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-black">Ngày học còn lại</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-yellow-100">
                {courses.map((course, index) => (
                  <tr key={course.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-yellow-50'} hover:bg-yellow-100 transition-colors duration-200`}>
                    <td className="px-4 py-4 text-sm text-black font-medium">{course.id}</td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm font-medium text-black">{course.title}</p>
                        <p className="text-xs text-yellow-600 font-medium">{course.subtitle}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-sm font-bold text-black">{course.totalLessons}</span>
                      <p className="text-xs text-gray-500">(~ 200:28)</p>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-sm font-bold text-black">{course.progress}%</span>
                      <p className="text-xs text-gray-500">(0/100 bài học hoàn thành)</p>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-sm text-black">{course.duration}</span>
                      <p className="text-xs text-gray-500">(~ 180 ngày x 37 ngày ôn tập)</p>
                    </td>
                    <td   className="px-4 py-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        course.statusType === 'urgent' 
                          ? 'bg-red-100 text-red-800'
                          : course.statusType === 'new'
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {course.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">(Vào học)</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </StudentLayout>
  );
};

export default MyCourseDashboard;