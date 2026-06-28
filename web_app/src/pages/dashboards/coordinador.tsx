'use client';
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Modal from '../../components/Modal';

const summaryCards = [
  { label: 'Tutorías activas', valor: '12', icono: 'bi-calendar-check', colorClass: 'summary-icon--purple' },
  { label: 'Docentes activos', valor: '8',  icono: 'bi-person-badge',   colorClass: 'summary-icon--green'  },
  { label: 'Estudiantes',      valor: '145', icono: 'bi-people',         colorClass: 'summary-icon--amber'  },
  { label: 'Pendientes',       valor: '5',   icono: 'bi-hourglass-split', colorClass: 'summary-icon--red'   },
];

const tutoriasRecientes = [
  { estudiante: 'Ana Torres',  docente: 'Ing. Carlos M.', asignatura: 'DAWA', estado: 'Confirmada' },
  { estudiante: 'Luis Pérez',  docente: 'Dra. Laura C.',  asignatura: 'BDR',  estado: 'Pendiente'  },
  { estudiante: 'María Gómez', docente: 'Ing. Carlos M.', asignatura: 'CAS',  estado: 'Atendida'   },
  { estudiante: 'Jorge Lema',  docente: 'Mg. Juan M.',    asignatura: 'DAWA', estado: 'Cancelada'  },
];

const estadoBadgeClass = {
  Confirmada: 'badge-estado--confirmada',
  Pendiente:  'badge-estado--pendiente',
  Atendida:   'badge-estado--atendida',
  Cancelada:  'badge-estado--cancelada',
};

export default function CoordinadorDashboard() {
  const [rol, setRol] = useState('');
  const [vistaActual, setVistaActual] = useState('inicio');

  const menuCoordinadorEstructurado = [
    {
      categoria: 'GENERAL',
      items: [{ nombre: 'Inicio', ruta: '#', icono: 'bi-house-door', accion: () => setVistaActual('inicio') }],
    },
    {
      categoria: 'ACADÉMICO',
      items: [
        { nombre: 'Asignaturas', ruta: '#', icono: 'bi-book',         accion: () => setVistaActual('asignaturas') },
        { nombre: 'Docentes',    ruta: '#', icono: 'bi-person-badge',  accion: () => setVistaActual('docentes')    },
        { nombre: 'Estudiantes', ruta: '#', icono: 'bi-people',        accion: () => setVistaActual('estudiantes') },
      ],
    },
    {
      categoria: 'TUTORÍAS',
      items: [
        { nombre: 'Supervisar Tutorías', ruta: '#', icono: 'bi-calendar-check',        accion: () => setVistaActual('supervisar') },
        { nombre: 'Reportes',            ruta: '#', icono: 'bi-file-earmark-bar-graph', accion: () => setVistaActual('reportes')   },
      ],
    },
    {
      categoria: 'AGENTE IA',
      items: [
        { nombre: 'Asistente IA', ruta: '#', icono: 'bi-cpu', accion: () => setVistaActual('ia') },
      ],
    },
  ];

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) setRol(savedRole);
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar titulo="Menu" menuEstructurado={menuCoordinadorEstructurado} />

      <div className="dashboard-viewport">
        <Header />
        <main className="main-content-body">

          {vistaActual === 'inicio' && (
            <>
              <h2>Hola, bienvenido {rol}</h2>
              <p className="coord-subtitle">Panel de control para la coordinación académica.</p>

              {/* Tarjetas resumen */}
              <div className="summary-grid">
                {summaryCards.map((c, i) => (
                  <div key={i} className="summary-card">
                    <div className={`summary-icon ${c.colorClass}`}>
                      <i className={`bi ${c.icono}`}></i>
                    </div>
                    <div>
                      <div className="summary-value">{c.valor}</div>
                      <div className="summary-label">{c.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="dashboard-grid">

                {/* Tutorías recientes */}
                <section className="dashboard-card-panel">
                  <h3>Tutorías recientes</h3>
                  <table className="coord-table">
                    <thead>
                      <tr>
                        {['Estudiante', 'Docente', 'Asignatura', 'Estado'].map(h => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tutoriasRecientes.map((t, i) => (
                        <tr key={i}>
                          <td className="td-bold">{t.estudiante}</td>
                          <td className="td-muted">{t.docente}</td>
                          <td className="td-muted">{t.asignatura}</td>
                          <td>
                            <span className={`badge-estado ${estadoBadgeClass[t.estado]}`}>
                              {t.estado}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>

                {/* Acciones rápidas */}
                <aside className="dashboard-card-panel">
                  <h3>Acciones rápidas</h3>
                  <div className="quick-actions-list">
                    <button className="btn-quick-action primary" onClick={() => setVistaActual('supervisar')}>
                      <i className="bi bi-calendar-check"></i>Supervisar tutorías
                    </button>
                    <button className="btn-quick-action" onClick={() => setVistaActual('reportes')}>
                      <i className="bi bi-file-earmark-bar-graph"></i>Ver reportes
                    </button>
                    <button className="btn-quick-action" onClick={() => setVistaActual('docentes')}>
                      <i className="bi bi-person-badge"></i>Ver docentes
                    </button>
                    <button className="btn-quick-action" onClick={() => setVistaActual('ia')}>
                      <i className="bi bi-cpu"></i>Consultar Asistente IA
                    </button>
                  </div>
                </aside>

              </div>
            </>
          )}

          {vistaActual === 'asignaturas' && <PlaceholderVista titulo="Asignaturas"        descripcion="Listado de asignaturas registradas."          icono="bi-book"                   onVolver={() => setVistaActual('inicio')} />}
          {vistaActual === 'docentes'    && <PlaceholderVista titulo="Docentes"            descripcion="Listado de docentes activos."                icono="bi-person-badge"           onVolver={() => setVistaActual('inicio')} />}
          {vistaActual === 'estudiantes' && <PlaceholderVista titulo="Estudiantes"         descripcion="Listado de estudiantes registrados."         icono="bi-people"                 onVolver={() => setVistaActual('inicio')} />}
          {vistaActual === 'supervisar'  && <PlaceholderVista titulo="Supervisar Tutorías" descripcion="Seguimiento de tutorías académicas."         icono="bi-calendar-check"         onVolver={() => setVistaActual('inicio')} />}
          {vistaActual === 'reportes'    && <PlaceholderVista titulo="Reportes"            descripcion="Reportes y estadísticas académicas."         icono="bi-file-earmark-bar-graph" onVolver={() => setVistaActual('inicio')} />}
          {vistaActual === 'ia'          && <PlaceholderVista titulo="Asistente IA"        descripcion="Chat con el agente de inteligencia artificial." icono="bi-cpu"                onVolver={() => setVistaActual('inicio')} />}

        </main>
      </div>
    </div>
  );
}

function PlaceholderVista({ titulo, descripcion, icono, onVolver }) {
  return (
    <div>
      <div className="placeholder-header">
        <div>
          <h2 className="placeholder-title">{titulo}</h2>
          <p className="placeholder-subtitle">{descripcion}</p>
        </div>
        <button className="btn-volver" onClick={onVolver}>
          <i className="bi bi-arrow-left"></i> Volver al inicio
        </button>
      </div>
      <div className="placeholder-body">
        <i className={`bi ${icono} placeholder-icono`}></i>
        <p className="placeholder-texto">Este módulo está en construcción.</p>
      </div>
    </div>
  );
}