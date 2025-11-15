import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';

const RoomSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Filter states
  const [rentalTerm, setRentalTerm] = useState('One Month');
  const [totalPax, setTotalPax] = useState('One Person');
  const [rentalRate, setRentalRate] = useState('10000-15000');

  // Room data - sample rooms (include price to match Home layout)
  const rooms = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    image: '/login-bg.png', // Using the same interior design image
    title: `Room ${i + 1}`,
    price: [`$120/night`, `$150/night`, `$180/night`, `$200/night`][i % 4]
  }));

  // Pagination settings
  const ITEMS_PER_PAGE = 12; // maximum items per page
  const totalPages = Math.max(1, Math.ceil(rooms.length / ITEMS_PER_PAGE));
  const pagedRooms = rooms.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleInterested = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  const nextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  const prevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  // Check active route
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      {/* Floating Toggle Button - Shows when sidebar is hidden on desktop */}
      {sidebarCollapsed && (
        <button
          onClick={() => setSidebarCollapsed(false)}
          className="fixed left-4 top-4 z-50 bg-[#061A25] text-white p-3 rounded-lg shadow-lg hover:bg-[#0a2535] transition-all duration-300 lg:block hidden"
          aria-label="Show sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={`bg-white border-r border-gray-200 fixed lg:static inset-y-0 top-0 lg:top-auto z-40 transform transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? 'w-0 lg:w-0' : 'w-64 lg:w-72'
          } ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className={`h-full overflow-y-auto p-4 sm:p-6 transition-opacity duration-300 ${
            sidebarCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            {/* Toggle Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => {
                  setSidebarCollapsed(!sidebarCollapsed);
                  if (sidebarCollapsed) setSidebarOpen(true);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:block hidden"
                aria-label="Toggle sidebar"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
                aria-label="Close sidebar"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Notifications */}
            <div className="mb-6">
              <button
                onClick={() => {
                  navigate('/notifications');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between border rounded-lg px-4 py-3 transition-all duration-200 ${
                  isActive('/notifications')
                    ? 'border-[#061A25] bg-[#061A25]/5 shadow-md'
                    : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                }`}
              >
                <span className={`text-sm font-medium ${
                  isActive('/notifications') ? 'text-[#061A25] font-semibold' : 'text-gray-900'
                }`}>
                  Notifications
                </span>
                <div className="relative">
                  <svg className={`w-5 h-5 transition-colors ${
                    isActive('/notifications') ? 'text-[#061A25]' : 'text-gray-600'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {isActive('/notifications') && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#061A25] rounded-full animate-pulse"></span>
                  )}
                </div>
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="mb-6 space-y-3">
              <button
                onClick={() => {
                  navigate('/home');
                  setSidebarOpen(false);
                }}
                className={`w-full font-medium py-3 px-4 rounded-lg transition-all duration-200 text-left flex items-center gap-2 relative overflow-hidden group ${
                  isActive('/home')
                    ? 'bg-[#061A25] text-white shadow-lg scale-105'
                    : 'bg-[#061A25] hover:bg-[#0a2535] text-white hover:scale-[1.02]'
                }`}
              >
                <div className={`absolute left-0 top-0 h-full w-1 bg-white transition-all ${
                  isActive('/home') ? 'w-1' : 'w-0 group-hover:w-1'
                }`}></div>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-medium">Home</span>
                {isActive('/home') && (
                  <span className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></span>
                )}
              </button>
              <button
                onClick={() => {
                  navigate('/rooms');
                  setSidebarOpen(false);
                }}
                className={`w-full font-medium py-3 px-4 rounded-lg transition-all duration-200 text-left flex items-center gap-2 relative overflow-hidden group ${
                  isActive('/rooms')
                    ? 'bg-[#0a2535] text-white shadow-lg scale-105 border-2 border-[#061A25]'
                    : 'bg-[#061A25] hover:bg-[#0a2535] text-white hover:scale-[1.02]'
                }`}
              >
                <div className={`absolute left-0 top-0 h-full w-1 bg-white transition-all ${
                  isActive('/rooms') ? 'w-1' : 'w-0 group-hover:w-1'
                }`}></div>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="font-medium">Rooms</span>
                {isActive('/rooms') && (
                  <span className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></span>
                )}
              </button>
              <button
                onClick={() => {
                  navigate('/bookings');
                  setSidebarOpen(false);
                }}
                className={`w-full font-medium py-3 px-4 rounded-lg transition-all duration-200 text-left flex items-center gap-2 relative overflow-hidden group ${
                  isActive('/bookings')
                    ? 'bg-[#061A25] text-white shadow-lg scale-105'
                    : 'bg-[#061A25] hover:bg-[#0a2535] text-white hover:scale-[1.02]'
                }`}
              >
                <div className={`absolute left-0 top-0 h-full w-1 bg-white transition-all ${
                  isActive('/bookings') ? 'w-1' : 'w-0 group-hover:w-1'
                }`}></div>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="font-medium">Bookings</span>
                {isActive('/bookings') && (
                  <span className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></span>
                )}
              </button>
            </div>

            {/* Rental Filters */}
            <div className="mb-6 space-y-4">
              <div>
                <label className="block bg-[#061A25] text-white font-medium py-2 px-4 rounded-t-lg text-sm mb-0">
                  Rental Term
                </label>
                <select
                  value={rentalTerm}
                  onChange={(e) => setRentalTerm(e.target.value)}
                  className="w-full border border-gray-300 rounded-b-lg px-4 py-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#061A25] focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="One Month">One Month</option>
                  <option value="Three Months">Three Months</option>
                  <option value="Six Months">Six Months</option>
                  <option value="One Year">One Year</option>
                </select>
              </div>

              <div>
                <label className="block bg-[#061A25] text-white font-medium py-2 px-4 rounded-t-lg text-sm mb-0">
                  Total Pax
                </label>
                <select
                  value={totalPax}
                  onChange={(e) => setTotalPax(e.target.value)}
                  className="w-full border border-gray-300 rounded-b-lg px-4 py-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#061A25] focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="One Person">One Person</option>
                  <option value="Two People">Two People</option>
                  <option value="Three People">Three People</option>
                  <option value="Four+ People">Four+ People</option>
                </select>
              </div>

              <div>
                <label className="block bg-[#061A25] text-white font-medium py-2 px-4 rounded-t-lg text-sm mb-0">
                  Rental Rate
                </label>
                <select
                  value={rentalRate}
                  onChange={(e) => setRentalRate(e.target.value)}
                  className="w-full border border-gray-300 rounded-b-lg px-4 py-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#061A25] focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="5000-10000">5000-10000</option>
                  <option value="10000-15000">10000-15000</option>
                  <option value="15000-20000">15000-20000</option>
                  <option value="20000+">20000+</option>
                </select>
              </div>
            </div>

            {/* User Actions */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  navigate('/profile');
                  setSidebarOpen(false);
                }}
                className="w-full bg-[#061A25] hover:bg-[#0a2535] text-white font-medium py-3 px-4 rounded-lg transition-colors text-left flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </button>
              <button
                onClick={() => {
                  navigate('/login');
                  setSidebarOpen(false);
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-left flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log out
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-30 top-0"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto bg-white transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-0'
        }`}>
          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden p-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bg-[#061A25] text-white p-2 rounded-lg hover:bg-[#0a2535] transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Rooms Grid (match Home available rooms style) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
              {pagedRooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.title}
                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1631889993957-c2a2d1e7e3b3?w=600&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-[#061A25] text-white px-3 py-1 rounded-lg text-sm font-semibold">
                      {room.price}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{room.title}</h3>
                    <button 
                      onClick={() => handleInterested(room.id)}
                      className="w-full bg-[#061A25] hover:bg-[#0a2535] text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-8 pb-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Prev</span>
              </button>
              
              <div className="px-6 py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-900">
                Page {currentPage} of {totalPages}
              </div>
              
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm md:text-base">© 2024 Board Ease. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default RoomSelection;

