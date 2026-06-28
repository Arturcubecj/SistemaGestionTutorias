export default function EliminarFAQ({
  faq,
  onConfirmar,
  onCancelar,
}) {
  return (
    <div className="eliminar-faq">

      <i className="bi bi-exclamation-triangle-fill eliminar-faq-icono"></i>

      <p className="eliminar-faq-texto">
        ¿Estás seguro de que deseas eliminar la pregunta
      </p>

      <strong className="eliminar-faq-pregunta">
        {faq?.pregunta}?
      </strong>

      <p className="eliminar-faq-texto">
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
          className="btn-eliminar-faq"
          onClick={onConfirmar}
        >
          Sí, eliminar
        </button>
      </div>

    </div>
  );
}