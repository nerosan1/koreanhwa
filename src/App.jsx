import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import DashboardPage from './pages/Dashboard';
import Components from './pages/Components';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import UserManagement from './pages/UserManagement';
import ContentManagement from './pages/ContentManagement';
import RoleManagement from './pages/RoleManagement';
import ForumManagement from './pages/ForumManagement';
import DictionaryManagement from './pages/DictionaryManagement';
import ProgressManagement from './pages/ProgressManagement';
import ReportsManagement from './pages/ReportsManagement';
import SettingsManagement from './pages/SettingsManagement';
import MaterialsManagement from './pages/MaterialsManagement';
import ExamManagement from './pages/ExamManagement';
import AISystemMonitoring from './pages/AISystemMonitoring';
import AddUser from './pages/AddUser';
import CreateContent from './pages/CreateContent';
import AddRole from './pages/AddRole';
import StudentDashboard from './pages/student/StudentDashboard';
import LessonDetail from './pages/student/LessonDetail';
import TOPIKPractice from './pages/student/TOPIKPractice';
import VocabularyManager from './pages/student/VocabularyManager';
import MaterialsPage from './pages/student/MaterialsPage';
import BlogPage from './pages/student/BlogPage';
import MyRoadmap from './pages/student/MyRoadmap';
import CompetitionPage from './pages/student/CompetitionPage2';
import SettingsPage from './pages/student/SettingsPage';
import Test from './pages/Test';
// import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/users/add" element={<AddUser />} />
        <Route path="/admin/content" element={<ContentManagement />} />
        <Route path="/admin/content/create" element={<CreateContent />} />
        <Route path="/admin/roles" element={<RoleManagement />} />
        <Route path="/admin/roles/add" element={<AddRole />} />
        <Route path="/admin/forum" element={<ForumManagement />} />
        <Route path="/admin/dictionary" element={<DictionaryManagement />} />
        <Route path="/admin/progress" element={<ProgressManagement />} />
        <Route path="/admin/reports" element={<ReportsManagement />} />
        <Route path="/admin/settings" element={<SettingsManagement />} />
        <Route path="/admin/materials" element={<MaterialsManagement />} />
        <Route path="/admin/exams" element={<ExamManagement />} />
        <Route path="/admin/ai-monitoring" element={<AISystemMonitoring />} />
        
        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/roadmap" element={<MyRoadmap />} />
        <Route path="/student/lessons" element={<LessonDetail />} />
        <Route path="/student/topik" element={<TOPIKPractice />} />
        <Route path="/student/vocabulary" element={<VocabularyManager />} />
        <Route path="/student/materials" element={<MaterialsPage />} />
        <Route path="/student/blog" element={<BlogPage />} />
        <Route path="/student/competition" element={<CompetitionPage />} />
        <Route path="/student/settings" element={<SettingsPage />} />
        <Route path="/student/profile" element={<div className="text-center py-16"><h1 className="text-3xl font-bold">Hồ sơ cá nhân</h1><p className="text-gray-600 mt-4">Trang hồ sơ cá nhân đang được phát triển...</p></div>} />
        
        {/* Legacy Routes */}
        <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
        <Route path="/components" element={<Layout><Components /></Layout>} />
        <Route path="/courses" element={<Layout><div className="text-center py-16"><h1 className="text-3xl font-bold">Courses</h1><p className="text-gray-600 mt-4">Courses page is under development...</p></div></Layout>} />
        <Route path="/lessons" element={<Layout><div className="text-center py-16"><h1 className="text-3xl font-bold">Lessons</h1><p className="text-gray-600 mt-4">Lessons page is under development...</p></div></Layout>} />
        <Route path="/achievements" element={<Layout><div className="text-center py-16"><h1 className="text-3xl font-bold">Achievements</h1><p className="text-gray-600 mt-4">Achievements page is under development...</p></div></Layout>} />
        <Route path="/profile" element={<Layout><div className="text-center py-16"><h1 className="text-3xl font-bold">Profile</h1><p className="text-gray-600 mt-4">Profile page is under development...</p></div></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
