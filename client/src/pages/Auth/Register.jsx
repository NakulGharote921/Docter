import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router";
import { auth } from "../../firebase";
import "./Auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
      }

      console.log("Registered user:", userCredential.user);
      toast.success("Registration successful");
      navigate("/wellness/profile");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Registration failed");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      console.log("Google register user:", userCredential.user);
      toast.success("Google account connected successfully");
      navigate("/wellness/profile");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Google sign up failed");
    }
  };

  return (
    <section className="auth-shell">
      <div className="auth-layout">
        <div className="auth-showcase">
          <p className="auth-eyebrow">Create Account</p>
          <h1>Start managing appointments with a cleaner patient experience</h1>
          <p className="auth-showcase-copy">
            Register once to book doctors online, review your visits, and keep
            your medical journey organized from one dashboard.
          </p>

          <div className="auth-feature-list">
            <div className="auth-feature-item">
              <i className="fa-solid fa-user-plus"></i>
              <span>Create your patient profile in minutes</span>
            </div>
            <div className="auth-feature-item">
              <i className="fa-solid fa-clock"></i>
              <span>Reserve appointment slots online</span>
            </div>
            <div className="auth-feature-item">
              <i className="fa-solid fa-notes-medical"></i>
              <span>Keep your bookings and details organized</span>
            </div>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card-header">
            <p className="auth-eyebrow">Register</p>
            <h2>Create your patient account</h2>
            <p>Fill in your details to continue with appointment booking.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              <span>Full Name</span>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="auth-field">
              <span>Email Address</span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <input
                type="password"
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={!name || !email || !password}
            >
              Create Account
            </button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <button
            type="button"
            className="auth-google-btn"
            onClick={handleGoogleRegister}
          >
            <i className="fa-brands fa-google"></i>
            <span>Sign up with Google</span>
          </button>

          <p className="auth-footer-text">
            Already have an account? <NavLink to="/login">Login here</NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
