import "../styles/Eventspage.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { API_EVENTS, API_MEMBERS } from "../utils/constants"; // Adjust the import path as necessary
import { Link } from "react-router-dom";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [member, setMember] = useState("");
  const location = useLocation(); 

  const queryParams = new URLSearchParams(location.search);
  const memberId = queryParams.get("memberId");

  useEffect(() => {
    const fetchEvents = async () => {
      if (!memberId) return;
      try {       
        const response = await axios.get(`${API_EVENTS}/events/${memberId}`);
        const memberData =await axios.get(`${API_MEMBERS}/${memberId}`)
        setMember(memberData.data.firstname || "Miembro"); // Assuming member has a firstname property
        setEvents(response.data);       
       
      } catch (error) {
        console.error("Error al obtener eventos:", error);
      }
    };

    fetchEvents();
  }, [memberId]);

  return (
    <div className="events-container">      
      <h2 className="page-title">Eventos para {member || "Miembro"}</h2>
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
          <p className="no-events">No hay eventos registrados para este miembro.</p>
        )}
      </div>
      <Link to='/members' className="view-events">Back to Members</Link>
    </div>
  );
};

export default EventsPage;