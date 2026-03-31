import React from "react";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h4>Techinfo YT Care</h4>
          <p>
            Compassion-driven healthcare with modern booking, trusted doctors,
            and smoother patient experiences.
          </p>
        </div>

        <div className="footer-links">
          <h6>Explore</h6>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/doctors">Doctors</NavLink>
          <NavLink to="/wellness">Health Hub</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        <div className="footer-contact">
          <h6>Contact</h6>
          <p>help@techinfoyt.com</p>
          <p>+91 12345 67890</p>
          <p>Open daily: 10:00 AM to 10:00 PM</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>All rights reserved © 2026 Techinfo YT Care</p>
        <p>Made with care in India</p>
      </div>
    </footer>
  );
};

export default Footer;
