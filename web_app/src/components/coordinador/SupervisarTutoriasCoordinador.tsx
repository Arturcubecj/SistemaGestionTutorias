import { useState } from 'react';
import Modal from '../Modal';
import DetalleTutoriaCoord from './supervisar/DetalleTutoriaCoord';
import CambiarEstado from './supervisar/CambiarEstado';
import SeguimientoCaso from './supervisar/SeguimientoCaso';
import SolicitudesEscaladas from './supervisar/SolicitudesEscaladas';
 
const tutoriasIniciales = [
  { id: 1, estudiante: 'Ana Torres',   docente: 'Ing. Carlos Martínez', asignatura: 'Desarrollo de Aplicaciones Web', fecha: '2026-06-20', hora: '09:00', tipo: 'Individual', estado: 'Atendida',    observaciones: 'El estudiante comprendió los conceptos de React hooks.' },
  { id: 2, estudiante: 'Luis Pérez',   docente: 'Dra. Laura Cedeño',    asignatura: 'Bases de Datos Relacionales',    fecha: '2026-06-21', hora: '10:30', tipo: 'Individual', estado: 'Confirmada',  observaciones: '' },
  { id: 3, estudiante: 'María Gómez',  docente: 'Ing. Carlos Martínez', asignatura: 'Calidad de Software',            fecha: '2026-06-22', hora: '14:00', tipo: 'Grupal',     estado: 'Pendiente',   observaciones: '' },
  { id: 4, estudiante: 'Jorge Lema',   docente: 'Dra. Laura Cedeño',    asignatura: 'Bases de Datos Relacionales',    fecha: '2026-06-23', hora: '11:00', tipo: 'Individual', estado: 'Cancelada',   observaciones: 'El estudiante canceló con menos de 24 horas de anticipación.' },
  { id: 5, estudiante: 'Carla Ríos',   docente: 'Mg. Juan Mora',        asignatura: 'Desarrollo de Aplicaciones Web', fecha: '2026-06-25', hora: '08:00', tipo: 'Individual', estado: 'Solicitada',  observaciones: '' },
  { id: 6, estudiante: 'Pedro Suárez', docente: 'Ing. Carlos Martínez', asignatura: 'Calidad de Software',            fecha: '2026-06-18', hora: '15:00', tipo: 'Grupal',     estado: 'No asistida', observaciones: 'El estudiante no se presentó a la tutoría confirmada.' },
];
 
const todosEstados = ['Todos', 'Solicitada', 'Pendiente', 'Confirmada', 'Atendida', 'Cancelada', 'No asistida'];
 
const estadoBadgeClass = {
  'Solicitada':   'badge-estado--solicitada',
  'Pendiente':    'badge-estado--pendiente',
  'Confirmada':   'badge-estado--confirmada',
  'Atendida':     'badge-estado--atendida',
  'Cancelada':    'badge-estado--cancelada',
  'No asistida':  'badge-estado--no-asistida',
};
 
const estadoFiltroClass = {
  'Todos':        'active--todos',
  'Solicitada':   'active--solicitada',
  'Pendiente':    'active--pendiente',
  'Confirmada':   'active--confirmada',
  'Atendida':     'active--atendida',
  'Cancelada':    'active--cancelada',
  'No asistida':  'active--no-asistida',
};
 
export default function SupervisarTutoriasCoordinador({ onVolver }) {
  const [tutorias, setTutorias] = useState(tutoriasIniciales);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [modalAbierto, setModalAbierto] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);
 
  const tutoriasFiltradas = tutorias.filter(t => {
    const coincideBusqueda =
      t.estudiante.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.docente.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.asignatura.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado === 'Todos' || t.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });
 
  const cerrarModal = () => { setModalAbierto(null); setSeleccionado(null); };
  const abrirDetalle = (t) => { setSeleccionado(t); setModalAbierto('detalle'); };
  const abrirCambiarEstado = (t) => { setSeleccionado(t); setModalAbierto('cambiarEstado'); };
 
  const manejarCambioEstado = (nuevoEstado) => {
    setTutorias(prev => prev.map(t => t.id === seleccionado.id ? { ...t, estado: nuevoEstado } : t));
    cerrarModal();
  };
 
  return (
    <div>
      {/* Encabezado */}
      <div className="superv-header">
        <div>
          <h2 className="superv-title">Supervisar Tutorías</h2>
          <p className="superv-subtitle">Seguimiento y control de tutorías académicas.</p>
        </div>
        <div className="superv-header-actions">
          <button className="btn-ia" onClick={() => setModalAbierto('escaladas')}>
            <i className="bi bi-cpu"></i> Solicitudes IA
          </button>
          <button className="btn-seguimiento" onClick={() => setModalAbierto('seguimiento')}>
            <i className="bi bi-journal-text"></i> Seguimiento de casos
          </button>
          <button className="btn-volver" onClick={onVolver}>
            <i className="bi bi-arrow-left"></i> Volver
          </button>
        </div>
      </div>
 
      {/* Toolbar */}
      <div className="superv-toolbar">
        <div className="filtros-estado">
          {todosEstados.map(estado => (
            <button
              key={estado}
              onClick={() => setFiltroEstado(estado)}
              className={`filtro-estado-btn ${filtroEstado === estado ? estadoFiltroClass[estado] : ''}`}
            >
              {estado}
            </button>
          ))}
        </div>
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Buscar tutoría..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
 
      {/* Tabla */}
      <div className="table-wrapper">
        <table className="report-table">
          <thead>
            <tr>
              {['#', 'Estudiante', 'Docente', 'Asignatura', 'Fecha', 'Hora', 'Tipo', 'Estado', 'Acciones'].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tutoriasFiltradas.length > 0 ? tutoriasFiltradas.map((t, i) => (
              <tr key={t.id}>
                <td>{i + 1}</td>
                <td className="td-bold">{t.estudiante}</td>
                <td>{t.docente}</td>
                <td>{t.asignatura}</td>
                <td>{t.fecha}</td>
                <td>{t.hora}</td>
                <td>
                  <span className={`badge ${t.tipo === 'Individual' ? 'badge-tipo--individual' : 'badge-tipo--grupal'}`}>
                    {t.tipo}
                  </span>
                </td>
                <td>
                  <span className={`badge ${estadoBadgeClass[t.estado]}`}>
                    {t.estado}
                  </span>
                </td>
                <td>
                  <div className="acciones-cell">
                    <button className="btn-accion btn-accion--ver" title="Ver detalle" onClick={() => abrirDetalle(t)}>
                      <i className="bi bi-eye"></i>
                    </button>
                    <button className="btn-accion btn-accion--estado" title="Cambiar estado" onClick={() => abrirCambiarEstado(t)}>
                      <i className="bi bi-arrow-left-right"></i>
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr className="empty-row">
                <td colSpan={9}>No se encontraron tutorías.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
 
      {/* Modales */}
      <Modal isOpen={modalAbierto === 'detalle'} onClose={cerrarModal} titulo="Detalle de Tutoría">
        <DetalleTutoriaCoord tutoria={seleccionado} onCerrar={cerrarModal} />
      </Modal>
 
      <Modal isOpen={modalAbierto === 'cambiarEstado'} onClose={cerrarModal} titulo="Cambiar Estado">
        <CambiarEstado tutoria={seleccionado} onConfirmar={manejarCambioEstado} onCancelar={cerrarModal} />
      </Modal>
 
      <Modal isOpen={modalAbierto === 'seguimiento'} onClose={cerrarModal} titulo="Seguimiento de Casos">
        <SeguimientoCaso onCerrar={cerrarModal} />
      </Modal>
 
      <Modal isOpen={modalAbierto === 'escaladas'} onClose={cerrarModal} titulo="Solicitudes Escaladas por IA">
        <SolicitudesEscaladas onCerrar={cerrarModal} />
      </Modal>
    </div>
  );
}