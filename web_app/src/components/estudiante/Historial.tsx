import { useState } from 'react';
import Modal from '../Modal'; 
import { Tutoria } from '../../pages/dashboards/estudiante';

interface HistorialProps {
  solicitudes?: Tutoria[];
  onCancelarSolicitud?: (id: number) => void;
}

export default function Historial({ solicitudes = [], onCancelarSolicitud }: HistorialProps) {
  const [filtroEstado, setFiltroEstado] = useState<string>('Todos');
  const [isModalDetalleOpen, setIsModalDetalleOpen] = useState<boolean>(false);
  const [tutoriaSeleccionada, setTutoriaSeleccionada] = useState<Tutoria | null>(null);

  const solicitudesFiltradas: Tutoria[] = solicitudes.filter((solicitud) => {
    if (filtroEstado === 'Todos') return true;
    return solicitud.estado === filtroEstado;
  });

  const obtenerClaseEstado = (estado: string): string => {
    switch (estado) {
      case 'Solicitada': return 'badge-solicitada';
      case 'Pendiente': return 'badge-pendiente';
      case 'Confirmada': return 'badge-confirmada';
      case 'Finalizada': return 'badge-finalizada';
      case 'Cancelada': return 'badge-cancelada';
      default: return '';
    }
  };

  const abrirModalDetalle = (tutoria: Tutoria): void => {
    setTutoriaSeleccionada(tutoria);
    setIsModalDetalleOpen(true);
  };

  const manejarCancelacion = (tutoria: Tutoria): void => {
    const confirmar = window.confirm(
      `¿Estás seguro de que deseas cancelar la solicitud de ${tutoria.asignatura}?`
    );
    if (confirmar && onCancelarSolicitud) {
      onCancelarSolicitud(tutoria.id);
      setIsModalDetalleOpen(false);
    }
  };

  return (
    <div className="historial-solo-container">
      <div className="historial-header-flex">
        <div>
          <h2>Historial de Tutorías</h2>
          <p className="subtitulo">Consulta el seguimiento de tus solicitudes académicas.</p>
        </div>

        <div className="filtro-wrapper">
          <label htmlFor="filtro-estado">Filtrar por estado: </label>
          <select
            id="filtro-estado"
            className="select-filtro"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="Todos">Todos los estados</option>
            <option value="Solicitada">Solicitadas</option>
            <option value="Pendiente">Pendientes</option>
            <option value="Confirmada">Confirmadas</option>
            <option value="Finalizada">Finalizadas</option>
            <option value="Cancelada">Canceladas</option>
          </select>
        </div>
      </div>

      <div className="tabla-wrapper">
        <table className="tabla-historial">
          <thead>
            <tr>
              <th>Asignatura</th>
              <th>Docente</th>
              <th>Fecha y Hora</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudesFiltradas.length > 0 ? (
              solicitudesFiltradas.map((sol) => (
                <tr key={sol.id}>
                  <td><strong>{sol.asignatura}</strong></td>
                  <td>{sol.docente === 'No asignado' ? <em>No asignado</em> : sol.docente}</td>
                  <td>{sol.fecha} | {sol.hora}</td>
                  <td>
                    <span className={`badge ${obtenerClaseEstado(sol.estado)}`}>
                      {sol.estado}
                    </span>
                  </td>
                  <td style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button className="btn-ver-detalle" onClick={() => abrirModalDetalle(sol)}>Ver detalle</button>
                    {(sol.estado === 'Solicitada' || sol.estado === 'Pendiente') && (
                      <button className="btn-cancelar-tutoria" onClick={() => manejarCancelacion(sol)}>Cancelar</button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="tabla-vaciva">No se encontraron tutorías con el estado "{filtroEstado}".</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalDetalleOpen} onClose={() => setIsModalDetalleOpen(false)} titulo="Detalle de la Solicitud">
        {tutoriaSeleccionada && (
          <div className="modal-detalle-contenido">
            <p><strong>Materia:</strong> {tutoriaSeleccionada.asignatura}</p>
            <p><strong>Docente:</strong> {tutoriaSeleccionada.docente}</p>
            <p><strong>Estado:</strong> {tutoriaSeleccionada.estado}</p>
            <p><strong>Motivo:</strong> {tutoriaSeleccionada.motivo}</p>
            <button className="btn-form cancelar" onClick={() => setIsModalDetalleOpen(false)}>Cerrar</button>
          </div>
        )}
      </Modal>
    </div>
  );
}