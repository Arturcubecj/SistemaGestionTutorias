import { useState, useEffect } from 'react';
import { Tutoria } from '../../pages/dashboards/estudiante'; 

export default function GestionSolicitudes() {
  const [solicitudes, setSolicitudes] = useState<Tutoria[]>([]);

  useEffect(() => {
    const datos = localStorage.getItem('tutorias_locales');
    if (datos) {
      setSolicitudes(JSON.parse(datos));
    } else {
      const datosPrueba: Tutoria[] = [
        { 
          id: 1, 
          asignatura: 'Cálculo II', 
          fecha: '2023-11-20', 
          hora: '12:00', 
          motivo: 'Duda sobre derivadas', 
          docente: 'No asignado', 
          estado: 'Solicitada' 
        },
        { 
          id: 2, 
          asignatura: 'Física I', 
          fecha: '2023-11-20', 
          hora: '10:00', 
          motivo: 'Duda sobre mecánica', 
          docente: 'No asignado', 
          estado: 'Pendiente' 
        }
      ];
      setSolicitudes(datosPrueba);
      localStorage.setItem('tutorias_locales', JSON.stringify(datosPrueba));
    }
  }, []);

  const cambiarEstado = (id: number, nuevoEstado: string) => {
    const nombreDocente = "Ing. Juan Pérez"; 
    
    const listaActualizada = solicitudes.map(sol => 
      sol.id === id 
        ? { 
            ...sol, 
            estado: nuevoEstado,
            // Asignamos docente solo si se confirma
            docente: nuevoEstado === 'Confirmada' ? nombreDocente : sol.docente 
          } 
        : sol
    );

    setSolicitudes(listaActualizada);
    localStorage.setItem('tutorias_locales', JSON.stringify(listaActualizada));
  };

  return (
    <section className="dashboard-card-panel">
      <h3>Atender Solicitudes de Tutoría</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Asignatura</th>
            <th>Docente</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Motivo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.length > 0 ? (
            solicitudes.map(sol => (
              <tr key={sol.id}>
                <td>{sol.asignatura}</td>
                <td>{sol.docente}</td>
                <td>{sol.fecha}</td>
                <td>{sol.hora}</td>
                <td>{sol.motivo}</td>
                <td>
                  <span className={`badge badge-${sol.estado.toLowerCase()}`}>
                    {sol.estado}
                  </span>
                </td>
                <td>
                  <div className="acciones-container">
                    {/* Botones de gestión */}
                    {(sol.estado === 'Solicitada' || sol.estado === 'Pendiente') && (
                      <>
                        <button className="btn-aceptar" onClick={() => cambiarEstado(sol.id, 'Confirmada')}>Aceptar</button>
                        <button className="btn-rechazar" onClick={() => cambiarEstado(sol.id, 'Cancelada')}>Rechazar</button>
                      </>
                    )}
                    
                    {/* Botón para Finalizar*/}
                    {sol.estado === 'Confirmada' && (
                      <button className="btn-finalizar" onClick={() => cambiarEstado(sol.id, 'Finalizada')}>Finalizar</button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="empty-state">No hay solicitudes pendientes.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}