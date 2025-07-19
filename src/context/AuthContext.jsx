import { createContext, useState, useContext } from "react";
import axios  from "axios";   // Assuming axios is used for API calls   
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const url = "http://localhost:8000"; // Replace with your API base URL   
  const login = async (credentials) => {
    try {
      const response = await axios.post(`${url}/auth/login`, credentials);    
      setUser(response.data.user);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);