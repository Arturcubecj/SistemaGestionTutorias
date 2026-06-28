import { useState } from 'react';

const datos = [
  {
    id: 1,
    estudiante: 'Ana Torres',
    docente: 'Ing. Carlos Martínez',
    asignatura: 'Desarrollo Web Full Stack',
    fecha: '2026-06-10',
    estado: 'Atendida',
  },
  {
    id: 2,
    estudiante: 'Luis Pérez',
    docente: 'Dra. Laura Cedeño',
    asignatura: 'Bases de Datos Relacionales',
    fecha: '2026-06-12',
    estado: 'Confirmada',
  },
  {
    id: 3,
    estudiante: 'María Gómez',
    docente: 'Ing. Carlos Martínez',
    asignatura: 'Calidad de Software',
    fecha: '2026-06-15',
    estado: 'Pendiente',
  },
  {
    id: 4,
    estudiante: 'Jorge Lema',
    docente: 'Dra. Laura Cedeño',
    asignatura: 'Desarrollo Web Full Stack',
    fecha: '2026-06-18',
    estado: 'Cancelada',
  },
  {
    id: 5,
    estudiante: 'Carla Ríos',
    docente: 'Ing. Carlos Martínez',
    asignatura: 'Bases de Datos Relacionales',
    fecha: '2026-06-20',
    estado: 'Atendida',
  },
];

export default function ReporteTutorias({ onCancelar }) {
  const [filtro, setFiltro] = useState('');

  const datosFiltrados = datos.filter(
    (d) =>
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
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      <table className="tabla-reporte-tutorias">
        <thead>
          <tr className="tabla-reporte-header">
            <th>Estudiante</th>
            <th>Docente</th>
            <th>Asignatura</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {datosFiltrados.map((d) => (
            <tr key={d.id} className="tabla-reporte-fila">
              <td>{d.estudiante}</td>
              <td>{d.docente}</td>
              <td>{d.asignatura}</td>
              <td>{d.fecha}</td>

              <td>
                <span
                  className={`badge-estado ${
                    d.estado === 'Atendida'
                      ? 'estado-atendida'
                      : d.estado === 'Confirmada'
                      ? 'estado-confirmada'
                      : d.estado === 'Pendiente'
                      ? 'estado-pendiente'
                      : 'estado-cancelada'
                  }`}
                >
                  {d.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {datosFiltrados.length === 0 && (
        <p className="reporte-sin-resultados">
          Sin resultados.
        </p>
      )}

      <div className="form-actions reporte-actions">
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