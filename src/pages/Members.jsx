// src/pages/MembersPage.jsx
import "../styles/MembersPage.css";
import "../styles/AddMemberModal.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_MEMBERS_REGISTER, API_MEMBERS_USER } from "../utils/constants";
import { Link } from "react-router-dom";
import { loadPhotos } from "../utils/photoLoader";
import AddMemberModal from "./AddMemberModal";
import { loadTheme } from "../utils/themeLoader";

const MembersPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "femenino");
  const { user } = useAuth();
  const [members, setMembers] = useState([]);  
  const [showModal, setShowModal] = useState(false);
  const toggleTheme = () => {
      const newTheme = theme === "femenino" ? "masculino" : "femenino";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      loadTheme(newTheme);
  };
  
  const handleRegister = async(data) => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'))
      const newData = {...data, user:userData.id}      
      const response = await axios.post(API_MEMBERS_REGISTER, newData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if(response.status === 201){
        alert("Members registrado")
        setShowModal(false)
        await fetchMembers()
      }
     
    }catch(error){
      alert("Error al registrar");
    }
  }
  const fetchMembers = async () => {
      try {        
        const response = await axios.get(`${API_MEMBERS_USER}/${user.id}`);        
        if (response.status == 200) {          
            setMembers(response.data);            
        }         
      } catch (error) {       
        console.error("Error en la peticion a la API:", error);
      }
    };

  useEffect(() => {  
    loadTheme(theme)  
    fetchMembers();
  }, [theme]);

  return (    
    <div className="members-container">
      <div>
        <h2>Miembros Registrados</h2>
        <button className="btn-add-member" onClick={() => setShowModal(true)}>+ Añadir Miembro</button>
      </div>
      
      <div className="members-grid">
        {members.length === 0 ? (<h2 className="text-h2">No hay miembros para el usuario</h2>) : (
        members.map((member) => (
          <div className="member-card" key={member.id}>
            <img
              src={loadPhotos(member.photo, member.gender)}
              alt="Foto del miembro"
              className="member-photo"
            />
            <h3 className="member-name">{member.firstname}</h3>
            <p className="member-lastname">{member.lastname}</p>
            <p className="member-gender">
              {member.gender === "mujer" ? "Femenino" : "Masculino"}
            </p>            
            <Link to={`/events?memberId=${member.id}`} className="view-events">Ver eventos</Link>
          </div>
        )))}        
      </div>       
     <Link to='/home' className="view-events">Home</Link>
    {showModal && <AddMemberModal onClose={() => setShowModal(false)} onRegister={handleRegister} />}
    </div>    
  );
};

export default MembersPage;