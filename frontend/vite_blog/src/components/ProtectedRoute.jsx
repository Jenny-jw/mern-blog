import { auth } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    auth
      .getCurrentUser()
      .then(() => {
        setAuthenticated(true);
        setLoading(false);
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return authenticated ? children : null;
};

export default ProtectedRoute;
