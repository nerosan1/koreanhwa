import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Volume2, Download, Menu, 
  Search, RotateCcw, ZoomIn, ZoomOut, Bookmark, 
  BookOpen, FileText, Settings, Navigation
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EBookReader = () => {
    const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(21);
  const [totalPages] = useState(384);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [bookmarked, setBookmarked] = useState(false);

  const tableOfContents = [
    { id: 1, title: "Sưu tầm", page: 1, level: 0 },
    { id: 2, title: "Bài 1: Chào hỏi cơ bản", page: 15, level: 1 },
    { id: 3, title: "Từ vựng", page: 16, level: 2 },
    { id: 4, title: "Ngữ pháp", page: 18, level: 2 },
    { id: 5, title: "Bài tập", page: 20, level: 2 },
    { id: 6, title: "Bài 2: Giới thiệu bản thân", page: 25, level: 1 },
    { id: 7, title: "Từ vựng", page: 26, level: 2 },
    { id: 8, title: "Ngữ pháp", page: 28, level: 2 },
    { id: 9, title: "Bài tập", page: 30, level: 2 },
    { id: 10, title: "Bài 3: Gia đình", page: 35, level: 1 },
  ];

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const playAudio = () => {
    // Audio functionality would be implemented here
    console.log("Playing audio for current page");
  };

  const downloadBook = () => {
    // Download functionality would be implemented here
    console.log("Downloading book");
  };

  return (
    <div className="h-screen bg-black flex text-white">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-gray-900 border-r border-gray-700 flex flex-col overflow-hidden`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold text-white">Giáo trình tự học tiếng Hàn 1</h1>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
          
          <div className="space-y-3">
            {/* Audio Button */}
            <button 
              onClick={playAudio}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <Volume2 size={18} />
              <span>Audio</span>
            </button>
            
            {/* Download Button */}
            <button 
              onClick={downloadBook}
              className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <Download size={18} />
              <span>Tải xuống</span>
            </button>
          </div>
        </div>

        {/* Page Navigation */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center flex-1">
              <span className="text-2xl font-bold text-yellow-400">{currentPage}</span>
              <span className="text-gray-400 mx-2">/</span>
              <span className="text-gray-400">{totalPages}</span>
            </div>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-1 rounded text-sm font-medium transition-colors">
              Đi
            </button>
          </div>
          
          <div className="flex justify-between">
            <button 
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button 
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide">Mục lục</h3>
            <nav className="space-y-1">
              {tableOfContents.map((item) => (
                <button
                  key={item.id}
                  onClick={() => goToPage(item.page)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                    item.level === 0 
                      ? 'text-yellow-400 font-medium hover:bg-yellow-500 hover:bg-opacity-10' 
                      : item.level === 1
                      ? 'text-white ml-4 hover:bg-gray-800'
                      : 'text-gray-400 ml-8 hover:bg-gray-800'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{item.title}</span>
                    <span className="text-xs text-gray-500">{item.page}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-gray-800">
        {/* Top Toolbar */}
        <div className="bg-gray-900 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {!sidebarOpen && (
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="text-gray-400 hover:text-white"
                >
                  <Menu size={20} />
                </button>
              )}
              
              <nav className="text-sm text-gray-400">
                <span onClick={() => navigate(-1)} >Tài liệu</span>
                <ChevronRight className="inline mx-2" size={16} />
                <span className="text-white">Giáo trình tự học tiếng Hàn 1</span>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <select className="bg-gray-800 border border-gray-600 text-white px-3 py-1 rounded text-sm">
                <option>Tự động chọn kích thước</option>
                <option>50%</option>
                <option>75%</option>
                <option>100%</option>
                <option>125%</option>
                <option>150%</option>
              </select>
              
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-white">
                  <Search size={20} />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <RotateCcw size={20} />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <Settings size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Document Viewer */}
        <div className="flex-1 overflow-auto bg-gray-700 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Document Content */}
            <div className="bg-white rounded-lg shadow-2xl min-h-[600px] relative overflow-hidden">
              {/* Sample content representing the Golden Bridge image */}
              <div className="absolute top-4 right-6 text-black text-sm">
                <span className="font-semibold">Đà Nẵng</span>
                <span className="text-gray-600 ml-2">Việt Nam</span>
              </div>
              
              {/* Main image area */}
              <div className="w-full h-96 bg-gradient-to-b from-blue-400 to-blue-300 relative">
                {/* Golden Bridge representation */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-80">
                  {/* Bridge structure */}
                  <div className="h-4 bg-gray-400 rounded-full mb-2"></div>
                  <div className="h-2 bg-gray-300 rounded-full mb-4"></div>
                  
                  {/* Golden hands */}
                  <div className="absolute -bottom-6 left-16 w-16 h-20 bg-yellow-500 rounded-t-full transform rotate-12"></div>
                  <div className="absolute -bottom-6 right-16 w-16 h-20 bg-yellow-500 rounded-t-full transform -rotate-12"></div>
                  
                  {/* Bridge details */}
                  <div className="absolute -top-2 left-0 right-0 h-1 bg-yellow-600"></div>
                </div>
                
                {/* Sky elements */}
                <div className="absolute top-4 left-8 text-white text-opacity-30">☁️</div>
                <div className="absolute top-8 right-20 text-white text-opacity-30">☁️</div>
                
                {/* Trees/landscape */}
                <div className="absolute bottom-0 right-4 text-6xl">🌲</div>
                <div className="absolute bottom-0 left-4 text-4xl">🌲</div>
              </div>
              
              {/* Page content area */}
              <div className="p-8 text-black">
                <h2 className="text-2xl font-bold mb-4 text-center">Bài 3: Địa điểm du lịch nổi tiếng</h2>
                <p className="text-gray-700 text-center mb-6">
                  Cầu Vàng - Biểu tượng du lịch của Đà Nẵng, Việt Nam
                </p>
                
                <div className="space-y-4 text-sm">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Từ vựng mới:</h4>
                    <div className="grid grid-cols-2 gap-2 text-gray-700">
                      <div>• 관광지 (gwangwangji) - Điểm du lịch</div>
                      <div>• 다리 (dari) - Cầu</div>
                      <div>• 황금 (hwanggeom) - Vàng</div>
                      <div>• 유명한 (yumyeonghan) - Nổi tiếng</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Page Controls */}
            <div className="flex justify-center mt-6 space-x-4">
              <button 
                onClick={prevPage}
                disabled={currentPage === 1}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
                <span>Trang trước</span>
              </button>
              
              <button 
                onClick={() => setBookmarked(!bookmarked)}
                className={`px-4 py-2 rounded-lg transition-colors ${bookmarked ? 'bg-yellow-500 text-black' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
              >
                <Bookmark className={`inline mr-2 ${bookmarked ? 'fill-current' : ''}`} size={16} />
                Bookmark
              </button>
              
              <button 
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span>Trang sau</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EBookReader;