export default function FormularioParalelo({
  formData,
  onChange,
  onSubmit,
  onCancelar,
  textoBoton,
  asignaturas = [],
  docentes = [],
  periodos = [],
}) {
  return (
    <form onSubmit={onSubmit} className="formulario-estudiante">
      <div className="form-group">
        <label>Nombre del paralelo</label>
        <input
          name="nombre"
          className="form-control"
          placeholder="Ej. Paralelo A"
          value={formData.nombre}
          onChange={onChange}
          required
        />
      </div>

      <div className="estudiante-form-grid">
        <div className="form-group">
          <label>Asignatura</label>
          <select
            name="asignatura"
            className="form-control"
            value={formData.asignatura}
            onChange={onChange}
            required
          >
            <option value="">Selecciona una asignatura</option>
            {asignaturas.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Periodo Académico</label>
          <select
            name="periodo"
            className="form-control"
            value={formData.periodo}
            onChange={onChange}
            required
          >
            <option value="">Selecciona un periodo</option>
            {periodos.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Docente responsable</label>
        <select
          name="docente"
          className="form-control"
          value={formData.docente}
          onChange={onChange
          }
          required
        >
          <option value="">Selecciona un docente</option>
          {docentes.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div className="estudiante-form-grid">
        <div className="form-group">
          <label>Capacidad máxima</label>
          <input
            name="capacidad"
            type="number"
            min="1"
            className="form-control"
            placeholder="Ej. 35"
            value={formData.capacidad}
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
      </div>

      <div className="form-actions">
        <button type="button" className="btn-form cancelar" onClick={onCancelar}>
          Cancelar
        </button>
        <button type="submit" className="btn-form enviar">
          {textoBoton}
        </button>
      </div>
    </form>
  );
}