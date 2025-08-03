import { useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import Dashboard from '../components/Dashboard';
// import UserManagement from '../components/UserManagement';
import { Sidebar } from './Sidebar';
import { Dashboard } from './Dashboard';
import { UserManagement } from './UserManagement';
// import ContentManagement from '../components/ContentManagement';
// import ResultTracking from '../components/ResultTracking';
// import LearningPath from '../components/LearningPath';
// import DocumentManagement from '../components/DocumentManagement';
// import ForumManagement from '../components/ForumManagement';
// import Competition from '../components/Competition';
// import DictionaryManagement from '../components/DictionaryManagement';
// import AIManagement from '../components/AIManagement';
import { ContentManagement } from './ContentManagement';
import { ResultTracking } from './ResultTracking';
import { LearningPath } from './LearningPath';
import { DocumentManagement } from './DocumentManagement';
import { ForumManagement } from './ForumManagement';
import { Competition } from './Competition';
import { DictionaryManagement } from './DictionaryManagement';
import { AIManagement } from './AIManagement';
export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'user': return <UserManagement />;
      case 'content': return <ContentManagement />;
      case 'result': return <ResultTracking />;
      case 'path': return <LearningPath />;
      case 'document': return <DocumentManagement />;
      case 'forum': return <ForumManagement />;
      case 'competition': return <Competition />;
      case 'dictionary': return <DictionaryManagement />;
      case 'ai': return <AIManagement />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-6 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}