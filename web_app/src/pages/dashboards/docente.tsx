import { useState, useEffect } from 'react'; 
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header'; 
import GestionSolicitudes from '../../components/docente/GestionSolicitudes';
import GestionHorarios from '../../components/docente/GestionHorarios';
import Bitacoras from '../../components/docente/Bitacoras';
import Calendario from '../../components/docente/CalendarioDocente';
import { Tutoria } from './estudiante'; 

export default function DocenteDashboard() {
  const [rol, setRol] = useState<string>('');
  const [vistaActual, setVistaActual] = useState<string>('inicio'); 
  const [listaSolicitudes, setListaSolicitudes] = useState<Tutoria[]>([]); 

  const menuDocenteEstructurado = [
    {
      categoria: 'GENERAL',
      items: [
        { nombre: 'Inicio', ruta: '#', icono: 'bi-house-door', accion: () => setVistaActual('inicio') },
        { nombre: 'IA', ruta: '#', icono: 'bi-cpu'}
      ]
    },
    {
      categoria: 'GESTIÓN',
      items: [
        { nombre: 'Atender Solicitudes', ruta: '#', icono: 'bi-clipboard-check', accion: () => setVistaActual('solicitudes') },
        { nombre: 'Gestionar Horarios', ruta: '#', icono: 'bi-clock', accion: () => setVistaActual('horarios') },
         { nombre: 'Calendario', ruta: '#', icono: 'bi-calendar-event', accion: () => setVistaActual('calendario') },
        { nombre: 'Bitácoras', ruta: '#', icono: 'bi-journal-text', accion: () => setVistaActual('bitacoras') }
      ]
    }
  ];

  useEffect(() => {
    setRol(localStorage.getItem('role') || 'Docente');
    
    // Leemos las solicitudes guardadas en el navegador
    const guardadas = localStorage.getItem('tutorias_locales');
    if (guardadas) {
      setListaSolicitudes(JSON.parse(guardadas));
    }
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar titulo="Panel Docente" menuEstructurado={menuDocenteEstructurado} />

      <div className="dashboard-viewport">
        <Header />
        
        <main className="main-content-body">
          {vistaActual === 'inicio' && (
            <>
              <h2>Bienvenido, Docente {rol}</h2> 
              <p className="dashboard-subtitle">Panel de control para la gestión de tutorías y horarios.</p>
              
              <div className="dashboard-grid">
                
                <section className="dashboard-card-panel">
                  <h3>Solicitudes Pendientes por Revisar</h3>
                  
                  {/* Filtramos para mostrar SOLO las pendientes */}
                  {listaSolicitudes.filter(t => t.estado === 'Pendiente').length === 0 ? (
                    <div className="empty-state">
                      No tienes solicitudes pendientes de revisión en este momento.
                    </div>
                  ) : (
                    <div className="lista-tutorias-programadas">
                      {listaSolicitudes
                        .filter(t => t.estado === 'Pendiente')
                        .map((tutoria) => (
                        <div key={tutoria.id} className="tutoria-item">
                          <strong>{tutoria.asignatura}</strong>
                          <p className="tutoria-info">
                            <i className="bi bi-calendar-event"></i> {tutoria.fecha} | <i className="bi bi-clock"></i> {tutoria.hora}
                          </p>
                          <p className="tutoria-info" style={{ marginTop: '5px', fontStyle: 'italic' }}>
                            Motivo: {tutoria.motivo}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
                
                <aside className="dashboard-card-panel">
                  <h3>Acciones rápidas</h3>
                  <div className="quick-actions-list">
                    <button 
                      className="btn-quick-action primary" 
                      onClick={() => setVistaActual('solicitudes')}
                    >
                      Atender Solicitudes
                    </button>
                    <button 
                      className="btn-quick-action" 
                      onClick={() => setVistaActual('horarios')}
                    >
                      Gestionar Horarios
                    </button>
                    <button 
                      className="btn-quick-action" 
                      onClick={() => setVistaActual('bitacoras')}
                    >
                      Registrar Bitácoras
                    </button>
                  </div>
                </aside>

              </div>
            </>
          )}

          {vistaActual === 'solicitudes' && <GestionSolicitudes />}
          {vistaActual === 'horarios' && <GestionHorarios />}
          {vistaActual === 'bitacoras' && <Bitacoras />}
          {vistaActual === 'calendario' && <Calendario />}

        </main>
      </div>
    </div>
  );
}