import { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';

const menuAdminEstructurado = [
  {
    categoria: 'GENERAL',
    items: [
      { nombre: 'Inicio', ruta: '/dashboards/administrador', icono: 'bi-house-door' },
    ]
  },
  {
    categoria: 'ADMINISTRACIÓN ACADÉMICA',
    items: [
      { nombre: 'Facultades', ruta: '/dashboards/administrador/facultades', icono: 'bi-building' },
      { nombre: 'Carreras', ruta: '/dashboards/administrador/carreras', icono: 'bi-diagram-3' },
      { nombre: 'Asignaturas', ruta: '/dashboards/administrador/asignaturas', icono: 'bi-book' },
      { nombre: 'Periodos Académicos', ruta: '/dashboards/administrador/periodos', icono: 'bi-calendar3' },
      { nombre: 'Docentes', ruta: '/dashboards/administrador/docentes', icono: 'bi-person-badge' },
      { nombre: 'Estudiantes', ruta: '/dashboards/administrador/estudiantes', icono: 'bi-people' },
    ]
  },
  {
    categoria: 'TUTORÍAS',
    items: [
      { nombre: 'Supervisar Tutorías', ruta: '/dashboards/administrador/tutorias', icono: 'bi-calendar-check' },
      { nombre: 'Reportes', ruta: '/dashboards/administrador/reportes', icono: 'bi-file-earmark-bar-graph' },
    ]
  },
  {
    categoria: 'AGENTE IA',
    items: [
      { nombre: 'Métricas de uso IA', ruta: '/dashboards/administrador/metricas', icono: 'bi-graph-up' },
      { nombre: 'Preguntas Frecuentes', ruta: '/dashboards/administrador/faq', icono: 'bi-question-circle' },
      { nombre: 'Base de Conocimiento', ruta: '/dashboards/administrador/conocimiento', icono: 'bi-database' },
    ]
  },
];
 
const consultasPorDia = [
  { dia: 'Lun', consultas: 18, resueltas: 14, escaladas: 4 },
  { dia: 'Mar', consultas: 24, resueltas: 19, escaladas: 5 },
  { dia: 'Mié', consultas: 20, resueltas: 16, escaladas: 4 },
  { dia: 'Jue', consultas: 31, resueltas: 25, escaladas: 6 },
  { dia: 'Vie', consultas: 22, resueltas: 18, escaladas: 4 },
  { dia: 'Sáb', consultas: 8, resueltas: 7, escaladas: 1 },
  { dia: 'Dom', consultas: 5, resueltas: 4, escaladas: 1 },
];
 
const consultasPorTema = [
  { tema: 'Horarios', cantidad: 32, max: 32 },
  { tema: 'Tutorías', cantidad: 28, max: 32 },
  { tema: 'Requisitos', cantidad: 19, max: 32 },
  { tema: 'Cancelaciones', cantidad: 15, max: 32 },
  { tema: 'Docentes', cantidad: 12, max: 32 },
  { tema: 'Otros', cantidad: 8, max: 32 },
];
 
const consultasRecientes = [
  { id: 1, usuario: 'Ana Torres', pregunta: '¿Cuáles son los horarios de tutoría?', estado: 'Resuelta', fuente: 'Base de conocimiento', fecha: '2026-06-25', util: true },
  { id: 2, usuario: 'Luis Pérez', pregunta: '¿Cómo cancelo una tutoría?', estado: 'Resuelta', fuente: 'Base de conocimiento', fecha: '2026-06-25', util: true },
  { id: 3, usuario: 'María Gómez', pregunta: '¿Puedo cambiar de docente tutor?', estado: 'Escalada', fuente: 'Sin respuesta', fecha: '2026-06-24', util: false },
  { id: 4, usuario: 'Jorge Lema', pregunta: '¿Qué pasa si no asisto a la tutoría?', estado: 'Sin respuesta', fuente: 'Sin respuesta', fecha: '2026-06-24', util: false },
  { id: 5, usuario: 'Carla Ríos', pregunta: '¿Cuántas tutorías puedo solicitar?', estado: 'Resuelta', fuente: 'Base de conocimiento', fecha: '2026-06-23', util: true },
  { id: 6, usuario: 'Pedro Suárez', pregunta: '¿Cuáles son los requisitos para solicitar tutoría?', estado: 'Resuelta', fuente: 'FAQ', fecha: '2026-06-23', util: true },
];
 
const summaryCards = [
  { label: 'Consultas totales', valor: '128', icono: 'bi-chat-dots', colorClass: 'summary-icon--purple' },
  { label: 'Resueltas por IA', valor: '94', icono: 'bi-check-circle', colorClass: 'summary-icon--green' },
  { label: 'Escaladas a docente', valor: '21', icono: 'bi-person-check', colorClass: 'summary-icon--amber' },
  { label: 'Sin respuesta', valor: '13', icono: 'bi-x-circle', colorClass: 'summary-icon--red' },
];
 
// Mapea el valor del estado a la clase CSS correspondiente
const estadoBadgeClass = {
  'Resuelta':      'estado-badge--resuelta',
  'Escalada':      'estado-badge--escalada',
  'Sin respuesta': 'estado-badge--sin-resp',
};
 
const estadoBtnClass = {
  'Todos':         'active--todos',
  'Resuelta':      'active--resuelta',
  'Escalada':      'active--escalada',
  'Sin respuesta': 'active--sin-resp',
};
 
const filtrosFecha = ['Esta semana', 'Este mes', 'Último trimestre'];
const estadosFiltro = ['Todos', 'Resuelta', 'Escalada', 'Sin respuesta'];
 
const maxConsultas = Math.max(...consultasPorDia.map(d => d.consultas));
 
export default function MetricasIAPage() {
  const [filtroFecha, setFiltroFecha] = useState('Esta semana');
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
 
  const consultasFiltradas = consultasRecientes.filter(c => {
    const coincideBusqueda =
      c.usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.pregunta.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado === 'Todos' || c.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });
 
  return (
    <div className="dashboard-layout">
      <Sidebar titulo="Menu" menuEstructurado={menuAdminEstructurado} />
 
      <div className="dashboard-viewport">
        <Header />
        <main className="main-content-body">
 
          {/* Encabezado */}
          <div className="metricas-header">
            <div>
              <h2 className="metricas-title">Métricas de uso del Agente IA</h2>
              <p className="metricas-subtitle">Análisis del comportamiento y rendimiento del agente de IA.</p>
            </div>
            <div className="filtros-fecha">
              {filtrosFecha.map(f => (
                <button
                  key={f}
                  onClick={() => setFiltroFecha(f)}
                  className={`filtro-btn ${filtroFecha === f ? 'active' : ''}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
 
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
 
          {/* Gráficas CSS */}
          <div className="charts-grid">
 
            {/* Barras verticales: consultas por día */}
            <div className="chart-card">
              <h3 className="chart-title">Consultas por día</h3>
              <div className="chart-legend">
                <div className="chart-legend-item">
                  <div className="chart-legend-dot chart-legend-dot--purple"></div>
                  Consultas
                </div>
                <div className="chart-legend-item">
                  <div className="chart-legend-dot chart-legend-dot--green"></div>
                  Resueltas
                </div>
                <div className="chart-legend-item">
                  <div className="chart-legend-dot chart-legend-dot--amber"></div>
                  Escaladas
                </div>
              </div>
              <div className="bar-chart-vertical">
                {consultasPorDia.map((d, i) => (
                  <div key={i} className="bar-day-group">
                    <div className="bar-day-bars">
                      <div
                        className="bar-segment bar-segment--purple"
                        title={`Consultas: ${d.consultas}`}
                        style={{ height: `${(d.consultas / maxConsultas) * 100}%` }}
                      ></div>
                      <div
                        className="bar-segment bar-segment--green"
                        title={`Resueltas: ${d.resueltas}`}
                        style={{ height: `${(d.resueltas / maxConsultas) * 100}%` }}
                      ></div>
                      <div
                        className="bar-segment bar-segment--amber"
                        title={`Escaladas: ${d.escaladas}`}
                        style={{ height: `${(d.escaladas / maxConsultas) * 100}%` }}
                      ></div>
                    </div>
                    <div className="bar-day-label">{d.dia}</div>
                  </div>
                ))}
              </div>
            </div>
 
            {/* Barras horizontales: consultas por tema */}
            <div className="chart-card">
              <h3 className="chart-title-gap">Consultas por tema</h3>
              <div className="tema-list">
                {consultasPorTema.map((t, i) => (
                  <div key={i}>
                    <div className="tema-item-header">
                      <span className="tema-label">{t.tema}</span>
                      <span className="tema-count">{t.cantidad}</span>
                    </div>
                    <div className="tema-track">
                      <div
                        className="tema-fill"
                        style={{ width: `${(t.cantidad / t.max) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
 
          {/* Tabla consultas recientes */}
          <div className="consultas-card">
            <div className="consultas-toolbar">
              <h3 className="consultas-toolbar-title">Consultas recientes</h3>
              <div className="toolbar-controls">
                {estadosFiltro.map(e => (
                  <button
                    key={e}
                    onClick={() => setFiltroEstado(e)}
                    className={`estado-btn ${filtroEstado === e ? estadoBtnClass[e] : ''}`}
                  >
                    {e}
                  </button>
                ))}
                <div className="search-box">
                  <i className="bi bi-search search-icon"></i>
                  <input
                    type="text"
                    placeholder="Buscar consulta..."
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>
            </div>
 
            <table className="report-table">
              <thead>
                <tr>
                  {['#', 'Usuario', 'Pregunta', 'Fuente', 'Estado', 'Útil', 'Fecha'].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {consultasFiltradas.length > 0 ? consultasFiltradas.map((c, i) => (
                  <tr key={c.id}>
                    <td>{i + 1}</td>
                    <td className="td-bold">{c.usuario}</td>
                    <td className="td-muted">{c.pregunta}</td>
                    <td>{c.fuente}</td>
                    <td>
                      <span className={`estado-badge ${estadoBadgeClass[c.estado]}`}>
                        {c.estado}
                      </span>
                    </td>
                    <td>
                      <i className={`bi ${c.util ? 'bi-hand-thumbs-up-fill util-icon--up' : 'bi-hand-thumbs-down-fill util-icon--down'}`}></i>
                    </td>
                    <td className="td-fecha">{c.fecha}</td>
                  </tr>
                )) : (
                  <tr className="empty-row">
                    <td colSpan="7">No se encontraron consultas.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
 
        </main>
      </div>
    </div>
  );
}