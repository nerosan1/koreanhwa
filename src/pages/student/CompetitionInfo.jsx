import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Users, 
  Calendar, 
  Clock, 
  Star, 
  Award, 
  TrendingUp,
  Medal,
  Crown,
  Target,
  BookOpen,
  Globe,
  Play,
  ArrowRight,
  Eye,
  ThumbsUp,
  MessageCircle,
  Share2,
  Filter,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function CompetitionInfo() {
    const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [searchTerm, setSearchTerm] = useState('');

  const competitionStats = {
    totalParticipants: 2847,
    activeContests: 12,
    completedTests: 18543,
    averageScore: 78.5,
    topScore: 98,
    totalPrize: "500 triệu VNĐ"
  };

  const leaderboard = [
    {
      rank: 1,
      name: "Nguyễn Minh Hạnh",
      nameKr: "응우옌민한",
      avatar: "🏆",
      score: 98,
      tests: 45,
      level: "고급 (Cao cấp)",
      streak: 12,
      points: 4850,
      badge: "News Master",
      location: "Hà Nội"
    },
    {
      rank: 2,
      name: "Trần Thị Yến",
      nameKr: "찬티옌",
      avatar: "🥈",
      score: 96,
      tests: 38,
      level: "고급 (Cao cấp)",
      streak: 8,
      points: 4720,
      badge: "Politics Expert",
      location: "TP.HCM"
    },
    {
      rank: 3,
      name: "Lê Hoàng Nam",
      nameKr: "레황남",
      avatar: "🥉",
      score: 94,
      tests: 42,
      level: "중급 (Trung cấp)",
      streak: 15,
      points: 4680,
      badge: "K-Culture Fan",
      location: "Đà Nẵng"
    },
    {
      rank: 4,
      name: "Phạm Thu Hiền",
      nameKr: "팜투히엔",
      avatar: "⭐",
      score: 92,
      tests: 35,
      level: "중급 (Trung cấp)",
      streak: 6,
      points: 4520,
      badge: "Tech Enthusiast",
      location: "Hà Nội"
    },
    {
      rank: 5,
      name: "Võ Minh Tuấn",
      nameKr: "보민투안",
      avatar: "🌟",
      score: 90,
      tests: 40,
      level: "중급 (Trung cấp)",
      streak: 10,
      points: 4450,
      badge: "Sports Analyst",
      location: "Cần Thơ"
    }
  ];

  const recentContests = [
    {
      id: 1,
      title: "Tin tức kinh tế tuần này",
      titleKr: "이번 주 경제 뉴스",
      category: "Kinh tế",
      difficulty: "Trung cấp",
      participants: 1247,
      duration: "25 phút",
      status: "active",
      endTime: "2025-09-20T18:00:00",
      prize: "50 triệu VNĐ"
    },
    {
      id: 2,
      title: "K-Pop & Hallyu Update",
      titleKr: "K-Pop & 한류 업데이트",
      category: "Văn hóa",
      difficulty: "Cơ bản",
      participants: 2156,
      duration: "20 phút",
      status: "active",
      endTime: "2025-09-18T20:00:00",
      prize: "30 triệu VNĐ"
    },
    {
      id: 3,
      title: "Chính trị Hàn Quốc tháng 9",
      titleKr: "9월 한국 정치",
      category: "Chính trị",
      difficulty: "Cao cấp",
      participants: 892,
      duration: "30 phút",
      status: "upcoming",
      startTime: "2025-09-25T19:00:00",
      prize: "75 triệu VNĐ"
    },
    {
      id: 4,
      title: "Công nghệ & Đổi mới",
      titleKr: "기술 & 혁신",
      category: "Công nghệ",
      difficulty: "Trung cấp",
      participants: 1543,
      duration: "25 phút",
      status: "completed",
      winner: "Kim Min Seo",
      prize: "40 triệu VNĐ"
    }
  ];

  const achievements = [
    { name: "First Victory", icon: "🏅", description: "Giành chiến thắng đầu tiên", count: 234 },
    { name: "News Master", icon: "📰", description: "Hoàn thành 50 bài thi tin tức", count: 45 },
    { name: "Perfect Score", icon: "💯", description: "Đạt điểm tuyệt đối", count: 12 },
    { name: "Speed Demon", icon: "⚡", description: "Hoàn thành trong 10 phút", count: 89 },
    { name: "Streak King", icon: "🔥", description: "Chuỗi 30 ngày liên tiếp", count: 23 },
    { name: "Politics Expert", icon: "🏛️", description: "Chuyên gia tin chính trị", count: 67 }
  ];

  const weeklySchedule = [
    { day: "Thứ 2", time: "19:00", topic: "Chính trị Hàn-Mỹ", difficulty: "Cao cấp" },
    { day: "Thứ 4", time: "20:00", topic: "Kinh tế & Đầu tư", difficulty: "Trung cấp" },
    { day: "Thứ 6", time: "19:30", topic: "K-Pop & Entertainment", difficulty: "Cơ bản" },
    { day: "Chủ nhật", time: "18:00", topic: "Công nghệ & AI", difficulty: "Trung cấp" }
  ];

  const formatTimeLeft = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;
    
    if (diff <= 0) return "Đã kết thúc";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Globe className="w-12 h-12 text-yellow-400 mr-4" />
              <Trophy className="w-16 h-16 text-yellow-400" />
              <BookOpen className="w-12 h-12 text-yellow-400 ml-4" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Korean News Challenge
            </h1>
            <p className="text-yellow-400 text-xl mb-2">
              한국 뉴스 챌린지 2025
            </p>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Thử thách kiến thức thời sự Hàn Quốc của bạn qua các bản tin hấp dẫn
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-yellow-400/20">
              <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{competitionStats.totalParticipants.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Thí sinh</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-yellow-400/20">
              <Target className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{competitionStats.activeContests}</div>
              <div className="text-sm text-gray-400">Cuộc thi</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-yellow-400/20">
              <BookOpen className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{competitionStats.completedTests.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Bài thi</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-yellow-400/20">
              <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{competitionStats.averageScore}%</div>
              <div className="text-sm text-gray-400">Điểm TB</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-yellow-400/20">
              <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{competitionStats.topScore}%</div>
              <div className="text-sm text-gray-400">Điểm cao nhất</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-yellow-400/20">
              <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">500M</div>
              <div className="text-sm text-gray-400">Tổng giải thưởng</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-black/95 backdrop-blur-sm border-b border-yellow-400/20 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Tổng quan', icon: Globe },
              { id: 'leaderboard', label: 'Bảng xếp hạng', icon: Trophy },
              { id: 'contests', label: 'Cuộc thi', icon: Target },
              { id: 'schedule', label: 'Lịch trình', icon: Calendar },
              { id: 'achievements', label: 'Thành tích', icon: Award }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium transition-colors whitespace-nowrap flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-yellow-400 text-yellow-400'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2">
                <div className="bg-white/10 rounded-2xl p-8 border border-yellow-400/20">
                  <h2 className="text-3xl font-bold text-white mb-6">Về Korean News Challenge</h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      Korean News Challenge là cuộc thi trắc nghiệm tiếng Hàn độc đáo, tập trung vào việc kiểm tra 
                      khả năng nghe hiểu và hiểu biết thời sự của người học tiếng Hàn tại Việt Nam.
                    </p>
                    <p>
                      Mỗi tuần, chúng tôi cập nhật những tin tức mới nhất từ Hàn Quốc trong các lĩnh vực: 
                      chính trị, kinh tế, văn hóa, công nghệ và thể thao.
                    </p>
                    <p>
                      Thí sinh sẽ nghe các bản tin thực tế bằng tiếng Hàn và trả lời các câu hỏi liên quan, 
                      giúp nâng cao cả khả năng ngôn ngữ lẫn hiểu biết văn hóa.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-black/30 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Target className="w-6 h-6 text-yellow-400 mr-2" />
                        Mục tiêu
                      </h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Nâng cao khả năng nghe tiếng Hàn</li>
                        <li>• Cập nhật thời sự Hàn Quốc</li>
                        <li>• Hiểu sâu văn hóa và xã hội Hàn</li>
                        <li>• Kết nối cộng đồng học tiếng Hàn</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Star className="w-6 h-6 text-yellow-400 mr-2" />
                        Đặc điểm
                      </h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Audio tin tức thật từ các đài Hàn</li>
                        <li>• Câu hỏi đa dạng theo cấp độ</li>
                        <li>• Bảng xếp hạng thời gian thực</li>
                        <li>• Giải thưởng hấp dẫn hàng tuần</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-6 text-black">
                  <h3 className="text-2xl font-bold mb-4">Tham gia ngay!</h3>
                  <p className="mb-6">
                    Bắt đầu thử thách với bài thi mới nhất về tin tức Hàn Quốc.
                  </p>
                  <button className="w-full bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-all flex items-center justify-center">
                    <Play className="w-5 h-5 mr-2" />
                    Bắt đầu thi
                  </button>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 border border-yellow-400/20">
                  <h3 className="text-xl font-bold text-white mb-4">Cuộc thi sắp diễn ra</h3>
                  <div className="space-y-3">
                    {recentContests.slice(0, 2).map((contest) => (
                      <div key={contest.id} className="bg-black/30 rounded-lg p-4">
                        <h4 className="text-white font-medium text-sm mb-1">{contest.title}</h4>
                        <p className="text-yellow-400 text-xs mb-2">{contest.titleKr}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-xs">{contest.category}</span>
                          <span className="text-yellow-400 text-xs font-bold">
                            {contest.status === 'active' ? formatTimeLeft(contest.endTime) : 'Sắp diễn ra'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white">Bảng Xếp Hạng</h2>
              <div className="flex space-x-4">
                <select 
                  value={selectedPeriod} 
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-white/10 border border-yellow-400/20 rounded-lg px-4 py-2 text-white"
                >
                  <option value="weekly">Tuần này</option>
                  <option value="monthly">Tháng này</option>
                  <option value="alltime">Mọi thời điểm</option>
                </select>
              </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <div className="bg-white/10 rounded-2xl p-6 border border-yellow-400/20">
                  <div className="space-y-4">
                    {leaderboard.map((user, index) => (
                      <div 
                        key={user.rank} 
                        className={`flex items-center p-4 rounded-xl border transition-all hover:border-yellow-400/50 ${
                          index < 3 
                            ? 'bg-gradient-to-r from-yellow-400/20 to-yellow-600/10 border-yellow-400/30' 
                            : 'bg-white/5 border-gray-600'
                        }`}
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          <div className={`text-3xl ${index < 3 ? 'animate-pulse' : ''}`}>
                            {user.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className={`text-2xl font-bold ${
                                index === 0 ? 'text-yellow-400' : 
                                index === 1 ? 'text-gray-300' : 
                                index === 2 ? 'text-yellow-600' : 'text-white'
                              }`}>
                                #{user.rank}
                              </span>
                              <div>
                                <h3 className="text-lg font-bold text-white">{user.name}</h3>
                                <p className="text-yellow-400 text-sm">{user.nameKr}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                                {user.badge}
                              </span>
                              <span className="text-gray-400 text-sm">{user.level}</span>
                              <span className="text-gray-400 text-sm">📍 {user.location}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">{user.score}%</div>
                            <div className="text-sm text-gray-400">{user.points} điểm</div>
                            <div className="flex items-center text-xs text-yellow-400 mt-1">
                              <span className="mr-1">🔥</span>
                              {user.streak} ngày
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/10 rounded-2xl p-6 border border-yellow-400/20">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Crown className="w-6 h-6 text-yellow-400 mr-2" />
                    Top 3 tuần này
                  </h3>
                  <div className="space-y-3">
                    {leaderboard.slice(0, 3).map((user, index) => (
                      <div key={user.rank} className="flex items-center space-x-3">
                        <span className="text-2xl">{user.avatar}</span>
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm">{user.name}</p>
                          <p className="text-yellow-400 text-xs">{user.score}% • {user.points} điểm</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 border border-yellow-400/20">
                  <h3 className="text-lg font-bold text-white mb-4">Thống kê của bạn</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Xếp hạng hiện tại</span>
                      <span className="text-white font-bold">#156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Điểm cao nhất</span>
                      <span className="text-yellow-400 font-bold">87%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bài thi hoàn thành</span>
                      <span className="text-white">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Chuỗi ngày</span>
                      <span className="text-yellow-400">🔥 5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contests' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white">Cuộc Thi Hiện Tại</h2>
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm cuộc thi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/10 border border-yellow-400/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400"
                  />
                </div>
                <button className="bg-white/10 border border-yellow-400/20 rounded-lg px-4 py-2 text-white hover:border-yellow-400/50 transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {recentContests.map((contest) => (
                <div key={contest.id} className="bg-white/10 rounded-2xl p-6 border border-yellow-400/20 hover:border-yellow-400/40 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{contest.title}</h3>
                      <p className="text-yellow-400 mb-2">{contest.titleKr}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="bg-yellow-400 text-black px-2 py-1 rounded-full font-bold">
                          {contest.category}
                        </span>
                        <span className="text-gray-400">{contest.difficulty}</span>
                        <span className="text-gray-400">⏱️ {contest.duration}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      contest.status === 'active' ? 'bg-green-500 text-white' :
                      contest.status === 'upcoming' ? 'bg-yellow-400 text-black' :
                      'bg-gray-500 text-white'
                    }`}>
                      {contest.status === 'active' ? 'Đang diễn ra' :
                       contest.status === 'upcoming' ? 'Sắp diễn ra' : 'Đã kết thúc'}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/30 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Users className="w-4 h-4 text-yellow-400" />
                        <span className="text-white font-bold">{contest.participants.toLocaleString()}</span>
                      </div>
                      <p className="text-gray-400 text-xs">Thí sinh tham gia</p>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Award className="w-4 h-4 text-yellow-400" />
                        <span className="text-white font-bold">{contest.prize}</span>
                      </div>
                      <p className="text-gray-400 text-xs">Tổng giải thưởng</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {contest.status === 'active' && (
                      <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-yellow-400 font-medium">Còn lại:</span>
                          <span className="text-white font-bold">{formatTimeLeft(contest.endTime)}</span>
                        </div>
                      </div>
                    )}

                    <button 
                      className={`w-full py-3 rounded-full font-bold transition-all flex items-center justify-center ${
                        contest.status === 'active' 
                          ? 'bg-yellow-400 text-black hover:bg-yellow-300' 
                          : contest.status === 'upcoming'
                          ? 'border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black'
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={contest.status === 'completed'}
                    >
                      {contest.status === 'active' ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Tham gia ngay
                        </>
                      ) : contest.status === 'upcoming' ? (
                        <>
                          <Clock className="w-4 h-4 mr-2" />
                          Đăng ký tham gia
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          Xem kết quả
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Lịch Trình Hàng Tuần</h2>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white/10 rounded-2xl p-6 border border-yellow-400/20">
                  <h3 className="text-xl font-bold text-white mb-6">Cuộc thi định kỳ</h3>
                  <div className="space-y-4">
                    {weeklySchedule.map((schedule, index) => (
                      <div key={index} className="flex items-center p-4 bg-black/30 rounded-xl border border-gray-600 hover:border-yellow-400/50 transition-all">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <span className="text-lg font-bold text-yellow-400">{schedule.day}</span>
                            <span className="text-white font-medium">{schedule.time}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              schedule.difficulty === 'Cơ bản' ? 'bg-green-500 text-white' :
                              schedule.difficulty === 'Trung cấp' ? 'bg-yellow-400 text-black' :
                              'bg-red-500 text-white'
                            }`}>
                              {schedule.difficulty}
                            </span>
                          </div>
                          <h4 className="text-white font-medium">{schedule.topic}</h4>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 border border-yellow-400/20 mt-6">
                  <h3 className="text-xl font-bold text-white mb-6">Sự kiện đặc biệt</h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/10 p-6 rounded-xl border border-yellow-400/30">
                      <div className="flex items-center space-x-3 mb-3">
                        <Crown className="w-6 h-6 text-yellow-400" />
                        <h4 className="text-xl font-bold text-white">Monthly Championship</h4>
                      </div>
                      <p className="text-gray-300 mb-4">
                        Cuộc thi lớn nhất trong tháng với giải thưởng lên đến 200 triệu VNĐ
                      </p>
                      <div className="flex items-center space-x-4">
                        <span className="text-yellow-400 font-bold">📅 30/09/2025</span>
                        <span className="text-yellow-400 font-bold">⏰ 19:00</span>
                        <span className="text-yellow-400 font-bold">🏆 200M VNĐ</span>
                      </div>
                    </div>

                    <div className="bg-black/30 p-4 rounded-xl border border-gray-600">
                      <h4 className="text-lg font-bold text-white mb-2">K-Pop Special Week</h4>
                      <p className="text-gray-400 text-sm mb-3">
                        Tuần lễ đặc biệt về văn hóa K-Pop với các tin tức hot nhất
                      </p>
                      <span className="text-yellow-400 text-sm font-bold">15-22/10/2025</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/10 rounded-2xl p-6 border border-yellow-400/20">
                  <h3 className="text-lg font-bold text-white mb-4">Múi giờ</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hà Nội</span>
                      <span className="text-white font-bold">GMT+7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Seoul</span>
                      <span className="text-white">GMT+9</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Los Angeles</span>
                      <span className="text-white">GMT-8</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 border border-yellow-400/20">
                  <h3 className="text-lg font-bold text-white mb-4">Thông báo</h3>
                  <div className="space-y-3">
                    <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-3">
                      <p className="text-yellow-400 font-medium text-sm">Bảo trì hệ thống</p>
                      <p className="text-gray-300 text-xs">2:00-4:00 sáng ngày 20/09</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                      <p className="text-green-400 font-medium text-sm">Tính năng mới</p>
                      <p className="text-gray-300 text-xs">Replay audio đã được cập nhật</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-6 text-black">
                  <h3 className="text-lg font-bold mb-3">Nhận thông báo</h3>
                  <p className="text-sm mb-4">
                    Đăng ký để nhận thông báo về cuộc thi mới và kết quả
                  </p>
                  <button className="w-full bg-black text-white py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition-all">
                    Đăng ký thông báo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white">Hệ Thống Thành Tích</h2>
              <div className="text-right">
                <p className="text-gray-400 text-sm">Thành tích của bạn</p>
                <p className="text-white text-2xl font-bold">12/24</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-white/10 rounded-2xl p-6 border border-yellow-400/20 hover:border-yellow-400/40 transition-all group">
                  <div className="text-center">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                      {achievement.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{achievement.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{achievement.description}</p>
                    <div className="bg-black/30 rounded-lg p-3">
                      <div className="flex items-center justify-center space-x-2">
                        <Users className="w-4 h-4 text-yellow-400" />
                        <span className="text-white font-bold">{achievement.count}</span>
                        <span className="text-gray-400 text-sm">người đạt được</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/10 rounded-2xl p-8 border border-yellow-400/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Thành tích của bạn</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">🏅</div>
                  <p className="text-white font-bold">First Victory</p>
                  <p className="text-yellow-400 text-sm">Đã đạt được</p>
                </div>
                <div className="text-center opacity-50">
                  <div className="text-4xl mb-2">📰</div>
                  <p className="text-white font-bold">News Master</p>
                  <p className="text-gray-400 text-sm">23/50 bài thi</p>
                </div>
                <div className="text-center opacity-30">
                  <div className="text-4xl mb-2">💯</div>
                  <p className="text-white font-bold">Perfect Score</p>
                  <p className="text-gray-400 text-sm">Chưa đạt được</p>
                </div>
                <div className="text-center opacity-30">
                  <div className="text-4xl mb-2">⚡</div>
                  <p className="text-white font-bold">Speed Demon</p>
                  <p className="text-gray-400 text-sm">Chưa đạt được</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Join Button */}
      <div className="fixed bottom-6 right-6 z-20">
        <button 
          onClick={() => navigate('/student/competition/join')}
          className="bg-yellow-400 text-black px-6 py-4 rounded-full font-bold shadow-2xl hover:bg-yellow-300 transition-all transform hover:scale-105 flex items-center space-x-2"
        >
          <Play className="w-5 h-5" />
          <span>Tham gia thi</span>
        </button>
      </div>

      {/* Social Stats Footer */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black border-t border-yellow-400/20 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center space-x-12">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <ThumbsUp className="w-5 h-5 text-yellow-400" />
                <span className="text-2xl font-bold text-white">95%</span>
              </div>
              <p className="text-gray-400 text-sm">Độ hài lòng</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <MessageCircle className="w-5 h-5 text-yellow-400" />
                <span className="text-2xl font-bold text-white">2.8K</span>
              </div>
              <p className="text-gray-400 text-sm">Đánh giá</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Share2 className="w-5 h-5 text-yellow-400" />
                <span className="text-2xl font-bold text-white">1.2K</span>
              </div>
              <p className="text-gray-400 text-sm">Chia sẻ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}