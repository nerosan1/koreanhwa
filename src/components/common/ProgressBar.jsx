import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ 
  progress, 
  size = 'md',
  variant = 'default',
  showLabel = true,
  label,
  className = '',
  animated = true
}) => {
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4'
  };

  const variants = {
    default: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600',
    purple: 'bg-purple-600',
    pink: 'bg-pink-600'
  };

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {label || 'Tiến độ'}
          </span>
          <span className="text-sm font-medium text-gray-500">
            {clampedProgress}%
          </span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizes[size]}`}>
        <motion.div
          className={`${sizes[size]} rounded-full ${variants[variant]} transition-all duration-300`}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={animated ? { duration: 0.8, ease: "easeOut" } : { duration: 0 }}
        />
      </div>
    </div>
  );
};

export default ProgressBar; 