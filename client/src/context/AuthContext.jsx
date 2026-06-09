import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext(null);

// Single source of truth for the logged-in user.
// Fetches /auth/me once on app mount so every component can read the current
// user without making redundant network calls. `status` drives ProtectedRoute:
//   "loading" → waiting for the initial check (render nothing)
//   "ok"      → authenticated, user object is populated
//   "unauth"  → not logged in, redirect to /login
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => { setUser(res.data.user); setStatus("ok"); })
      .catch(() => setStatus("unauth"));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, status, setStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
