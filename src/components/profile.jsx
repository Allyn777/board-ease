import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

// --- Icon Definitions (For consistent styling) ---
const Icon = ({ path, className = "w-6 h-6", ...props }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
    </svg>
);

const UserIcon = (props) => (
    <Icon path="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" {...props} />
);
const BagIcon = (props) => (
    <Icon path="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" {...props} />
);
const CameraIcon = (props) => (
    <Icon path="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM15 13a3 3 0 11-6 0 3 3 0 016 0z" {...props} />
);
const CheckCircleIcon = (props) => (
    <Icon path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" {...props} />
);
// --- End Icon Definitions ---

// Utility component for the purchase item buttons
const ActionButton = ({ label, onClick, style = 'primary' }) => {
    const baseStyle = "px-3 py-1 text-xs font-bold rounded-lg transition-colors shadow-sm min-w-[70px]";
    let specificStyle;

    if (style === 'primary') {
        specificStyle = "bg-black text-white hover:bg-gray-800";
    } else if (style === 'secondary') {
        specificStyle = "bg-white text-black border border-gray-300 hover:bg-gray-100";
    }

    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${specificStyle}`}
        >
            {label}
        </button>
    );
};

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
    const [uploadMessage, setUploadMessage] = useState({ text: '', type: '' });
    const [selectedTab, setSelectedTab] = useState('Payment'); 

    // Auto-scroll to My Bookings section
    useEffect(() => {
        const scrollToBookings = () => {
            if (window.location.hash === '#my-bookings') {
                const element = document.getElementById('my-bookings');
                if (element) {
                    setTimeout(() => {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                }
            }
        };

        scrollToBookings();
        window.addEventListener('hashchange', scrollToBookings);
        
        return () => {
            window.removeEventListener('hashchange', scrollToBookings);
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        setUploadMessage({ text: '', type: '' });
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) { 
                setUploadMessage({ text: 'Error: File size must be less than 1 MB.', type: 'error' });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                setUploadMessage({ text: 'Profile image updated successfully.', type: 'success' });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        console.log('Profile saved:', formData);
        setUploadMessage({ text: 'Profile details saved!', type: 'success' });
        setTimeout(() => setUploadMessage({ text: '', type: '' }), 3000);
    };

    // --- Booking data (kept from original Profile.jsx) ---
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

    const tabs = ['Payment', 'Payment Status', 'Ongoing Rent', 'Rent History', 'Payment History'];

    // Map the booking data to the new tab structure
    const bookingData = {
        'Payment': paymentRooms.map(room => ({ ...room, status: 'AWAITING PAYMENT' })),
        'Payment Status': paymentStatusRooms.map(room => ({ ...room, status: room.status.toUpperCase() })),
        'Ongoing Rent': ongoingRentRooms.map(room => ({ ...room, status: `START: ${room.startDate} | END: ${room.endDate}` })),
        'Rent History': ongoingRentRooms.map(room => ({ ...room, status: 'EXTEND/END' })), 
        'Payment History': [
             { id: 1, name: 'Room 1', status: 'SUCCESS' },
             { id: 2, name: 'Room 2', status: 'CANCELLED' }
        ]
    };

    // Render logic for each item in the "My Bookings" list
    const renderBookingItem = (item) => {
        let actionButtons;
        let statusColorClass;
        
        switch (selectedTab) {
            case 'Payment':
                actionButtons = (
                    <>
                        <ActionButton label="PAY NOW" onClick={() => console.log('Pay Now:', item.name)} style="primary" />
                        <ActionButton label="CANCEL" onClick={() => console.log('Cancel:', item.name)} style="secondary" />
                    </>
                );
                statusColorClass = 'text-orange-600';
                break;
            case 'Payment Status':
                actionButtons = (
                    <button className="text-black text-sm font-medium hover:text-gray-700 transition-colors p-2">
                        View Details
                    </button>
                );
                statusColorClass = item.status.includes('PAID') ? 'text-green-600' : 'text-orange-600';
                break;
            case 'Ongoing Rent':
                actionButtons = (
                    <>
                        <ActionButton label="VIEW" onClick={() => console.log('View:', item.name)} style="primary" />
                    </>
                );
                statusColorClass = 'text-green-600';
                break;
            case 'Rent History':
                 actionButtons = (
                    <>
                        <ActionButton label="EXTEND" onClick={() => console.log('Extend:', item.name)} style="primary" />
                        <ActionButton label="END" onClick={() => console.log('End:', item.name)} style="secondary" />
                    </>
                );
                statusColorClass = 'text-gray-600';
                break;
             case 'Payment History':
                 actionButtons = (
                    <button className="text-black text-sm font-medium hover:text-gray-700 transition-colors p-2">
                        VIEW RECEIPT
                    </button>
                );
                statusColorClass = item.status.includes('SUCCESS') ? 'text-green-600' : 'text-red-600';
                break;
            default:
                actionButtons = null;
                statusColorClass = 'text-gray-600';
        }

        return (
             <div
                key={item.id}
                className="bg-white rounded-xl p-4 mb-3 last:mb-0 border border-gray-200"
            >
                <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center">
                    <div className="mb-2 sm:mb-0">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className={`text-sm mt-1 font-medium ${statusColorClass}`}>
                            Status: {item.status}
                        </p>
                    </div>
                    
                    <div className="flex space-x-2">
                        {actionButtons}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white font-sans">
            
            <Header />

            {/* Main Content Area - Centered and padded */}
            <div className="max-w-4xl mx-auto pb-20 p-4 sm:p-6 lg:py-8"> 
                
                {/* Notification Message */}
                {uploadMessage.text && (
                    <div className={`mt-4 p-3 rounded-lg flex items-center ${
                        uploadMessage.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'
                    }`}>
                        <CheckCircleIcon className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">{uploadMessage.text}</span>
                    </div>
                )}

                {/* Profile Details Section */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                    
                    {/* Dark blue header for the section */}
                    <div className="bg-[#061A25] text-white px-6 py-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold">Profile</h2>
                    </div>

                    <div className="p-4 sm:p-6">
                        
                        {/* Avatar & Upload */}
                        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                            <div className="flex-shrink-0 flex flex-col items-center">
                                <div className="relative">
                                    <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-gray-300 shadow-inner">
                                        {profileImage ? (
                                            <img 
                                                src={profileImage} 
                                                alt="Profile" 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <UserIcon className="w-16 h-16 text-gray-500" />
                                        )}
                                    </div>
                                    <label htmlFor="image-upload" className="absolute bottom-0 right-0 bg-black rounded-full p-2 cursor-pointer hover:bg-gray-700 transition-colors shadow-lg ring-2 ring-white">
                                        <CameraIcon className="w-5 h-5 text-white" />
                                        <input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <label 
                                    htmlFor="image-upload" 
                                    className="mt-4 bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors cursor-pointer shadow-md"
                                >
                                    UPLOAD PHOTO
                                </label>
                                <p className="text-xs text-gray-500 mt-1">Maximum 1 MB</p>
                            </div>
                            
                            {/* Input Fields Grid */}
                            <div className="flex-1 w-full sm:w-auto">
                                <form onSubmit={handleSave} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        
                                        {/* Input Fields */}
                                        <div className="col-span-1">
                                            <label htmlFor="username" className="block text-sm font-medium text-black mb-2">Username</label>
                                            <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#061A25] focus:border-transparent" placeholder="Enter username"/>
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="email" className="block text-sm font-medium text-black mb-2">Email Address</label>
                                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#061A25] focus:border-transparent" placeholder="Enter email"/>
                                        </div>
                                        <div className="col-span-full">
                                            <label htmlFor="fullname" className="block text-sm font-medium text-black mb-2">Fullname</label>
                                            <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#061A25] focus:border-transparent" placeholder="Enter your full name"/>
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-black mb-2">Phone Number</label>
                                            <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#061A25] focus:border-transparent" placeholder="Enter phone number"/>
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="gender" className="block text-sm font-medium text-black mb-2">Gender</label>
                                            <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#061A25] focus:border-transparent">
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Save Button */}
                                  <div className="flex justify-center pt-4 px-4 sm:px-6">
                                      <button 
                                          type="submit"
                                          className="w-full sm:w-auto bg-black text-white px-4 py-3 sm:px-6 sm:py-2 md:px-8 rounded-lg font-medium hover:bg-gray-800 active:bg-gray-900 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 ml-0 sm:ml-32 md:ml-40 lg:ml-120"
                                      >
                                          Save
                                      </button>
                                  </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* My Bookings Section */}
                <div id="my-bookings" className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mt-6">
                    
                    {/* Dark blue header for the section */}
                    <div className="bg-[#061A25] text-white px-6 py-4">
                        <h2 className="text-xl font-bold">My Bookings</h2>
                    </div>

                    {/* Tabs - Horizontal Scroll on Mobile, Black Active State */}
                    <div className="border-b border-gray-200 overflow-x-auto bg-gray-50">
                        <div className="flex min-w-max">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setSelectedTab(tab)}
                                    className={`flex-1 px-4 py-3 text-sm font-semibold whitespace-nowrap min-w-[20%] transition-colors ${
                                        selectedTab === tab
                                            ? 'text-black border-b-2 border-black'
                                            : 'text-gray-500 hover:text-black'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Booking Items */}
                    <div className="p-4 sm:p-6 bg-white">
                        {bookingData[selectedTab].map(renderBookingItem)}
                        
                        {bookingData[selectedTab].length === 0 && (
                            <div className="text-center py-8">
                                <BagIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">No bookings found in this tab.</p>
                            </div>
                        )}
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