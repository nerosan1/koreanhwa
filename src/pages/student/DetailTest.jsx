import React, { useState } from 'react';
import { Clock, Users, Lightbulb, Send } from 'lucide-react';
import StudentLayout from '../../components/layout/StudentLayout';
import { useNavigate} from 'react-router-dom';

const KoreanTestDetail = () => {
const navigate = useNavigate();
  const [selectedSections, setSelectedSections] = useState({
    listening: false,
    reading: false
  });
  const [timeLimit, setTimeLimit] = useState('');
  const [comment, setComment] = useState('');
  const [activePracticeTab, setActivePracticeTab] = useState('practice'); // Quản lý tab Luyện tập/Full test

  const handleSectionChange = (section) => {
    setSelectedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSubmit = () => {
    if (!selectedSections.listening && !selectedSections.reading) {
      alert('Vui lòng chọn ít nhất một phần thi!');
      return;
    }
    alert('Bắt đầu luyện tập!');
  };

  return (
    <StudentLayout>
      <div className="bg-gradient-to-br py-8 px-4">
        <div className=" mx-auto">
          {/* Main Test Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            {/* Header */}
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">#TOPIK한국어</div>
              <h1 className="text-2xl font-bold text-black mb-4">
                제35회 TOPIK II 모의고사 (35th TOPIK II Mock Test)
              </h1>
              
              {/* Tabs */}
              <div className="flex space-x-1 mb-6">
                <button className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-medium">
                  Thông tin đề thi
                </button>
                <button className="px-4 py-2 text-gray-600 hover:bg-yellow-50 rounded-lg">
                  Tải đáp án
                </button>
              </div>
            </div>

            {/* Test Info */}
            <div className="mb-6">
              <div className="flex items-center text-gray-600 mb-2">
                <Clock className="w-4 h-4 mr-2 text-yellow-600" />
                <span>Thời gian làm bài: 110 phút | 2 phần thi | 70 câu hỏi | 9 bình luận</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <Users className="w-4 h-4 mr-2 text-yellow-600" />
                <span>2,847 người đã luyện tập đề thi này</span>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p className="text-yellow-700 text-sm">
                  <strong>Chú ý:</strong> để được quy đổi sang scaled score (ví dụ trên thang điểm 990 cho TOEIC hoặc 9.0 cho IELTS), 
                  vui lòng chọn chế độ làm <strong>FULL TEST</strong>.
                </p>
              </div>
            </div>

            {/* Practice Options */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-8">
                <button
                  type="button"
                  onClick={() => setActivePracticeTab('practice')}
                  className={`pb-3 border-b-2 ${activePracticeTab === 'practice' ? 'border-yellow-600 text-yellow-800' : 'border-transparent text-gray-600 hover:text-black'} font-medium`}
                >
                  Luyện tập
                </button>
                <button
                  type="button"
                  onClick={() => setActivePracticeTab('fullTest')}
                  className={`pb-3 ${activePracticeTab === 'fullTest' ? 'border-b-2 border-yellow-600 text-yellow-800' : 'border-transparent text-gray-600 hover:text-black'} font-medium`}
                >
                  Làm full test
                </button>
              </div>
            </div>

            {/* Content based on active tab */}
            {activePracticeTab === 'practice' && (
              <>
                {/* Pro Tips */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-yellow-800 text-sm">
                      <strong>Pro tips:</strong> Hình thức luyện tập từng phần và chọn mức thời gian phù hợp sẽ
                      giúp bạn tập trung vào giải đúng các câu hỏi thay vì phải chịu áp lực hoàn thành bài thi.
                    </div>
                  </div>
                </div>

                {/* Section Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-black mb-4">Chọn phần thi bạn muốn làm</h3>

                  <div className="space-y-3 mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedSections.listening}
                        onChange={() => handleSectionChange('listening')}
                        className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                      />
                      <span className="ml-3 text-gray-700">듣기 - Listening (35 câu hỏi)</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedSections.reading}
                        onChange={() => handleSectionChange('reading')}
                        className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                      />
                      <span className="ml-3 text-gray-700">읽기 - Reading (35 câu hỏi)</span>
                    </label>
                  </div>

                  {/* Time Limit */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giới hạn thời gian (Để trống để làm bài không giới hạn)
                    </label>
                    <select
                      value={timeLimit}
                      onChange={(e) => setTimeLimit(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-gray-500"
                    >
                      <option value="">-- Chọn thời gian --</option>
                      <option value="30">30 phút</option>
                      <option value="60">60 phút</option>
                      <option value="90">90 phút</option>
                      <option value="110">110 phút (Full test)</option>
                    </select>
                  </div>

                  {/* Start Button */}
                  <button type="button"
                    onClick={navigate('/student/topik/TestForm')}
                    className="w-full sm:w-auto px-6 py-3 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    LUYỆN TẬP
                  </button>
                </div>
              </>
            )}

            {activePracticeTab === 'fullTest' && (
              <>
                {/* Full Test Content */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-yellow-800 text-sm">
                      <strong>Pro tips:</strong> Chế độ Full Test sẽ mô phỏng bài thi thật với thời gian 110 phút và cả hai phần
                      Listening & Reading. Hãy chuẩn bị kỹ trước khi bắt đầu!
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-700 mb-4">
                    Chế độ Full Test sẽ bao gồm tất cả 70 câu hỏi (Listening: 35, Reading: 35) với thời gian cố định 110 phút.
                  </p>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full sm:w-auto px-6 py-3 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    BẮT ĐẦU FULL TEST
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Bình luận</h3>
            
            {/* Comment Input */}
            <div className="mb-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Chia sẻ cảm nghĩ của bạn ..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 resize-none"
                rows="3"
              />
              <div className="flex justify-end mt-2">
                <button className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                  <Send className="w-4 h-4 mr-2 text-white" />
                  Gửi
                </button>
              </div>
            </div>

            {/* Sample Comment */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">K</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-black">korean_learner_vn</span>
                    <span className="text-gray-600 text-sm">• Thứ sáu 16, 2025</span>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">
                    Đề thi này khá khó, đặc biệt phần đọc hiểu. Có ai có transcript của phần nghe không ạ?
                  </p>
                  <button className="text-yellow-600 text-sm hover:text-yellow-800">
                    Trả lời
                  </button>
                </div>
              </div>
            </div>

            {/* More comments indicator */}
            <div className="mt-4 text-center">
              <button className="text-yellow-600 hover:text-yellow-800 text-sm font-medium">
                Xem thêm 8 bình luận
              </button>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default KoreanTestDetail;