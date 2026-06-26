export default function FormularioDocumento({
  formData,
  onChange,
  onSubmit,
  onCancelar,
  textoBoton,
  categorias = [],
}) {
  return (
    <form onSubmit={onSubmit} className="formulario-documento">

      <div className="form-group">
        <label>Título</label>
        <input
          name="titulo"
          className="form-control"
          placeholder="Ej. Reglamento de Tutorías Académicas"
          value={formData.titulo}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <input
          name="descripcion"
          className="form-control"
          placeholder="Breve descripción del documento..."
          value={formData.descripcion}
          onChange={onChange}
          required
        />
      </div>

      <div className="formulario-documento-grid">

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

      <div className="form-group">
        <label>Contenido</label>

        <textarea
          name="contenido"
          className="form-control formulario-documento-textarea"
          placeholder="Escribe el contenido que el agente de IA usará para responder consultas..."
          value={formData.contenido}
          onChange={onChange}
          required
          rows={6}
        />
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