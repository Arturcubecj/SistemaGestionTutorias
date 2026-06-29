import { useState } from 'react';

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

function exportarCSV(tabActiva) {
  const titulos = {
    docentes: 'Tutorías_por_Docente',
    estudiantes: 'Estudiantes_Atendidos',
    temas: 'Temas_Recurrentes',
  };
  const encabezados = {
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
  const contenido = [
    encabezados[tabActiva].join(','),
    ...filas[tabActiva].map(f => f.map(v => `"${v}"`).join(',')),
  ].join('\n');
  const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${titulos[tabActiva]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function exportarPDFSimple(tabActiva) {
  const titulos = {
    docentes: 'Reporte de Tutorías por Docente',
    estudiantes: 'Reporte de Estudiantes Atendidos',
    temas: 'Reporte de Temas Académicos Recurrentes',
  };
  const encabezados = {
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
  const filasTH = encabezados[tabActiva].map(h => `<th style="background:#1a1740;color:white;padding:8px 12px;text-align:left;font-size:12px;">${h}</th>`).join('');
  const filasTD = filas[tabActiva].map((f, i) =>
    `<tr style="background:${i % 2 === 0 ? '#f8fafc' : 'white'}">
      ${f.map(v => `<td style="padding:8px 12px;font-size:12px;color:#334155;border-bottom:1px solid #e2e8f0;">${v}</td>`).join('')}
    </tr>`
  ).join('');
  const html = `
    <html><head><title>${titulos[tabActiva]}</title></head>
    <body style="font-family:Arial,sans-serif;padding:30px;">
      <h2 style="color:#1a1740;margin-bottom:4px;">${titulos[tabActiva]}</h2>
      <p style="color:#64748b;font-size:13px;margin-bottom:20px;">Generado: ${new Date().toLocaleDateString('es-EC')}</p>
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr>${filasTH}</tr></thead>
        <tbody>${filasTD}</tbody>
      </table>
    </body></html>
  `;
  const ventana = window.open('', '_blank');
  ventana.document.write(html);
  ventana.document.close();
  ventana.print();
}

export default function ReportesCoordinador({ onVolver }) {
  const [tabActiva, setTabActiva] = useState('docentes');
  const [busqueda, setBusqueda] = useState('');

  const handleTabChange = (id) => { setTabActiva(id); setBusqueda(''); };

  const tarjetas = [
    { label: 'Total Tutorías', valor: '47', icono: 'bi-calendar-check', colorClass: 'rpt-card-icon--indigo' },
    { label: 'Atendidas',      valor: '31', icono: 'bi-check-circle',   colorClass: 'rpt-card-icon--green'  },
    { label: 'Pendientes',     valor: '8',  icono: 'bi-hourglass-split', colorClass: 'rpt-card-icon--amber'  },
    { label: 'Canceladas',     valor: '8',  icono: 'bi-x-circle',       colorClass: 'rpt-card-icon--red'    },
  ];

  return (
    <div>
      {/* Encabezado */}
      <div className="rpt-header">
        <div>
          <h2 className="rpt-title">Reportes</h2>
          <p className="rpt-subtitle">Estadísticas y reportes académicos del sistema de tutorías.</p>
        </div>
        <div className="rpt-header-actions">
          <button className="rpt-btn rpt-btn--green" onClick={() => exportarCSV(tabActiva)}>
            <i className="bi bi-file-earmark-excel"></i> Exportar CSV
          </button>
          <button className="rpt-btn rpt-btn--red" onClick={() => exportarPDFSimple(tabActiva)}>
            <i className="bi bi-file-earmark-pdf"></i> Exportar PDF
          </button>
          <button className="rpt-btn rpt-btn--outline" onClick={onVolver}>
            <i className="bi bi-arrow-left"></i> Volver
          </button>
        </div>
      </div>

      {/* Tarjetas resumen */}
      <div className="rpt-cards-grid">
        {tarjetas.map((c, i) => (
          <div key={i} className="rpt-card">
            <div className={`rpt-card-icon ${c.colorClass}`}>
              <i className={`bi ${c.icono}`}></i>
            </div>
            <div>
              <div className="rpt-card-valor">{c.valor}</div>
              <div className="rpt-card-label">{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="rpt-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`rpt-tab-btn ${tabActiva === tab.id ? 'rpt-tab-btn--active' : ''}`}
          >
            <i className={`bi ${tab.icono}`}></i>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Buscador */}
      <div className="rpt-search-wrapper">
        <div className="rpt-search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="rpt-search-input"
          />
          {busqueda && (
            <i className="bi bi-x rpt-search-clear" onClick={() => setBusqueda('')}></i>
          )}
        </div>
      </div>

      {/* Contenido por tab */}
      {tabActiva === 'docentes'     && <TablaDocentes    datos={tutoriasPorDocente}    busqueda={busqueda} />}
      {tabActiva === 'estudiantes'  && <TablaEstudiantes datos={estudiantesAtendidos}  busqueda={busqueda} />}
      {tabActiva === 'temas'        && <TablaTemas       datos={temasRecurrentes}      busqueda={busqueda} />}
    </div>
  );
}

function TablaDocentes({ datos, busqueda }) {
  const filtrados = datos.filter(d =>
    d.docente.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.asignatura.toLowerCase().includes(busqueda.toLowerCase())
  );
  return (
    <div className="rpt-table-wrapper">
      <table className="rpt-table">
        <thead>
          <tr className="rpt-table-head-row">
            {['#', 'Docente', 'Asignatura', 'Atendidas', 'Confirmadas', 'Canceladas', 'No Asistidas', 'Total'].map(h => (
              <th key={h} className="rpt-th">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtrados.length > 0 ? filtrados.map((d, i) => (
            <tr key={i} className="rpt-tr">
              <td className="rpt-td">{i + 1}</td>
              <td className="rpt-td rpt-td--bold">{d.docente}</td>
              <td className="rpt-td rpt-td--muted">{d.asignatura}</td>
              <td className="rpt-td"><span className="rpt-num rpt-num--green">{d.atendidas}</span></td>
              <td className="rpt-td"><span className="rpt-num rpt-num--blue">{d.confirmadas}</span></td>
              <td className="rpt-td"><span className="rpt-num rpt-num--red">{d.canceladas}</span></td>
              <td className="rpt-td"><span className="rpt-num rpt-num--slate">{d.noAsistidas}</span></td>
              <td className="rpt-td"><span className="rpt-num rpt-num--dark">{d.atendidas + d.confirmadas + d.canceladas + d.noAsistidas}</span></td>
            </tr>
          )) : (
            <tr><td colSpan={8} className="rpt-empty">No se encontraron resultados.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function TablaEstudiantes({ datos, busqueda }) {
  const filtrados = datos.filter(d =>
    d.estudiante.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.carrera.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.docente.toLowerCase().includes(busqueda.toLowerCase())
  );
  return (
    <div className="rpt-table-wrapper">
      <table className="rpt-table">
        <thead>
          <tr className="rpt-table-head-row">
            {['#', 'Estudiante', 'Carrera', 'Tutorías', 'Última Tutoría', 'Docente Asignado'].map(h => (
              <th key={h} className="rpt-th">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtrados.length > 0 ? filtrados.map((d, i) => (
            <tr key={i} className="rpt-tr">
              <td className="rpt-td">{i + 1}</td>
              <td className="rpt-td rpt-td--bold">{d.estudiante}</td>
              <td className="rpt-td rpt-td--muted">{d.carrera}</td>
              <td className="rpt-td">
                <span className="rpt-badge rpt-badge--violet">{d.tutorias}</span>
              </td>
              <td className="rpt-td">{d.ultima}</td>
              <td className="rpt-td">{d.docente}</td>
            </tr>
          )) : (
            <tr><td colSpan={6} className="rpt-empty">No se encontraron resultados.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function TablaTemas({ datos, busqueda }) {
  const filtrados = datos.filter(d =>
    d.tema.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.asignatura.toLowerCase().includes(busqueda.toLowerCase())
  );
  return (
    <div className="rpt-table-wrapper">
      <table className="rpt-table">
        <thead>
          <tr className="rpt-table-head-row">
            {['#', 'Tema', 'Asignatura', 'Frecuencia', 'Porcentaje'].map(h => (
              <th key={h} className="rpt-th">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtrados.length > 0 ? filtrados.map((d, i) => (
            <tr key={i} className="rpt-tr">
              <td className="rpt-td">{i + 1}</td>
              <td className="rpt-td rpt-td--bold">{d.tema}</td>
              <td className="rpt-td rpt-td--muted">{d.asignatura}</td>
              <td className="rpt-td">
                <span className="rpt-badge rpt-badge--blue">{d.frecuencia} veces</span>
              </td>
              <td className="rpt-td">
                <div className="rpt-bar-wrapper">
                  <div className="rpt-bar-track">
                    <div className="rpt-bar-fill" style={{ width: `${d.porcentaje}%` }}></div>
                  </div>
                  <span className="rpt-bar-label">{d.porcentaje}%</span>
                </div>
              </td>
            </tr>
          )) : (
            <tr><td colSpan={5} className="rpt-empty">No se encontraron resultados.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}