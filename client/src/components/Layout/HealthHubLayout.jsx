import { NavLink, Outlet, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import "./HealthHubLayout.css";

const hubLinks = [
  { to: "/wellness", label: "Dashboard", end: true },
  { to: "/wellness/appointments", label: "Appointments" },
  { to: "/wellness/fitness", label: "Fitness" },
  { to: "/wellness/diet", label: "Diet" },
  { to: "/wellness/health", label: "Health" },
  { to: "/wellness/profile", label: "Profile" },
];

export default function HealthHubLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success("You have been logged out");
    navigate("/login");
  };

  return (
    <div className="health-hub-layout">
      <aside className="health-hub-sidebar">
        <NavLink to="/" className="hub-brand">
          <span>THC</span>
          <div>
            <strong>Health Hub</strong>
            <small>Doctor + fitness care</small>
          </div>
        </NavLink>

        <nav className="hub-nav">
          {hubLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hub-sidebar-card">
          <p>Signed in as</p>
          <strong>{user?.displayName || user?.email}</strong>
          <small>Use the public site anytime from the main home page.</small>
        </div>
      </aside>

      <section className="health-hub-content">
        <header className="hub-topbar">
          <div>
            <p className="hub-eyebrow">Integrated care workspace</p>
            <h1>Health and fitness dashboard</h1>
          </div>

          <div className="hub-topbar-actions">
            <NavLink to="/doctors" className="ghost-btn">
              Browse doctors
            </NavLink>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <Outlet />
      </section>
    </div>
  );
}
