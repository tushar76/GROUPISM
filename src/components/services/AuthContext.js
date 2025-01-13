import React, { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  role: localStorage.getItem("role") || null,
  loading: false,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, user: action.payload.user, role: action.payload.role, loading: false };
    case "LOGIN_FAILURE":
      return { ...state, error: action.payload, loading: false };
    case "LOGOUT":
      return { ...state, user: null, role: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Predefined mock user for demonstration
  const mockUsers = [
    { email: "tusharkumar8008@gmail.com", password: "tushar33", role: "admin" },
  ];

  // Mock login function
  const login = (email, password) => {
    dispatch({ type: "LOGIN_REQUEST" });
    const user = mockUsers.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user.email));
      localStorage.setItem("role", user.role);
      dispatch({ type: "LOGIN_SUCCESS", payload: { user: user.email, role: user.role } });
    } else {
      dispatch({ type: "LOGIN_FAILURE", payload: "Invalid email or password" });
    }
  };

  // Mock register function (allows adding new users locally)
  const register = (email, password) => {
    dispatch({ type: "LOGIN_REQUEST" });
    const userExists = mockUsers.some((u) => u.email === email);
    if (userExists) {
      dispatch({ type: "LOGIN_FAILURE", payload: "User already exists" });
    } else {
      mockUsers.push({ email, password, role: "user" });
      localStorage.setItem("user", JSON.stringify(email));
      localStorage.setItem("role", "user");
      dispatch({ type: "LOGIN_SUCCESS", payload: { user: email, role: "user" } });
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
