export default function EliminarDocente({
  docente,
  onConfirmar,
  onCancelar
}) {
  return (
    <div className="eliminar-docente-container">
      <i className="bi bi-exclamation-triangle-fill eliminar-docente-icon"></i>

      <p className="eliminar-docente-text">
        ¿Estás seguro de que deseas eliminar al docente
      </p>

      <strong className="eliminar-docente-nombre">
        {docente?.titulo} {docente?.nombre}?
      </strong>

      <p className="eliminar-docente-text">
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
          onClick={onConfirmar}
          className="btn-eliminar-confirmar"
        >
          Sí, eliminar
        </button>
      </div>
    </div>
  );
}