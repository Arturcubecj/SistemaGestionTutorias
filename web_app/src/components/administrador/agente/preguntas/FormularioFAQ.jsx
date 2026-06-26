export default function FormularioFAQ({
  formData,
  onChange,
  onSubmit,
  onCancelar,
  textoBoton,
  categorias = [],
}) {
  return (
    <form onSubmit={onSubmit} className="formulario-faq">

      <div className="form-group">
        <label>Pregunta</label>
        <input
          name="pregunta"
          className="form-control"
          placeholder="Ej. ¿Cómo puedo solicitar una tutoría?"
          value={formData.pregunta}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Respuesta</label>
        <textarea
          name="respuesta"
          className="form-control faq-textarea"
          placeholder="Escribe la respuesta que el agente de IA brindará..."
          value={formData.respuesta}
          onChange={onChange}
          required
          rows={4}
        />
      </div>

      <div className="faq-grid">

        <div className="form-group">
          <label>Categoría</label>
          <select
            name="categoria"
            className="form-control"
            value={formData.categoria}
            onChange={onChange}
          >
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Estado</label>
          <select
            name="estado"
            className="form-control"
            value={formData.estado}
            onChange={onChange}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn-form cancelar"
          onClick={onCancelar}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="btn-form enviar"
        >
          {textoBoton}
        </button>
      </div>

    </form>
  );
}