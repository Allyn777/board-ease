import React, { useState } from "react";

const navigation = [
  { id: "dashboard", label: "Dashboard" },
  { id: "rooms", label: "Rooms Management" },
  { id: "tenants", label: "Tenants Management" },
  { id: "payments", label: "Payments Management" },
];

const statCards = [
  {
    id: "rooms",
    label: "Total Rooms",
    value: "100 Rooms",
    icon: (
      <svg
        className="w-12 h-12 text-gray-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 18h18M3 8.25h10.125M8.25 8.25V5.625A2.625 2.625 0 0110.875 3h2.25A2.625 2.625 0 0115.75 5.625V8.25m3 0h.375A1.875 1.875 0 0121 10.125V18M3 18v-7.875A1.875 1.875 0 014.875 8.25H5.25"
        />
      </svg>
    ),
  },
  {
    id: "tenants",
    label: "Total Tenants",
    value: "500 Tenants",
    icon: (
      <svg
        className="w-12 h-12 text-gray-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 5.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25A7.5 7.5 0 0112 13.5a7.5 7.5 0 017.5 6.75"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.375 20.25v-5.625L21 16.5"
        />
      </svg>
    ),
  },
  {
    id: "income",
    label: "Total Income",
    value: "120k PHP",
    icon: (
      <svg
        className="w-12 h-12 text-gray-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3v6h6"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 21a9 9 0 009-9V6l6 6a9 9 0 01-9 9H6z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 9h4.5"
        />
      </svg>
    ),
  },
];

const quickActions = [
  { id: "newTenant", label: "Add New Tenant", status: "2 pending approvals" },
  { id: "assignRoom", label: "Assign Room", status: "5 rooms available" },
  { id: "viewPayments", label: "Verify Payments", status: "3 awaiting review" },
];

const activityFeed = [
  { id: 1, title: "Karen Santos paid for Room 804", time: "2 mins ago" },
  { id: 2, title: "New tenant registered - Mark Delos Reyes", time: "15 mins ago" },
  { id: 3, title: "Room 305 maintenance scheduled", time: "45 mins ago" },
  { id: 4, title: "Monthly income report exported", time: "1 hr ago" },
];

const occupancyData = [
  { id: 1, label: "Occupied", value: 78, color: "bg-emerald-500" },
  { id: 2, label: "Reserved", value: 15, color: "bg-amber-500" },
  { id: 3, label: "Vacant", value: 7, color: "bg-rose-500" },
];

const roomRows = [];
const tenantRows = [];
const paymentRows = [];

const ManagementTable = ({
  columns,
  rows,
  renderRow,
  emptyLabel,
  columnClass = "grid-cols-5",
}) => (
  <div className="mt-4 rounded-xl border border-gray-200 overflow-hidden">
    <div
      className={`grid ${columnClass} bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700`}
    >
      {columns.map((column) => (
        <span key={column}>{column}</span>
      ))}
    </div>
    {rows.length === 0 ? (
      <div className="h-72 bg-gray-50" aria-label={emptyLabel} />
    ) : (
      rows.map(renderRow)
    )}
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(navigation[0].id);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-gray-900">
      <header className="bg-[#051A2C] text-white shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <div>
            <p className="text-sm uppercase tracking-widest text-white/70">
              Admin Panel
            </p>
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm sm:text-base">
              Welcome,<span className="font-semibold ml-1">Admin</span>
            </p>
            <button className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold shadow hover:bg-red-600 transition-colors">
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
                  <h2 className="text-2xl font-bold text-gray-900">
                    Room Management
                  </h2>
                </div>
                <button
                  onClick={() => setShowAddRoom(true)}
                  className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow hover:bg-gray-900"
                >
                  Add New Room
                </button>
              </div>
              <ManagementTable
                columns={["Room no.", "Capacity", "Price", "Status", "Actions"]}
                rows={roomRows}
                emptyLabel="Empty room list"
                renderRow={(room) => (
                  <div
                    key={room.id}
                    className="grid grid-cols-5 px-4 py-3 text-sm text-gray-800 border-t border-gray-100"
                  >
                    <span>{room.number}</span>
                    <span>{room.capacity}</span>
                    <span>{room.price}</span>
                    <span>{room.status}</span>
                    <span className="text-right text-sm font-semibold text-[#051A2C]">
                      Edit
                    </span>
                  </div>
                )}
              />
            </div>
            {showAddRoom && (
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200 lg:sticky lg:top-8 h-fit">
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Add Rooms</h3>
                  <button
                    onClick={() => setShowAddRoom(false)}
                    className="text-sm font-semibold text-gray-500 hover:text-black"
                  >
                    Close
                  </button>
                </div>
                <form className="mt-6 space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Room No.
                    </label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                      placeholder="Enter room number"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Capacity
                    </label>
                    <select className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none">
                      <option>Select Capacity</option>
                      <option>Single</option>
                      <option>Double</option>
                      <option>Family</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Rental Term
                    </label>
                    <select className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none">
                      <option>One Month</option>
                      <option>Three Months</option>
                      <option>One Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                      placeholder="Enter price"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Images
                    </label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                      placeholder="Upload up to 5 image URLs"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Features
                    </label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                      placeholder="Wi-Fi, Balcony, etc."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                      placeholder="Add room description"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddRoom(false)}
                      className="text-sm font-semibold text-gray-500 hover:text-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-[#051A2C] px-6 py-2 text-sm font-semibold text-white shadow hover:bg-[#031121]"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            )}
          </section>
        ) : activeTab === "tenants" ? (
          <section className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-500">
                  Admin Tenant Management
                </p>
                <h2 className="text-2xl font-bold text-gray-900">
                  Tenants Management
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow hover:bg-gray-900"
                  onClick={() => setShowReminder(true)}
                >
                  Remind Due Date
                </button>
                <button
                  className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow hover:bg-gray-900"
                  onClick={() => setShowBooking(true)}
                >
                  Accept Booking
                </button>
              </div>
            </div>
            <ManagementTable
              columns={[
                "Room no.",
                "Tenant name",
                "Rent Start",
                "Rent Due",
                "Actions",
              ]}
              rows={tenantRows}
              emptyLabel="Empty tenant list"
              renderRow={(tenant) => (
                <div
                  key={tenant.id}
                  className="grid grid-cols-5 px-4 py-3 text-sm text-gray-800 border-t border-gray-100"
                >
                  <span>{tenant.room}</span>
                  <span>{tenant.name}</span>
                  <span>{tenant.start}</span>
                  <span>{tenant.due}</span>
                  <span className="text-right text-sm font-semibold text-[#051A2C]">
                    Manage
                  </span>
                </div>
              )}
            />
            <div className="grid gap-6 lg:grid-cols-2 mt-6">
              {showReminder && (
                <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Notif Users
                    </h3>
                    <button
                      onClick={() => setShowReminder(false)}
                      className="text-sm font-semibold text-gray-500 hover:text-black"
                    >
                      Close
                    </button>
                  </div>
                  <form className="mt-6 space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Tenants
                      </label>
                      <select className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none">
                        <option>Select Tenants</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Reminders
                      </label>
                      <select className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none">
                        <option>Due Date or 3 Days Before Due Date</option>
                        <option>Due Date</option>
                        <option>3 Days Before</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        defaultValue="This is a reminder that your due date today."
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setShowReminder(false)}
                        className="text-sm font-semibold text-gray-500 hover:text-black"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-[#051A2C] px-6 py-2 text-sm font-semibold text-white shadow hover:bg-[#031121]"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {showBooking && (
                <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Accept Booking
                    </h3>
                    <button
                      onClick={() => setShowBooking(false)}
                      className="text-sm font-semibold text-gray-500 hover:text-black"
                    >
                      Close
                    </button>
                  </div>
                  <form className="mt-6 space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Requests
                      </label>
                      <select className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none">
                        <option>Select Tenants</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Approval
                      </label>
                      <select className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none">
                        <option>Decline</option>
                        <option>Approve</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        defaultValue="This is from boardease pay first before etc..."
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setShowBooking(false)}
                        className="text-sm font-semibold text-gray-500 hover:text-black"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-[#051A2C] px-6 py-2 text-sm font-semibold text-white shadow hover:bg-[#031121]"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </section>
        ) : activeTab === "payments" ? (
          <section className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
            <div className="border-b border-gray-200 pb-4">
              <p className="text-sm uppercase tracking-widest text-gray-500">
                Admin Payment Management
              </p>
              <h2 className="text-2xl font-bold text-gray-900">
                Payment Management
              </h2>
            </div>
            <ManagementTable
              columns={[
                "Room no.",
                "Tenant",
                "Date",
                "Payment Status",
                "Actions",
              ]}
              rows={paymentRows}
              emptyLabel="Empty payment list"
              renderRow={(payment) => (
                <div
                  key={payment.id}
                  className="grid grid-cols-5 px-4 py-3 text-sm text-gray-800 border-t border-gray-100"
                >
                  <span>{payment.room}</span>
                  <span>{payment.tenant}</span>
                  <span>{payment.date}</span>
                  <span>{payment.status}</span>
                  <span className="text-right text-sm font-semibold text-[#051A2C]">
                    Review
                  </span>
                </div>
              )}
            />
          </section>
        ) : (
          <>
            <section className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-500">
                    Overview
                  </p>
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
                {statCards.map((card) => (
                  <div
                    key={card.id}
                    className="flex justify-center"
                    role="region"
                    aria-label={card.label}
                  >
                    <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-gray-200 bg-white text-center shadow-inner sm:h-48 sm:w-48">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-sm uppercase tracking-widest text-gray-500">
                          {card.label}
                        </p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {card.value}
                        </p>
                        {card.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                <div className="flex flex-wrap justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-widest text-gray-500">
                      Quick Actions
                    </p>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Manage Operations
                    </h3>
                  </div>
                  <button className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-gray-300">
                    See All
                  </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-left transition hover:border-black hover:bg-white"
                    >
                      <p className="text-sm font-semibold text-gray-900">
                        {action.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {action.status}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="mt-10 rounded-2xl border border-dashed border-gray-200 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-widest text-gray-500">
                        Occupancy Snapshot
                      </p>
                      <h4 className="text-lg font-semibold">Building Capacity</h4>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      92% Utilized
                    </span>
                  </div>

                  <div className="mt-6 space-y-4">
                    {occupancyData.map((item) => (
                      <div key={item.id}>
                        <div className="flex justify-between text-sm font-semibold text-gray-700">
                          <span>{item.label}</span>
                          <span>{item.value}%</span>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-gray-100">
                          <div
                            className={`${item.color} h-2 rounded-full`}
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recent Activity
                  </h3>
                  <button className="text-sm font-semibold text-[#051A2C]">
                    View all
                  </button>
                </div>
                <div className="mt-6 space-y-4">
                  {activityFeed.map((activity) => (
                    <div
                      key={activity.id}
                      className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3"
                    >
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl bg-[#051A2C] p-6 text-white shadow-lg">
                  <p className="text-sm uppercase tracking-widest text-white/70">
                    Income
                  </p>
                  <p className="mt-2 text-2xl font-semibold">₱120,000</p>
                  <p className="text-sm text-white/70">Projected for this month</p>
                  <button className="mt-6 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#051A2C] shadow">
                    Download Report
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="bg-[#051A2C] py-6 text-center text-sm text-white/80">
        © {new Date().getFullYear()} Board Ease. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminDashboard;

