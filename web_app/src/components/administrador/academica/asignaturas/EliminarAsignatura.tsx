export default function EliminarAsignatura({
  asignatura,
  onConfirmar,
  onCancelar,
}) {
  return (
    <div className="eliminar-asignatura-container">
      <i className="bi bi-exclamation-triangle-fill eliminar-asignatura-icon"></i>

      <p className="eliminar-asignatura-text">
        ¿Estás seguro de que deseas eliminar la asignatura
      </p>

      <strong className="eliminar-asignatura-nombre">
        {asignatura?.nombre}?
      </strong>

      <p className="eliminar-asignatura-text">
        Esta acción no se puede deshacer.
      </p>

      <div className="form-actions">
        <button
          type="button"
          className="btn-form cancelar"
          onClick={onCancelar}
        >
          Cancelar
        </button>

        <button
          type="button"
          className="btn-form eliminar"
          onClick={onConfirmar}
        >
          Sí, eliminar
        </button>
      </div>
    </div>
  );
}
