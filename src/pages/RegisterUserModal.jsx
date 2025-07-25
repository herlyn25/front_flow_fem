// src/components/RegisterModal.jsx
import "../styles/RegisterUserModal.css";
import { useState } from "react";

const RegisterUserModal = ({ isOpen, onClose, onRegister }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    email: "",
    username: "",
    password: "",
    role:"admin",
    photo: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Crear cuenta</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input name="firstName" placeholder="Nombre" onChange={handleChange} required />
          <input name="lastName" placeholder="Apellido" onChange={handleChange} required />
          <input name="age" placeholder="Edad" type="number" onChange={handleChange} required />
          <input name="email" placeholder="Email" type="email" onChange={handleChange} autoComplete="email" required />
          <input name="username" placeholder="Usuario" onChange={handleChange} autoComplete="username" required />
          <input name="password" placeholder="Contraseña" type="password" onChange={handleChange} required />
          <select name="gender" onChange={handleChange} required>            
            <option value="female">hombre</option>
            <option value="male">mujer</option>
          </select>
          <button type="submit" className="submit-btn">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUserModal;
