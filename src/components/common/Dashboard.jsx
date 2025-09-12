import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Trophy, TrendingUp } from 'lucide-react';
import Card from './Card';

const Dashboard = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const stats = [
    { title: 'Total Lessons', value: '24', change: '+12%', icon: BookOpen, gradient: 'from-blue-400 to-blue-600' },
    { title: 'Study Time', value: '8.5h', change: '+2.3h', icon: Clock, gradient: 'from-green-400 to-green-600' },
    { title: 'Achievements', value: '15', change: '+3', icon: Trophy, gradient: 'from-yellow-400 to-yellow-600' },
    { title: 'Progress', value: '78%', change: '+5%', icon: TrendingUp, gradient: 'from-purple-400 to-purple-600' }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "#f9fafb" } },
          particles: {
            number: { value: 60, density: { enable: true, area: 800 } },
            color: { value: "#3b82f6" },
            shape: { type: "circle" },
            opacity: { value: 0.2, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 1.2, direction: "none", outModes: { default: "out" } }
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" }
            },
            modes: {
              repulse: { distance: 100 },
              push: { quantity: 4 }
            }
          },
          retina_detect: true
        }}
        className="absolute top-0 left-0 w-full h-full"
      />

      {/* Dashboard Content */}
      <div className="relative z-10 p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.4)" }}
            >
              <Card className="p-6 backdrop-blur-lg bg-white/50 border border-white/30 rounded-2xl shadow-xl">
                <div className={`p-3 rounded-xl bg-gradient-to-tr ${stat.gradient} text-white mb-4 inline-flex`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
