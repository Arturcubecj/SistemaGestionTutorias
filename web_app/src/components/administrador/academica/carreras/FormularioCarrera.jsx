export default function FormularioCarrera({
  formData,
  onChange,
  onSubmit,
  onCancelar,
  textoBoton,
  facultades = []
}) {
  return (
    <form onSubmit={onSubmit} className="formulario-carrera">
      <div className="form-group">
        <label>Nombre de la Carrera</label>
        <input
          name="nombre"
          className="form-control"
          placeholder="Ej. Ingeniería en Software"
          value={formData.nombre}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Código</label>
        <input
          name="codigo"
          className="form-control"
          placeholder="Ej. ISW"
          value={formData.codigo}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Facultad</label>
        <select
          name="facultad"
          className="form-control"
          value={formData.facultad}
          onChange={onChange}
          required
        >
          <option value="">Selecciona una facultad</option>

          {facultades.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Duración (años)</label>
        <input
          name="duracion"
          type="number"
          min="1"
          max="10"
          className="form-control"
          placeholder="Ej. 5"
          value={formData.duracion}
          onChange={onChange}
          required
        />
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