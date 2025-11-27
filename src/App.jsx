import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/landingpage";
import Login from "./components/login";
import Signup from "./components/Signup";
import Home from "./components/home";
import RoomSelection from "./components/roomSelection";
import RoomDetail from "./components/roomDetail";
import Profile from "./components/profile";
import AdminRoutes from "./components/admin"; // ✅ NEW
import Notifications from "./components/notifications";
import Payment from "./components/payment";
import { AuthProvider, useAuth } from "./contexts/authcontext";

// 🔥 FIXED Protected Route (NO loading screen, NO refresh required)
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, userRole, authChecked } = useAuth();

  // Wait for session check (NO loading UI)
  if (!authChecked) return null;

  // Not logged in → go to login
  if (!user) return <Navigate to="/login" replace />;

  // Admin required but user is not admin
  if (requireAdmin && userRole !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

// 🔥 FIXED Public Route (NO refresh required after login)
const PublicRoute = ({ children }) => {
  const { user, userRole, authChecked } = useAuth();

  if (!authChecked) return null;

  if (user) {
    return userRole === "admin"
      ? <Navigate to="/admin" replace />
      : <Navigate to="/home" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Public Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth pages */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          {/* User protected pages */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rooms"
            element={
              <ProtectedRoute>
                <RoomSelection />
              </ProtectedRoute>
            }
          />

          <Route
            path="/room/:id"
            element={
              <ProtectedRoute>
                <RoomDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment/:id"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />

          {/* Admin protected page */}
          <Route
            path="/admin/*"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminRoutes />
                </ProtectedRoute>
                                                   }
                />
          {/* Fallback */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; //working
