import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/authcontext";

export default function Layout({ children }) {
  const { signOut, user } = useAuth();
  const location = useLocation();

  const active = (path) =>
    location.pathname === `/admin${path}`
      ? "border-[#051A2C] text-[#051A2C]"
      : "border-transparent hover:text-black";

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-gray-900">
      {/* HEADER */}
      <header className="bg-[#051A2C] text-white shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm uppercase tracking-widest text-white/70">Admin Panel</p>
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm">
              Welcome,{" "}
              <span className="font-semibold">{user?.email ?? "Admin"}</span>
            </span>

            <button
              onClick={signOut}
              className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold shadow hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* NAV TABS */}
        <nav className="bg-white text-gray-600">
          <div className="max-w-6xl mx-auto flex">
            <Link to="/admin" className={`flex-1 text-center py-3 border-b-2 ${active("")}`}>
              Dashboard
            </Link>
            <Link to="/admin/rooms" className={`flex-1 text-center py-3 border-b-2 ${active("/rooms")}`}>
              Rooms Management
            </Link>
            <Link to="/admin/tenants" className={`flex-1 text-center py-3 border-b-2 ${active("/tenants")}`}>
              Tenants Management
            </Link>
            <Link to="/admin/payments" className={`flex-1 text-center py-3 border-b-2 ${active("/payments")}`}>
              Payments Management
            </Link>
          </div>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

      {/* FOOTER */}
      <footer className="bg-[#051A2C] py-6 text-center text-sm text-white/100">
        © {new Date().getFullYear()} Board Ease. All rights reserved.
      </footer>
    </div>
  );
}
