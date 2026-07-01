import { useState, useEffect } from 'react'; 
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header'; 
import Modal from '../../components/Modal';
import FormularioSolicitud from '../../components/estudiante/FormularioTutoria'; 
import Historial from '../../components/estudiante/Historial'; 
import Reportes from '../../components/estudiante/Reportes'; 
import Calendario from '../../components/estudiante/Calendario';

export interface Tutoria {
  id: number;
  asignatura: string;
  fecha: string;
  hora: string;
  motivo: string;
  docente: string;
  estado: string;
}

export default function EstudianteDashboard() {
  const [rol, setRol] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
  const [vistaActual, setVistaActual] = useState<string>('inicio'); 
  const [listaSolicitudes, setListaSolicitudes] = useState<Tutoria[]>([]);

  const menuEstudianteEstructurado = [
    {
      categoria: 'GENERAL',
      items: [
        { nombre: 'Inicio', ruta: '#', icono: 'bi-house-door', accion: () => setVistaActual('inicio') },
        { nombre: 'Asistente IA', ruta: '/dashboards/estudiante/ia', icono: 'bi-cpu' }
      ]
    },
    {
      categoria: 'TUTORÍAS',
      items: [
        { nombre: 'Nueva Solicitud', ruta: '#', icono: 'bi-plus-circle', accion: () => setIsModalOpen(true) },
        { nombre: 'Calendario', ruta: '#', icono: 'bi-calendar-event', accion: () => setVistaActual('calendario')},
        { nombre: 'Historial', ruta: '#', icono: 'bi-clock-history', accion: () => setVistaActual('historial') },
        { nombre: 'Mis Reportes', ruta: '#', icono: 'bi-file-earmark-bar-graph', accion: () => setVistaActual('reportes') }
      ]
    }
  ];

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) setRol(savedRole);

    const guardadas = localStorage.getItem('tutorias_locales');
    if (guardadas) {
      setListaSolicitudes(JSON.parse(guardadas));
    }
  }, []);

  const manejarExitoSolicitud = (datosFormulario: any) => {
    const nuevaTutoria: Tutoria = {
      id: Date.now(),
      asignatura: datosFormulario?.asignatura || 'Materia Seleccionada',
      fecha: datosFormulario?.fecha || 'Sin fecha',
      hora: datosFormulario?.hora || 'Sin hora',       
      motivo: datosFormulario?.motivo || 'Sin motivo especificado', 
      docente: 'No asignado',
      estado: 'Pendiente'
    };

    const nuevaLista = [nuevaTutoria, ...listaSolicitudes];
    setListaSolicitudes(nuevaLista);
    localStorage.setItem('tutorias_locales', JSON.stringify(nuevaLista));

    setIsModalOpen(false);
    alert("¡Solicitud enviada con éxito! Revisa la pestaña Historial.");
  };

  const cancelarSolicitud = (idTutoria: number) => {
    const nuevaLista = listaSolicitudes.filter(solicitud => solicitud.id !== idTutoria);
    setListaSolicitudes(nuevaLista);
    localStorage.setItem('tutorias_locales', JSON.stringify(nuevaLista));
    alert("La solicitud ha sido cancelada.");
  };

  return (
    <div className="dashboard-layout">
      <Sidebar titulo="Menu" menuEstructurado={menuEstudianteEstructurado} />

      <div className="dashboard-viewport">
        <Header />
        <main className="main-content-body">
          
          {vistaActual === 'inicio' && (
            <>
              <h2>Hola, bienvenido {rol}</h2> 
              <p className="dashboard-subtitle">Panel de control para la gestión de tus tutorías académicas.</p>
              <div className="dashboard-grid">
                <section className="dashboard-card-panel">
                  <h3>Mis tutorías programadas</h3>
                  <div className="empty-state">No tienes tutorías pendientes para esta semana.</div>
                </section>
                <aside className="dashboard-card-panel">
                  <h3>Acciones rápidas</h3>
                  <div className="quick-actions-list">
                    <button className="btn-quick-action primary" onClick={() => setIsModalOpen(true)}>Solicitar nueva tutoría</button>
                    <button className="btn-quick-action" onClick={() => setVistaActual('historial')}>Consultar mi Historial</button>
                  </div>
                </aside>
              </div>
            </>
          )}

          {vistaActual === 'historial' && (
            <Historial solicitudes={listaSolicitudes} onCancelarSolicitud={cancelarSolicitud} />
          )}
          {vistaActual === 'reportes' && (
            <Reportes solicitudes={listaSolicitudes} />
          )}
          {vistaActual === 'calendario' && (
            <Calendario solicitudes={listaSolicitudes} />
          )}
        </main>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} titulo="Nueva Solicitud de Tutoría">
        <FormularioSolicitud onCancelar={() => setIsModalOpen(false)} onExito={manejarExitoSolicitud} />
      </Modal>
    </div>
  );
}