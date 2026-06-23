import { useState } from 'react';

const datos = [
  { id: 1, estudiante: 'Ana Torres', docente: 'Ing. Carlos Martínez', asignatura: 'Desarrollo Web Full Stack', fecha: '2026-06-10', estado: 'Atendida' },
  { id: 2, estudiante: 'Luis Pérez', docente: 'Dra. Laura Cedeño', asignatura: 'Bases de Datos Relacionales', fecha: '2026-06-12', estado: 'Confirmada' },
  { id: 3, estudiante: 'María Gómez', docente: 'Ing. Carlos Martínez', asignatura: 'Calidad de Software', fecha: '2026-06-15', estado: 'Pendiente' },
  { id: 4, estudiante: 'Jorge Lema', docente: 'Dra. Laura Cedeño', asignatura: 'Desarrollo Web Full Stack', fecha: '2026-06-18', estado: 'Cancelada' },
  { id: 5, estudiante: 'Carla Ríos', docente: 'Ing. Carlos Martínez', asignatura: 'Bases de Datos Relacionales', fecha: '2026-06-20', estado: 'Atendida' },
];

const colorEstado = {
  Atendida: '#22c55e',
  Confirmada: '#3b82f6',
  Pendiente: '#f59e0b',
  Cancelada: '#ef4444',
};

export default function ReporteTutorias({ onCancelar }) {
  const [filtro, setFiltro] = useState('');

  const datosFiltrados = datos.filter(d =>
    d.estudiante.toLowerCase().includes(filtro.toLowerCase()) ||
    d.docente.toLowerCase().includes(filtro.toLowerCase()) ||
    d.asignatura.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por estudiante, docente o asignatura..."
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', marginTop: '8px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9', color: '#475569' }}>
            <th style={thStyle}>Estudiante</th>
            <th style={thStyle}>Docente</th>
            <th style={thStyle}>Asignatura</th>
            <th style={thStyle}>Fecha</th>
            <th style={thStyle}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.map(d => (
            <tr key={d.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={tdStyle}>{d.estudiante}</td>
              <td style={tdStyle}>{d.docente}</td>
              <td style={tdStyle}>{d.asignatura}</td>
              <td style={tdStyle}>{d.fecha}</td>
              <td style={tdStyle}>
                <span style={{
                  background: colorEstado[d.estado] + '20',
                  color: colorEstado[d.estado],
                  padding: '2px 10px',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '0.8rem'
                }}>
                  {d.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {datosFiltrados.length === 0 && (
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