// src/components/EventModal.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/AddEventModal.css"; // crea estilo si deseas
import { API_MEMBERS_USER } from "../utils/constants";
import { useAuth } from "../context/AuthContext";

const EventModal = ({ isOpen, onClose, onRegister }) => {
  
  const [memberId, setMemberId] = useState("");
  const [membersList, setMembersList] = useState([]);
  const { user } = useAuth();
  const location = useLocation();
  const [formData,setFormData] = useState({
    member:"",
    description: "",
    hora: "",
    min: "",    
    category: "",
    fecha:"",
    status:"CREATED"
  })  
  const params = new URLSearchParams(location.search);
  const idFromUrl = params.get("memberId"); 
  
    // Obtener ID de la URL si estás en /events
  useEffect(() => {
    if (idFromUrl) {
      setMemberId(idFromUrl)
      //setFormData(prev => ({ ...prev, member: idFromUrl }));
    } else if (location.pathname.includes("/members")) {
      // Trae lista de miembros solo si estás en /members
      axios.get(`${API_MEMBERS_USER}/${user.id}`)
        .then(res => setMembersList(res.data))
        .catch(err => console.error("Error al cargar miembros", err));
    }
  }, [location,memberId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  
    onRegister(formData)
    onClose()
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Nuevo Evento</h2>
        <form onSubmit={handleSubmit}>
          {location.pathname.includes("/members") && (
            <select
              name="member"            
              onChange={(e) => setFormData({ ...formData, member: e.target.value })}
              required
            >
              <option value="">Selecciona un miembro</option>
              {membersList.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.firstname} {member.lastname}
                </option>
              ))}
            </select>
          )}

          <input
            type="text"
            placeholder="Título del evento"
            name="description"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="hora"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="min"
            onChange={handleChange}
            required
          />
     
          <input
            type="date"       
            name="fecha"           
            onChange={handleChange}
            required
          />    
              
            <select name="category" onChange={handleChange} required>
              <option value="">Seleccione categoria</option>
              <option value="PRACTICA">practica</option>
              <option value="CITA_MEDICA">cita médica</option>
              <option value="CLASE"> clase </option>
              <option value="RECORDATORIO">Recordatorio</option>
            </select>

          <div className="modal-actions">
            <button type="submit">Crear</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
