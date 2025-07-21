import { useState, useEffect } from "react";
import "../styles/Login.css";
import { loadTheme } from "../utils/themeLoader";

const Login = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "femenino");

  const toggleTheme = () => {
    const newTheme = theme === "femenino" ? "masculino" : "femenino";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    loadTheme(newTheme);
  };

  useEffect(() => {
    loadTheme(theme);
  }, [theme]);

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="hero-image">
          {/* Aquí puedes usar una imagen o ilustración médica */}
        </div>
      </div>
      <div className="login-right">
        <div className="form-container">
          <button className="theme-toggle" onClick={toggleTheme}>
            Cambiar a {theme === "femenino" ? "masculino" : "femenino"}
          </button>
          <h2>Iniciar Sesión</h2>
          <form>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Contraseña" />
            <button type="submit" className="login-btn">Login</button>
          </form>
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
