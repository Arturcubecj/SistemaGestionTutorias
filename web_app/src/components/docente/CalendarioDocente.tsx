import React, { useState, useEffect } from 'react';
import { Tutoria } from '../../pages/dashboards/estudiante';

interface CalendarioDocenteProps {
  solicitudes?: Tutoria[];
  nombreDocente?: string;
}

export default function CalendarioDocente({ 
  solicitudes = [], 
  nombreDocente = "Ing. Juan Pérez" 
}: CalendarioDocenteProps) {

  const [datosTutorias, setDatosTutorias] = useState<Tutoria[]>(solicitudes);

  useEffect(() => {
    if (!solicitudes || solicitudes.length === 0) {
      const stored = localStorage.getItem('tutorias_locales');
      if (stored) {
        try {
          setDatosTutorias(JSON.parse(stored));
        } catch (e) {
          console.error("Error al parsear tutorias del localStorage", e);
        }
      }
    } else {
      setDatosTutorias(solicitudes);
    }
  }, [solicitudes]);

  const normalizar = (texto: string) => {
    return texto
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };
  const nombreBuscado = normalizar(nombreDocente);
  
  const misTutorias = datosTutorias.filter(sol => {
    const estadoOk = sol.estado === 'Confirmada';
    const nombreEnData = sol.docente ? normalizar(sol.docente) : "";    
    return estadoOk && (nombreEnData === nombreBuscado);
  });

  const iniciarReunion = (tutoria: Tutoria): void => {
    alert(`Iniciando sesión virtual de ${tutoria.asignatura}...`);
  };

  return (
    <div className="calendario-wrapper">
      <div className="calendario-header-bar">
        <div>
          <h2>Calendario de Tutorías</h2>
          <p className="calendario-subtitle">
            Sesiones confirmadas para: <strong>{nombreDocente}</strong>
          </p>
        </div>
      </div>

      <div className="tabla-ug-container">
        <table className="tabla-ug">
          <thead>
            <tr>
              <th>MATERIA</th>
              <th>ESTADO</th>
              <th>FECHA</th>
              <th>HORA</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {misTutorias.length > 0 ? (
              misTutorias.map((tutoria) => (
                <tr key={tutoria.id}>
                  <td><strong>{tutoria.asignatura}</strong></td>
                  <td>
                    <span className="badge-estado-texto">
                      {tutoria.estado.toUpperCase()}
                    </span>
                  </td>
                  <td>{tutoria.fecha}</td>
                  <td>{tutoria.hora}</td>
                  <td>
                    <button 
                      className="btn-clase-virtual-top" onClick={() => iniciarReunion(tutoria)}>
                      <i className="bi bi-camera-video-fill"></i> Iniciar Reunión
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="tabla-vaciva">
                  No hay tutorías confirmadas para {nombreDocente}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}