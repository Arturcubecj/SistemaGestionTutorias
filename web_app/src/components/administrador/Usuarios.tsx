import { useState } from 'react';
import Modal from '../Modal';
import NuevoUsuario from './seguridad/NuevoUsuario';
import EliminarUsuario from './seguridad/EliminarUsuario';
import CambiarRol from './seguridad/CambiarRol';
 
const usuariosIniciales = [
  { id: 1, nombre: 'Admin Principal', usuario: 'admin@ug.edu.ec', rol: 'Administrador', estado: 'Activo', fechaCreacion: '2026-01-01' },
  { id: 2, nombre: 'Ing. Carlos Martínez', usuario: '0912345670', rol: 'Docente', estado: 'Activo', fechaCreacion: '2026-05-10' },
  { id: 3, nombre: 'Dra. Laura Cedeño', usuario: '0923456781', rol: 'Coordinador', estado: 'Activo', fechaCreacion: '2026-05-10' },
  { id: 4, nombre: 'Ana Torres', usuario: '0912345678', rol: 'Estudiante', estado: 'Activo', fechaCreacion: '2026-05-12' },
  { id: 5, nombre: 'Luis Pérez', usuario: '0923456789', rol: 'Estudiante', estado: 'Inactivo', fechaCreacion: '2026-05-12' },
];
 
const estudiantesDisponibles = [
  { id: 10, nombre: 'María Gómez', cedula: '0934567890' },
  { id: 11, nombre: 'Jorge Lema', cedula: '0945678901' },
  { id: 12, nombre: 'Carla Ríos', cedula: '0956789012' },
];
 
const docentesDisponibles = [
  { id: 20, nombre: 'Mg. Juan Mora', cedula: '0967890123' },
  { id: 21, nombre: 'Ing. Sofía Reyes', cedula: '0978901234' },
];
 
const rolCssClass = {
  Administrador: 'badge-rol--administrador',
  Coordinador:   'badge-rol--coordinador',
  Docente:       'badge-rol--docente',
  Estudiante:    'badge-rol--estudiante',
};
 
const filtroRolCssClass = {
  Todos:         'active--todos',
  Administrador: 'active--administrador',
  Coordinador:   'active--coordinador',
  Docente:       'active--docente',
  Estudiante:    'active--estudiante',
};
 
export default function SeguridadPage() {
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [busqueda, setBusqueda] = useState('');
  const [filtroRol, setFiltroRol] = useState('Todos');
  const [modalAbierto, setModalAbierto] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);
 
  const roles = ['Todos', 'Administrador', 'Coordinador', 'Docente', 'Estudiante'];
 
  const usuariosFiltrados = usuarios.filter(u => {
    const coincideBusqueda =
      u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.usuario.toLowerCase().includes(busqueda.toLowerCase());
    const coincideRol = filtroRol === 'Todos' || u.rol === filtroRol;
    return coincideBusqueda && coincideRol;
  });
 
  const cerrarModal = () => { setModalAbierto(null); setSeleccionado(null); };
  const abrirCambiarRol = (u) => { setSeleccionado(u); setModalAbierto('cambiarRol'); };
  const abrirEliminar = (u) => { setSeleccionado(u); setModalAbierto('eliminar'); };
 
  const manejarNuevoUsuario = (nuevoUsuario) => {
    setUsuarios(prev => [...prev, { id: Date.now(), ...nuevoUsuario, fechaCreacion: new Date().toISOString().split('T')[0] }]);
    cerrarModal();
  };
 
  const manejarCambiarRol = (nuevoRol) => {
    setUsuarios(prev => prev.map(u => u.id === seleccionado.id ? { ...u, rol: nuevoRol } : u));
    cerrarModal();
  };
 
  const manejarEliminar = () => {
    setUsuarios(prev => prev.filter(u => u.id !== seleccionado.id));
    cerrarModal();
  };
 
  const toggleEstado = (id) => {
    setUsuarios(prev => prev.map(u => u.id === id ? { ...u, estado: u.estado === 'Activo' ? 'Inactivo' : 'Activo' } : u));
  };
 
  return (
    <div className="dashboard-layout">
      <div className="dashboard-viewport">
        <main className="main-content-body">
 
          {/* Encabezado */}
          <div className="seg-header">
            <div>
              <h2 className="seg-title">Usuarios</h2>
              <p className="seg-subtitle">Gestión de cuentas de acceso al sistema.</p>
            </div>
            <button className="btn-nuevo-usuario" onClick={() => setModalAbierto('nuevo')}>
              <i className="bi bi-plus-lg"></i> Nuevo Usuario
            </button>
          </div>
 
          {/* Toolbar */}
          <div className="seg-toolbar">
            <div className="filtros-rol">
              {roles.map(rol => (
                <button
                  key={rol}
                  onClick={() => setFiltroRol(rol)}
                  className={`filtro-rol-btn ${filtroRol === rol ? filtroRolCssClass[rol] : ''}`}
                >
                  {rol}
                </button>
              ))}
            </div>
            <div className="search-box">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Buscar usuario..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
 
          {/* Tabla */}
          <div className="table-wrapper">
            <table className="report-table">
              <thead>
                <tr>
                  {['#', 'Nombre', 'Usuario', 'Rol', 'Estado', 'Fecha Creación', 'Acciones'].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.length > 0 ? usuariosFiltrados.map((u, i) => (
                  <tr key={u.id}>
                    <td>{i + 1}</td>
                    <td className="td-bold">{u.nombre}</td>
                    <td className="td-muted">{u.usuario}</td>
                    <td>
                      <span className={`badge ${rolCssClass[u.rol]}`}>{u.rol}</span>
                    </td>
                    <td>
                      <span className={`badge ${u.estado === 'Activo' ? 'badge-estado--activo' : 'badge-estado--inactivo'}`}>
                        {u.estado}
                      </span>
                    </td>
                    <td className="td-fecha">{u.fechaCreacion}</td>
                    <td>
                      <div className="acciones-cell">
                        {u.rol === 'Docente' || u.rol === 'Coordinador' ? (
                          <button
                            className="btn-accion btn-accion--rol"
                            title="Cambiar rol"
                            onClick={() => abrirCambiarRol(u)}
                          >
                            <i className="bi bi-arrow-left-right"></i>
                          </button>
                        ) : (
                          <div className="btn-accion-placeholder"></div>
                        )}
                        <button
                          className={`btn-accion ${u.estado === 'Activo' ? 'btn-accion--activo' : 'btn-accion--inactivo'}`}
                          title={u.estado === 'Activo' ? 'Desactivar' : 'Activar'}
                          onClick={() => toggleEstado(u.id)}
                        >
                          <i className={`bi ${u.estado === 'Activo' ? 'bi-pause-circle' : 'bi-play-circle'}`}></i>
                        </button>
                        <button
                          className="btn-accion btn-accion--eliminar"
                          title="Eliminar"
                          onClick={() => abrirEliminar(u)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr className="empty-row">
                    <td colSpan={7}>No se encontraron usuarios.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
 
        </main>
      </div>
 
      <Modal isOpen={modalAbierto === 'nuevo'} onClose={cerrarModal} titulo="Nuevo Usuario">
        <NuevoUsuario estudiantes={estudiantesDisponibles} docentes={docentesDisponibles} onGuardar={manejarNuevoUsuario} onCancelar={cerrarModal} />
      </Modal>
 
      <Modal isOpen={modalAbierto === 'cambiarRol'} onClose={cerrarModal} titulo="Cambiar Rol">
        <CambiarRol usuario={seleccionado} onConfirmar={manejarCambiarRol} onCancelar={cerrarModal} />
      </Modal>
 
      <Modal isOpen={modalAbierto === 'eliminar'} onClose={cerrarModal} titulo="Eliminar Usuario">
        <EliminarUsuario usuario={seleccionado} onConfirmar={manejarEliminar} onCancelar={cerrarModal} />
      </Modal>
    </div>
  );
}