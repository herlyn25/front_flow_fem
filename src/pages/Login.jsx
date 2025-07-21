import { useState, useEffect } from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loadTheme } from "../utils/themeLoader";
import { API_LOGIN, photo_logo_hombre, photo_logo_mujer } from "./constants";

const Login = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "femenino");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === "femenino" ? "masculino" : "femenino";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    loadTheme(newTheme);
  };

  useEffect(() => {
    loadTheme(theme);
  }, [theme]);

   const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(API_LOGIN, {
        username,
        password,
      });

      const { user, token } = response.data;

      // Guardar usuario y token
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Cambiar tema si quieres que sea automático por género:
      const userTheme = user.gender === "mujer" ? "femenino" : "masculino";
      setTheme(userTheme);
      localStorage.setItem("theme", userTheme);
      loadTheme(userTheme);

      // Redirigir
      navigate("/home");
    } catch (err) {
      setError("Credenciales incorrectas o error en el servidor.");
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="hero-image">
          {localStorage.getItem("theme") === "femenino" ? (
            <img src={photo_logo_mujer} alt="Hero Femenino" />
          ) : (
            <img src={photo_logo_hombre} alt="Hero Masculino" />
          )}
        </div>
      </div>
      <div className="login-right">
        <div className="form-container">
          <button className="theme-toggle" onClick={toggleTheme}>
            Cambiar a {theme === "femenino" ? "masculino" : "femenino"}
          </button>
          <h2 className="accent-title">Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
