import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Hardcoded credentials for testing
  const validEmail = "tusharkumar8008@gmail.com";
  const validPassword = "Tushar33";

  const login = (email, password) => {
    if (email === validEmail && password === validPassword) {
      setUser({ email });
      alert("Login successful!");
    } else {
      alert("Invalid email or password.");
    }
  };

  const register = (email, password) => {
    // You can enhance this with a real registration process
    setUser({ email });
    alert("Registration successful!");
  };

  const logout = () => {
    setUser(null);
    alert("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
