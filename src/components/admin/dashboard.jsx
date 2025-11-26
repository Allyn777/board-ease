export default function Dashboard() {
  return (
    <>
      {/* TOP SUMMARY SECTION */}
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

          {/* Total Rooms */}
          <div className="flex justify-center">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-gray-200 bg-white text-center shadow-inner">
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm uppercase tracking-widest text-gray-500">Total Rooms</p>
                <p className="text-2xl font-semibold text-gray-900">100</p>
              </div>
            </div>
          </div>

          {/* Available */}
          <div className="flex justify-center">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-gray-200 bg-white text-center shadow-inner">
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm uppercase tracking-widest text-gray-500">Available</p>
                <p className="text-2xl font-semibold text-green-600">25</p>
              </div>
            </div>
          </div>

          {/* Occupied */}
          <div className="flex justify-center">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-gray-200 bg-white text-center shadow-inner">
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm uppercase tracking-widest text-gray-500">Occupied</p>
                <p className="text-2xl font-semibold text-red-600">75</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BOTTOM SECTION */}
      <section className="grid gap-6 lg:grid-cols-[2fr,1fr] mt-6">

        {/* LEFT COLUMN */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-500">Quick Actions</p>
              <h3 className="text-xl font-semibold text-gray-900">Manage Operations</h3>
            </div>
            <button className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-gray-300">
              See All
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <button className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-left hover:border-black hover:bg-white">
              <p className="text-sm font-semibold text-gray-900">Add New Tenant</p>
              <p className="text-xs text-gray-500 mt-1">2 pending approvals</p>
            </button>

            <button className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-left hover:border-black hover:bg-white">
              <p className="text-sm font-semibold text-gray-900">Assign Room</p>
              <p className="text-xs text-gray-500 mt-1">5 rooms available</p>
            </button>

            <button className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-left hover:border-black hover:bg-white">
              <p className="text-sm font-semibold text-gray-900">Verify Payments</p>
              <p className="text-xs text-gray-500 mt-1">3 awaiting review</p>
            </button>
          </div>

          {/* Occupancy */}
          <div className="mt-10 rounded-2xl border border-dashed border-gray-200 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-500">Occupancy Snapshot</p>
                <h4 className="text-lg font-semibold">Building Capacity</h4>
              </div>
              <span className="text-sm font-semibold text-gray-700">92% Utilized</span>
            </div>

            <div className="mt-6 space-y-4">

              <div>
                <div className="flex justify-between text-sm font-semibold text-gray-700">
                  <span>Occupied</span>
                  <span>78%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-gray-100">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "78%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold text-gray-700">
                  <span>Reserved</span>
                  <span>15%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-gray-100">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: "15%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold text-gray-700">
                  <span>Vacant</span>
                  <span>7%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-gray-100">
                  <div className="bg-rose-500 h-2 rounded-full" style={{ width: "7%" }} />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-sm font-semibold text-[#051A2C]">View all</button>
          </div>

          <div className="mt-6 space-y-4">

            <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
              <p className="text-sm font-medium text-gray-900">Karen Santos paid for Room 804</p>
              <p className="text-xs text-gray-500 mt-1">2 mins ago</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
              <p className="text-sm font-medium text-gray-900">New tenant registered - Mark Delos Reyes</p>
              <p className="text-xs text-gray-500 mt-1">15 mins ago</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
              <p className="text-sm font-medium text-gray-900">Room 305 maintenance scheduled</p>
              <p className="text-xs text-gray-500 mt-1">45 mins ago</p>
            </div>

          </div>

          <div className="mt-8 rounded-2xl bg-[#051A2C] p-6 text-white shadow-lg">
            <p className="text-sm uppercase tracking-widest text-white/70">Income</p>
            <p className="mt-2 text-2xl font-semibold">₱120,000</p>
            <p className="text-sm text-white/70">Projected for this month</p>
            <button className="mt-6 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#051A2C] shadow">
              Download Report
            </button>
          </div>

        </div>

      </section>
    </>
  );
}
