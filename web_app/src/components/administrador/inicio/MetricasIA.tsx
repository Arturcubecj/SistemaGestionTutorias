export default function MetricasIA({ onCancelar }) {
  const metricas = [
    {
      label: 'Consultas totales',
      valor: '128',
      icono: 'bi-chat-dots',
      color: 'consultas'
    },
    {
      label: 'Resueltas por IA',
      valor: '94',
      icono: 'bi-check-circle',
      color: 'resueltas'
    },
    {
      label: 'Escaladas a docente',
      valor: '21',
      icono: 'bi-person-check',
      color: 'escaladas'
    },
    {
      label: 'Sin respuesta',
      valor: '13',
      icono: 'bi-x-circle',
      color: 'sin-respuesta'
    },
  ];

  const recientes = [
    {
      usuario: 'Ana Torres',
      pregunta: '¿Cuáles son los horarios de tutoría?',
      estado: 'Resuelta',
      fecha: '2026-06-20'
    },
    {
      usuario: 'Luis Pérez',
      pregunta: '¿Cómo cancelo una tutoría?',
      estado: 'Resuelta',
      fecha: '2026-06-19'
    },
    {
      usuario: 'María Gómez',
      pregunta: '¿Puedo cambiar de docente?',
      estado: 'Escalada',
      fecha: '2026-06-18'
    },
    {
      usuario: 'Jorge Lema',
      pregunta: '¿Qué pasa si no asisto?',
      estado: 'Sin respuesta',
      fecha: '2026-06-17'
    },
  ];

  return (
    <div>
      <div className="metricas-grid">
        {metricas.map((m, i) => (
          <div key={i} className="metrica-card">
            <div className={`metrica-icono ${m.color}`}>
              <i className={`bi ${m.icono}`}></i>
            </div>

            <div>
              <div className="metrica-valor">
                {m.valor}
              </div>

              <div className="metrica-label">
                {m.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h4 className="metricas-titulo">
        Consultas recientes
      </h4>

      <table className="tabla-metricas">
        <thead>
          <tr className="tabla-metricas-header">
            <th>Usuario</th>
            <th>Pregunta</th>
            <th>Estado</th>
            <th>Fecha</th>
          </tr>
        </thead>

        <tbody>
          {recientes.map((r, i) => (
            <tr key={i} className="tabla-metricas-fila">
              <td>{r.usuario}</td>

              <td className="pregunta-texto">
                {r.pregunta}
              </td>

              <td>
                <span
                  className={`estado-badge ${
                    r.estado === 'Resuelta'
                      ? 'estado-resuelta'
                      : r.estado === 'Escalada'
                      ? 'estado-escalada'
                      : 'estado-sin-respuesta'
                  }`}
                >
                  {r.estado}
                </span>
              </td>

              <td className="fecha-texto">
                {r.fecha}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form-actions metricas-actions">
        <button
          type="button"
          className="btn-form cancelar"
          onClick={onCancelar}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}