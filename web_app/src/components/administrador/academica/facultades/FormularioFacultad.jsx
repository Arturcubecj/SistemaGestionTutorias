export default function FormularioFacultad({
  formData,
  onChange,
  onSubmit,
  onCancelar,
  textoBoton
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="formulario-facultad"
    >
      <div className="form-group">
        <label>Nombre de la Facultad</label>
        <input
          name="nombre"
          className="form-control"
          placeholder="Ej. Facultad de Ingeniería"
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
          placeholder="Ej. FCMF"
          value={formData.codigo}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Decano</label>
        <input
          name="decano"
          className="form-control"
          placeholder="Ej. Dr. Juan Pérez"
          value={formData.decano}
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