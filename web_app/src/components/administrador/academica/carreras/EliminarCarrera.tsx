export default function EliminarCarrera({
  carrera,
  onConfirmar,
  onCancelar
}) {
  return (
    <div className="eliminar-carrera-container">
      <i className="bi bi-exclamation-triangle-fill eliminar-carrera-icon"></i>

      <p className="eliminar-carrera-text">
        ¿Estás seguro de que deseas eliminar la carrera
      </p>

      <strong className="eliminar-carrera-nombre">
        {carrera?.nombre}?
      </strong>

      <p className="eliminar-carrera-text">
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