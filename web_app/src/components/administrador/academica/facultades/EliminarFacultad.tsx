export default function EliminarFacultad({ facultad, onConfirmar, onCancelar }) {
  return (
    <div className="eliminar-facultad-container">
      <i className="bi bi-exclamation-triangle-fill eliminar-facultad-icon"></i>

      <p className="eliminar-facultad-text">
        ¿Estás seguro de que deseas eliminar la facultad
      </p>

      <strong className="eliminar-facultad-nombre">
        {facultad?.nombre}?
      </strong>

      <p className="eliminar-facultad-text">
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