import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/admin/Admin.jsx';
import UserManagement from './pages/admin/UserManagement.jsx';
import ContentManagement from './pages/admin/ContentManagement';
import RoleManagement from './pages/admin/RoleManagement';
import ForumManagement from './pages/admin/ForumManagement';
import ForumCreate from './pages/admin/ForumCreate.jsx';
import ForumUpdate from './pages/admin/ForumUpdate.jsx';
import DictionaryManagement from './pages/admin/DictionaryManagement';
import DictionaryAdd from './pages/admin/DictionaryAdd.jsx';
import DictionaryUpdate from './pages/admin/DictionaryUpdate';
import ProgressManagement from './pages/admin/ProgressManagement';
import ReportsManagement from './pages/admin/ReportsManagement';
import SettingsManagement from './pages/admin/SettingsManagement.jsx';
import MaterialsManagement from './pages/admin/MaterialsManagement';
import MaterialsAdd from './pages/admin/MaterialsAdd';
import MaterialsUpdate from './pages/admin/MaterialsUpdate';
import ExamManagement from './pages/admin/ExamManagement';
import ExamMaterialAdd from './pages/admin/ExamMaterialAdd';
import ExamUpdate from './pages/admin/ExamUpdate';
import AISystemMonitoring from './pages/admin/AISystemMonitoring';
import AddUser from './pages/admin/UserAdd.jsx';
import CreateContent from './pages/admin/ContentCreate.jsx';
import CreateUpdate from './pages/admin/ContentUpdate.jsx';
import AddRole from './pages/admin/AddRole.jsx';
import UpdateRole from './pages/admin/UpdateRole.jsx';
import UserInfo from './pages/admin/UserInfo.jsx';
import UserEdit from './pages/admin/UserUpdate.jsx';

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

// import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/users/info" element={<UserInfo />} />
        <Route path="/admin/users/add" element={<AddUser />} />
        <Route path="/admin/users/update" element={<UserEdit />} />
        <Route path="/admin/content" element={<ContentManagement />} />
        <Route path="/admin/content/create" element={<CreateContent />} />
        <Route path="/admin/content/update" element={<CreateUpdate />} />
        <Route path="/admin/roles" element={<RoleManagement />} />
        <Route path="/admin/roles/add" element={<AddRole />} />
        <Route path="/admin/roles/update" element={<UpdateRole />} />
        <Route path="/admin/forum" element={<ForumManagement />} />
        <Route path="/admin/forum/create" element={<ForumCreate />} />
        <Route path="/admin/forum/update" element={<ForumUpdate />} />
        <Route path="/admin/dictionary" element={<DictionaryManagement />} />
        <Route path="/admin/dictionary/add" element={<DictionaryAdd />} />
        <Route path="/admin/dictionary/update" element={<DictionaryUpdate />} />
        <Route path="/admin/progress" element={<ProgressManagement />} />
        <Route path="/admin/reports" element={<ReportsManagement />} />
        <Route path="/admin/settings" element={<SettingsManagement />} />
        <Route path="/admin/materials" element={<MaterialsManagement />} />
        <Route path="/admin/materials/add" element={<MaterialsAdd />} />
        <Route path="/admin/materials/update/:id" element={<MaterialsUpdate />} />
        <Route path="/admin/exams" element={<ExamManagement />} />
        <Route path="/admin/exams/add" element={<ExamMaterialAdd />} />
        <Route path="/admin/exams/update/:id" element={<ExamUpdate />} />
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
      </Routes>
    </Router>
  );
}

export default App;
