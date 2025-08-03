import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  TrendingUp, 
  Users, 
  Calendar,
  CheckCircle,
  PlayCircle,
  Star
} from 'lucide-react';
import Card from './Card';
import Badge from './Badge';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Lessons',
      value: '24',
      change: '+12%',
      icon: BookOpen,
      color: 'blue'
    },
    {
      title: 'Study Time',
      value: '8.5h',
      change: '+2.3h',
      icon: Clock,
      color: 'green'
    },
    {
      title: 'Achievements',
      value: '15',
      change: '+3',
      icon: Trophy,
      color: 'yellow'
    },
    {
      title: 'Progress',
      value: '78%',
      change: '+5%',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  const recentActivities = [
    {
      type: 'lesson',
      title: 'Completed Basic Grammar Lesson 5',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'green'
    },
    {
      type: 'lesson',
      title: 'Started Vocabulary Practice',
      time: '4 hours ago',
      icon: PlayCircle,
      color: 'blue'
    },
    {
      type: 'achievement',
      title: 'Earned "Grammar Master" Badge',
      time: '1 day ago',
      icon: Star,
      color: 'yellow'
    },
    {
      type: 'lesson',
      title: 'Completed Pronunciation Exercise',
      time: '2 days ago',
      icon: CheckCircle,
      color: 'green'
    }
  ];

  const upcomingLessons = [
    {
      title: 'Advanced Conversation',
      time: 'Today, 3:00 PM',
      instructor: 'Sarah Kim',
      difficulty: 'Intermediate'
    },
    {
      title: 'Korean Culture & History',
      time: 'Tomorrow, 10:00 AM',
      instructor: 'Min Jung',
      difficulty: 'Beginner'
    },
    {
      title: 'Business Korean',
      time: 'Wednesday, 2:00 PM',
      instructor: 'Jin Ho',
      difficulty: 'Advanced'
    }
  ];

  const learningProgress = [
    { skill: 'Grammar', progress: 85, color: 'blue' },
    { skill: 'Vocabulary', progress: 72, color: 'green' },
    { skill: 'Pronunciation', progress: 68, color: 'yellow' },
    { skill: 'Listening', progress: 91, color: 'purple' },
    { skill: 'Speaking', progress: 64, color: 'red' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className={`p-2 rounded-full bg-${activity.color}-100`}>
                    <activity.icon className={`w-4 h-4 text-${activity.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Upcoming Lessons */}
        <div>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Lessons</h3>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {upcomingLessons.map((lesson, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-l-4 border-blue-500 pl-4"
                >
                  <h4 className="text-sm font-medium text-gray-900">{lesson.title}</h4>
                  <p className="text-xs text-gray-500">{lesson.time}</p>
                  <p className="text-xs text-gray-500">Instructor: {lesson.instructor}</p>
                  <Badge 
                    variant={lesson.difficulty === 'Advanced' ? 'danger' : lesson.difficulty === 'Intermediate' ? 'warning' : 'success'}
                    size="sm"
                  >
                    {lesson.difficulty}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Learning Progress */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Learning Progress</h3>
        <div className="space-y-4">
          {learningProgress.map((item, index) => (
            <motion.div
              key={item.skill}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                <span className="text-sm font-medium text-gray-700">{item.skill}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 bg-${item.color}-500 rounded-full`}
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{item.progress}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard; 