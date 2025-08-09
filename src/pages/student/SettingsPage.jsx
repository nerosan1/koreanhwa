import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Volume2, 
  VolumeX,
  Moon,
  Sun,
  Smartphone,
  Monitor,
  Download,
  Upload,
  Trash,
  Save,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  Edit,
  Camera,
  Mail,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  Target,
  Zap,
  Clock,
  Star,
  Flame,
  Trophy,
  Gift,
  Sparkles,
  BarChart3,
  TrendingUp,
  Award,
  Heart,
  Crown,
  Medal,
  Activity,
  PieChart,
  LineChart,
  Wifi,
  Battery,
  Tablet,
  Laptop
} from 'lucide-react';
import Card from '../../components/common/Card';
import StudentLayout from '../../components/layout/StudentLayout';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showMotivationSettings, setShowMotivationSettings] = useState(false);

  const tabs = [
    { id: 'profile', name: 'Hồ sơ cá nhân', icon: User },
    { id: 'notifications', name: 'Thông báo', icon: Bell },
    { id: 'privacy', name: 'Bảo mật', icon: Shield },
    { id: 'appearance', name: 'Giao diện', icon: Palette },
    { id: 'language', name: 'Ngôn ngữ', icon: Globe },
    { id: 'study', name: 'Cài đặt học tập', icon: BookOpen },
    { id: 'motivation', name: 'Động lực', icon: Flame }
  ];

  const [settings, setSettings] = useState({
    profile: {
      firstName: 'Nguyễn',
      lastName: 'Văn A',
      email: 'nguyenvana@example.com',
      phone: '0123456789',
      avatar: 'A',
      level: 'Sơ cấp 2',
      goal: 'TOPIK II',
      birthday: '1995-05-15',
      location: 'Hà Nội, Việt Nam',
      bio: 'Học viên tiếng Hàn nhiệt huyết, yêu thích văn hóa Hàn Quốc và K-Pop',
      interests: ['K-Pop', 'Du lịch', 'Nấu ăn', 'Phim Hàn Quốc'],
      studyTime: 'Buổi tối',
      timezone: 'Asia/Ho_Chi_Minh'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      studyReminders: true,
      competitionUpdates: true,
      blogUpdates: false,
      weeklyReports: true,
      dailyGoals: true,
      streakAlerts: true,
      achievementAlerts: true,
      friendActivity: false,
      soundEnabled: true,
      vibrationEnabled: true,
      quietHours: {
        enabled: true,
        start: '22:00',
        end: '07:00'
      }
    },
    privacy: {
      profileVisibility: 'public',
      showProgress: true,
      showAchievements: true,
      allowMessages: true,
      dataSharing: false,
      showOnlineStatus: true,
      allowFriendRequests: true,
      showEmail: false,
      showPhone: false,
      allowAnalytics: true
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium',
      compactMode: false,
      showAnimations: true,
      colorScheme: 'blue',
      accentColor: '#3B82F6',
      backgroundImage: 'default',
      cardStyle: 'rounded',
      showAvatars: true,
      showIcons: true
    },
    language: {
      interfaceLanguage: 'vi',
      studyLanguage: 'ko',
      subtitles: true,
      pronunciation: 'korean',
      romanization: false,
      translationLanguage: 'vi',
      autoTranslate: true,
      showBothLanguages: true
    },
    study: {
      dailyGoal: 30,
      weeklyGoal: 180,
      autoPlayAudio: true,
      showHints: true,
      autoSave: true,
      reviewInterval: 7,
      spacedRepetition: true,
      difficultyAdjustment: true,
      focusMode: false,
      studyBreaks: {
        enabled: true,
        duration: 5,
        interval: 25
      },
      learningPath: 'adaptive',
      practiceMode: 'mixed',
      vocabularyLimit: 20,
      grammarFocus: 'balanced'
    },
    motivation: {
      streakGoal: 7,
      weeklyChallenges: true,
      achievementDisplay: true,
      progressCelebration: true,
      milestoneRewards: true,
      socialFeatures: true,
      leaderboardParticipation: true,
      customRewards: {
        enabled: true,
        rewards: [
          { id: 1, name: 'Xem phim Hàn Quốc', points: 100, completed: false },
          { id: 2, name: 'Mua sách tiếng Hàn', points: 200, completed: false },
          { id: 3, name: 'Du lịch Hàn Quốc', points: 1000, completed: false }
        ]
      },
      motivationMessages: {
        enabled: true,
        frequency: 'daily',
        categories: ['encouragement', 'achievement', 'reminder']
      },
      studyStreak: {
        current: 12,
        longest: 25,
        goal: 30,
        rewards: [
          { days: 7, achieved: true, reward: 'Huy hiệu 7 ngày' },
          { days: 14, achieved: true, reward: 'Huy hiệu 2 tuần' },
          { days: 30, achieved: false, reward: 'Huy hiệu 1 tháng' },
          { days: 100, achieved: false, reward: 'Huy hiệu 100 ngày' }
        ]
      }
    }
  });

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Avatar Section */}
      <Card>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {settings.profile.avatar}
            </div>
            <button className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ảnh đại diện</h3>
            <p className="text-gray-600 mb-4">Thay đổi ảnh đại diện của bạn</p>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Tải ảnh lên
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Chụp ảnh
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin cá nhân</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Họ</label>
            <input
              type="text"
              value={settings.profile.firstName}
              onChange={(e) => handleSettingChange('profile', 'firstName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên</label>
            <input
              type="text"
              value={settings.profile.lastName}
              onChange={(e) => handleSettingChange('profile', 'lastName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={settings.profile.email}
              onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
            <input
              type="tel"
              value={settings.profile.phone}
              onChange={(e) => handleSettingChange('profile', 'phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
            <input
              type="date"
              value={settings.profile.birthday}
              onChange={(e) => handleSettingChange('profile', 'birthday', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Địa điểm</label>
            <input
              type="text"
              value={settings.profile.location}
              onChange={(e) => handleSettingChange('profile', 'location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      {/* Learning Profile */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hồ sơ học tập</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cấp độ hiện tại</label>
            <select
              value={settings.profile.level}
              onChange={(e) => handleSettingChange('profile', 'level', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Sơ cấp 1">Sơ cấp 1</option>
              <option value="Sơ cấp 2">Sơ cấp 2</option>
              <option value="Sơ cấp 3">Sơ cấp 3</option>
              <option value="Trung cấp 1">Trung cấp 1</option>
              <option value="Trung cấp 2">Trung cấp 2</option>
              <option value="Cao cấp">Cao cấp</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mục tiêu học tập</label>
            <select
              value={settings.profile.goal}
              onChange={(e) => handleSettingChange('profile', 'goal', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="TOPIK I">TOPIK I</option>
              <option value="TOPIK II">TOPIK II</option>
              <option value="Giao tiếp cơ bản">Giao tiếp cơ bản</option>
              <option value="Du lịch Hàn Quốc">Du lịch Hàn Quốc</option>
              <option value="Công việc">Công việc</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian học tập</label>
            <select
              value={settings.profile.studyTime}
              onChange={(e) => handleSettingChange('profile', 'studyTime', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Buổi sáng">Buổi sáng</option>
              <option value="Buổi trưa">Buổi trưa</option>
              <option value="Buổi chiều">Buổi chiều</option>
              <option value="Buổi tối">Buổi tối</option>
              <option value="Cuối tuần">Cuối tuần</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Múi giờ</label>
            <select
              value={settings.profile.timezone}
              onChange={(e) => handleSettingChange('profile', 'timezone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Asia/Ho_Chi_Minh">Việt Nam (GMT+7)</option>
              <option value="Asia/Seoul">Hàn Quốc (GMT+9)</option>
              <option value="Asia/Tokyo">Nhật Bản (GMT+9)</option>
              <option value="America/New_York">New York (GMT-5)</option>
              <option value="Europe/London">London (GMT+0)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Bio and Interests */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Giới thiệu và sở thích</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Giới thiệu</label>
            <textarea
              rows="3"
              value={settings.profile.bio}
              onChange={(e) => handleSettingChange('profile', 'bio', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Giới thiệu về bản thân..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sở thích</label>
            <div className="flex flex-wrap gap-2">
              {settings.profile.interests.map((interest, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {interest}
                  <button
                    onClick={() => {
                      const newInterests = settings.profile.interests.filter((_, i) => i !== index);
                      handleSettingChange('profile', 'interests', newInterests);
                    }}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
              <button className="px-3 py-1 border border-blue-300 text-blue-600 rounded-full text-sm hover:bg-blue-50">
                + Thêm
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderMotivationTab = () => (
    <div className="space-y-6">
      {/* Streak Settings */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Cài đặt Streak</h3>
          <Flame className="w-6 h-6 text-orange-500" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{settings.motivation.studyStreak.current}</div>
            <div className="text-sm text-orange-700">Streak hiện tại</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{settings.motivation.studyStreak.longest}</div>
            <div className="text-sm text-blue-700">Kỷ lục</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{settings.motivation.studyStreak.goal}</div>
            <div className="text-sm text-green-700">Mục tiêu</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mục tiêu streak (ngày)</label>
            <input
              type="number"
              value={settings.motivation.studyStreak.goal}
              onChange={(e) => handleSettingChange('motivation', 'studyStreak', {
                ...settings.motivation.studyStreak,
                goal: parseInt(e.target.value)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phần thưởng streak</label>
            <div className="space-y-2">
              {settings.motivation.studyStreak.rewards.map((reward, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {reward.achieved ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{reward.days} ngày</div>
                      <div className="text-sm text-gray-600">{reward.reward}</div>
                    </div>
                  </div>
                  {reward.achieved && <Trophy className="w-5 h-5 text-yellow-500" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Achievement Settings */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cài đặt thành tích</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Hiển thị thành tích</h4>
              <p className="text-sm text-gray-600">Hiển thị thành tích và huy hiệu</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.motivation.achievementDisplay}
                onChange={(e) => handleSettingChange('motivation', 'achievementDisplay', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Thông báo thành tích</h4>
              <p className="text-sm text-gray-600">Nhận thông báo khi đạt thành tích mới</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.motivation.milestoneRewards}
                onChange={(e) => handleSettingChange('motivation', 'milestoneRewards', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Chúc mừng tiến độ</h4>
              <p className="text-sm text-gray-600">Hiển thị thông báo chúc mừng khi hoàn thành mục tiêu</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.motivation.progressCelebration}
                onChange={(e) => handleSettingChange('motivation', 'progressCelebration', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Custom Rewards */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Phần thưởng tùy chỉnh</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Kích hoạt phần thưởng tùy chỉnh</h4>
              <p className="text-sm text-gray-600">Tạo phần thưởng riêng cho bản thân</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.motivation.customRewards.enabled}
                onChange={(e) => handleSettingChange('motivation', 'customRewards', {
                  ...settings.motivation.customRewards,
                  enabled: e.target.checked
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {settings.motivation.customRewards.enabled && (
            <div className="space-y-3">
              {settings.motivation.customRewards.rewards.map((reward, index) => (
                <div key={reward.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {reward.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Gift className="w-5 h-5 text-blue-500" />
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{reward.name}</div>
                      <div className="text-sm text-gray-600">{reward.points} điểm</div>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors">
                + Thêm phần thưởng mới
              </button>
            </div>
          )}
        </div>
      </Card>

      {/* Social Features */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tính năng xã hội</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Tham gia bảng xếp hạng</h4>
              <p className="text-sm text-gray-600">Hiển thị trong bảng xếp hạng toàn cầu</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.motivation.leaderboardParticipation}
                onChange={(e) => handleSettingChange('motivation', 'leaderboardParticipation', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Tính năng xã hội</h4>
              <p className="text-sm text-gray-600">Kết nối với bạn bè và chia sẻ tiến độ</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.motivation.socialFeatures}
                onChange={(e) => handleSettingChange('motivation', 'socialFeatures', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Thử thách hàng tuần</h4>
              <p className="text-sm text-gray-600">Tham gia các thử thách học tập hàng tuần</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.motivation.weeklyChallenges}
                onChange={(e) => handleSettingChange('motivation', 'weeklyChallenges', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'motivation':
        return renderMotivationTab();
      default:
        return (
          <Card>
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tính năng đang phát triển</h3>
              <p className="text-gray-600">Các cài đặt khác sẽ được cập nhật sớm</p>
            </div>
          </Card>
        );
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cài đặt</h1>
            <p className="text-gray-600">Tùy chỉnh trải nghiệm học tập của bạn</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Xuất dữ liệu
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Lưu thay đổi
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </StudentLayout>
  );
};

export default SettingsPage; 