import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

export const UserContext = createContext({});
export const useUser = () => useContext(UserContext);

export const ProtectRoute = ({ children }) => {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      //
      if (!location.pathname.includes("/login")) {
        navigate("/login");
      }
    }
  }, [location, navigate, loading, user]);

  return children;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromLocalStorage = async () => {
      const userDetails = localStorage.getItem("user");
      if (userDetails) {
        try {
          setLoading(true);
          setUser(JSON.parse(userDetails));
        } catch (error) {
          localStorage.removeItem("user");
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setUser(null);
      }
    };
    loadUserFromLocalStorage();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
