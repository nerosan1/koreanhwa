import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  variant = 'default',
  className = '',
  hover = true,
  onClick,
  ...props 
}) => {
  const baseClasses = 'rounded-xl shadow-sm border transition-all duration-200';
  
  const variants = {
    default: 'bg-white border-gray-200 hover:shadow-md',
    elevated: 'bg-white border-gray-200 shadow-lg hover:shadow-xl',
    outlined: 'bg-transparent border-2 border-gray-300 hover:border-gray-400',
    filled: 'bg-gray-50 border-gray-200 hover:bg-gray-100',
    primary: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    success: 'bg-green-50 border-green-200 hover:bg-green-100',
    warning: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
    danger: 'bg-red-50 border-red-200 hover:bg-red-100'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${className}`;
  
  return (
    <motion.div
      className={classes}
      onClick={onClick}
      whileHover={hover ? { y: -2, scale: 1.01 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card; 