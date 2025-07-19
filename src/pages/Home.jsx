import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import './Home.css';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="home-container">
      <div className="navbar">
        <div>{user?.firstName || 'Usuario'}</div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="content">
        <div className="welcome-message">👋 Welcome back, {user?.firstName || 'Friend'}!</div>
        <div className="user-email">Your email is: <strong>{user?.email}</strong></div>
      </div>
    </div>
  );
};

export default Home;
