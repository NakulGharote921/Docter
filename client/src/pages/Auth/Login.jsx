import React, { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router";
import { auth } from "../../firebase";
import { getFirebaseAuthErrorMessage } from "../../utils/firebaseAuthErrors";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Logged in user:", userCredential.user);
      toast.success("Login successful");
      navigate("/wellness");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error(getFirebaseAuthErrorMessage(error));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      console.log("Google login user:", userCredential.user);
      toast.success("Google login successful");
      navigate("/wellness");
    } catch (error) {
      console.log(error);
      toast.error(getFirebaseAuthErrorMessage(error));
    }
  };

  return (
    <section className="auth-shell">
      <div className="auth-layout">
        <div className="auth-showcase">
          <p className="auth-eyebrow">Welcome Back</p>
          <h1>Access your appointments, profile, and care history</h1>
          <p className="auth-showcase-copy">
            Sign in to manage doctor bookings, review upcoming consultations,
            and keep your health information in one place.
          </p>

          <div className="auth-feature-list">
            <div className="auth-feature-item">
              <i className="fa-solid fa-calendar-check"></i>
              <span>Track upcoming appointments</span>
            </div>
            <div className="auth-feature-item">
              <i className="fa-solid fa-user-doctor"></i>
              <span>Book verified specialists faster</span>
            </div>
            <div className="auth-feature-item">
              <i className="fa-solid fa-shield-heart"></i>
              <span>Secure access to your profile</span>
            </div>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card-header">
            <p className="auth-eyebrow">Login</p>
            <h2>Sign in to your account</h2>
            <p>Enter your email and password to continue.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={!email || !password}
            >
              Login
            </button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <button
            type="button"
            className="auth-google-btn"
            onClick={handleGoogleLogin}
          >
            <i className="fa-brands fa-google"></i>
            <span>Login with Google</span>
          </button>

          <p className="auth-footer-text">
            New here? <NavLink to="/register">Create an account</NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
