import { useState } from 'react';

export default function CambiarRol({ usuario, onConfirmar, onCancelar }) {
  const [nuevoRol, setNuevoRol] = useState(usuario?.rol || 'Docente');

  if (!usuario) return null;

  return (
    <div className="cambiar-rol-wrapper">
      <div className="cambiar-rol-usuario">
        <i className="bi bi-person-badge cambiar-rol-icono"></i>
        <div>
          <div className="cambiar-rol-nombre">{usuario.nombre}</div>
          <div className="cambiar-rol-cuenta">{usuario.usuario}</div>
        </div>
      </div>
      <div className="form-group">
        <label>Nuevo rol</label>
        <select className="form-control" value={nuevoRol} onChange={e => setNuevoRol(e.target.value)}>
          <option value="Docente">Docente</option>
          <option value="Coordinador">Coordinador</option>
        </select>
      </div>
      <div className="cambiar-rol-aviso">
        <i className="bi bi-info-circle"></i>
        Solo se puede alternar entre <strong>Docente</strong> y <strong>Coordinador</strong>.
      </div>
      <div className="form-actions">
        <button type="button" className="btn-form cancelar" onClick={onCancelar}>Cancelar</button>
        <button type="button" className="btn-form enviar" onClick={() => onConfirmar(nuevoRol)}>Guardar Cambio</button>
      </div>
    </div>
  );
}