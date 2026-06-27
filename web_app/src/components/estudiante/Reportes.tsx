import React from 'react';
import { Tutoria } from '../../pages/dashboards/estudiante';

interface ReportesProps {
  solicitudes?: Tutoria[];
}

export default function Reportes({ solicitudes = [] }: ReportesProps) {
  const totales: number = solicitudes.length;
  const aceptadas: number = solicitudes.filter(s => s.estado === 'Aceptada').length;
  const pendientes: number = solicitudes.filter(s => s.estado === 'Pendiente').length;
  const rechazadas: number = solicitudes.filter(s => s.estado === 'Rechazada').length;

  const horasEstimadas: number = aceptadas * 2; 

  return (
    <div className="reportes-container">
      <div className="reportes-header">
        <h2>Resumen Estadístico</h2>
        <p className="subtitulo">Consulta los indicadores generales y contadores lógicos de tus tutorías.</p>
      </div>

      <div className="reportes-cards-grid">
        <div className="metric-card">
          <div className="metric-icon totales"><i className="bi bi-folder"></i></div>
          <div className="metric-info">
            <h3>{totales}</h3>
            <p>Solicitudes Creadas</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon horas"><i className="bi bi-clock-history"></i></div>
          <div className="metric-info">
            <h3>{horasEstimadas} hrs</h3>
            <p>Horas Recibidas</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon aprobadas"><i className="bi bi-check-circle"></i></div>
          <div className="metric-info">
            <h3>{aceptadas}</h3>
            <p>Tutorías Aceptadas</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon pendientes"><i className="bi bi-hourglass-split"></i></div>
          <div className="metric-info">
            <h3>{pendientes}</h3>
            <p>Tutorías Pendientes</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon rechazadas"><i className="bi bi-x-circle"></i></div>
          <div className="metric-info">
            <h3>{rechazadas}</h3>
            <p>Tutorías Rechazadas</p>
          </div>
        </div>
      </div>
    </div>
  );
}