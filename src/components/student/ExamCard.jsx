import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, MessageCircle } from 'lucide-react'; // Đảm bảo import các icon cần thiết

const ExamCard = ({ exam }) => {
  const navigate = useNavigate(); // Khai báo useNavigate trong component

  return (
    <div className="bg-white rounded-lg p-5 shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300 hover:border-yellow-400">
      <h3 className="font-semibold text-black mb-3 leading-tight">{exam.title}</h3>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Clock className="w-4 h-4" />
          <span>{exam.duration}</span>
          <span className="text-gray-400">|</span>
          <Users className="w-4 h-4" />
          <span>{exam.id}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <MessageCircle className="w-4 h-4" />
          <span>{exam.participants} người tham gia</span>
        </div>
      </div>
      <p className="text-sm text-gray-700 mb-4">{exam.questions}</p>
      <div className="flex flex-wrap gap-1 mb-4">
        {exam.tags.map((tag, tagIndex) => (
          <span key={tagIndex} className="text-xs text-black bg-yellow-300 px-2 py-1 rounded-full font-medium">
            {tag}
          </span>
        ))}
      </div>
      <button 
        onClick={() => navigate('/student/topik/DetailTest')}
        className="w-full bg-yellow-400 text-black py-2 px-4 rounded-lg text-sm font-bold hover:bg-yellow-500 transition-colors"
      >
        Chi tiết
      </button>
    </div>
  );
};

export default ExamCard;