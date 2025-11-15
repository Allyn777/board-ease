import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingpage";
import Login from "./components/login";
import Signup from "./components/Signup";
import Home from "./components/home";
import RoomSelection from "./components/roomSelection";
import RoomDetail from "./components/roomDetail";
import Profile from "./components/profile";
import Notifications from "./components/notifications";
import { AuthProvider } from "./contexts/AuthContext"; // ✅ already correct

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Home page */}
          <Route path="/home" element={<Home />} />

          {/* Room Selection */}
          <Route path="/rooms" element={<RoomSelection />} />

          {/* Room Detail */}
          <Route path="/room/:id" element={<RoomDetail />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* Notifications */}
          <Route path="/notifications" element={<Notifications />} />

          {/* 404 fallback */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
