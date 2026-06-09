import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser, setStatus } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data.user);
      setStatus("ok");
      navigate("/dashboard");
    } catch (err) {
      setError("Wrong email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <p className="login-brand">WaveTracker</p>
        <h2 className="login-title">Welcome back</h2>
        <div className="login-form">
          <input
            className="login-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="login-button" onClick={handleLogin}>
            Sign In
          </button>
          {error && <p className="login-error">{error}</p>}
        </div>
        <div className="login-footer">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Sign up</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
