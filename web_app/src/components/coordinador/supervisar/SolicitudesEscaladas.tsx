import { useState } from 'react';
 
const solicitudesIniciales = [
  { id: 1, usuario: 'Ana Torres',  pregunta: '¿Puedo cambiar de docente tutor?',                                      fecha: '2026-06-24', estado: 'Pendiente',  respuesta: '' },
  { id: 2, usuario: 'Luis Pérez',  pregunta: '¿Qué pasa si repruebo la asignatura de tutoría?',                       fecha: '2026-06-23', estado: 'Pendiente',  respuesta: '' },
  { id: 3, usuario: 'Jorge Lema',  pregunta: '¿Puedo solicitar una tutoría fuera del horario establecido?',           fecha: '2026-06-22', estado: 'Respondida', respuesta: 'Las tutorías deben realizarse en los horarios disponibles del docente. Comuníquese con coordinación para casos especiales.' },
];
 
export default function SolicitudesEscaladas({ onCerrar }) {
  const [solicitudes, setSolicitudes] = useState(solicitudesIniciales);
  const [seleccionado, setSeleccionado] = useState(null);
  const [respuesta, setRespuesta] = useState('');
 
  const guardarRespuesta = () => {
    if (!respuesta.trim()) return;
    setSolicitudes(prev => prev.map(s =>
      s.id === seleccionado.id ? { ...s, respuesta, estado: 'Respondida' } : s
    ));
    setSeleccionado(null);
    setRespuesta('');
  };
 
  /* ===== VISTA DETALLE ===== */
  if (seleccionado) {
    return (
      <div className="solicitudes-wrapper">
        <button className="btn-volver-inline" onClick={() => { setSeleccionado(null); setRespuesta(''); }}>
          <i className="bi bi-arrow-left"></i> Volver
        </button>
 
        <div className="solicitud-consulta-card">
          <div className="solicitud-consulta-label">
            <i className="bi bi-person"></i>Consulta de {seleccionado.usuario}
          </div>
          <p className="solicitud-consulta-pregunta">{seleccionado.pregunta}</p>
          <div className="solicitud-consulta-fecha">{seleccionado.fecha}</div>
        </div>
 
        {seleccionado.respuesta && (
          <div className="solicitud-respuesta-registrada">
            <div className="solicitud-respuesta-label">Respuesta registrada</div>
            <p className="solicitud-respuesta-texto">{seleccionado.respuesta}</p>
          </div>
        )}
 
        <div className="form-group">
          <label>{seleccionado.respuesta ? 'Actualizar respuesta' : 'Responder consulta'}</label>
          <textarea
            className="form-control form-control-resize"
            rows={4}
            placeholder="Escribe tu respuesta para el estudiante..."
            value={respuesta}
            onChange={e => setRespuesta(e.target.value)}
          />
        </div>
 
        <div className="form-actions">
          <button type="button" className="btn-form cancelar" onClick={() => { setSeleccionado(null); setRespuesta(''); }}>Cancelar</button>
          <button type="button" className="btn-form enviar" onClick={guardarRespuesta}>Enviar Respuesta</button>
        </div>
      </div>
    );
  }
 
  /* ===== VISTA LISTA ===== */
  return (
    <div className="solicitudes-wrapper">
      <p className="solicitudes-desc">
        Consultas que el agente de IA no pudo resolver y fueron escaladas al coordinador.
      </p>
 
      {solicitudes.map(s => (
        <div key={s.id} className="solicitud-item">
          <div className="solicitud-body">
            <div className="solicitud-title-row">
              <span className="solicitud-nombre">{s.usuario}</span>
              <span className={`badge-solicitud ${s.estado === 'Pendiente' ? 'badge-solicitud--pendiente' : 'badge-solicitud--respondida'}`}>
                {s.estado}
              </span>
            </div>
            <div className="solicitud-pregunta">{s.pregunta}</div>
            <div className="solicitud-fecha">{s.fecha}</div>
            {s.respuesta && (
              <div className="solicitud-respuesta-preview">
                <i className="bi bi-check-circle"></i>{s.respuesta}
              </div>
            )}
          </div>
          <button
            className={`btn-solicitud-accion ${s.estado === 'Pendiente' ? 'btn-solicitud-accion--pendiente' : 'btn-solicitud-accion--respondida'}`}
            onClick={() => { setSeleccionado(s); setRespuesta(s.respuesta || ''); }}
          >
            <i className={`bi ${s.estado === 'Pendiente' ? 'bi-reply' : 'bi-pencil'}`}></i>
            {s.estado === 'Pendiente' ? 'Responder' : 'Actualizar'}
          </button>
        </div>
      ))}
 
      <div className="form-actions">
        <button type="button" className="btn-form cancelar" onClick={onCerrar}>Cerrar</button>
      </div>
    </div>
  );
}