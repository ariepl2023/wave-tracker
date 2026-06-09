import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Guards all routes that require authentication.
// Three states are needed (not just a boolean) because on a fresh page load
// we don't know yet whether the user is logged in — rendering null during
// "loading" prevents a flash-redirect to /login before the /auth/me check finishes.
function ProtectedRoute({ children }) {
  const { status } = useAuth();

  if (status === "loading") return null;
  if (status === "unauth") return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
