import React from "react";
import { NavLink } from "react-router";
import Logo from "../../../assets/logo.png";
import NavMenu from "./NavMenu";
import Topbar from "./Topbar";

const Navbar = () => {
  return (
    <header className="navbar-container sticky-top">
      <Topbar />
      <div className="navbar-inner">
        <div className="navbar-brand-wrap">
          <NavLink to="/" className="brand-link">
            <img src={Logo} alt="Techinfo YT logo" className="brand-logo" />
            <div className="brand-text">
              <strong>Techinfo YT Care</strong>
              <span>Super Speciality Hospital</span>
            </div>
          </NavLink>
        </div>
        <div className="navbar-menu-wrap">
          <NavMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
