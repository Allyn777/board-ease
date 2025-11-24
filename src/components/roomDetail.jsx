import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './footer';

const RoomDetail = () => {
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    fullName: 'Allyn Dumapias',
    email: 'Admin@gmail.com',
    phoneNumber: '09554466777',
    checkIn: '',
    checkOut: ''
  });

  // Room images - main image and thumbnails
  const roomImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80',
      alt: 'Room view 1'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80',
      alt: 'Room view 2'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1631889993957-c2a2d1e7e3b3?w=800&auto=format&fit=crop&q=80',
      alt: 'Room view 3'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80',
      alt: 'Room view 4'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80',
      alt: 'Room view 5'
    }
  ];

  const features = [
    { id: 1, name: 'Air conditioning', icon: '❄️' },
    { id: 2, name: 'City View', icon: '🏙️' },
    { id: 3, name: 'Clothing Storage', icon: '👔' },
    { id: 4, name: 'High Wifi Speed', icon: '📶' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    // Add booking logic here
    console.log('Booking submitted:', formData);
    alert('Booking submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <button className="bg-[#061A25] hover:bg-[#0a2535] text-white px-4 py-2 rounded-lg font-medium transition-colors border border-white/20 mb-5">
              Room 1
            </button> 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Main Content Area - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2 p-2">
                {/* Main Large Image */}
                <div className="md:col-span-3">
                  <img
                    src={roomImages[selectedImageIndex].url}
                    alt={roomImages[selectedImageIndex].alt}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg"
                  />
                </div>
                {/* Thumbnail Grid */}
                <div className="md:col-span-2 grid grid-cols-2 gap-2">
                  {roomImages.slice(0, 4).map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                        selectedImageIndex === index
                          ? 'border-[#061A25] ring-2 ring-[#061A25]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-24 sm:h-32 lg:h-40 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* About Home Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Home</h2>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                deserunt mollit anim id est laborum.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi 
                architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>

            {/* Home Features Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Home Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-4xl mb-2">{feature.icon}</div>
                    <p className="text-sm font-medium text-gray-700">{feature.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form - Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#061A25] rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold text-white mb-6">Book Now</h2>
              <form onSubmit={handleBookNow} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-white text-sm font-medium mb-2">
                    Full name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-white text-sm font-medium mb-2">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="checkIn" className="block text-white text-sm font-medium mb-2">
                    Check in
                  </label>
                  <input
                    type="text"
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    placeholder="DD/MM/YY"
                    className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="checkOut" className="block text-white text-sm font-medium mb-2">
                    Check out
                  </label>
                  <input
                    type="text"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    placeholder="DD/MM/YY"
                    className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#061A25] hover:bg-[#0a2535] text-white font-semibold py-3 px-4 rounded-lg transition-colors border border-white/20 mt-6"
                >
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RoomDetail;

