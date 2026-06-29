import { useState } from 'react';
 
const seguimientosIniciales = [
  { id: 1, estudiante: 'Jorge Lema', asignatura: 'Bases de Datos Relacionales',    descripcion: 'Estudiante con dificultades reiteradas en consultas SQL.',  observacion: 'Se recomienda reforzar con tutorías adicionales.', fecha: '2026-06-20', estado: 'Abierto' },
  { id: 2, estudiante: 'Luis Pérez', asignatura: 'Desarrollo de Aplicaciones Web', descripcion: 'Inasistencias consecutivas sin justificación.',               observacion: '',                                               fecha: '2026-06-22', estado: 'Abierto' },
  { id: 3, estudiante: 'Ana Torres', asignatura: 'Calidad de Software',            descripcion: 'Solicitud de cambio de docente tutor.',                       observacion: 'Coordinado con el docente asignado.',            fecha: '2026-06-18', estado: 'Cerrado' },
];
 
export default function SeguimientoCaso({ onCerrar }) {
  const [seguimientos, setSeguimientos] = useState(seguimientosIniciales);
  const [seleccionado, setSeleccionado] = useState(null);
  const [observacion, setObservacion] = useState('');
  const [modoNuevo, setModoNuevo] = useState(false);
  const [formNuevo, setFormNuevo] = useState({ estudiante: '', asignatura: '', descripcion: '' });
 
  const guardarObservacion = () => {
    if (!observacion.trim()) return;
    setSeguimientos(prev => prev.map(s =>
      s.id === seleccionado.id ? { ...s, observacion, estado: 'Cerrado' } : s
    ));
    setSeleccionado(null);
    setObservacion('');
  };
 
  const guardarNuevo = () => {
    if (!formNuevo.estudiante || !formNuevo.asignatura || !formNuevo.descripcion) return;
    setSeguimientos(prev => [...prev, {
      id: Date.now(),
      ...formNuevo,
      observacion: '',
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Abierto',
    }]);
    setModoNuevo(false);
    setFormNuevo({ estudiante: '', asignatura: '', descripcion: '' });
  };
 
  /* ===== VISTA DETALLE / OBSERVACIÓN ===== */
  if (seleccionado) {
    return (
      <div className="seg-wrapper">
        <button className="btn-volver-inline" onClick={() => { setSeleccionado(null); setObservacion(''); }}>
          <i className="bi bi-arrow-left"></i> Volver
        </button>
 
        <div className="seg-info-card">
          <div className="seg-info-nombre">{seleccionado.estudiante}</div>
          <div className="seg-info-asignatura">{seleccionado.asignatura}</div>
          <div className="seg-info-descripcion">{seleccionado.descripcion}</div>
        </div>
 
        {seleccionado.observacion && (
          <div className="seg-observacion-registrada">
            <div className="seg-observacion-label">Observación registrada</div>
            <p className="seg-observacion-texto">{seleccionado.observacion}</p>
          </div>
        )}
 
        <div className="form-group">
          <label>{seleccionado.observacion ? 'Actualizar observación' : 'Registrar observación'}</label>
          <textarea
            className="form-control form-control-resize"
            rows={4}
            placeholder="Escribe la observación o acción tomada sobre este caso..."
            value={observacion}
            onChange={e => setObservacion(e.target.value)}
          />
        </div>
 
        <div className="form-actions">
          <button type="button" className="btn-form cancelar" onClick={() => { setSeleccionado(null); setObservacion(''); }}>Cancelar</button>
          <button type="button" className="btn-form enviar" onClick={guardarObservacion}>Guardar Observación</button>
        </div>
      </div>
    );
  }
 
  /* ===== VISTA NUEVO CASO ===== */
  if (modoNuevo) {
    return (
      <div className="seg-wrapper">
        <button className="btn-volver-inline" onClick={() => setModoNuevo(false)}>
          <i className="bi bi-arrow-left"></i> Volver
        </button>
        <div className="form-group">
          <label>Estudiante</label>
          <input className="form-control" placeholder="Nombre del estudiante" value={formNuevo.estudiante} onChange={e => setFormNuevo(p => ({ ...p, estudiante: e.target.value }))} />
        </div>
        <div className="form-group">
          <label>Asignatura</label>
          <input className="form-control" placeholder="Asignatura relacionada" value={formNuevo.asignatura} onChange={e => setFormNuevo(p => ({ ...p, asignatura: e.target.value }))} />
        </div>
        <div className="form-group">
          <label>Descripción del caso</label>
          <textarea className="form-control form-control-resize" rows={3} placeholder="Describe el caso académico..." value={formNuevo.descripcion} onChange={e => setFormNuevo(p => ({ ...p, descripcion: e.target.value }))} />
        </div>
        <div className="form-actions">
          <button type="button" className="btn-form cancelar" onClick={() => setModoNuevo(false)}>Cancelar</button>
          <button type="button" className="btn-form enviar" onClick={guardarNuevo}>Registrar Caso</button>
        </div>
      </div>
    );
  }
 
  /* ===== VISTA LISTA ===== */
  return (
    <div className="seg-wrapper">
      <div className="seg-lista-header">
        <p className="seg-lista-desc">Casos académicos que requieren seguimiento del coordinador.</p>
        <button className="btn-nuevo-caso" onClick={() => setModoNuevo(true)}>
          <i className="bi bi-plus-lg"></i> Nuevo caso
        </button>
      </div>
 
      {seguimientos.map(s => (
        <div key={s.id} className="seg-caso-item">
          <div className="seg-caso-body">
            <div className="seg-caso-title-row">
              <span className="seg-caso-nombre">{s.estudiante}</span>
              <span className={`badge-caso-estado ${s.estado === 'Abierto' ? 'badge-caso-estado--abierto' : 'badge-caso-estado--cerrado'}`}>
                {s.estado}
              </span>
            </div>
            <div className="seg-caso-meta">{s.asignatura} — {s.fecha}</div>
            <div className="seg-caso-desc">{s.descripcion}</div>
            {s.observacion && (
              <div className="seg-caso-obs">
                <i className="bi bi-check-circle"></i>{s.observacion}
              </div>
            )}
          </div>
          <button
            className="btn-registrar"
            onClick={() => { setSeleccionado(s); setObservacion(s.observacion || ''); }}
          >
            <i className="bi bi-pencil"></i> {s.observacion ? 'Actualizar' : 'Registrar'}
          </button>
        </div>
      ))}
 
      <div className="form-actions">
        <button type="button" className="btn-form cancelar" onClick={onCerrar}>Cerrar</button>
      </div>
    </div>
  );
}