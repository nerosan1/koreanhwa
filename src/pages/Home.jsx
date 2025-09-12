import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
  const navigate = useNavigate();

const features = [
  {
    title: 'Interactive Lessons',
    description: 'Learn Korean through interactive lessons with images, audio, and video.',
    color: 'yellow',
    image: 'https://i.pinimg.com/736x/27/4e/77/274e77bba950f66f6bd4e7a48ee8b5d6.jpg' // thêm ảnh minh hoạ
  },
  {
    title: 'Achievement System',
    description: 'Earn badges and scores when completing lessons and challenges.',
    color: 'yellow',
    image: 'https://i.pinimg.com/736x/27/4e/77/274e77bba950f66f6bd4e7a48ee8b5d6.jpg'
  },
  {
    title: 'Learning Community',
    description: 'Connect with other learners and share learning experiences.',
    color: 'green',
    image: 'https://i.pinimg.com/736x/27/4e/77/274e77bba950f66f6bd4e7a48ee8b5d6.jpg'
  },
  {
    title: 'Effective Methods',
    description: 'Apply scientific learning methods for long-term retention.',
    color: 'purple',
    image: 'https://i.pinimg.com/736x/27/4e/77/274e77bba950f66f6bd4e7a48ee8b5d6.jpg'
  }
];


  const stats = [
    { number: '10,000+', label: 'Students' },
    { number: '500+', label: 'Lessons' },
    { number: '50+', label: 'Courses' },
    { number: '95%', label: 'Satisfaction' }
  ];

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };

 function Navbar() {
  const [activeLink, setActiveLink] = useState(null);

  const handleClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="flex space-x-8 items-center text-sm font-medium text-gray-900">
      <a
        href="#"
        className={`text-white font-bold relative pb-2 border-b-2 p-3 border-transparent hover:border-yellow-400 transition ${activeLink === 'home' ? 'border-yellow-400' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          handleClick('home');
        }}
      >
        Home
        {activeLink === 'home' && (
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-400 mt-2 rounded-md"></span>
        )}
      </a>
      <a
        href="#"
        className={`text-white font-bold relative pb-2 border-b-2 p-3 border-transparent hover:border-yellow-400 transition ${activeLink === 'courses' ? 'border-yellow-400' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          handleClick('courses');
        }}
      >
        Courses
        {activeLink === 'courses' && (
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-400 mt-2 rounded-md"></span>
        )}
      </a>
      <a
        href="#"
        className={`text-white font-bold relative pb-2 border-b-2 p-3 border-transparent hover:border-yellow-400 transition ${activeLink === 'about' ? 'border-yellow-400' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          handleClick('about');
        }}
      >
        About us
        {activeLink === 'about' && (
          <span className="text-white font-bold absolute left-0 bottom-0 w-full h-0.5 bg-yellow-400 mt-2 rounded-md"></span>
        )}
      </a>
    </nav>
  );
}
const languages = [
  { value: 'en', label: 'English' },
  { value: 'vn', label: 'Tiếng Việt' },
  { value: 'es', label: 'Español' },
  // Thêm ngôn ngữ khác nếu cần
];

function Banner() {
  const [selectedLang, setSelectedLang] = useState('');
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:items-center px-6 md:px-20 py-12 bg-[#FFF9E6]">
      {/* Left content */}
      <div className="md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight text-left">
          Học một <span className="font-black">ngoại ngữ để sử dụng trong đời thực</span>
        </h1>
        <p className="text-gray-700 text-base md:text-lg mb-8 max-w-md text-left py-4">
          Những mẫu câu hữu ích trong cuộc sống hàng ngày. <br />
          Được dạy với những video clip của người bản ngữ thực sự.
        </p>
        <div className="w-20 h-1 bg-yellow-500 mb-6 rounded-sm"></div>
        {/* Language select */}
        <select
          className="w-full max-w-xs mr-10 p-3 mb-6 border-2  border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          aria-label="Chọn ngôn ngữ của bạn"
        >
          <option value="" disabled>
            Chọn ngôn ngữ của bạn
          </option>
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
        {/* Start Button */}
        <button
          className="bg-yellow-400 hover:bg-yellow-500 transition-colors text-black font-bold py-3 px-8 rounded-full w-full max-w-xs"
          disabled={!selectedLang}
          onClick={() => alert(`Bạn đã chọn ngôn ngữ: ${selectedLang}`)}
          aria-disabled={!selectedLang}
        >
          Bắt đầu
        </button>
      </div>
      {/* Right content - image */}
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center md:justify-end">
          <div className="relative w-[500px] h-[500px] rounded-full bg-white shadow-2xl overflow-hidden ring-4 ring-white">
            <img
              src="https://i.pinimg.com/1200x/7a/88/3e/7a883e511f0ea939ff013122d80f5153.jpg"
              alt="Group of friends learning"
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        </div>
    </div>
  );
}

const reviews = [
  {
    id: 1,
    name: "Tra My",
    text: `Beginner Korean Course (Online)
I had never studied Korean before, but after taking this beginner course, I was able to learn the alphabet and basic sentence patterns.
The teacher explains things very clearly and is always ready to help. I'm very satisfied!`,
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
    stars: 5,
  },
  {
    id: 2,
    name: "Tra My",
    text: `Beginner Korean Course (Online)
I had never studied Korean before, but after taking this beginner course, I was able to learn the alphabet and basic sentence patterns.
The teacher explains things very clearly and is always ready to help. I'm very satisfied!`,
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
    stars: 5,
  },
];
const StarRating = ({ count }) => {
  return (
    <div className="flex items-center space-x-0.5">
      {Array.from({ length: count }).map((_, idx) => (
        <svg
          key={idx}
          className="w-4 h-4 text-yellow-400 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.176c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.196-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.049 9.4c-.783-.57-.38-1.81.588-1.81h4.176a1 1 0 00.95-.69l1.286-3.974z" />
        </svg>
      ))}
    </div>
  );
};

function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };
  return (
    <div className="bg-white rounded-[40px] flex max-w-[1000px] mx-auto p-8 gap-8 text-black select-none justify-between">
      {/* Left Text Area */}
      <div className="flex flex-col justify-center flex-1 max-w-[350px] gap-4">
        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
          {/* Chat icon */}
          <svg
            className="w-8 h-8 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4-.888L3 20l1.292-4.213A7.969 7.969 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h2 className="text-4xl font-bold leading-tight">
          What Our <br />
          Students Say
        </h2>
        <p className="text-black/90 leading-relaxed">
          High-quality Korean courses <br />
          with easy-to-understand <br />
          content, suitable for all levels.
        </p>
        <button className="flex items-center gap-2 text-black font-semibold hover:underline max-w-[150px]">
          Read more
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        {/* Navigation arrows and dots */}
        <div className="mt-auto flex items-center gap-4 pt-6">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-500-500 transition"
          >
            <svg
              className="w-5 h-5 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-500 transition"
          >
            <svg
              className="w-5 h-5 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <div className="flex-grow flex justify-center items-center gap-2">
            {reviews.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx === current ? "bg-white" : "bg-white/40"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      {/* Right Cards */}
      <div className="flex gap-6 flex-1 overflow-hidden">
        {/* Display two cards side by side */}
        {[current, (current + 1) % reviews.length].map((index) => {
          const review = reviews[index];
          return (
            <div
              key={review.id}
              className="bg-white text-black rounded-3xl p-4 max-w-[260px] flex flex-col"
              style={{ borderRadius: "24px 24px 40px 40px" }}
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-full h-40 object-cover rounded-t-3xl mb-3"
              />
              <p className="text-sm leading-relaxed whitespace-pre-line mb-4 font-light">
                <span className="font-semibold">Beginner Korean Course (Online)</span>
                <br />
                {review.text.split("\n").slice(1).join("\n")}
              </p>
              <div className="flex justify-between items-center font-semibold text-sm">
                <span>{review.name}</span>
                <StarRating count={review.stars} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black border-b border-gray-200 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-yellow-500">KoreanHwa</span>
            </div>
            
            <div className='flex items-center justify-center space-x-6'>
              <Navbar />
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleLoginClick}
                  className="text-white font-bold hover:text-yellow-600 px-3 py-2 rounded-md text-sm "
                >
                  Login
                </button>
                <button 
                  onClick={handleSignUpClick}
                  className="bg-yellow-500 text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-600"
                >
                  Sign Up
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>

      <section className="text-center pb-16 relative bg-cover bg-center" style={{ minHeight: '600px' }}>
          <Banner />
      </section>

      {/* Main Content */}
      <main className=" sm:px-6 lg:px-8 py-8 bg-black">
        {/* Hero Section */}
        

        {/* Stats Section */}
        <section className="p-10 m-10 bg-white rounded-2xl  mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 m-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose KoreanHwa?
            </h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              We provide the best features to help you learn Korean effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="transform hover:-translate-y-1 transition-transform duration-200"
              >
                <div className="bg-white rounded-xl border border-gray-200 p-6 text-center h-full transition-shadow">
                  <div className="bg-white rounded-xl border border-gray-200 p-6 text-center transition-shadow">
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="w-full object-cover rounded-lg mb-4" 
                    />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        

      </main>

      <section className="py-16 m-10 bg-white w-auto">
          <TestimonialSection />
        </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl font-bold">KoreanHwa</span>
              </div>
              <p className="text-gray-400 mb-6">
                Vietnam's leading online Korean learning platform.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-black">Courses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-black">Lessons</a></li>
                <li><a href="#" className="text-gray-400 hover:text-black">Achievements</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-black">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-black">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-black">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-black">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-black">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-black">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 KoreanHwa. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 