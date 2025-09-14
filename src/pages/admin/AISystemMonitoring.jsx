import React, { useState } from 'react';
import { 
  Brain, 
  Activity, 
  Cpu, 
  Database, 
  Wifi, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Zap,
  Server,
  HardDrive,
  Network,
  Settings,
  RefreshCw,
  BarChart3
} from 'lucide-react';
import { 
  LineChart, 
  Line,
  AreaChart,
  Area,
  BarChart, 
  Bar,
  PieChart, 
  Pie, 
  Cell,
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

const AISystemMonitoring = () => {
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock AI system data
  const systemStatus = {
    overall: 'healthy',
    cpu: { usage: 45, status: 'normal', temperature: 65 },
    memory: { usage: 68, status: 'warning', available: '8.2 GB' },
    storage: { usage: 72, status: 'warning', available: '128 GB' },
    network: { status: 'normal', bandwidth: '85 Mbps', latency: 12 },
    aiModels: { status: 'active', activeModels: 5, totalModels: 8 },
    database: { status: 'normal', connections: 156, queries: 1250 }
  };

  // Mock performance data
  const performanceData = [
    { time: '00:00', cpu: 42, memory: 65, storage: 70, network: 80 },
    { time: '04:00', cpu: 38, memory: 62, storage: 71, network: 75 },
    { time: '08:00', cpu: 55, memory: 72, storage: 72, network: 90 },
    { time: '12:00', cpu: 68, memory: 78, storage: 73, network: 95 },
    { time: '16:00', cpu: 72, memory: 82, storage: 74, network: 88 },
    { time: '20:00', cpu: 58, memory: 75, storage: 72, network: 82 },
    { time: '24:00', cpu: 45, memory: 68, storage: 72, network: 78 }
  ];

  // Mock AI model performance
  const aiModelData = [
    { model: 'GPT-3.5', accuracy: 94.2, responseTime: 1.2, requests: 1250, status: 'active' },
    { model: 'BERT-Korean', accuracy: 91.8, responseTime: 0.8, requests: 890, status: 'active' },
    { model: 'Transformer', accuracy: 89.5, responseTime: 1.5, requests: 567, status: 'active' },
    { model: 'CNN-Vision', accuracy: 96.1, responseTime: 0.6, requests: 234, status: 'maintenance' },
    { model: 'RNN-Speech', accuracy: 87.3, responseTime: 2.1, requests: 123, status: 'active' }
  ];

  // Mock error logs
  const errorLogs = [
    { id: 1, level: 'warning', message: 'Memory usage exceeded 80%', timestamp: '2024-01-20 14:30:25', component: 'Memory' },
    { id: 2, level: 'error', message: 'Database connection timeout', timestamp: '2024-01-20 14:25:10', component: 'Database' },
    { id: 3, level: 'info', message: 'AI model updated successfully', timestamp: '2024-01-20 14:20:15', component: 'AI Models' },
    { id: 4, level: 'warning', message: 'Storage space running low', timestamp: '2024-01-20 14:15:30', component: 'Storage' },
    { id: 5, level: 'error', message: 'Network latency spike detected', timestamp: '2024-01-20 14:10:45', component: 'Network' }
  ];

  // Mock system alerts
  const systemAlerts = [
    { id: 1, type: 'critical', message: 'CPU temperature critical', time: '2 min ago', status: 'active' },
    { id: 2, type: 'warning', message: 'Memory usage high', time: '5 min ago', status: 'resolved' },
    { id: 3, type: 'info', message: 'System backup completed', time: '10 min ago', status: 'resolved' },
    { id: 4, type: 'warning', message: 'Storage space low', time: '15 min ago', status: 'active' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      healthy: 'text-green-600',
      normal: 'text-green-600',
      warning: 'text-yellow-600',
      error: 'text-red-600',
      critical: 'text-red-600',
      active: 'text-green-600',
      maintenance: 'text-orange-600'
    };
    return colors[status] || 'text-gray-600';
  };

  const getStatusBadge = (status) => {
    const config = {
      healthy: { color: 'bg-green-100 text-green-800', label: 'Khỏe mạnh' },
      normal: { color: 'bg-green-100 text-green-800', label: 'Bình thường' },
      warning: { color: 'bg-yellow-100 text-yellow-800', label: 'Cảnh báo' },
      error: { color: 'bg-red-100 text-red-800', label: 'Lỗi' },
      critical: { color: 'bg-red-100 text-red-800', label: 'Nghiêm trọng' },
      active: { color: 'bg-green-100 text-green-800', label: 'Hoạt động' },
      maintenance: { color: 'bg-orange-100 text-orange-800', label: 'Bảo trì' }
    };
    const statusConfig = config[status] || config.normal;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig.color}`}>
        {statusConfig.label}
      </span>
    );
  };

  const getAlertIcon = (type) => {
    const icons = {
      critical: <AlertTriangle className="w-4 h-4 text-red-600" />,
      warning: <AlertTriangle className="w-4 h-4 text-yellow-600" />,
      info: <CheckCircle className="w-4 h-4 text-blue-600" />
    };
    return icons[type] || <CheckCircle className="w-4 h-4 text-green-600" />;
  };

  const getErrorLevelColor = (level) => {
    const colors = {
      error: 'text-red-600',
      warning: 'text-yellow-600',
      info: 'text-blue-600'
    };
    return colors[level] || 'text-gray-600';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Theo dõi hệ thống AI</h1>
            <p className="text-gray-600">Giám sát hiệu suất và trạng thái hệ thống AI</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Tự động làm mới:</label>
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
            >
              <option value={10}>10s</option>
              <option value={30}>30s</option>
              <option value={60}>1m</option>
              <option value={300}>5m</option>
            </select>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Làm mới
            </Button>
          </div>
        </div>

        {/* System Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Cpu className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-500">CPU</p>
                  <p className="text-lg font-semibold text-gray-900">{systemStatus.cpu.usage}%</p>
                </div>
              </div>
              <div className={`text-right ${getStatusColor(systemStatus.cpu.status)}`}>
                {getStatusBadge(systemStatus.cpu.status)}
                <div className="text-xs mt-1">{systemStatus.cpu.temperature}°C</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <HardDrive className="w-5 h-5 text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-500">Bộ nhớ</p>
                  <p className="text-lg font-semibold text-gray-900">{systemStatus.memory.usage}%</p>
                </div>
              </div>
              <div className={`text-right ${getStatusColor(systemStatus.memory.status)}`}>
                {getStatusBadge(systemStatus.memory.status)}
                <div className="text-xs mt-1">{systemStatus.memory.available}</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <HardDrive className="w-5 h-5 text-purple-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-500">Lưu trữ</p>
                  <p className="text-lg font-semibold text-gray-900">{systemStatus.storage.usage}%</p>
                </div>
              </div>
              <div className={`text-right ${getStatusColor(systemStatus.storage.status)}`}>
                {getStatusBadge(systemStatus.storage.status)}
                <div className="text-xs mt-1">{systemStatus.storage.available}</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Network className="w-5 h-5 text-orange-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-500">Mạng</p>
                  <p className="text-lg font-semibold text-gray-900">{systemStatus.network.bandwidth}</p>
                </div>
              </div>
              <div className={`text-right ${getStatusColor(systemStatus.network.status)}`}>
                {getStatusBadge(systemStatus.network.status)}
                <div className="text-xs mt-1">{systemStatus.network.latency}ms</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Performance Over Time */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hiệu suất hệ thống theo thời gian</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cpu" stroke="#8884d8" strokeWidth={2} name="CPU (%)" />
                <Line type="monotone" dataKey="memory" stroke="#82ca9d" strokeWidth={2} name="Memory (%)" />
                <Line type="monotone" dataKey="storage" stroke="#ffc658" strokeWidth={2} name="Storage (%)" />
                <Line type="monotone" dataKey="network" stroke="#ff7300" strokeWidth={2} name="Network (%)" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* AI Model Performance */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hiệu suất mô hình AI</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={aiModelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="model" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="accuracy" fill="#8884d8" name="Độ chính xác (%)" />
                <Bar dataKey="responseTime" fill="#82ca9d" name="Thời gian phản hồi (s)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* System Alerts and Error Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Alerts */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Cảnh báo hệ thống</h3>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-1" />
                Cài đặt
              </Button>
            </div>
            <div className="space-y-3">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getAlertIcon(alert.type)}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500">{alert.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(alert.status)}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Error Logs */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Nhật ký lỗi</h3>
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-1" />
                Xem tất cả
              </Button>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {errorLogs.map((log) => (
                <div key={log.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`mt-1 ${getErrorLevelColor(log.level)}`}>
                    {log.level === 'error' && <AlertTriangle className="w-4 h-4" />}
                    {log.level === 'warning' && <AlertTriangle className="w-4 h-4" />}
                    {log.level === 'info' && <CheckCircle className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{log.message}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">{log.timestamp}</span>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded">{log.component}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* AI Models Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Trạng thái mô hình AI</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {systemStatus.aiModels.activeModels}/{systemStatus.aiModels.totalModels} hoạt động
              </span>
              {getStatusBadge(systemStatus.aiModels.status)}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiModelData.map((model, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{model.model}</h4>
                  {getStatusBadge(model.status)}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Độ chính xác:</span>
                    <span className="font-medium">{model.accuracy}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Thời gian phản hồi:</span>
                    <span className="font-medium">{model.responseTime}s</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Yêu cầu:</span>
                    <span className="font-medium">{model.requests}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Database and Network Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Database Status */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Trạng thái cơ sở dữ liệu</h3>
              {getStatusBadge(systemStatus.database.status)}
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Kết nối hiện tại:</span>
                <span className="font-medium">{systemStatus.database.connections}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Truy vấn/giây:</span>
                <span className="font-medium">{systemStatus.database.queries}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="text-xs text-gray-500 text-center">65% tải</div>
            </div>
          </Card>

          {/* Network Status */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Trạng thái mạng</h3>
              {getStatusBadge(systemStatus.network.status)}
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Băng thông:</span>
                <span className="font-medium">{systemStatus.network.bandwidth}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Độ trễ:</span>
                <span className="font-medium">{systemStatus.network.latency}ms</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="text-xs text-gray-500 text-center">85% sử dụng</div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AISystemMonitoring; 