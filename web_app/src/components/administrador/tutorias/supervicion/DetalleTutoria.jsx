export default function DetalleTutoria({ tutoria, onCerrar }) {
  if (!tutoria) return null;

  return (
    <div className="detalle-tutoria">

      {/* Estado */}
      <div className="detalle-estado-container">
        <span
          className={`estado-badge estado-${tutoria.estado
            .toLowerCase()
            .replace(/\s+/g, '-')}`}
        >
          {tutoria.estado}
        </span>
      </div>

      {/* Información */}
      <div className="detalle-grid">
        <Campo
          label="Estudiante"
          valor={tutoria.estudiante}
          icono="bi-person"
        />

        <Campo
          label="Docente"
          valor={tutoria.docente}
          icono="bi-person-badge"
        />

        <Campo
          label="Asignatura"
          valor={tutoria.asignatura}
          icono="bi-book"
        />

        <Campo
          label="Tipo"
          valor={tutoria.tipo}
          icono="bi-people"
        />

        <Campo
          label="Fecha"
          valor={tutoria.fecha}
          icono="bi-calendar3"
        />

        <Campo
          label="Hora"
          valor={tutoria.hora}
          icono="bi-clock"
        />
      </div>

      {/* Observaciones */}
      <div className="observaciones-card">
        <div className="observaciones-title">
          <i className="bi bi-journal-text"></i>
          Observaciones del docente
        </div>

        <p
          className={`observaciones-text ${
            !tutoria.observaciones
              ? 'sin-observaciones'
              : ''
          }`}
        >
          {tutoria.observaciones ||
            'Sin observaciones registradas.'}
        </p>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn-form cancelar"
          onClick={onCerrar}
        >
          Cerrar
        </button>
      </div>

    </div>
  );
}

function Campo({ label, valor, icono }) {
  return (
    <div className="detalle-campo">

      <div className="detalle-campo-label">
        <i className={`bi ${icono}`}></i>
        {label}
      </div>

      <div className="detalle-campo-valor">
        {valor}
      </div>

    </div>
  );
}