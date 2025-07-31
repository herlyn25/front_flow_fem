import { createContext, useState, useContext } from "react";
import axios  from "axios";   // Assuming axios is used for API calls   
import { API_URL } from "../utils/constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "");  
  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);  
      console.log(response)  
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token); // Store token if needed
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {    
    localStorage.removeItem("token"); // Remove token on logout
    localStorage.removeItem("user"); // Remove user on logout
    setUser(null);
  };

  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);