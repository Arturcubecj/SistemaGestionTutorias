export default function EliminarTutoria({
  tutoria,
  onConfirmar,
  onCancelar
}) {
  return (
    <div className="eliminar-tutoria">

      <i className="bi bi-exclamation-triangle-fill eliminar-icono"></i>

      <p className="eliminar-texto">
        ¿Estás seguro de que deseas eliminar la tutoría de
      </p>

      <strong className="eliminar-dato">
        {tutoria?.estudiante} - {tutoria?.asignatura}?
      </strong>

      <p className="eliminar-texto">
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
          className="btn-eliminar-confirmar"
          onClick={onConfirmar}
        >
          Sí, eliminar
        </button>
      </div>

    </div>
  );
}