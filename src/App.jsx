import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import DashboardPage from './pages/Dashboard';
import Components from './pages/Components';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './components/admin/Admin';
// import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
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
