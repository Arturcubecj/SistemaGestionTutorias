export default function FormularioDocente({
  formData,
  onChange,
  onSubmit,
  onCancelar,
  textoBoton,
  facultades = [],
  titulos = []
}) {
  return (
    <form onSubmit={onSubmit} className="formulario-docente">
      <div className="form-row-titulo">
        <div className="form-group">
          <label>Título</label>
          <select
            name="titulo"
            className="form-control"
            value={formData.titulo}
            onChange={onChange}
          >
            {titulos.map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Nombre completo</label>
          <input
            name="nombre"
            className="form-control"
            placeholder="Ej. Carlos Martínez"
            value={formData.nombre}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Correo institucional</label>
        <input
          name="email"
          type="email"
          className="form-control"
          placeholder="Ej. c.martinez@ug.edu.ec"
          value={formData.email}
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

          {facultades.map(f => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Especialidad</label>
        <input
          name="especialidad"
          className="form-control"
          placeholder="Ej. Desarrollo de Software"
          value={formData.especialidad}
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

        <button type="submit" className="btn-form enviar">
          {textoBoton}
        </button>
      </div>
    </form>
  );
}