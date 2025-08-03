export function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'user', label: 'Người dùng' },
    { key: 'content', label: 'Nội dung' },
    { key: 'result', label: 'Kết quả học' },
    { key: 'path', label: 'Lộ trình' },
    { key: 'document', label: 'Tài liệu' },
    { key: 'forum', label: 'Diễn đàn' },
    { key: 'competition', label: 'Cuộc thi' },
    { key: 'dictionary', label: 'Từ điển' },
    { key: 'ai', label: 'AI' },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col">
      <div className="text-center py-6 text-2xl font-bold border-b">Admin Panel</div>
      <nav className="flex-1 overflow-y-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`w-full text-left px-6 py-3 text-sm font-medium ${
              activeTab === tab.key ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}