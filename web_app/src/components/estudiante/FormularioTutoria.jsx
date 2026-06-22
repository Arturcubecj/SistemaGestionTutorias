import { useState } from 'react';

export default function FormularioSolicitud({ onCancelar, onExito }) {
  const [formData, setFormData] = useState({
    asignatura: '',
    docente: '',
    tipo: 'Individual',
    motivo: ''
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    console.log("Datos enviados:", formData);
    
    if (onExito) onExito();
  };

  return (
    <form className="form-tutoria" onSubmit={manejarEnvio}>
      <div className="form-group">
        <label htmlFor="asignatura">Asignatura</label>
        <select 
          id="asignatura" 
          name="asignatura" 
          className="form-control"
          value={formData.asignatura}
          onChange={manejarCambio}
          required
        >
          <option value="">Selecciona la materia</option>
          <option value="software-quality">Aseguramiento de la Calidad de Software</option>
          <option value="web-dev">Desarrollo Web Full Stack</option>
          <option value="databases">Bases de Datos Relacionales</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="docente">Docente</label>
        <select 
          id="docente" 
          name="docente" 
          className="form-control"
          value={formData.docente}
          onChange={manejarCambio}
          required
        >
          <option value="">Selecciona el docente</option>
          <option value="docente-1">Ing. Carlos Martínez</option>
          <option value="docente-2">Dra. Laura Cedeño</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="tipo">Tipo de Tutoría</label>
        <select 
          id="tipo" 
          name="tipo" 
          className="form-control"
          value={formData.tipo}
          onChange={manejarCambio}
        >
          <option value="Individual">Individual</option>
          <option value="Grupal">Grupal</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="motivo">Motivo o duda académica</label>
        <textarea 
          id="motivo" 
          name="motivo" 
          className="form-control"
          placeholder="Describe brevemente el tema que deseas revisar"
          value={formData.motivo}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn-form cancelar" onClick={onCancelar}>
          Cancelar
        </button>
        <button type="submit" className="btn-form enviar">
          Enviar Solicitud
        </button>
      </div>
    </form>
  );
}