import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  RotateCcw,
  Target,
  Award,
  Clock,
  BookOpen,
  Users,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import AdminLayout from '../../components/layout/AdminLayout';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const SettingsManagement = () => {
  const [settings, setSettings] = useState({
    // Điểm yêu cầu
    passingScore: 70,
    excellentScore: 90,
    perfectScore: 100,
    
    // Tiến độ học tập
    minProgressRequired: 60,
    targetProgress: 80,
    maxProgress: 100,
    
    // Thời gian học tập
    minStudyTime: 30, // phút
    targetStudyTime: 60, // phút
    maxStudyTime: 120, // phút
    
    // Thành tích
    minAchievements: 5,
    targetAchievements: 10,
    maxAchievements: 20,
    
    // Chuỗi học tập
    minStreak: 3,
    targetStreak: 7,
    maxStreak: 30,
    
    // Điểm thưởng
    bonusPoints: {
      perfectScore: 10,
      streakBonus: 5,
      achievementBonus: 3,
      timeBonus: 2
    }
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Mock data for charts
  const scoreDistributionData = [
    { range: '0-50', students: 45, percentage: 3.6 },
    { range: '51-60', students: 78, percentage: 6.2 },
    { range: '61-70', students: 156, percentage: 12.5 },
    { range: '71-80', students: 312, percentage: 25.0 },
    { range: '81-90', students: 468, percentage: 37.5 },
    { range: '91-100', students: 191, percentage: 15.2 }
  ];

  const progressDistributionData = [
    { range: '0-20%', students: 25, percentage: 2.0 },
    { range: '21-40%', students: 62, percentage: 5.0 },
    { range: '41-60%', students: 187, percentage: 15.0 },
    { range: '61-80%', students: 500, percentage: 40.0 },
    { range: '81-100%', students: 476, percentage: 38.0 }
  ];

  const studyTimeData = [
    { time: '0-30p', students: 156, percentage: 12.5 },
    { time: '31-60p', students: 468, percentage: 37.5 },
    { time: '61-90p', students: 375, percentage: 30.0 },
    { time: '91-120p', students: 187, percentage: 15.0 },
    { time: '120p+', students: 64, percentage: 5.0 }
  ];

  const handleSettingChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: parseInt(value) || 0
      }
    }));
    setHasChanges(true);
  };

  const handleBonusChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      bonusPoints: {
        ...prev.bonusPoints,
        [field]: parseInt(value) || 0
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Simulate saving settings
    console.log('Saving settings:', settings);
    setHasChanges(false);
    // Show success message
    alert('Cài đặt đã được lưu thành công!');
  };

  const handleReset = () => {
    setSettings({
      passingScore: 70,
      excellentScore: 90,
      perfectScore: 100,
      minProgressRequired: 60,
      targetProgress: 80,
      maxProgress: 100,
      minStudyTime: 30,
      targetStudyTime: 60,
      maxStudyTime: 120,
      minAchievements: 5,
      targetAchievements: 10,
      maxAchievements: 20,
      minStreak: 3,
      targetStreak: 7,
      maxStreak: 30,
      bonusPoints: {
        perfectScore: 10,
        streakBonus: 5,
        achievementBonus: 3,
        timeBonus: 2
      }
    });
    setHasChanges(false);
    setShowResetModal(false);
  };

  const getScoreColor = (score) => {
    if (score >= settings.excellentScore) return 'text-green-600';
    if (score >= settings.passingScore) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (progress) => {
    if (progress >= settings.targetProgress) return 'text-green-600';
    if (progress >= settings.minProgressRequired) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Điều chỉnh điểm yêu cầu</h1>
            <p className="text-gray-600">Cấu hình tiêu chí đánh giá và thưởng điểm</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setShowResetModal(true)}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Đặt lại
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSave}
              disabled={!hasChanges}
            >
              <Save className="w-4 h-4 mr-2" />
              Lưu thay đổi
            </Button>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Score Requirements */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Target className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Điểm yêu cầu</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Điểm đạt (Passing Score)
                </label>
                <Input
                  type="number"
                  value={settings.passingScore}
                  onChange={(e) => handleSettingChange('passingScore', 'passingScore', e.target.value)}
                  min="0"
                  max="100"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Điểm tối thiểu để hoàn thành bài học</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Điểm xuất sắc (Excellent Score)
                </label>
                <Input
                  type="number"
                  value={settings.excellentScore}
                  onChange={(e) => handleSettingChange('excellentScore', 'excellentScore', e.target.value)}
                  min="0"
                  max="100"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Điểm để đạt danh hiệu xuất sắc</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Điểm hoàn hảo (Perfect Score)
                </label>
                <Input
                  type="number"
                  value={settings.perfectScore}
                  onChange={(e) => handleSettingChange('perfectScore', 'perfectScore', e.target.value)}
                  min="0"
                  max="100"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Điểm để đạt danh hiệu hoàn hảo</p>
              </div>
            </div>
          </Card>

          {/* Progress Requirements */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Tiến độ học tập</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiến độ tối thiểu (%)
                </label>
                <Input
                  type="number"
                  value={settings.minProgressRequired}
                  onChange={(e) => handleSettingChange('minProgressRequired', 'minProgressRequired', e.target.value)}
                  min="0"
                  max="100"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Tiến độ tối thiểu để được coi là hoàn thành</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiến độ mục tiêu (%)
                </label>
                <Input
                  type="number"
                  value={settings.targetProgress}
                  onChange={(e) => handleSettingChange('targetProgress', 'targetProgress', e.target.value)}
                  min="0"
                  max="100"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Tiến độ mục tiêu để đạt danh hiệu</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiến độ tối đa (%)
                </label>
                <Input
                  type="number"
                  value={settings.maxProgress}
                  onChange={(e) => handleSettingChange('maxProgress', 'maxProgress', e.target.value)}
                  min="0"
                  max="100"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Tiến độ tối đa có thể đạt được</p>
              </div>
            </div>
          </Card>

          {/* Study Time Requirements */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 text-yellow-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Thời gian học tập (phút)</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thời gian tối thiểu
                </label>
                <Input
                  type="number"
                  value={settings.minStudyTime}
                  onChange={(e) => handleSettingChange('minStudyTime', 'minStudyTime', e.target.value)}
                  min="0"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Thời gian học tối thiểu mỗi ngày</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thời gian mục tiêu
                </label>
                <Input
                  type="number"
                  value={settings.targetStudyTime}
                  onChange={(e) => handleSettingChange('targetStudyTime', 'targetStudyTime', e.target.value)}
                  min="0"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Thời gian học mục tiêu mỗi ngày</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thời gian tối đa
                </label>
                <Input
                  type="number"
                  value={settings.maxStudyTime}
                  onChange={(e) => handleSettingChange('maxStudyTime', 'maxStudyTime', e.target.value)}
                  min="0"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Thời gian học tối đa được ghi nhận</p>
              </div>
            </div>
          </Card>

          {/* Achievement Requirements */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Award className="w-5 h-5 text-purple-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Thành tích và chuỗi học</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thành tích tối thiểu
                </label>
                <Input
                  type="number"
                  value={settings.minAchievements}
                  onChange={(e) => handleSettingChange('minAchievements', 'minAchievements', e.target.value)}
                  min="0"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Số thành tích tối thiểu cần đạt</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chuỗi học tối thiểu (ngày)
                </label>
                <Input
                  type="number"
                  value={settings.minStreak}
                  onChange={(e) => handleSettingChange('minStreak', 'minStreak', e.target.value)}
                  min="0"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Số ngày học liên tiếp tối thiểu</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chuỗi học mục tiêu (ngày)
                </label>
                <Input
                  type="number"
                  value={settings.targetStreak}
                  onChange={(e) => handleSettingChange('targetStreak', 'targetStreak', e.target.value)}
                  min="0"
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Số ngày học liên tiếp mục tiêu</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Bonus Points Settings */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Award className="w-5 h-5 text-orange-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Điểm thưởng</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Điểm hoàn hảo
              </label>
              <Input
                type="number"
                value={settings.bonusPoints.perfectScore}
                onChange={(e) => handleBonusChange('perfectScore', e.target.value)}
                min="0"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Điểm thưởng cho điểm hoàn hảo</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thưởng chuỗi học
              </label>
              <Input
                type="number"
                value={settings.bonusPoints.streakBonus}
                onChange={(e) => handleBonusChange('streakBonus', e.target.value)}
                min="0"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Điểm thưởng cho chuỗi học</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thưởng thành tích
              </label>
              <Input
                type="number"
                value={settings.bonusPoints.achievementBonus}
                onChange={(e) => handleBonusChange('achievementBonus', e.target.value)}
                min="0"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Điểm thưởng cho thành tích</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thưởng thời gian
              </label>
              <Input
                type="number"
                value={settings.bonusPoints.timeBonus}
                onChange={(e) => handleBonusChange('timeBonus', e.target.value)}
                min="0"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Điểm thưởng cho thời gian học</p>
            </div>
          </div>
        </Card>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố điểm số</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scoreDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Progress Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố tiến độ</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progressDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Study Time Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố thời gian học</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studyTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#ff8042" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Current Impact Analysis */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân tích tác động hiện tại</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{scoreDistributionData[3].students + scoreDistributionData[4].students + scoreDistributionData[5].students}</div>
              <div className="text-sm text-gray-600">Học viên đạt điểm đạt</div>
              <div className="text-xs text-gray-500">(≥{settings.passingScore} điểm)</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{progressDistributionData[3].students + progressDistributionData[4].students}</div>
              <div className="text-sm text-gray-600">Học viên đạt tiến độ</div>
              <div className="text-xs text-gray-500">(≥{settings.minProgressRequired}%)</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{studyTimeData[1].students + studyTimeData[2].students}</div>
              <div className="text-sm text-gray-600">Học viên đạt thời gian</div>
              <div className="text-xs text-gray-500">(≥{settings.minStudyTime} phút)</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">85%</div>
              <div className="text-sm text-gray-600">Tỷ lệ hoàn thành</div>
              <div className="text-xs text-gray-500">Theo tiêu chí hiện tại</div>
            </div>
          </div>
        </Card>

        {/* Reset Modal */}
        {showResetModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center mb-4">
                  <AlertCircle className="w-6 h-6 text-yellow-500 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">Xác nhận đặt lại</h3>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Bạn có chắc chắn muốn đặt lại tất cả cài đặt về giá trị mặc định? 
                  Hành động này không thể hoàn tác.
                </p>
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowResetModal(false)}
                  >
                    Hủy
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleReset}
                  >
                    Đặt lại
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default SettingsManagement; 