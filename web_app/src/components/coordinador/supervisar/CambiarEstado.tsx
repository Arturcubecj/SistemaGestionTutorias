import { useState } from 'react';
 
const estadosDisponibles = ['Solicitada', 'Pendiente', 'Confirmada', 'Atendida', 'Cancelada', 'No asistida'];
 
const estadoBadgeClass = {
  'Solicitada':   'badge-estado--solicitada',
  'Pendiente':    'badge-estado--pendiente',
  'Confirmada':   'badge-estado--confirmada',
  'Atendida':     'badge-estado--atendida',
  'Cancelada':    'badge-estado--cancelada',
  'No asistida':  'badge-estado--no-asistida',
};
 
export default function CambiarEstado({ tutoria, onConfirmar, onCancelar }) {
  const [nuevoEstado, setNuevoEstado] = useState(tutoria?.estado || 'Pendiente');
 
  if (!tutoria) return null;
 
  return (
    <div className="cambiar-estado-wrapper">
 
      {/* Info tutoría */}
      <div className="cambiar-estado-info">
        <div className="cambiar-estado-nombre">{tutoria.estudiante}</div>
        <div className="cambiar-estado-detalle">{tutoria.asignatura} — {tutoria.docente}</div>
        <div className="cambiar-estado-fecha">{tutoria.fecha} a las {tutoria.hora}</div>
      </div>
 
      {/* Estado actual */}
      <div className="estado-row">
        <span className="estado-row-label">Estado actual:</span>
        <span className={`badge-estado ${estadoBadgeClass[tutoria.estado]}`}>
          {tutoria.estado}
        </span>
      </div>
 
      {/* Select nuevo estado */}
      <div className="form-group">
        <label>Nuevo estado</label>
        <select className="form-control" value={nuevoEstado} onChange={e => setNuevoEstado(e.target.value)}>
          {estadosDisponibles.map(e => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
      </div>
 
      {/* Preview nuevo estado */}
      <div className="estado-row">
        <span className="estado-row-label">Nuevo estado:</span>
        <span className={`badge-estado ${estadoBadgeClass[nuevoEstado]}`}>
          {nuevoEstado}
        </span>
      </div>
 
      <div className="form-actions">
        <button type="button" className="btn-form cancelar" onClick={onCancelar}>Cancelar</button>
        <button type="button" className="btn-form enviar" onClick={() => onConfirmar(nuevoEstado)}>
          Guardar Cambio
        </button>
      </div>
    </div>
  );
}