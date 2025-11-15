import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Home = () => {
  const navigate = useNavigate();
  // Main carousel state (show 3 items per slide, advance by 3)
  const CAR_STEP = 3;
  const [carouselStart, setCarouselStart] = useState(0);

  // Room images for the carousel
  const carouselImages = [
    {
      id: 1,
      title: "Cozy Blue Room",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80",
      description: "A vibrant room with blue walls and modern furniture"
    },
    {
      id: 2,
      title: "Modern Living Room",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80",
      description: "Spacious living room with ocean view"
    },
    {
      id: 3,
      title: "Luxury Bedroom",
      image: "https://plus.unsplash.com/premium_photo-1661879252375-7c1db1932572?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bHV4dXJ5JTIwYmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D",
      description: "Elegant bedroom with premium furnishings"
    },
    {
      id: 4,
      title: "Scandinavian Suite",
      image: "https://media.istockphoto.com/id/2093684615/photo/digitally-created-spacious-modern-living-room.jpg?s=612x612&w=0&k=20&c=nMASk6C34x5Y-hr6d0vIUuUBvBkwA98XiUJm1cOheK4=",
      description: "Minimalist suite with natural light"
    },
    {
      id: 5,
      title: "Urban Loft",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop&q=80",
      description: "Open-plan loft in the city center"
    },
    {
      id: 6,
      title: "Coastal Retreat",
      image: "https://media.istockphoto.com/id/2238998512/photo/nigh-costal-view-with-cabanas-and-white-sand-beach-doha-qatar.jpg?s=612x612&w=0&k=20&c=ULN7tLVmgAG6xoLwnVWyWArmkfsamTigAgjARp_RPAk=",
      description: "Relaxing room with sea views"
    }
  ];

  const getVisibleCarouselItems = () => {
    const out = [];
    for (let i = 0; i < CAR_STEP; i++) {
      const idx = (carouselStart + i) % carouselImages.length;
      out.push(carouselImages[idx]);
    }
    return out;
  };

  // Autoplay removed: user requested manual control (click next/prev selects one-by-one)

  // Highlight visible items briefly when they come into view
  const [highlightedIds, setHighlightedIds] = useState([]);
  useEffect(() => {
    // Highlight only the selected single item (the one at carouselStart)
    const idx = carouselStart % carouselImages.length;
    const id = carouselImages[idx]?.id;
    if (id !== undefined) {
      setHighlightedIds([id]);
      const t = setTimeout(() => setHighlightedIds([]), 700);
      return () => clearTimeout(t);
    }
    setHighlightedIds([]);
    return undefined;
  }, [carouselStart]);


  // Service features data
  const services = [
    {
      icon: "🕒",
      title: "Open 24/7",
      description: "24 hours access"
    },
    {
      icon: "🏆",
      title: "24 HOURS RETURN",
      description: "100% money-back guarantee"
    },
    {
      icon: "💳",
      title: "SECURE PAYMENT",
      description: "Your money is safe"
    },
    {
      icon: "🎧",
      title: "SUPPORT 24/7",
      description: "Live contact/message"
    }
  ];


  // Available rooms
  const availableRooms = [
    {
      id: 1,
      title: "Room 1",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=80",
      price: "$120/night"
    },
    {
      id: 2,
      title: "Room 2",
      image: "https://media.istockphoto.com/id/1133953738/photo/view-of-white-living-room-in-minimal-style-with-furniture-on-bright-laminate-floor-interior.jpg?s=612x612&w=0&k=20&c=teuiUTmhsD5MlkX4h3FmBarYQR3nfpQ02Qp-5qi7JOo=",
      price: "$150/night"
    },
    {
      id: 3,
      title: "Room 3",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop&q=80",
      price: "$180/night"
    },
    {
      id: 4,
      title: "Room 4",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop&q=80",
      price: "$200/night"
    }
  ];

  // Carousel state for Available Rooms (show by groups)
  const STEP = 3; // move by 3 items each advance
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(9); // 9 = 3x3 on desktop

  // Responsive visibleCount: mobile 3, tablet 6, desktop 9
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setVisibleCount(3);
      else if (w < 1024) setVisibleCount(6);
      else setVisibleCount(9);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Auto-advance by STEP every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((s) => (s + STEP) % availableRooms.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [availableRooms.length]);

  const getVisibleRooms = () => {
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      const idx = (startIndex + i) % availableRooms.length;
      result.push(availableRooms[idx]);
    }
    return result;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shared Header */}
      <Header />
      {/* Main Carousel/Gallery Section */}
      <section className="bg-[#061A25] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={() => setCarouselStart((s) => (s - 1 + carouselImages.length) % carouselImages.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => setCarouselStart((s) => (s + 1) % carouselImages.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg"
              aria-label="Next image"
            >
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Carousel Container (3 items per slide) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {getVisibleCarouselItems().map((room) => {
                const isHighlighted = highlightedIds.includes(room.id);
                return (
                  <div
                    key={room.id}
                    className={`relative rounded-lg overflow-hidden shadow-xl transition-transform duration-500 transform ${isHighlighted ? 'scale-105 z-10' : 'hover:scale-105'}`}
                  >
                    <img
                      src={room.image}
                      alt={room.title}
                      className="w-full h-48 sm:h-64 lg:h-72 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="font-semibold text-md mb-1">{room.title}</h3>
                      <p className="text-sm text-gray-200">{room.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* See More Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => navigate('/rooms')}
                className="bg-[#061A25] hover:bg-[#0a2535] text-white px-6 py-3 rounded-lg font-medium transition-colors border border-white/20 inline-flex items-center"
              >
                <span>See more</span>
                <svg className="ml-3 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="service-grid grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {services.map((service, index) => (
              <div key={index} className="text-center p-4 md:p-6 relative">
                <div className="text-3xl md:text-4xl mb-3">{service.icon}</div>
                <h3 className="font-bold text-sm md:text-base mb-2 text-black">{service.title}</h3>
                <p className="text-xs md:text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featuredd Rooms Section */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="bg-[#061A25] text-white px-6 py-4 rounded-t-lg mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">Featured Rooms</h2>
          </div>

          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {availableRooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.title}
                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-[#061A25] text-white px-3 py-1 rounded-lg text-sm font-semibold">
                      {room.price}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{room.title}</h3>
                    <button 
                      onClick={() => navigate(`/room/${room.id}`)}
                      className="w-full bg-[#061A25] hover:bg-[#0a2535] text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm md:text-base">© 2024 Board Ease. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

