// context/AuthContext.js

import React, { createContext, useState } from "react";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Call API for login, then set user state
    // You can replace the mock login here with real API call
    if (email === "customer@example.com" && password === "password") {
      setUser({ email, name: "Customer" });
      Alert.alert("Login successful");
    } else {
      Alert.alert("Invalid email or password");
    }
  };

  const logout = () => {
    setUser(null);
    Alert.alert("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
