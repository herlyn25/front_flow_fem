import { useState } from "react";
import "../styles/AddMemberModal.css";

const AddMemberModal = ({onClose,onRegister}) => {  
  const [formData,setFormData] = useState({
    user:"",
    firstname: "",
    gender: "",
    lastname: "",    
    file: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
        setFormData((prev)=>({...prev, file:file}));
    } else if (!file){
        setFormData((prev)=>({...prev, file:''}));}
    else{
         alert("Solo se permiten archivos de imagen.");
    }    
  };

  const handleSubmit = (e) => {
    e.preventDefault();    
    onRegister(formData);
    onClose();
  };

  return (
  <div className={`modal-overlay ${formData.gender === "mujer" ? "theme-femenino" : formData.gender === "hombre" ? "theme-masculino" : ""}`}>
    <div className="modal-content">
      <h3>Registrar nuevo miembro</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="firstname"
          type="text"
          placeholder="Nombre"
          onChange={handleChange}
          required
        />
        <input
          name="lastname"
          type="text"
          placeholder="Apellido"
          onChange={handleChange}
          required
        />
        <select name="gender" onChange={handleChange} required>
          <option value="">Seleccione género</option>
          <option value="hombre">hombre</option>
          <option value="mujer">mujer</option>
        </select>
        <input
          name="file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}          
        />
        <div className="modal-actions">
          <button type="submit" className="btn-save">Guardar</button>
          <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
);
};

export default AddMemberModal;
