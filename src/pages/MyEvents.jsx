import "../styles/Eventspage.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_EVENTS, API_MEMBERS, API_REGISTER_EVENTS } from "../utils/constants"; // Adjust the import path as necessary
import { Link } from "react-router-dom";
import EventModal from "./AddEventModal";
import Swal from 'sweetalert2';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [member, setMember] = useState("");
  const [showModal,setShowModal] = useState(false)
  const location = useLocation();  

  const queryParams = new URLSearchParams(location.search);
  const memberId = queryParams.get("memberId");
  
  const fetchEvents = async () => {      
      if (!memberId) return;      
      try {       
        const memberEvents = await axios.get(`${API_EVENTS}/member/${memberId}`);
        const memberData =await axios.get(`${API_MEMBERS}/${memberId}`)
        setMember(memberData.data); // Assuming member has a firstname property
        setEvents(memberEvents.data);         
      } catch (error) {
        const memberData =await axios.get(`${API_MEMBERS}/${memberId}`)
        setEvents([])
        setMember(memberData.data);
        console.error("Error al obtener eventos:", error);
      }           
    };

  const handleRegister = async(data) => {
    try {  
      const response = await axios.post(`${API_REGISTER_EVENTS}`, {...data,member:memberId});      
      if(response.status === 201){
        alert("Events registrado")
        setShowModal(false)
        await fetchEvents()
      }     
    }catch(error){
      alert("Error al registrar eventos", error);
      console.log(error)
    }
  }

  useEffect(() => {
    
    fetchEvents();
  }, [memberId]);
  localStorage.setItem('member', JSON.stringify(member))

  return (
    <div className="events-container">   
      <div>
        <h2 className="page-title">Eventos para {member.firstname || "Miembro"}</h2>
        <button onClick={()=>setShowModal(true)}>Añadir Eventos</button>
      </div>   
      
      <div className="events-grid">
        {events.length > 0 ? (
          events.map((event) => (
            <div className="event-card" key={event.id}>
              <h3 className="event-name">📚 {event.description}</h3>
              <p className="event-time">🕒 {event.hora}:{event.min}</p>
              <p className="event-date">📅 {event.fecha}</p>
              <p className="event-category">📌 {event.category}</p>
            </div>
          ))
        ) : (
           <h2>No tiene eventos</h2>
        )}
      </div>
      <Link to='/members' className="view-events">Back to Members</Link>
    {showModal && <EventModal isOpen={showModal}  onClose={()=>setShowModal(false)} onRegister={handleRegister} />}
    </div>
  );
};

export default EventsPage;