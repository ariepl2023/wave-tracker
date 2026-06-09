import { NavLink, useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post("/auth/logout");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <span className="navbar-brand">WaveTracker</span>
      <div className="navbar-links">
        <NavLink to="/dashboard" className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}>
          תחזית
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}>
          הגדרות
        </NavLink>
        <NavLink to="/plans" className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}>
          מנויים
        </NavLink>
        <NavLink to="/connect-telegram" className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}>
          טלגרם
        </NavLink>
      </div>
      <button className="navbar-logout" onClick={handleLogout}>
        התנתק
      </button>
    </nav>
  );
}

export default Navbar;
