
const estadoBadgeClass = {
  'Solicitada':   'detalle-estado-badge--solicitada',
  'Pendiente':    'detalle-estado-badge--pendiente',
  'Confirmada':   'detalle-estado-badge--confirmada',
  'Atendida':     'detalle-estado-badge--atendida',
  'Cancelada':    'detalle-estado-badge--cancelada',
  'No asistida':  'detalle-estado-badge--no-asistida',
};
 
const campos = (t) => [
  { label: 'Estudiante', valor: t.estudiante, icono: 'bi-person'      },
  { label: 'Docente',    valor: t.docente,    icono: 'bi-person-badge' },
  { label: 'Asignatura', valor: t.asignatura, icono: 'bi-book'        },
  { label: 'Tipo',       valor: t.tipo,       icono: 'bi-people'      },
  { label: 'Fecha',      valor: t.fecha,      icono: 'bi-calendar3'   },
  { label: 'Hora',       valor: t.hora,       icono: 'bi-clock'       },
];
 
export default function DetalleTutoriaCoord({ tutoria, onCerrar }) {
  if (!tutoria) return null;
 
  return (
    <div className="detalle-tutoria-wrapper">
 
      <div className="detalle-estado-row">
        <span className={`detalle-estado-badge ${estadoBadgeClass[tutoria.estado]}`}>
          {tutoria.estado}
        </span>
      </div>
 
      <div className="detalle-grid">
        {campos(tutoria).map((c, i) => (
          <div key={i} className="detalle-campo">
            <div className="detalle-campo-label">
              <i className={`bi ${c.icono}`}></i>{c.label}
            </div>
            <div className="detalle-campo-valor">{c.valor}</div>
          </div>
        ))}
      </div>
 
      <div className="detalle-observaciones">
        <div className="detalle-observaciones-label">
          <i className="bi bi-journal-text"></i>Observaciones del docente
        </div>
        <p className={`detalle-observaciones-texto ${tutoria.observaciones ? 'detalle-observaciones-texto--con-texto' : 'detalle-observaciones-texto--vacio'}`}>
          {tutoria.observaciones || 'Sin observaciones registradas.'}
        </p>
      </div>
 
      <div className="form-actions">
        <button type="button" className="btn-form cancelar" onClick={onCerrar}>Cerrar</button>
      </div>
    </div>
  );
}