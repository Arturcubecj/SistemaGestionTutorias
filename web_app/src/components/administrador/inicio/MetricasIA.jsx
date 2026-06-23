export default function MetricasIA({ onCancelar }) {
  const metricas = [
    { label: 'Consultas totales', valor: '128', icono: 'bi-chat-dots', color: '#6366f1' },
    { label: 'Resueltas por IA', valor: '94', icono: 'bi-check-circle', color: '#22c55e' },
    { label: 'Escaladas a docente', valor: '21', icono: 'bi-person-check', color: '#f59e0b' },
    { label: 'Sin respuesta', valor: '13', icono: 'bi-x-circle', color: '#ef4444' },
  ];

  const recientes = [
    { usuario: 'Ana Torres', pregunta: '¿Cuáles son los horarios de tutoría?', estado: 'Resuelta', fecha: '2026-06-20' },
    { usuario: 'Luis Pérez', pregunta: '¿Cómo cancelo una tutoría?', estado: 'Resuelta', fecha: '2026-06-19' },
    { usuario: 'María Gómez', pregunta: '¿Puedo cambiar de docente?', estado: 'Escalada', fecha: '2026-06-18' },
    { usuario: 'Jorge Lema', pregunta: '¿Qué pasa si no asisto?', estado: 'Sin respuesta', fecha: '2026-06-17' },
  ];

  const colorEstado = { Resuelta: '#22c55e', Escalada: '#f59e0b', 'Sin respuesta': '#ef4444' };

  return (
    <div>
      {/* Tarjetas resumen */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        {metricas.map((m, i) => (
          <div key={i} style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              background: m.color + '20',
              color: m.color,
              borderRadius: '8px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem'
            }}>
              <i className={`bi ${m.icono}`}></i>
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>{m.valor}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{m.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Consultas recientes */}
      <h4 style={{ margin: '0 0 12px', color: '#1e293b', fontSize: '0.95rem' }}>Consultas recientes</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
        <thead>
          <tr style={{ background: '#f1f5f9', color: '#475569' }}>
            <th style={thStyle}>Usuario</th>
            <th style={thStyle}>Pregunta</th>
            <th style={thStyle}>Estado</th>
            <th style={thStyle}>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {recientes.map((r, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={tdStyle}>{r.usuario}</td>
              <td style={{ ...tdStyle, color: '#64748b' }}>{r.pregunta}</td>
              <td style={tdStyle}>
                <span style={{
                  background: colorEstado[r.estado] + '20',
                  color: colorEstado[r.estado],
                  padding: '2px 8px',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '0.78rem'
                }}>
                  {r.estado}
                </span>
              </td>
              <td style={{ ...tdStyle, color: '#94a3b8' }}>{r.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form-actions" style={{ marginTop: '20px' }}>
        <button type="button" className="btn-form cancelar" onClick={onCancelar}>Cerrar</button>
      </div>
    </div>
  );
}

const thStyle = { padding: '10px 12px', textAlign: 'left', fontWeight: 600 };
const tdStyle = { padding: '10px 12px', color: '#334155' };