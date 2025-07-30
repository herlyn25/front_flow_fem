// src/pages/MembersPage.jsx
import "../styles/MembersPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_MEMBERS_USER } from "./constants";
import { Link } from "react-router-dom";
import { loadPhotos } from "../utils/photoLoader";

const MembersPage = () => {

  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        
        const response = await axios.get(`${API_MEMBERS_USER}/${user.id}`);        
        if (response.status == 400) {
           setError("No hay miembros registrados.");             
        }else{
            setMembers(response.data);
            setError("")
        }  
        
      } catch (error) {
        console.error("Error en la peticion a la API:", error);
      }
    };

    fetchMembers();
  }, []);

  return (    
    <div className="members-container">
      <h2 className="page-title">Miembros Registrados</h2>
      <div className="members-grid">
        {members.length === 0 ?(<h2>{error}</h2>) : (
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
    </div>
  );
};

export default MembersPage;