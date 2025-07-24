import hombre from "../assets/hombre.png";
import mujer from "../assets/mujer.jpg";
import default_foto from "../assets/default.png";
import logo_hombre from "../assets/papa_inicial.png";
import logo_mujer from "../assets/mama_inicial.png";

export const photoWoman = mujer;
export const photoMan= hombre;
export const photoDefault = default_foto;
export const API_URL = "http://localhost:8000"; // Replace with your API base URL
export const API_LOGIN = `${API_URL}/auth/login`;
export const API_MEMBERS = `${API_URL}/members`;
export const API_MEMBERS_USER = `${API_URL}/members/user`;
export const API_EVENTS = `${API_URL}/events`;
export const photo_logo_hombre = logo_hombre;
export const photo_logo_mujer = logo_mujer;
