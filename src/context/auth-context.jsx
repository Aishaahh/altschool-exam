import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const login = () => {
    setIsAuth(true);
    // setTimeout(cb, 100); // fake async
  };

  const signOut = () => {
    try {
      localStorage.removeItem("user");
      setIsAuth(false);
    } catch (e) {}
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        login,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
