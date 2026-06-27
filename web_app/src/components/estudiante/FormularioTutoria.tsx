import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  asignatura: string;
  fecha: string;
  hora: string;
  motivo: string;
}

interface FormProps {
  onCancelar: () => void;
  onExito: (datos: FormData) => void;
}

export default function FormularioSolicitud({ onCancelar, onExito }: FormProps) {
  const [formData, setFormData] = useState<FormData>({
    asignatura: '',
    fecha: '',
    hora: '',
    motivo: ''
  });

  const manejarCambio = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const manejarEnvio = (e: FormEvent) => {
    e.preventDefault();
    if (onExito) {
      onExito(formData);
    }
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
          <option>Aseguramiento de la Calidad de Software</option>
          <option>Desarrollo Web Full Stack</option>
          <option>Bases de Datos Relacionales</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="fecha">Fecha sugerida</label>
        <input 
          type="date"
          id="fecha" 
          name="fecha" 
          className="form-control"
          value={formData.fecha}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="hora">Hora sugerida</label>
        <input 
          type="time"
          id="hora" 
          name="hora" 
          className="form-control"
          value={formData.hora}
          onChange={manejarCambio}
          required
        />
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