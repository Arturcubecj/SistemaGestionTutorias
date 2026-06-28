const colorCategoria = {
  Reglamentos: { bg: '#dbeafe', color: '#1d4ed8' },
  Manuales: { bg: '#dcfce7', color: '#16a34a' },
  Políticas: { bg: '#fef9c3', color: '#a16207' },
  'Información General': { bg: '#ede9fe', color: '#7c3aed' },
  Procesos: { bg: '#f0f9ff', color: '#0369a1' },
  Otros: { bg: '#f1f5f9', color: '#475569' },
};

export default function VistaDocumento({ documento, onCerrar }) {
  if (!documento) return null;

  return (
    <div className="vista-documento">

      {/* Badges */}
      <div className="vista-documento-badges">

        <span
          className="vista-documento-badge"
          style={{
            background: colorCategoria[documento.categoria]?.bg || '#f1f5f9',
            color: colorCategoria[documento.categoria]?.color || '#475569',
          }}
        >
          {documento.categoria}
        </span>

        <span
          className={`vista-documento-badge ${
            documento.estado === 'Activo'
              ? 'badge-activo'
              : 'badge-inactivo'
          }`}
        >
          {documento.estado}
        </span>

        <span className="vista-documento-fecha">
          <i className="bi bi-calendar3"></i>
          {documento.fecha}
        </span>

      </div>

      {/* Descripción */}
      <div className="vista-documento-card">

        <div className="vista-documento-titulo">
          <i className="bi bi-info-circle"></i>
          Descripción
        </div>

        <p className="vista-documento-descripcion">
          {documento.descripcion}
        </p>

      </div>

      {/* Contenido */}
      <div className="vista-documento-card">

        <div className="vista-documento-titulo">
          <i className="bi bi-file-earmark-text"></i>
          Contenido
        </div>

        <p className="vista-documento-contenido">
          {documento.contenido}
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