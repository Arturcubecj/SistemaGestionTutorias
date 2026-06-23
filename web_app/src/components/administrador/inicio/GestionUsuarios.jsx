import { useState } from 'react';

const usuariosIniciales = [
  { id: 1, nombre: 'Ana Torres', email: 'ana.torres@ug.edu.ec', rol: 'Estudiante', estado: 'Activo' },
  { id: 2, nombre: 'Ing. Carlos Martínez', email: 'c.martinez@ug.edu.ec', rol: 'Docente', estado: 'Activo' },
  { id: 3, nombre: 'Dra. Laura Cedeño', email: 'l.cedeno@ug.edu.ec', rol: 'Docente', estado: 'Activo' },
  { id: 4, nombre: 'Jorge Lema', email: 'j.lema@ug.edu.ec', rol: 'Estudiante', estado: 'Inactivo' },
  { id: 5, nombre: 'Admin Principal', email: 'admin@ug.edu.ec', rol: 'Administrador', estado: 'Activo' },
];

const colorRol = {
  Estudiante: '#6366f1',
  Docente: '#0ea5e9',
  Administrador: '#d4af37',
};

export default function GestionUsuarios({ onCancelar }) {
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [filtro, setFiltro] = useState('');

  const toggleEstado = (id) => {
    setUsuarios(prev => prev.map(u =>
      u.id === id ? { ...u, estado: u.estado === 'Activo' ? 'Inactivo' : 'Activo' } : u
    ));
  };

  const filtrados = usuarios.filter(u =>
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
          onChange={e => setFiltro(e.target.value)}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', marginTop: '8px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9', color: '#475569' }}>
            <th style={thStyle}>Nombre</th>
            <th style={thStyle}>Correo</th>
            <th style={thStyle}>Rol</th>
            <th style={thStyle}>Estado</th>
            <th style={thStyle}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map(u => (
            <tr key={u.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={tdStyle}>{u.nombre}</td>
              <td style={{ ...tdStyle, color: '#64748b', fontSize: '0.82rem' }}>{u.email}</td>
              <td style={tdStyle}>
                <span style={{
                  background: (colorRol[u.rol] || '#94a3b8') + '20',
                  color: colorRol[u.rol] || '#94a3b8',
                  padding: '2px 10px',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '0.8rem'
                }}>
                  {u.rol}
                </span>
              </td>
              <td style={tdStyle}>
                <span style={{ color: u.estado === 'Activo' ? '#22c55e' : '#ef4444', fontWeight: 600 }}>
                  {u.estado}
                </span>
              </td>
              <td style={tdStyle}>
                <button
                  onClick={() => toggleEstado(u.id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    background: 'white',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    color: '#334155'
                  }}
                >
                  {u.estado === 'Activo' ? 'Desactivar' : 'Activar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtrados.length === 0 && (
        <p style={{ color: '#94a3b8', textAlign: 'center', marginTop: '20px' }}>Sin resultados.</p>
      )}

      <div className="form-actions" style={{ marginTop: '20px' }}>
        <button type="button" className="btn-form cancelar" onClick={onCancelar}>Cerrar</button>
      </div>
    </div>
  );
}

const thStyle = { padding: '10px 12px', textAlign: 'left', fontWeight: 600 };
const tdStyle = { padding: '10px 12px', color: '#334155' };