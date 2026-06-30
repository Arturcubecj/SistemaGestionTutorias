import React from 'react';
import { Tutoria } from '../../pages/dashboards/estudiante';

interface CalendarioProps {
  solicitudes?: Tutoria[];
}

export default function CalendarioTutorias({ solicitudes = [] }: CalendarioProps) {
  const tutoriasConfirmadas: Tutoria[] = solicitudes.filter(sol => sol.estado === 'Confirmada');

  const abrirClaseVirtual = (): void => {
    alert('ZOOM UWU');
  };

  return (
    <div className="calendario-wrapper">
      
      <div className="calendario-header-bar">
        <div>
          <h2>Mi Calendario Académico</h2>
          <p className="calendario-subtitle">
            Tutorías confirmadas para este periodo.
          </p>
        </div>
        
        <button className="btn-clase-virtual-top" onClick={abrirClaseVirtual}>
          <i className="bi bi-camera-video-fill"></i> Entrar a Clase Virtual
        </button>
      </div>

      <div className="tabla-ug-container">
        <table className="tabla-ug">
          <thead>
            <tr>
              <th>MATERIA</th>
              <th>DOCENTE</th>
              <th>ESTADO</th>
              <th>FECHA PROGRAMADA</th>
              <th>HORA</th>
            </tr>
          </thead>
          <tbody>
            {tutoriasConfirmadas.length > 0 ? (
              tutoriasConfirmadas.map((tutoria, index) => (
                <tr key={tutoria.id || index}>
                  <td><strong>{tutoria.asignatura}</strong></td>
                  <td>{tutoria.docente}</td>
                  <td>
                    <span className="badge-estado-texto">
                      {tutoria.estado.toUpperCase()}
                    </span>
                  </td>
                  <td>{tutoria.fecha}</td>
                  <td>{tutoria.hora}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="tabla-vaciva">
                  No tienes tutorías confirmadas en tu calendario por el momento.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}