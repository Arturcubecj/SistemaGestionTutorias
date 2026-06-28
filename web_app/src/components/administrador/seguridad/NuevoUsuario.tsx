import { useState } from 'react';
 
export default function NuevoUsuario({ estudiantes, docentes, onGuardar, onCancelar }) {
  const [paso, setPaso] = useState(1);
  const [tipo, setTipo] = useState(null);
  const [seleccionId, setSeleccionId] = useState('');
  const [formAdmin, setFormAdmin] = useState({ nombre: '', usuario: '', contrasena: '', confirmar: '' });
  const [errorAdmin, setErrorAdmin] = useState('');
 
  const tipos = [
    { id: 'Estudiante',    icono: 'bi-person',       variante: 'estudiante',    descripcion: 'Vincula un estudiante registrado' },
    { id: 'Docente',       icono: 'bi-person-badge',  variante: 'docente',       descripcion: 'Vincula un docente registrado' },
    { id: 'Administrador', icono: 'bi-shield-lock',   variante: 'administrador', descripcion: 'Crea una cuenta de administrador' },
  ];
 
  const elegirTipo = (t) => {
    setTipo(t);
    setPaso(2);
    setSeleccionId('');
    setFormAdmin({ nombre: '', usuario: '', contrasena: '', confirmar: '' });
    setErrorAdmin('');
  };
 
  const manejarGuardar = () => {
    if (tipo === 'Administrador') {
      if (!formAdmin.nombre || !formAdmin.usuario || !formAdmin.contrasena) {
        setErrorAdmin('Todos los campos son obligatorios.'); return;
      }
      if (formAdmin.contrasena !== formAdmin.confirmar) {
        setErrorAdmin('Las contraseñas no coinciden.'); return;
      }
      onGuardar({ nombre: formAdmin.nombre, usuario: formAdmin.usuario, rol: 'Administrador', estado: 'Activo' });
    } else {
      if (!seleccionId) return;
      const lista = tipo === 'Estudiante' ? estudiantes : docentes;
      const persona = lista.find(p => p.id === parseInt(seleccionId));
      if (!persona) return;
      onGuardar({ nombre: persona.nombre, usuario: persona.cedula, rol: tipo, estado: 'Activo' });
    }
  };
 
  return (
    <div>
      {/* Paso 1: elegir tipo */}
      {paso === 1 && (
        <div>
          <p className="nu-intro">¿Para quién deseas crear la cuenta?</p>
          <div className="nu-tipos-list">
            {tipos.map(t => (
              <button
                key={t.id}
                onClick={() => elegirTipo(t.id)}
                className={`nu-tipo-btn nu-tipo-btn--${t.variante}`}
              >
                <div className={`nu-tipo-icono nu-tipo-icono--${t.variante}`}>
                  <i className={`bi ${t.icono}`}></i>
                </div>
                <div>
                  <div className="nu-tipo-label">{t.id}</div>
                  <div className="nu-tipo-desc">{t.descripcion}</div>
                </div>
                <i className="bi bi-chevron-right nu-tipo-chevron"></i>
              </button>
            ))}
          </div>
          <div className="form-actions nu-paso1-actions">
            <button type="button" className="btn-form cancelar" onClick={onCancelar}>Cancelar</button>
          </div>
        </div>
      )}
 
      {/* Paso 2: datos según tipo */}
      {paso === 2 && (
        <div>
          <button className="nu-btn-volver" onClick={() => setPaso(1)}>
            <i className="bi bi-arrow-left"></i> Volver
          </button>
 
          {/* Estudiante o Docente */}
          {(tipo === 'Estudiante' || tipo === 'Docente') && (
            <div className="nu-paso">
              <div className="nu-aviso nu-aviso--info">
                <i className="bi bi-info-circle"></i>
                Se creará la cuenta usando la <strong>cédula como usuario y contraseña</strong>. El usuario podrá cambiarla al ingresar.
              </div>
              <div className="form-group">
                <label>Selecciona el {tipo}</label>
                <select className="form-control" value={seleccionId} onChange={e => setSeleccionId(e.target.value)} required>
                  <option value="">Selecciona una opción</option>
                  {(tipo === 'Estudiante' ? estudiantes : docentes).map(p => (
                    <option key={p.id} value={p.id}>{p.nombre} — {p.cedula}</option>
                  ))}
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-form cancelar" onClick={onCancelar}>Cancelar</button>
                <button type="button" className="btn-form enviar" onClick={manejarGuardar} disabled={!seleccionId}>
                  Crear Cuenta
                </button>
              </div>
            </div>
          )}
 
          {/* Administrador */}
          {tipo === 'Administrador' && (
            <div className="nu-paso">
              <div className="nu-aviso nu-aviso--advertencia">
                <i className="bi bi-exclamation-triangle"></i>
                Estás creando una cuenta con permisos de <strong>Administrador</strong>. Define una contraseña segura.
              </div>
              <div className="form-group">
                <label>Nombre completo</label>
                <input name="nombre" className="form-control" placeholder="Ej. Juan Pérez" value={formAdmin.nombre} onChange={e => setFormAdmin(p => ({ ...p, nombre: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Correo / Usuario</label>
                <input name="usuario" className="form-control" placeholder="Ej. admin2@ug.edu.ec" value={formAdmin.usuario} onChange={e => setFormAdmin(p => ({ ...p, usuario: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input name="contrasena" type="password" className="form-control" placeholder="Mínimo 8 caracteres" value={formAdmin.contrasena} onChange={e => setFormAdmin(p => ({ ...p, contrasena: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Confirmar contraseña</label>
                <input name="confirmar" type="password" className="form-control" placeholder="Repite la contraseña" value={formAdmin.confirmar} onChange={e => setFormAdmin(p => ({ ...p, confirmar: e.target.value }))} />
              </div>
              {errorAdmin && (
                <div className="nu-error">
                  <i className="bi bi-x-circle"></i>{errorAdmin}
                </div>
              )}
              <div className="form-actions">
                <button type="button" className="btn-form cancelar" onClick={onCancelar}>Cancelar</button>
                <button type="button" className="btn-form enviar" onClick={manejarGuardar}>Crear Cuenta</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}