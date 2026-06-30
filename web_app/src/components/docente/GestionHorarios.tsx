import { useState, useEffect } from 'react';
import Modal from '../Modal';

export default function GestionHorarios() {

  // lista de materias quemadas 
  const materiasDocente = [
    "Aseguramiento de la Calidad de Software",
    "Desarrollo Web Full Stack",
    "Bases de Datos Relacionales",
    "Física I",
    "Cálculo II"
  ];

  const [horarios, setHorarios] = useState<{ materia: string; fecha: string; inicio: string; fin: string }[]>([]);
  const [materia, setMateria] = useState('');
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const horariosGuardados = localStorage.getItem('horarios_docente');
    if (horariosGuardados) setHorarios(JSON.parse(horariosGuardados));
  }, []);

  const agregarHorario = () => {
    if (!materia || !fecha || !horaInicio || !horaFin) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const inicio = parseInt(horaInicio.replace(':', ''));
    const fin = parseInt(horaFin.replace(':', ''));

    if (fin <= inicio) {
      alert("La hora de fin debe ser posterior a la hora de inicio.");
      return;
    }

    const nuevoHorario = { materia, fecha, inicio: horaInicio, fin: horaFin };
    const nuevaLista = [...horarios, nuevoHorario];
    
    setHorarios(nuevaLista);
    localStorage.setItem('horarios_docente', JSON.stringify(nuevaLista));
    
    setMateria(''); setFecha(''); setHoraInicio(''); setHoraFin('');
    setIsModalOpen(false);
  };

  const eliminarHorario = (index: number) => {
    const nuevaLista = horarios.filter((_, i) => i !== index);
    setHorarios(nuevaLista);
    localStorage.setItem('horarios_docente', JSON.stringify(nuevaLista));
  };

  return (
    <section className="dashboard-card-panel">
      <div className="header-con-boton">
        <h3>Mis Horarios por Materia</h3>
        <button className="btn-agregar-horario" onClick={() => setIsModalOpen(true)}>+ Agregar Disponibilidad</button>
      </div>

      <div className="horarios-lista">
        {horarios.length > 0 ? (
          <ul>
            {horarios.map((h, index) => (
              <li key={index} className="horario-item">
                <span className="horario-texto">
                  <strong>{h.materia}</strong> - {h.fecha} | {h.inicio} a {h.fin}
                </span>
                <button className="btn-eliminar-horario" onClick={() => eliminarHorario(index)}>
                  <i className="bi bi-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">No tienes horarios registrados.</div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} titulo="Nueva Disponibilidad">
        <div className="formulario-modal">
          <div className="campo-grupo">
            <label>Seleccionar Materia:</label>
            <select className="horarios-input" value={materia} onChange={(e) => setMateria(e.target.value)}>
              <option value="">Selecciona una materia</option>
              {materiasDocente.map((mat, idx) => (
                <option key={idx} value={mat}>{mat}</option>
              ))}
            </select>
          </div>
          
          <div className="campo-grupo">
            <label>Fecha:</label>
            <input type="date" className="horarios-input" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </div>

          <div className="campo-grupo-doble">
            <div className="campo-grupo">
               <label>Hora Inicio:</label>
               <input type="time" className="horarios-input" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
            </div>
            <div className="campo-grupo">
               <label>Hora Fin:</label>
               <input type="time" className="horarios-input" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} />
            </div>
          </div>
          <button className="btn-agregar-horario btn-bloque" onClick={agregarHorario}>Guardar</button>
        </div>
      </Modal>
    </section>
  );
}