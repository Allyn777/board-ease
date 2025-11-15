import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: 'Spambab_05',
    email: 'Admin@gmail.com',
    fullname: '',
    phoneNumber: '0855220011',
    gender: ''
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Profile saved:', formData);
    alert('Profile saved successfully!');
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Booking data
  const paymentRooms = [
    { id: 1, name: 'Room 1' },
    { id: 2, name: 'Room 2' }
  ];

  const paymentStatusRooms = [
    { id: 1, name: 'Room 1', status: 'Paid' },
    { id: 2, name: 'Room 2', status: 'Pending' }
  ];

  const ongoingRentRooms = [
    { id: 1, name: 'Room 1', startDate: '10/10/25', endDate: '11/10/25' },
    { id: 2, name: 'Room 2', startDate: '10/10/25', endDate: '20/10/25' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#061A25] text-white px-6 py-4">
                <h2 className="text-xl font-bold">Profile</h2>
              </div>
              
              <div className="p-4 sm:p-6">
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Profile Picture Section */}
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="relative">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border-4 border-gray-200">
                          {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <label className="mt-4 block">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <span className="block w-full bg-gray-700 hover:bg-gray-600 text-white text-center py-2 px-4 rounded-lg cursor-pointer transition-colors text-sm font-medium">
                            Upload Photo
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-end mb-4">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Back
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                          </label>
                          <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#061A25] focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#061A25] focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-2">
                            Fullname
                          </label>
                          <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#061A25] focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#061A25] focus:border-transparent"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                            Gender
                          </label>
                          <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#061A25] focus:border-transparent"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-center pt-4">
                        <button
                          type="submit"
                          className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-2 rounded-lg font-medium transition-colors"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* My Bookings Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#061A25] text-white px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">My Bookings</h2>
                <div className="flex gap-2">
                  <button className="p-1 hover:bg-white/10 rounded transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-white/10 rounded transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                  {/* Payment Card */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-4">Payment</h3>
                    <div className="space-y-3">
                      {paymentRooms.map((room) => (
                        <div key={room.id} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">{room.name}</span>
                          <div className="flex gap-2">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                              Pay
                            </button>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                              Cancel
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Status Card */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-4">Payment Status</h3>
                    <div className="space-y-3">
                      {paymentStatusRooms.map((room) => (
                        <div key={room.id} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">{room.name}</span>
                          <div className="flex gap-2">
                            <button className={`${room.status === 'Paid' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white px-3 py-1 rounded text-xs font-medium transition-colors`}>
                              {room.status}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ongoing Rent Card */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-4">On going Rent</h3>
                    <div className="space-y-3">
                      {ongoingRentRooms.map((room) => (
                        <div key={room.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">{room.name}</span>
                          </div>
                          <div className="flex gap-2">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                              {room.startDate}
                            </button>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                              {room.endDate}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Notifications and History */}
          <div className="space-y-6">
            {/* Notifications Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#061A25] text-white px-6 py-4 flex items-center justify-between">
                <button
                  onClick={() => navigate(-1)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-xl font-bold">Notifications</h2>
                <div className="w-5"></div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="font-bold text-gray-900 mb-4">Notifcations</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700"><span className="font-medium">From:</span> Landlord</p>
                  <p className="text-sm text-gray-700"><span className="font-medium">Date:</span> 11/12/25</p>
                  <p className="text-sm text-gray-700"><span className="font-medium">Message:</span> Etc.</p>
                </div>
              </div>
            </div>

            {/* Hover/History Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#061A25] text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(-1)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h2 className="text-xl font-bold">Hover</h2>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  {/* Rent History Card */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-4">Rent History</h3>
                    <div className="space-y-3">
                      {ongoingRentRooms.map((room) => (
                        <div key={room.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">{room.name}</span>
                          </div>
                          <div className="flex gap-2">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                              Extend
                            </button>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                              End {room.endDate}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment History Card */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-4">Payment History</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Room 1</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                            Success
                          </button>
                          <span className="text-xs text-gray-600">Date: 11/12/25</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Room 2</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                            Cancelled
                          </button>
                          <span className="text-xs text-gray-600">Date: 11/12/25</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default Profile;

