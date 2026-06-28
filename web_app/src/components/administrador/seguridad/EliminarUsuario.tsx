export default function EliminarUsuario({ usuario, onConfirmar, onCancelar }) {
  return (
    <div className="eliminar-wrapper">
      <i className="bi bi-exclamation-triangle-fill eliminar-icono"></i>
      <p className="eliminar-texto">¿Estás seguro de que deseas eliminar al usuario</p>
      <strong className="eliminar-nombre">{usuario?.nombre}?</strong>
      <p className="eliminar-texto">Esta acción no se puede deshacer.</p>
      <div className="form-actions">
        <button type="button" className="btn-form cancelar" onClick={onCancelar}>Cancelar</button>
        <button type="button" className="btn-form eliminar" onClick={onConfirmar}>Sí, eliminar</button>
      </div>
    </div>
  );
}