"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UserCtx = createContext({
  user: {},
  isLoggedIn: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const login = (user, tk) => {
    setUser(user);

    localStorage.setItem("invc_tk", tk);
  };
  logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("invc_tk"));
    if (token) {
    }
  }, []);
  return (
    <UserCtx.Provider
      value={{ user, login, logout, isLoading: loading, isLoggedIn: !!user }}
    >
      {children}
    </UserCtx.Provider>
  );
};

export const useAuth = () => useContext(UserCtx);
