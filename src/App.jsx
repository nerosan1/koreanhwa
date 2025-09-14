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
import LessonDashboard from './pages/student/LessonDashboard.jsx';
import TOPIKPractice from './pages/student/TOPIKPractice';
import StatisticsExamResults from './pages/student/StatisticsExamResults';
import DetaillExamResult from './pages/student/DetaillExamResult';
import AnswerDetailQuestion from './pages/student/AnswerDetailQuestion';
import AnswerTestForm from './pages/student/AnswerTestForm';
import DetailTest from './pages/student/DetailTest';
import VocabularyManager from './pages/student/VocabularyManager';
import AddVocabulary from './pages/student/AddVocabulary';
import TopikVocabularyLessons from './pages/student/TopikVocabularyLessons';
import VocabularyLearning from './pages/student/VocabularyLearning';
import VocabularyMatching from './pages/student/VocabularyMatching';
import VocabularyQuiz from './pages/student/VocabularyQuiz.jsx';
import VocabularyPronunciation from './pages/student/VocabularyPronunciation.jsx';
import VocabularyWritting from './pages/student/VocabularyWritting.jsx';
import VocabularyListenAndWrtie from './pages/student/VocabularyListenAndWriteQuiz.jsx';
import VocabularyTest from './pages/student/VocabularyTest';
import VocabularyFlashcard from './pages/student/VocabularyFlashcard.jsx';
import MaterialDetail from './pages/student/MaterialDetail';
import BlogDetail from './pages/student/BlogDetail';
import LessonLearing from './pages/student/LessonLearning';
import MaterialsPage from './pages/student/MaterialsPage';
import BlogPage from './pages/student/BlogPage';
import CreateBlog from './pages/student/BlogCreate.jsx';
import ManageBlog from './pages/student/BlogManage.jsx';
import LessonInfo from './pages/student/LessonInfo.jsx';
import TestForm from './pages/student/TestForm';
import LessonClassroom from './pages/student/LessonClassrom.jsx';
import MyRoadmap from './pages/student/MyRoadmap';
import MyRoadmapDetail from './pages/student/MyRoadmapDetail';
import CompetitionPage from './pages/student/CompetitionPage2';
import CompetitionJoin from './pages/student/CompetitionJoin';
import CompetitionInfo from './pages/student/CompetitionInfo';
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
        <Route path="/student/roadmap/detail" element={<MyRoadmapDetail />} />
        <Route path="/student/lessons" element={<LessonDashboard />} />
        <Route path="/student/lessons/info" element={<LessonInfo />} />
        <Route path="/student/lessons/learning" element={<LessonLearing />} />
        <Route path="/student/lessons/classroom" element={<LessonClassroom />} />
        <Route path="/student/topik" element={<TOPIKPractice />} />
        <Route path="/student/topik/statistics" element={<StatisticsExamResults />} />
        <Route path="/student/topik/StatisticsExamResults" element={<StatisticsExamResults />} />
        <Route path="/student/topik/TestForm" element={<TestForm />} />
        <Route path="/student/topik/DetailTest" element={<DetailTest />} />
        <Route path="/student/topik/AnswerTestForm" element={<AnswerTestForm />} />
        <Route path="/student/topik/DetaillExamResult" element={<DetaillExamResult />} />
        <Route path="/student/topik/AnswerDetailQuestion" element={<AnswerDetailQuestion />} />
        <Route path="/student/topik/vocabulary-lessons" element={<TopikVocabularyLessons />} />
        <Route path="/student/topik/vocabulary-learning" element={<VocabularyLearning />} />
        <Route path="/student/topik/vocabulary-test" element={<VocabularyTest />} />
        <Route path="/student/topik/vocabulary-matching" element={<VocabularyMatching />} />
        <Route path="/student/topik/vocabulary-quiz" element={<VocabularyQuiz />} />
        <Route path="/student/topik/vocabulary-pronunciation" element={<VocabularyPronunciation />} />
        <Route path="/student/topik/vocabulary-writing" element={<VocabularyWritting />} />
        <Route path="/student/topik/vocabulary-listen-and-write" element={<VocabularyListenAndWrtie />} />
        <Route path="/student/topik/vocabulary-flashcard" element={<VocabularyFlashcard />} />
        <Route path="/student/vocabulary" element={<VocabularyManager />} />
        <Route path="/student/vocabulary/add" element={<AddVocabulary />} />
        <Route path="/student/materials" element={<MaterialsPage />} />
        <Route path="/student/materials/detail" element={<MaterialDetail />} />
        <Route path="/student/blog" element={<BlogPage />} />
        <Route path="/student/blog/create" element={<CreateBlog />} />
        <Route path="/student/blog/manage" element={<ManageBlog />} />
        <Route path="/student/blog/detail" element={<BlogDetail />} />
        <Route path="/student/competition" element={<CompetitionPage />} />
        <Route path="/student/competition/join" element={<CompetitionJoin />} />
        <Route path="/student/competition/info" element={<CompetitionInfo />} />
        <Route path="/student/settings" element={<SettingsPage />} />        
        {/* Legacy Routes */}
        {/* <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
        <Route path="/components" element={<Layout><Components /></Layout>} />
        <Route path="/courses" element={<Layout><div className="text-center py-16"><h1 className="text-3xl font-bold">Courses</h1><p className="text-gray-600 mt-4">Courses page is under development...</p></div></Layout>} />
        <Route path="/lessons" element={<Layout><div className="text-center py-16"><h1 className="text-3xl font-bold">Lessons</h1><p className="text-gray-600 mt-4">Lessons page is under development...</p></div></Layout>} />
        <Route path="/achievements" element={<Layout><div className="text-center py-16"><h1 className="text-3xl font-bold">Achievements</h1><p className="text-gray-600 mt-4">Achievements page is under development...</p></div></Layout>} />
        <Route path="/profile" element={<Layout><div className="text-center py-16"><h1 className="text-3xl font-bold">Profile</h1><p className="text-gray-600 mt-4">Profile page is under development...</p></div></Layout>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
