import { useState, useEffect } from 'react';
import Modal from '../Modal';

export default function Bitacoras() {
  const [bitacoras, setBitacoras] = useState<any[]>([]);
  const [tutoriasFinalizadas, setTutoriasFinalizadas] = useState<any[]>([]);
  const [tutoriaSeleccionada, setTutoriaSeleccionada] = useState<string>('');
  const [nota, setNota] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    //  Cargamos bitácoras guardadas
    const bitacorasGuardadas = JSON.parse(localStorage.getItem('bitacoras_docente') || '[]');
    setBitacoras(bitacorasGuardadas);

    // filtro para mostrar solo bitacoras finalizadas
    if (isModalOpen) {
      const todasLasTutorias = JSON.parse(localStorage.getItem('tutorias_locales') || '[]');
      const pendientesDeBitacora = todasLasTutorias.filter((t: any) => {
        const esFinalizada = t.estado === 'Finalizada';
        const yaTieneBitacora = bitacorasGuardadas.some((b: any) => 
          b.tutoria.includes(t.asignatura) && b.tutoria.includes(t.fecha)
        );
        return esFinalizada && !yaTieneBitacora;
      });

      setTutoriasFinalizadas(pendientesDeBitacora);
    }
  }, [isModalOpen]);

  const guardarBitacora = () => {
    if (!tutoriaSeleccionada || !nota.trim()) {
      alert("Por favor, selecciona una tutoría y escribe una nota.");
      return;
    }

    const nuevaBitacora = {
      id: Date.now(),
      tutoria: tutoriaSeleccionada,
      nota: nota
    };

    const listaActualizada = [...bitacoras, nuevaBitacora];
    
    setBitacoras(listaActualizada);
    localStorage.setItem('bitacoras_docente', JSON.stringify(listaActualizada));

    alert("Bitácora guardada con éxito.");
    setTutoriaSeleccionada('');
    setNota('');
    setIsModalOpen(false);
  };

  const bitacorasFiltradas = bitacoras.filter(b => 
    b.tutoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className="dashboard-card-panel">
      <div className="header-con-boton">
        <div>
          <h3>Mis Bitácoras</h3>
          <input 
            type="text" 
            placeholder="Buscar bitácora" 
            className="horarios-input buscador-bitacora"
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <button className="btn-agregar-horario" onClick={() => setIsModalOpen(true)}>+ Nueva Bitácora</button>
      </div>

      <div className="horarios-lista">
        <ul>
          {bitacorasFiltradas.length > 0 ? (
            bitacorasFiltradas.map((b) => (
              <li key={b.id} className="horario-item">
                <div className="bitacora-content">
                  <strong>{b.tutoria}</strong>
                  <p>{b.nota}</p>
                </div>
              </li>
            ))
          ) : (
            <div className="empty-state">No hay bitácoras registradas.</div>
          )}
        </ul>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} titulo="Registrar Bitácora">
        <div className="formulario-modal">
          <div className="campo-grupo">
            <label>Seleccionar Sesión Finalizada:</label>
            <select className="horarios-input" value={tutoriaSeleccionada} onChange={(e) => setTutoriaSeleccionada(e.target.value)}>
              <option value="">Selecciona Una Sesión</option>
              {tutoriasFinalizadas.length > 0 ? (
                tutoriasFinalizadas.map((t, idx) => (
                  <option key={idx} value={`${t.asignatura} | ${t.fecha} | ${t.hora}`}>
                    {t.asignatura} - {t.fecha} ({t.hora})
                  </option>
                ))
              ) : (
                <option disabled>No hay sesiones pendientes de bitácora.</option>
              )}
            </select>
          </div>
          <div className="campo-grupo">
            <label>Comentarios:</label>
            <textarea className="horarios-input" rows={4} value={nota} onChange={(e) => setNota(e.target.value)} />
          </div>
          <button className="btn-agregar-horario btn-bloque" onClick={guardarBitacora}>
            Guardar Bitácora
          </button>
        </div>
      </Modal>
    </section>
  );
}