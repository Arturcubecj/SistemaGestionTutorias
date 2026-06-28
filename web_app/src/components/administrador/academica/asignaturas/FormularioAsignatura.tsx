export default function FormularioAsignatura({
  formData,
  onChange,
  onSubmit,
  onCancelar,
  textoBoton,
  carreras = []
}) {
  return (
    <form onSubmit={onSubmit} className="formulario-asignatura">
      <div className="form-group">
        <label>Nombre de la Asignatura</label>
        <input
          name="nombre"
          className="form-control"
          placeholder="Ej. Desarrollo de Aplicaciones Web"
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
          placeholder="Ej. DAWA"
          value={formData.codigo}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Carrera</label>
        <select
          name="carrera"
          className="form-control"
          value={formData.carrera}
          onChange={onChange}
          required
        >
          <option value="">Selecciona una carrera</option>

          {carreras.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="formulario-asignatura-grid">
        <div className="form-group">
          <label>Créditos</label>
          <input
            name="creditos"
            type="number"
            min="1"
            max="10"
            className="form-control"
            placeholder="Ej. 4"
            value={formData.creditos}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Nivel</label>
          <input
            name="nivel"
            type="number"
            min="1"
            max="10"
            className="form-control"
            placeholder="Ej. 7"
            value={formData.nivel}
            onChange={onChange}
            required
          />
        </div>
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