import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

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


interface HorarioDocente {
  materia: string;
  fecha: string;
  inicio: string;
  fin: string;
}

export default function FormularioSolicitud({ onCancelar, onExito }: FormProps) {
  const [formData, setFormData] = useState<FormData>({
    asignatura: '',
    fecha: '',
    hora: '',
    motivo: ''
  });

  // Estado para almacenar los objetos completos del docente
  const [horariosDisponibles, setHorariosDisponibles] = useState<HorarioDocente[]>([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState<string>('');

  useEffect(() => {
    // Leemos los horarios del docente
    const horariosGuardados = localStorage.getItem('horarios_docente');
    if (horariosGuardados) {
      try {
        setHorariosDisponibles(JSON.parse(horariosGuardados));
      } catch (e) {
        console.error("Error leyendo horarios del docente", e);
      }
    }
  }, []);

  // 1. Obtenemos las materias del docente
  const materiasUnicas = Array.from(new Set(horariosDisponibles.map(h => h.materia)));

  // Filtramos los horarios disponibles según la materia que eligió el estudiante
  const horariosFiltrados = horariosDisponibles.filter(h => h.materia === formData.asignatura);

  const manejarCambio = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'asignatura') {
      setFormData(prev => ({ 
        ...prev, 
        asignatura: value, 
        fecha: '', 
        hora: '' 
      }));
      setHorarioSeleccionado('');
    } 
    else if (name === 'horarioSeleccionado') {
      setHorarioSeleccionado(value);
    
      if (value) {
        const [fechaSeleccionada, horaInicioSeleccionada] = value.split('|');
        setFormData(prev => ({
          ...prev,
          fecha: fechaSeleccionada,
          hora: horaInicioSeleccionada
        }));
      } else {
        setFormData(prev => ({ ...prev, fecha: '', hora: '' }));
      }
    } 
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const manejarEnvio = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fecha || !formData.hora) {
      alert("Por favor, selecciona una franja horaria disponible.");
      return;
    }
    
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
          <option value="">Selecciona la Materia</option>
          {materiasUnicas.length > 0 ? (
            materiasUnicas.map((materia, index) => (
              <option key={index} value={materia}>{materia}</option>
            ))
          ) : (
            <option disabled>No hay materias con horarios disponibles</option>
          )}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="horarioSeleccionado">Horarios Disponibles</label>
        <select 
          id="horarioSeleccionado" 
          name="horarioSeleccionado" 
          className="form-control"
          value={horarioSeleccionado}
          onChange={manejarCambio}
          required
          disabled={!formData.asignatura} 
        >
          <option value="">Selecciona un horario disponible</option>
          {horariosFiltrados.length > 0 ? (
            horariosFiltrados.map((h, index) => (
              <option key={index} value={`${h.fecha}|${h.inicio}`}>
                {h.fecha} (De {h.inicio} a {h.fin})
              </option>
            ))
          ) : (
            <option disabled>
              {formData.asignatura ? "No hay franjas para esta materia" : "Primero selecciona una materia"}
            </option>
          )}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="motivo">Motivo o Duda Académica</label>
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
        <button type="button" className="btn-form cancelar" onClick={onCancelar}>Cancelar</button>
        <button type="submit" className="btn-form enviar">Enviar Solicitud</button>
      </div>
    </form>
  );
}