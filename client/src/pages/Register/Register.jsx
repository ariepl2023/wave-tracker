import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        email: email,
        password: password,
      });
      navigate("/login");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <p className="register-brand">WaveTracker</p>
        <p className="register-tagline">Ride the data</p>
        <h2 className="register-title">Create account</h2>
        <div className="register-form">
          <input
            className="register-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="register-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="register-button" onClick={handleRegister}>
            Create Account
          </button>
          {error && <p className="register-error">{error}</p>}
        </div>
        <div className="register-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Sign in</span>
        </div>
      </div>
    </div>
  );
}

export default Register;
