import React from "react";

const Topbar = () => {
  return (
    <div className="topbar-container">
      <div className="topbar-item">
        <i className="fa-solid fa-phone-volume"></i>
        <span>Emergency: +91 12345 67890</span>
      </div>
      <div className="topbar-item">
        <i className="fa-solid fa-clock"></i>
        <span>Open Daily: 10:00 AM to 10:00 PM</span>
      </div>
      <div className="topbar-item">
        <i className="fa-solid fa-envelope"></i>
        <span>help@techinfoyt.com</span>
      </div>
    </div>
  );
};

export default Topbar;
