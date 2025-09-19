import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { currentUser } from "../services/api/services";
import { matchPath } from "react-router-dom";

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

      const authRoutes = ["/login", "/signup"];
      const publicRoutes = ["/", "/shop", "/item/:id"];

      const isAuthRoute = authRoutes.some((route) =>
        matchPath({ path: route, end: true }, location.pathname)
      );
      const isPublicRoute = publicRoutes.some((route) =>
        matchPath({ path: route, end: true }, location.pathname)
      );

      const isAuth = await checkAuthUser();

      if (isAuthRoute && isAuth) {
        if (user?.status === "admin") {
          navigate("/admindash", { replace: true });
        } else {
          navigate("/shop", { replace: true });
        }
      }

      if (!isPublicRoute && !isAuth) {
        console.log("Not Logged");
        navigate("/login", { replace: true });
      }

      setLoading(false);
    };

    validateRoute();
  }, [location.pathname, navigate]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, loading, checkAuthUser }}
    >
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
