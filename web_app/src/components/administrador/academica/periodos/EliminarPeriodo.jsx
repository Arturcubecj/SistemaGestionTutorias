export default function EliminarPeriodo({
  periodo,
  onConfirmar,
  onCancelar
}) {
  return (
    <div className="eliminar-periodo-container">
      <i className="bi bi-exclamation-triangle-fill eliminar-periodo-icon"></i>

      <p className="eliminar-periodo-text">
        ¿Estás seguro de que deseas eliminar el periodo
      </p>

      <strong className="eliminar-periodo-nombre">
        {periodo?.nombre}?
      </strong>

      <p className="eliminar-periodo-text">
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