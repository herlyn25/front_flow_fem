// src/pages/Home.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/Home.css';
import { loadPhotos } from "../utils/photoLoader";

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
        <div className="navbar-left">
          <img
            src={loadPhotos(user?.photo,user?.gender)}
            alt="Avatar"
            className="avatar-image"
          />
          <span className="user-name">👋 Bienvenid{user.gender==="mujer"?"a":"o"}, {user?.firstName || "Usuario"}</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="card-grid">
        <Link to="/members" className="card-link">
          <div className="card">
            <h2>👥 Miembros</h2>
            <p>Consulta tus familiares, contactos o personas relacionadas.</p>
          </div>
        </Link>

        <Link to="/events" className="card-link">
          <div className="card">
            <h2>📅 Eventos</h2>
            <p>Revisa tus citas o eventos agendados.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
