import { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
 
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
 
const tutoriasPorDocente = [
  { docente: 'Ing. Carlos Martínez', asignatura: 'Desarrollo de Aplicaciones Web', atendidas: 12, confirmadas: 3, canceladas: 1, noAsistidas: 1 },
  { docente: 'Dra. Laura Cedeño', asignatura: 'Bases de Datos Relacionales', atendidas: 9, confirmadas: 2, canceladas: 2, noAsistidas: 0 },
  { docente: 'Mg. Juan Mora', asignatura: 'Calidad de Software', atendidas: 6, confirmadas: 1, canceladas: 0, noAsistidas: 1 },
  { docente: 'Ing. Sofía Reyes', asignatura: 'Procesos Industriales', atendidas: 4, confirmadas: 2, canceladas: 1, noAsistidas: 0 },
];
 
const estudiantesAtendidos = [
  { estudiante: 'Ana Torres', carrera: 'Ingeniería en Software', tutorias: 5, ultima: '2026-06-20', docente: 'Ing. Carlos Martínez' },
  { estudiante: 'Luis Pérez', carrera: 'Ingeniería en Sistemas', tutorias: 3, ultima: '2026-06-21', docente: 'Dra. Laura Cedeño' },
  { estudiante: 'María Gómez', carrera: 'Ingeniería en Software', tutorias: 4, ultima: '2026-06-22', docente: 'Ing. Carlos Martínez' },
  { estudiante: 'Carla Ríos', carrera: 'Ingeniería Industrial', tutorias: 2, ultima: '2026-06-25', docente: 'Mg. Juan Mora' },
  { estudiante: 'Pedro Suárez', carrera: 'Ingeniería en Software', tutorias: 1, ultima: '2026-06-18', docente: 'Ing. Carlos Martínez' },
];
 
const temasRecurrentes = [
  { tema: 'Programación orientada a objetos', asignatura: 'Desarrollo de Aplicaciones Web', frecuencia: 14, porcentaje: 28 },
  { tema: 'Consultas SQL y optimización', asignatura: 'Bases de Datos Relacionales', frecuencia: 11, porcentaje: 22 },
  { tema: 'Pruebas unitarias y cobertura', asignatura: 'Calidad de Software', frecuencia: 9, porcentaje: 18 },
  { tema: 'React hooks y estado', asignatura: 'Desarrollo de Aplicaciones Web', frecuencia: 8, porcentaje: 16 },
  { tema: 'Normalización de bases de datos', asignatura: 'Bases de Datos Relacionales', frecuencia: 5, porcentaje: 10 },
  { tema: 'Diagramas UML', asignatura: 'Calidad de Software', frecuencia: 3, porcentaje: 6 },
];
 
const tabs = [
  { id: 'docentes', label: 'Por Docente', icono: 'bi-person-badge' },
  { id: 'estudiantes', label: 'Estudiantes Atendidos', icono: 'bi-people' },
  { id: 'temas', label: 'Temas Recurrentes', icono: 'bi-tags' },
];
 
const summaryCards = [
  { label: 'Total Tutorías', valor: '47', icono: 'bi-calendar-check', color: '#6366f1' },
  { label: 'Atendidas', valor: '31', icono: 'bi-check-circle', color: '#22c55e' },
  { label: 'Pendientes', valor: '8', icono: 'bi-hourglass-split', color: '#f59e0b' },
  { label: 'Canceladas', valor: '8', icono: 'bi-x-circle', color: '#ef4444' },
];
 
// ===== FUNCIONES DE EXPORTACIÓN =====
 
function exportarPDF(tabActiva) {
  const doc = new jsPDF();
  const titulos = {
    docentes: 'Reporte de Tutorías por Docente',
    estudiantes: 'Reporte de Estudiantes Atendidos',
    temas: 'Reporte de Temas Académicos Recurrentes',
  };
  const columnas = {
    docentes: ['#', 'Docente', 'Asignatura', 'Atendidas', 'Confirmadas', 'Canceladas', 'No Asistidas', 'Total'],
    estudiantes: ['#', 'Estudiante', 'Carrera', 'Tutorías', 'Última Tutoría', 'Docente Asignado'],
    temas: ['#', 'Tema', 'Asignatura', 'Frecuencia', 'Porcentaje'],
  };
  const filas = {
    docentes: tutoriasPorDocente.map((d, i) => [
      i + 1, d.docente, d.asignatura, d.atendidas, d.confirmadas, d.canceladas, d.noAsistidas,
      d.atendidas + d.confirmadas + d.canceladas + d.noAsistidas,
    ]),
    estudiantes: estudiantesAtendidos.map((d, i) => [
      i + 1, d.estudiante, d.carrera, d.tutorias, d.ultima, d.docente,
    ]),
    temas: temasRecurrentes.map((d, i) => [
      i + 1, d.tema, d.asignatura, `${d.frecuencia} veces`, `${d.porcentaje}%`,
    ]),
  };
 
  doc.setFontSize(16);
  doc.setTextColor(26, 23, 64);
  doc.text(titulos[tabActiva], 14, 20);
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generado: ${new Date().toLocaleDateString('es-EC')}`, 14, 28);
  autoTable(doc, {
    head: [columnas[tabActiva]],
    body: filas[tabActiva],
    startY: 34,
    headStyles: { fillColor: [26, 23, 64], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    styles: { fontSize: 9, cellPadding: 5 },
  });
  doc.save(`${titulos[tabActiva].replace(/ /g, '_')}.pdf`);
}
 
function exportarExcel(tabActiva) {
  const titulos = {
    docentes: 'Tutorías por Docente',
    estudiantes: 'Estudiantes Atendidos',
    temas: 'Temas Recurrentes',
  };
  const datos = {
    docentes: tutoriasPorDocente.map((d, i) => ({
      '#': i + 1, Docente: d.docente, Asignatura: d.asignatura,
      Atendidas: d.atendidas, Confirmadas: d.confirmadas, Canceladas: d.canceladas,
      'No Asistidas': d.noAsistidas,
      Total: d.atendidas + d.confirmadas + d.canceladas + d.noAsistidas,
    })),
    estudiantes: estudiantesAtendidos.map((d, i) => ({
      '#': i + 1, Estudiante: d.estudiante, Carrera: d.carrera,
      'Tutorías': d.tutorias, 'Última Tutoría': d.ultima, 'Docente Asignado': d.docente,
    })),
    temas: temasRecurrentes.map((d, i) => ({
      '#': i + 1, Tema: d.tema, Asignatura: d.asignatura,
      Frecuencia: d.frecuencia, 'Porcentaje (%)': d.porcentaje,
    })),
  };
  const hoja = XLSX.utils.json_to_sheet(datos[tabActiva]);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, titulos[tabActiva]);
  XLSX.writeFile(libro, `${titulos[tabActiva].replace(/ /g, '_')}.xlsx`);
}
 
export default function ReportesPage() {
  const [tabActiva, setTabActiva] = useState('docentes');
  const [busqueda, setBusqueda] = useState('');
 
  const limpiarBusqueda = () => setBusqueda('');
  const handleTabChange = (id) => { setTabActiva(id); setBusqueda(''); };
 
  return (
    <div className="dashboard-layout">
      <div className="dashboard-viewport">
        <main className="main-content-body">
 
          {/* Encabezado */}
          <div className="page-header">
            <div>
              <h2 className="page-title">Reportes</h2>
              <p className="page-subtitle">Estadísticas y reportes académicos del sistema de tutorías.</p>
            </div>
            <div className="export-buttons">
              <button className="btn-excel" onClick={() => exportarExcel(tabActiva)}>
                <i className="bi bi-file-earmark-excel"></i> Exportar Excel
              </button>
              <button className="btn-pdf" onClick={() => exportarPDF(tabActiva)}>
                <i className="bi bi-file-earmark-pdf"></i> Exportar PDF
              </button>
            </div>
          </div>
 
          {/* Tarjetas resumen */}
          <div className="summary-grid">
            {summaryCards.map((c, i) => (
              <div key={i} className="summary-card">
                <div
                  className="summary-icon"
                  style={{ background: c.color + '20', color: c.color }}
                >
                  <i className={`bi ${c.icono}`}></i>
                </div>
                <div>
                  <div className="summary-value">{c.valor}</div>
                  <div className="summary-label">{c.label}</div>
                </div>
              </div>
            ))}
          </div>
 
          {/* Tabs */}
          <div className="tabs-container">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`tab-btn ${tabActiva === tab.id ? 'active' : ''}`}
              >
                <i className={`bi ${tab.icono}`}></i>
                {tab.label}
              </button>
            ))}
          </div>
 
          {/* Buscador */}
          <div className="search-wrapper">
            <div className="search-box">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="search-input"
              />
              {busqueda && (
                <i className="bi bi-x search-clear" onClick={limpiarBusqueda}></i>
              )}
            </div>
          </div>
 
          {/* Contenido por tab */}
          {tabActiva === 'docentes' && <TablaDocentes datos={tutoriasPorDocente} busqueda={busqueda} />}
          {tabActiva === 'estudiantes' && <TablaEstudiantes datos={estudiantesAtendidos} busqueda={busqueda} />}
          {tabActiva === 'temas' && <TablaTemas datos={temasRecurrentes} busqueda={busqueda} />}
 
        </main>
      </div>
    </div>
  );
}
 
/* ===== TABLA POR DOCENTE ===== */
function TablaDocentes({ datos, busqueda }) {
  const filtrados = datos.filter(d =>
    d.docente.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.asignatura.toLowerCase().includes(busqueda.toLowerCase())
  );
 
  return (
    <div className="table-wrapper">
      <table className="report-table">
        <thead>
          <tr>
            {['#', 'Docente', 'Asignatura', 'Atendidas', 'Confirmadas', 'Canceladas', 'No Asistidas', 'Total'].map(h => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtrados.length > 0 ? filtrados.map((d, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td className="td-bold">{d.docente}</td>
              <td className="td-muted">{d.asignatura}</td>
              <td><span className="badge-green">{d.atendidas}</span></td>
              <td><span className="badge-blue">{d.confirmadas}</span></td>
              <td><span className="badge-red">{d.canceladas}</span></td>
              <td><span className="badge-gray">{d.noAsistidas}</span></td>
              <td><span className="badge-bold">{d.atendidas + d.confirmadas + d.canceladas + d.noAsistidas}</span></td>
            </tr>
          )) : (
            <tr className="empty-row"><td colSpan={8}>No se encontraron resultados.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
 
/* ===== TABLA ESTUDIANTES ATENDIDOS ===== */
function TablaEstudiantes({ datos, busqueda }) {
  const filtrados = datos.filter(d =>
    d.estudiante.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.carrera.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.docente.toLowerCase().includes(busqueda.toLowerCase())
  );
 
  return (
    <div className="table-wrapper">
      <table className="report-table">
        <thead>
          <tr>
            {['#', 'Estudiante', 'Carrera', 'Tutorías', 'Última Tutoría', 'Docente Asignado'].map(h => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtrados.length > 0 ? filtrados.map((d, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td className="td-bold">{d.estudiante}</td>
              <td className="td-muted">{d.carrera}</td>
              <td><span className="chip-purple">{d.tutorias}</span></td>
              <td>{d.ultima}</td>
              <td>{d.docente}</td>
            </tr>
          )) : (
            <tr className="empty-row"><td colSpan={6}>No se encontraron resultados.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
 
/* ===== TABLA TEMAS RECURRENTES ===== */
function TablaTemas({ datos, busqueda }) {
  const filtrados = datos.filter(d =>
    d.tema.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.asignatura.toLowerCase().includes(busqueda.toLowerCase())
  );
 
  return (
    <div className="table-wrapper">
      <table className="report-table">
        <thead>
          <tr>
            {['#', 'Tema', 'Asignatura', 'Frecuencia', 'Porcentaje'].map(h => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtrados.length > 0 ? filtrados.map((d, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td className="td-bold">{d.tema}</td>
              <td className="td-muted">{d.asignatura}</td>
              <td><span className="chip-blue">{d.frecuencia} veces</span></td>
              <td>
                <div className="progress-cell">
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${d.porcentaje}%` }}></div>
                  </div>
                  <span className="progress-label">{d.porcentaje}%</span>
                </div>
              </td>
            </tr>
          )) : (
            <tr className="empty-row"><td colSpan={5}>No se encontraron resultados.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}