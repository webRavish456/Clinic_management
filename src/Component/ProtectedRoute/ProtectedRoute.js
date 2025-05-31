import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  
  const token = localStorage.getItem("token");
  const maxAge = localStorage.getItem("maxAge");
  const navigate = useNavigate();

  useEffect(() => {

    const now = Math.floor(Date.now() / 1000);
    const expiry = maxAge ? parseInt(maxAge, 10) : 0;

    if (!token || !maxAge || now > expiry) {

      localStorage.removeItem("token");
      localStorage.removeItem("maxAge");
      navigate("/login", { replace: true });

    }

  }, [token, maxAge, navigate]);

  const now = Math.floor(Date.now() / 1000);
  const expiry = maxAge ? parseInt(maxAge, 10) : 0;

  return token && maxAge && now <= expiry ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
