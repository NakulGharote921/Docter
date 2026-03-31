import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { NavLink, useLocation, useNavigate } from "react-router";
import { auth } from "../../../firebase";

const NavMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleNavigate = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-panel">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarTogglerDemo01"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          id="navbarTogglerDemo01"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-links">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/about"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/doctors"
                onClick={() => setIsMenuOpen(false)}
              >
                Doctors
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/gallery"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
            {user ? (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/wellness"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Health Hub
                </NavLink>
              </li>
            ) : null}
          </ul>

          <div className="navbar-actions">
            <button
              className="nav-cta-btn"
              type="button"
              onClick={() => handleNavigate("/doctors")}
            >
              Book Appointment
            </button>

            <NavLink
              className="account-pill"
              to={user ? "/wellness/profile" : "/login"}
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fa-solid fa-circle-user"></i>
              <span>{user ? "Dashboard" : "Login"}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
