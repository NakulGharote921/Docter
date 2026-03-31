import "./App.css";
import Footer from "./components/Layout/Footer/Footer";
import HealthHubLayout from "./components/Layout/HealthHubLayout";
import Navbar from "./components/Layout/Navbar/Navbar";
import About from "./pages/About";
import WellnessAppointments from "./pages/Appointments/Appointments";
import Register from "./pages/Auth/Register";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard/Dashboard";
import Diet from "./pages/Diet/Diet";
import Fitness from "./pages/Fitness/Fitness";
import GalleryPage from "./pages/Gallaery/GalleryPage";
import Health from "./pages/Health/Health";
import Home from "./pages/Home";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Auth/Login";
import AllDoctors from "./pages/Doctors/AllDoctors";
import Appointments from "./pages/Doctors/Appointments";
import Profile from "./pages/Profile/Profile";
import UserProfile from "./pages/User/UserProfile";
import MyAppointments from "./pages/User/MyAppointments";
import { useAuth } from "./hooks/useAuth";

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="route-loader">Checking your session...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function App() {
  const location = useLocation();
  const isHealthHubRoute = location.pathname.startsWith("/wellness");

  return (
    <>
      {!isHealthHubRoute ? <Navbar /> : null}
      <Toaster position="top-right" />
      <main className={isHealthHubRoute ? "wellness-main" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctors" element={<AllDoctors />} />
          <Route path="/doctors/:id" element={<Appointments />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/appointments" element={<MyAppointments />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/wellness" element={<HealthHubLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="appointments" element={<WellnessAppointments />} />
              <Route path="fitness" element={<Fitness />} />
              <Route path="diet" element={<Diet />} />
              <Route path="health" element={<Health />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </main>
      {!isHealthHubRoute ? <Footer /> : null}
    </>
  );
}

export default App;
