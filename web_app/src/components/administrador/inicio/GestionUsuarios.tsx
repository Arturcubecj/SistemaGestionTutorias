import { useState } from 'react';

const usuariosIniciales = [
  { id: 1, nombre: 'Ana Torres', email: 'ana.torres@ug.edu.ec', rol: 'Estudiante', estado: 'Activo' },
  { id: 2, nombre: 'Ing. Carlos Martínez', email: 'c.martinez@ug.edu.ec', rol: 'Docente', estado: 'Activo' },
  { id: 3, nombre: 'Dra. Laura Cedeño', email: 'l.cedeno@ug.edu.ec', rol: 'Docente', estado: 'Activo' },
  { id: 4, nombre: 'Jorge Lema', email: 'j.lema@ug.edu.ec', rol: 'Estudiante', estado: 'Inactivo' },
  { id: 5, nombre: 'Admin Principal', email: 'admin@ug.edu.ec', rol: 'Administrador', estado: 'Activo' },
];

export default function GestionUsuarios({ onCancelar }) {
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [filtro, setFiltro] = useState('');

  const toggleEstado = (id) => {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              estado: u.estado === 'Activo' ? 'Inactivo' : 'Activo',
            }
          : u
      )
    );
  };

  const filtrados = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      u.rol.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre o rol..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      <table className="tabla-gestion-usuarios">
        <thead>
          <tr className="tabla-header">
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody>
          {filtrados.map((u) => (
            <tr key={u.id} className="tabla-fila">
              <td>{u.nombre}</td>

              <td className="usuario-email">
                {u.email}
              </td>

              <td>
                <span
                  className={`badge-rol ${
                    u.rol === 'Estudiante'
                      ? 'badge-estudiante'
                      : u.rol === 'Docente'
                      ? 'badge-docente'
                      : 'badge-administrador'
                  }`}
                >
                  {u.rol}
                </span>
              </td>

              <td>
                <span
                  className={
                    u.estado === 'Activo'
                      ? 'estado-activo'
                      : 'estado-inactivo'
                  }
                >
                  {u.estado}
                </span>
              </td>

              <td>
                <button
                  type="button"
                  className="btn-toggle-estado"
                  onClick={() => toggleEstado(u.id)}
                >
                  {u.estado === 'Activo'
                    ? 'Desactivar'
                    : 'Activar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtrados.length === 0 && (
        <p className="sin-resultados">
          Sin resultados.
        </p>
      )}

      <div className="form-actions form-actions-usuarios">
        <button
          type="button"
          className="btn-form cancelar"
          onClick={onCancelar}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}