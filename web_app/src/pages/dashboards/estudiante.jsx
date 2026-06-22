import { useState, useEffect } from 'react'; 
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header'; 
import Modal from '../../components/Modal'; 
import FormularioTutoria from '../../components/estudiante/FormularioTutoria'; 

export default function EstudianteDashboard() {
  const [rol, setRol] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const menuEstudianteEstructurado = [
    {
      categoria: 'GENERAL',
      items: [
        { nombre: 'Inicio', ruta: '/dashboards/estudiante', icono: 'bi-house-door' },
        { nombre: 'Asistente IA', ruta: '/dashboards/estudiante/ia', icono: 'bi-cpu' }
      ]
    },
    {
      categoria: 'MIS TUTORÍAS',
      items: [
        { nombre: 'Solicitar tutoría', ruta: '#', icono: 'bi-plus-circle', accion: () => setIsModalOpen(true) },
        { nombre: 'Historial', ruta: '/dashboards/estudiante/historial', icono: 'bi-clock-history' },
        { nombre: 'Mis Reportes', ruta: '/dashboards/estudiante/reportes', icono: 'bi-file-earmark-bar-graph' }
      ]
    }
  ];

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      setRol(savedRole);
    }
  }, []);


  const manejarExitoSolicitud = () => {
    setIsModalOpen(false);
    alert("¡Solicitud enviada con éxito!");
  };

  return (
    <div className="dashboard-layout">
      <Sidebar titulo="Menu" menuEstructurado={menuEstudianteEstructurado} />

      <div className="dashboard-viewport">
        <Header />
        <main className="main-content-body">
          <h2>Hola, bienvenido {rol}</h2> 
          <p style={{ color: '#64748b', marginTop: '-5px' }}>Panel de control para la gestión de tus tutorías académicas.</p>

          <div className="dashboard-grid">

            {/* Panel de Estado actual */}
            <section className="dashboard-card-panel">
              <h3>Mis tutorías programadas</h3>
              <div className="empty-state">
                No tienes tutorías pendientes para esta semana.
              </div>
            </section>

            {/* Panel de Accesos Rápidos*/}
            <aside className="dashboard-card-panel">
              <h3>Acciones rápidas</h3>
              <div className="quick-actions-list">
                <button className="btn-quick-action primary" onClick={() => setIsModalOpen(true)}>
                  Solicitar nueva tutoría
                </button>
                <button className="btn-quick-action">Consultar al Asistente IA</button>
                <button className="btn-quick-action">Descargar certificados</button>
              </div>
            </aside>
          </div>
        </main>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        titulo="Nueva Solicitud de Tutoría"
      >
        <FormularioTutoria 
          onCancelar={() => setIsModalOpen(false)} 
          onExito={manejarExitoSolicitud} 
        />
      </Modal>
    </div>
  );
}