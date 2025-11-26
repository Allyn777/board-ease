export default function Dashboard({ totalRooms = 0, availableRooms = 0, occupiedRooms = 0 }) {
  return (
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
        {/* Total */}
        <div className="flex justify-center">
          <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-gray-200 bg-white text-center shadow-inner">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm uppercase tracking-widest text-gray-500">Total Rooms</p>
              <p className="text-2xl font-semibold text-gray-900">{totalRooms}</p>
            </div>
          </div>
        </div>

        {/* Available */}
        <div className="flex justify-center">
          <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-gray-200 bg-white text-center shadow-inner">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm uppercase tracking-widest text-gray-500">Available</p>
              <p className="text-2xl font-semibold text-green-600">{availableRooms}</p>
            </div>
          </div>
        </div>

        {/* Occupied */}
        <div className="flex justify-center">
          <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-gray-200 bg-white text-center shadow-inner">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm uppercase tracking-widest text-gray-500">Occupied</p>
              <p className="text-2xl font-semibold text-red-600">{occupiedRooms}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
