import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuestionItem = ({ questionNumber, userAnswer, correctAnswer, isCorrect }) => {
  const navigate = useNavigate(); // Gọi hook bên trong component

  const getBackgroundColor = () => {
    return isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
  };

  const getIcon = () => {
    return isCorrect ? <CheckCircle className="text-green-500" size={16} /> : <XCircle className="text-red-500" size={16} />;
  };

  return (
    <div className={`flex items-center justify-between p-3 ${getBackgroundColor()} rounded-lg border`}>
      <div className="flex items-center gap-3">
        <span className="text-blue-600 font-medium">{questionNumber}</span>
        <span className="text-gray-900">{userAnswer}: {correctAnswer}</span>
        {getIcon()}
      </div>
      <button 
        onClick={() => navigate('/student/topik/AnswerDetailQuestion')}
        className="text-blue-600 hover:underline text-sm"
      >
        [Chi tiết]
      </button>
    </div>
  );
};

export default QuestionItem;