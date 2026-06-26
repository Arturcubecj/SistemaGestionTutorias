export default function EliminarParalelo({ paralelo, onConfirmar, onCancelar }) {
  return (
    <div className="eliminar-estudiante-container">
      <i className="bi bi-exclamation-triangle-fill eliminar-estudiante-icon"></i>

      <p className="eliminar-estudiante-text">
        ¿Estás seguro de que deseas eliminar el paralelo
      </p>

      <strong className="eliminar-estudiante-nombre">
        {paralelo?.nombre}?
      </strong>

      <p className="eliminar-estudiante-text">
        Esta acción no se puede deshacer.
      </p>

      <div className="form-actions">
        <button type="button" className="btn-form cancelar" onClick={onCancelar}>
          Cancelar
        </button>
        <button
          type="button"
          onClick={onConfirmar}
          className="btn-confirmar-eliminar-estudiante"
        >
          Sí, eliminar
        </button>
      </div>
    </div>
  );
}