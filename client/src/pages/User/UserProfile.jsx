import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { get, ref } from "firebase/database";
import { auth, db } from "../../firebase";
import EditUserProfile from "./EditUserProfile";
import "./User.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (uid) => {
    try {
      const snapshot = await get(ref(db, `users/${uid}`));
      if (snapshot.exists()) {
        setUserProfile((prev) => ({ ...prev, ...snapshot.val() }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAppointments = async (uid) => {
    try {
      const snapshot = await get(ref(db, `appointments/${uid}`));
      const appts = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          appts.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
      }
      setAppointments(appts);
    } catch (error) {
      console.error(error);
      setAppointments([]);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserProfile((prev) => ({
          ...prev,
          email: user.email,
          name: user.displayName || "User",
          photoURL: user.photoURL || "",
        }));
        fetchProfile(user.uid);
        fetchAppointments(user.uid);
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      toast.success("Logout successful");
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout");
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading profile...</div>;
  }

  const profileCompletionFields = [
    userProfile.name,
    userProfile.email,
    userProfile.gender,
    userProfile.dob,
    userProfile.phone,
    userProfile.address,
  ];

  const completionScore = Math.round(
    (profileCompletionFields.filter(Boolean).length / profileCompletionFields.length) *
      100
  );

  const upcomingAppointments = appointments
    .filter((appt) => new Date(appt.appointmentDate) >= new Date())
    .sort(
      (a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime()
    );

  const nextAppointment = upcomingAppointments[0];

  const profileItems = [
    {
      label: "Gender",
      value: userProfile.gender || "Not set",
      icon: "fa-solid fa-venus-mars",
    },
    {
      label: "Date of Birth",
      value: userProfile.dob || "Not set",
      icon: "fa-solid fa-cake-candles",
    },
    {
      label: "Email",
      value: userProfile.email || "Not set",
      icon: "fa-solid fa-envelope",
    },
    {
      label: "Phone",
      value: userProfile.phone || "Not set",
      icon: "fa-solid fa-phone",
    },
    {
      label: "Address",
      value: userProfile.address || "Not set",
      icon: "fa-solid fa-location-dot",
    },
  ];

  return (
    <>
      <section className="profile-shell">
        <div className="container">
          <div className="profile-header text-center">
            <p className="profile-eyebrow">Patient Dashboard</p>
            <h2>Manage Your Account and Appointments</h2>
            <p>
              Keep your profile updated, review your contact details, and move
              quickly to your appointment history.
            </p>
          </div>

          <div className="profile-layout">
            <aside className="profile-sidebar-card">
              <div className="profile-avatar-wrap">
                <img
                  src={
                    userProfile.pic ||
                    userProfile.photoURL ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="user profile"
                  className="profile-avatar"
                />
              </div>
              <h3>{userProfile.name}</h3>
              <p>{userProfile.email}</p>

              <div className="profile-status-pill">
                <i className="fa-solid fa-circle-check"></i>
                <span>Account Active</span>
              </div>

              <div className="profile-quick-stats">
                <div className="profile-stat-box">
                  <span>Profile Score</span>
                  <strong>{completionScore}%</strong>
                </div>
                <div className="profile-stat-box">
                  <span>Upcoming</span>
                  <strong>{upcomingAppointments.length}</strong>
                </div>
              </div>
            </aside>

            <main className="profile-main-card">
              <div className="profile-card-top">
                <div>
                  <p className="profile-eyebrow">Personal Information</p>
                  <h4>Your account details</h4>
                </div>
              </div>

              <div className="profile-info-grid">
                <div className="profile-info-card profile-info-highlight">
                  <span className="profile-info-label">Name</span>
                  <strong>{userProfile.name}</strong>
                  <p>This name appears across your appointments and profile.</p>
                </div>

                {profileItems.map((item) => (
                  <div className="profile-info-card" key={item.label}>
                    <span className="profile-info-icon">
                      <i className={item.icon}></i>
                    </span>
                    <span className="profile-info-label">{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>

              <div className="profile-live-section">
                <div className="profile-live-card">
                  <p className="profile-live-label">Next Appointment</p>
                  {nextAppointment ? (
                    <>
                      <h5>{nextAppointment.doctorName}</h5>
                      <p>
                        {nextAppointment.doctorSpeciality} on{" "}
                        {new Date(nextAppointment.appointmentDate).toLocaleString()}
                      </p>
                    </>
                  ) : (
                    <>
                      <h5>No upcoming appointment</h5>
                      <p>Book a doctor to see your next consultation here.</p>
                    </>
                  )}
                </div>

                <div className="profile-live-card">
                  <p className="profile-live-label">Appointment Summary</p>
                  <h5>{appointments.length} total bookings</h5>
                  <p>
                    {appointments.length
                      ? `${upcomingAppointments.length} upcoming and ${
                          appointments.length - upcomingAppointments.length
                        } previous appointments`
                      : "Your appointment activity will appear here dynamically."}
                  </p>
                </div>
              </div>

              <div className="profile-actions">
                <button
                  className="profile-btn profile-btn-edit"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                  <span>Edit Profile</span>
                </button>

                <button
                  className="profile-btn profile-btn-primary"
                  onClick={() => navigate("/user/appointments")}
                >
                  <i className="fa-solid fa-calendar-check"></i>
                  <span>My Appointments</span>
                </button>

                <button
                  className="profile-btn profile-btn-danger"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-power-off"></i>
                  <span>Logout</span>
                </button>
              </div>
            </main>
          </div>
        </div>
      </section>

      {isOpen && (
        <EditUserProfile
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            if (auth.currentUser) {
              fetchProfile(auth.currentUser.uid);
              fetchAppointments(auth.currentUser.uid);
            }
          }}
          currentProfile={userProfile}
        />
      )}
    </>
  );
};

export default UserProfile;
