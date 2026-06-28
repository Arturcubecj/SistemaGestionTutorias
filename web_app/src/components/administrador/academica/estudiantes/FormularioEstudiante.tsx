export default function FormularioEstudiante({
  formData,
  onChange,
  onSubmit,
  onCancelar,
  textoBoton,
  carreras = []
}) {
  return (
    <form onSubmit={onSubmit} className="formulario-estudiante">
      <div className="form-group">
        <label>Nombre completo</label>
        <input
          name="nombre"
          className="form-control"
          placeholder="Ej. Ana Torres"
          value={formData.nombre}
          onChange={onChange}
          required
        />
      </div>

      <div className="estudiante-form-grid">
        <div className="form-group">
          <label>Cédula</label>
          <input
            name="cedula"
            className="form-control"
            placeholder="Ej. 0912345678"
            value={formData.cedula}
            onChange={onChange}
            maxLength={10}
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
        <label>Correo institucional</label>
        <input
          name="email"
          type="email"
          className="form-control"
          placeholder="Ej. a.torres@ug.edu.ec"
          value={formData.email}
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

          {carreras.map(c => (
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