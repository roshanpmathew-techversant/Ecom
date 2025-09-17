import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { currentUser } from "../services/api/services";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }

    try {
      const userData = await currentUser();
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      } else {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
        return false;
      }
    } catch (e) {
      console.error("Auth Error:", e);
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  useEffect(() => {
    const validateRoute = async () => {
      setLoading(true);
      const publicRoutes = ["/login", "/signup"];
      const isPublicRoute = publicRoutes.includes(location.pathname);

      const tokenExists = !!localStorage.getItem("token");

      if (isPublicRoute) {
        if (tokenExists) {
          const isAuth = await checkAuthUser();
          if (isAuth) {
            if (user?.status === "admin")
              navigate("/admindash", { replace: true });
            else if (
              location.pathname === "/login" ||
              location.pathname === "/signup"
            ) {
              navigate("/shop", { replace: true });
            }
          }
        }
      } else {
        const isAuth = await checkAuthUser();
        if (!isAuth) {
          navigate("/login", { replace: true });
        }
      }
      setLoading(false);
    };

    validateRoute();
  }, [location.pathname, navigate, user?.status]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, loading, checkAuthUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
