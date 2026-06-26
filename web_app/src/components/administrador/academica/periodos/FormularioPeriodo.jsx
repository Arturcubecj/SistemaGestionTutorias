export default function FormularioPeriodo({
  formData,
  onChange,
  onSubmit,
  onCancelar,
  textoBoton
}) {
  return (
    <form onSubmit={onSubmit} className="formulario-periodo">
      <div className="form-group">
        <label>Nombre del Periodo</label>
        <input
          name="nombre"
          className="form-control"
          placeholder="Ej. Periodo 2026-2027 CI"
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
          placeholder="Ej. 2026-CI"
          value={formData.codigo}
          onChange={onChange}
          required
        />
      </div>

      <div className="formulario-periodo-grid">
        <div className="form-group">
          <label>Fecha de Inicio</label>
          <input
            name="fechaInicio"
            type="date"
            className="form-control"
            value={formData.fechaInicio}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Fecha de Fin</label>
          <input
            name="fechaFin"
            type="date"
            className="form-control"
            value={formData.fechaFin}
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
          <option value="Planificado">Planificado</option>
          <option value="Activo">Activo</option>
          <option value="Cerrado">Cerrado</option>
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