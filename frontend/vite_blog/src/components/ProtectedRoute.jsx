import { Navigate } from "react-router-dom";
import { auth } from "../utils/auth";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = auth.getToken();

  if (!token) return <Navigate to="/login" replace />;

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      auth.removeToken();
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    auth.removeToken();
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
