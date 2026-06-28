export default function EliminarDocumento({
  documento,
  onConfirmar,
  onCancelar,
}) {
  return (
    <div className="eliminar-documento">

      <i className="bi bi-exclamation-triangle-fill eliminar-documento-icono"></i>

      <p className="eliminar-documento-texto">
        ¿Estás seguro de que deseas eliminar el documento
      </p>

      <strong className="eliminar-documento-titulo">
        {documento?.titulo}?
      </strong>

      <p className="eliminar-documento-texto">
        El agente de IA ya no podrá usar este documento para responder consultas.
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
          className="eliminar-documento-btn"
          onClick={onConfirmar}
        >
          Sí, eliminar
        </button>
      </div>

    </div>
  );
}