"use client";

import { createContext, useEffect, useState } from "react";

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
  const login = (user) => {
    setUser(user);
    // localStorage.setItem('invc_tk')
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
