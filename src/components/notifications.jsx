import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './footer';

const Notifications = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      from: 'Landlord',
      date: '11/12/25',
      message: 'Your payment for Room 1 has been confirmed.',
      type: 'payment'
    },
    {
      id: 2,
      from: 'System',
      date: '10/12/25',
      message: 'Reminder: Your rent for Room 2 is due in 3 days.',
      type: 'reminder'
    },
    {
      id: 3,
      from: 'Landlord',
      date: '09/12/25',
      message: 'Maintenance scheduled for Room 1 on 15/12/25.',
      type: 'maintenance'
    },
    {
      id: 4,
      from: 'System',
      date: '08/12/25',
      message: 'Your booking request for Room 3 has been approved.',
      type: 'booking'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#061A25] text-white px-6 py-4">
            <h2 className="text-xl sm:text-2xl font-bold">Notifications</h2>
          </div>

          <div className="p-4 sm:p-6">
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <p className="text-gray-500">No notifications yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="bg-gray-50 rounded-lg p-4 sm:p-6 border-l-4 border-[#061A25] hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-semibold text-gray-900">From:</span>
                          <span className="text-sm text-gray-700">{notification.from}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm font-semibold text-gray-900">Date:</span>
                          <span className="text-sm text-gray-700">{notification.date}</span>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-900">Message:</span>
                          <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        notification.type === 'payment' ? 'bg-green-100 text-green-800' :
                        notification.type === 'reminder' ? 'bg-yellow-100 text-yellow-800' :
                        notification.type === 'maintenance' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {notification.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Notifications;

