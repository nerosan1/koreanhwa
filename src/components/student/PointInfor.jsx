import React from 'react';
import { BookOpen, Headphones, Grid3X3 } from 'lucide-react';

export default function KoreanLearningInterface() {
  return (
    <div className="mx-auto p-6 bg-gray-50  border border-black rounded-lg mb-30">
      {/* Header Section */}
      <div className="">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Korea - Level</h1>
          <span className="bg-yellow-500 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
            1
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-medium">Reach level 2</span>
            <span className="text-gray-600">132/500</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-3 mb-10">
            <div 
              className="bg-yellow-500 h-3 rounded-full transition-all duration-300" 
              style={{ width: '26.4%' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Score Card */}
      <div className="bg-yellow-500 rounded-xl p-6 mb-8 text-black">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">My score</h2>
          <span className="text-3xl font-bold">132 point</span>
        </div>
      </div>

      {/* Learning Activities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Learn new words */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-8 h-8 text-gray-700" />
            <span className="text-yellow-500 font-semibold">60 point</span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Learn new words</h3>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Familiar vocabulary</span>
              <span>193</span>
            </div>
            <div className="flex justify-between">
              <span>Words I'm learning</span>
              <span>7</span>
            </div>
            <div className="flex justify-between">
              <span>Untouched vocabulary</span>
              <span>345</span>
            </div>
          </div>
        </div>

        {/* Listen to new words */}
        <div className="bg-green-100 rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <Headphones className="w-8 h-8 text-gray-700" />
            <span className="text-yellow-500 font-semibold">60 point</span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Listen to new words</h3>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Familiar vocabulary</span>
              <span>193</span>
            </div>
            <div className="flex justify-between">
              <span>Words I'm learning</span>
              <span>7</span>
            </div>
            <div className="flex justify-between">
              <span>Untouched vocabulary</span>
              <span>345</span>
            </div>
          </div>
        </div>

        {/* Using new words */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <Grid3X3 className="w-8 h-8 text-gray-700" />
            <span className="text-yellow-500 font-semibold">60 point</span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Using new words</h3>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Familiar vocabulary</span>
              <span>132</span>
            </div>
            <div className="flex justify-between">
              <span>Words I'm learning</span>
              <span>7</span>
            </div>
            <div className="flex justify-between">
              <span>Untouched vocabulary</span>
              <span>345</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}