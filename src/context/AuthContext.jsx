import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("bloodDonorUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // ✅ LOGIN
  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });

      setUser(res.data);
      localStorage.setItem("bloodDonorUser", JSON.stringify(res.data));

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  // ✅ REGISTER (ADD THIS)
  const register = async (name, email, password) => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password
      });

      return true;

    } catch (err) {
      console.log(err);
      return false;
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("bloodDonorUser");
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register, // ✅ expose register
      logout,
      isLoggedIn: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);