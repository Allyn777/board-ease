import React, { useState, useEffect } from "react";
import { useAuth } from '../contexts/authcontext';
import { useNavigate } from 'react-router-dom';
import { supabase, uploadRoomImages, deleteRoomImage } from '../lib/supabaseClient';

const navigation = [
  { id: "dashboard", label: "Dashboard" },
  { id: "rooms", label: "Rooms Management" },
  { id: "tenants", label: "Tenants Management" },
  { id: "payments", label: "Payments Management" },
];

const ManagementTable = ({
  columns,
  rows,
  renderRow,
  emptyLabel,
  columnClass = "grid-cols-5",
}) => (
  <div className="mt-4 rounded-xl border border-gray-200 overflow-hidden">
    <div className={`grid ${columnClass} bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700`}>
      {columns.map((column) => (
        <span key={column}>{column}</span>
      ))}
    </div>
    {rows.length === 0 ? (
      <div className="h-72 bg-gray-50 flex items-center justify-center text-gray-500" aria-label={emptyLabel}>
        {emptyLabel}
      </div>
    ) : (
      rows.map(renderRow)
    )}
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(navigation[0].id);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  // Form state for adding room
  const [roomForm, setRoomForm] = useState({
    room_number: '',
    capacity: '',
    rental_term: 'One Month',
    price_monthly: '',
    description: '',
    status: 'Available'
  });
  const [selectedImages, setSelectedImages] = useState([]);

  // Fetch rooms from database
  useEffect(() => {
    if (activeTab === 'rooms') {
      fetchRooms();
    }
  }, [activeTab]);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRooms(data || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      alert('Error loading rooms: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }
    setSelectedImages(files);
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    
    if (!roomForm.room_number || !roomForm.capacity || !roomForm.price_monthly) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setUploadingImages(true);

      // Upload images first
      let imageUrls = [];
      if (selectedImages.length > 0) {
        imageUrls = await uploadRoomImages(selectedImages, roomForm.room_number);
      }

      // Insert room into database
      const { data, error } = await supabase
        .from('rooms')
        .insert([{
          room_number: roomForm.room_number,
          capacity: roomForm.capacity,
          rental_term: roomForm.rental_term,
          price_monthly: parseFloat(roomForm.price_monthly),
          description: roomForm.description,
          status: roomForm.status,
          image_urls: JSON.stringify(imageUrls),
          created_by: user?.id
        }])
        .select();

      if (error) throw error;

      alert('Room created successfully!');
      
      // Reset form
      setRoomForm({
        room_number: '',
        capacity: '',
        rental_term: 'One Month',
        price_monthly: '',
        description: '',
        status: 'Available'
      });
      setSelectedImages([]);
      setShowAddRoom(false);
      
      // Refresh rooms list
      fetchRooms();
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Error creating room: ' + error.message);
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  const handleDeleteRoom = async (roomId, imageUrls) => {
    if (!confirm('Are you sure you want to delete this room?')) return;

    try {
      setLoading(true);

      // Delete images from storage
      if (imageUrls) {
        const urls = JSON.parse(imageUrls);
        await Promise.all(urls.map(url => deleteRoomImage(url)));
      }

      // Delete room from database
      const { error } = await supabase
        .from('rooms')
        .delete()
        .eq('id', roomId);

      if (error) throw error;

      alert('Room deleted successfully!');
      fetchRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
      alert('Error deleting room: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  // Calculate stats
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(r => r.status === 'Available').length;
  const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-gray-900">
      <header className="bg-[#051A2C] text-white shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <div>
            <p className="text-sm uppercase tracking-widest text-white/70">Admin Panel</p>
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm sm:text-base">
              Welcome,<span className="font-semibold ml-1">{user?.email || 'Admin'}</span>
            </p>
            <button 
              onClick={handleLogout}
              className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold shadow hover:bg-red-600 transition-colors">
              Logout
            </button>
          </div>
        </div>
        <nav className="bg-white text-gray-600">
          <div className="max-w-6xl mx-auto flex flex-wrap">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 min-w-[150px] border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                  activeTab === item.id
                    ? "border-[#051A2C] text-[#051A2C]"
                    : "border-transparent hover:text-black"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-8 space-y-8">
        {activeTab === "rooms" ? (
          <section className="grid gap-6 lg:grid-cols-[1.3fr,0.7fr]">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-500">
                    Admin Room Management
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900">Room Management</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Total: {totalRooms} | Available: {availableRooms} | Occupied: {occupiedRooms}
                  </p>
                </div>
                <button
                  onClick={() => setShowAddRoom(true)}
                  className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow hover:bg-gray-900"
                  disabled={loading}
                >
                  Add New Room
                </button>
              </div>
              
              {loading && !showAddRoom ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-gray-500">Loading rooms...</div>
                </div>
              ) : (
                <ManagementTable
                  columns={["Room no.", "Capacity", "Price", "Status", "Actions"]}
                  rows={rooms}
                  emptyLabel="No rooms added yet. Click 'Add New Room' to get started!"
                  renderRow={(room) => (
                    <div
                      key={room.id}
                      className="grid grid-cols-5 px-4 py-3 text-sm text-gray-800 border-t border-gray-100"
                    >
                      <span className="font-semibold">{room.room_number}</span>
                      <span>{room.capacity}</span>
                      <span className="font-semibold text-green-600">₱{room.price_monthly.toLocaleString()}</span>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        room.status === 'Available' ? 'bg-green-100 text-green-700' :
                        room.status === 'Occupied' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {room.status}
                      </span>
                      <div className="flex gap-2 justify-end">
                        <button 
                          onClick={() => handleDeleteRoom(room.id, room.image_urls)}
                          className="text-sm font-semibold text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                />
              )}
            </div>

            {showAddRoom && (
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200 lg:sticky lg:top-8 h-fit">
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Add Room</h3>
                  <button
                    onClick={() => setShowAddRoom(false)}
                    className="text-sm font-semibold text-gray-500 hover:text-black"
                    disabled={loading}
                  >
                    Close
                  </button>
                </div>
                <form onSubmit={handleCreateRoom} className="mt-6 space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Room No. *</label>
                    <input
                      type="text"
                      required
                      value={roomForm.room_number}
                      onChange={(e) => setRoomForm({...roomForm, room_number: e.target.value})}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                      placeholder="e.g., 101, 202"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Capacity *</label>
                    <select 
                      required
                      value={roomForm.capacity}
                      onChange={(e) => setRoomForm({...roomForm, capacity: e.target.value})}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                    >
                      <option value="">Select Capacity</option>
                      <option value="Single">Single</option>
                      <option value="Double">Double</option>
                      <option value="Family">Family</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Rental Term</label>
                    <select 
                      value={roomForm.rental_term}
                      onChange={(e) => setRoomForm({...roomForm, rental_term: e.target.value})}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                    >
                      <option value="One Month">One Month</option>
                      <option value="Three Months">Three Months</option>
                      <option value="One Year">One Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Price (PHP) *</label>
                    <input
                      type="number"
                      required
                      value={roomForm.price_monthly}
                      onChange={(e) => setRoomForm({...roomForm, price_monthly: e.target.value})}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                      placeholder="e.g., 5000"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Images (Max 5)
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                    />
                    {selectedImages.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedImages.length} image(s) selected
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Description</label>
                    <textarea
                      rows={4}
                      value={roomForm.description}
                      onChange={(e) => setRoomForm({...roomForm, description: e.target.value})}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                      placeholder="Add room description"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddRoom(false)}
                      className="text-sm font-semibold text-gray-500 hover:text-black"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading || uploadingImages}
                      className="rounded-md bg-[#051A2C] px-6 py-2 text-sm font-semibold text-white shadow hover:bg-[#031121] disabled:opacity-50"
                    >
                      {uploadingImages ? 'Uploading...' : loading ? 'Creating...' : 'Create Room'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </section>
        ) : activeTab === "dashboard" ? (
          <section className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-500">Overview</p>
                <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
              </div>
              <span className="text-sm text-gray-500">
                {new Date().toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex justify-center">
                <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-gray-200 bg-white text-center shadow-inner sm:h-48 sm:w-48">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm uppercase tracking-widest text-gray-500">Total Rooms</p>
                    <p className="text-2xl font-semibold text-gray-900">{totalRooms}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-gray-200 bg-white text-center shadow-inner sm:h-48 sm:w-48">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm uppercase tracking-widest text-gray-500">Available</p>
                    <p className="text-2xl font-semibold text-green-600">{availableRooms}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-gray-200 bg-white text-center shadow-inner sm:h-48 sm:w-48">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm uppercase tracking-widest text-gray-500">Occupied</p>
                    <p className="text-2xl font-semibold text-red-600">{occupiedRooms}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-500">Section under development</p>
          </div>
        )}
      </main>

      <footer className="bg-[#051A2C] py-6 text-center text-sm text-white/80">
        © {new Date().getFullYear()} Board Ease. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminDashboard;