import { NavLink } from "react-router";
import SectionHeader from "../../components/ui/SectionHeader";
import { useAuth } from "../../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="hub-page">
      <SectionHeader
        eyebrow="Profile"
        title="Account overview"
        description="This bridges the new dashboard module with the existing patient profile and appointment pages."
      />

      <div className="hub-grid two-column">
        <section className="hub-card">
          <div className="hub-card-header">
            <h3>User details</h3>
            <span>Firebase auth</span>
          </div>
          <div className="hub-stack">
            <div className="profile-row">
              <span>Name</span>
              <strong>{user?.displayName || "Not provided"}</strong>
            </div>
            <div className="profile-row">
              <span>Email</span>
              <strong>{user?.email}</strong>
            </div>
            <div className="profile-row">
              <span>User ID</span>
              <strong>{user?.uid}</strong>
            </div>
          </div>
        </section>

        <section className="hub-card">
          <div className="hub-card-header">
            <h3>Legacy pages</h3>
            <span>Existing app links</span>
          </div>
          <div className="hub-stack">
            <NavLink className="hub-link-card" to="/user/profile">
              Open existing patient profile
            </NavLink>
            <NavLink className="hub-link-card" to="/user/appointments">
              Open existing appointment manager
            </NavLink>
            <NavLink className="hub-link-card" to="/doctors">
              Browse hospital doctors
            </NavLink>
          </div>
        </section>
      </div>
    </div>
  );
}
