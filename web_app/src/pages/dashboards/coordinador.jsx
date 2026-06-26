import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import ReporteTutorias from "../../components/coordinador/inicio/ReporteTutorias";
import GestionUsuarios from "../../components/coordinador/inicio/GestionUsuarios";
import MetricasIA from "../../components/coordinador/inicio/MetricasIA";

export default function CoordinadorDashboard() {
  const [rol, setRol] = useState("");
  const [modalAbierto, setModalAbierto] = useState(null); // 'reportes' | 'usuarios' | 'metricas'

  const menuCoordinadorEstructurado = [
    {
      categoria: "GENERAL",
      items: [
        {
          nombre: "Inicio",
          ruta: "/dashboards/coordinador",
          icono: "bi-house-door",
        },
      ],
    },
    {
      categoria: "ADMINISTRACIÓN ACADÉMICA",
      items: [
        {
          nombre: "Docentes",
          ruta: "/dashboards/coordinador/docentes",
          icono: "bi-person-badge",
        },
        {
          nombre: "Estudiantes",
          ruta: "/dashboards/coordinador/estudiantes",
          icono: "bi-people",
        },
        {
          nombre: "Asignaturas",
          ruta: "/dashboards/coordinador/asignaturas",
          icono: "bi-book",
        },
        {
          nombre: "Paralelos",
          ruta: "/dashboards/coordinador/paralelos",
          icono: "bi-diagram-3",
        },
        {
          nombre: "Periodos Académicos",
          ruta: "/dashboards/coordinador/periodos",
          icono: "bi-calendar3",
        },
      ],
    },
    {
      categoria: "TUTORÍAS",
      items: [
        {
          nombre: "Supervisar Tutorías",
          ruta: "/dashboards/coordinador/tutorias",
          icono: "bi-calendar-check",
        },
        {
          nombre: "Reportes",
          ruta: "/dashboards/coordinador/reportes",
          icono: "bi-file-earmark-bar-graph",
        },
        {
          nombre: "Casos Escalados",
          ruta: "/dashboards/coordinador/casos-escalados",
          icono: "bi-exclamation-circle",
        },
      ],
    },
    {
      categoria: "AGENTE IA",
      items: [
        {
          nombre: "Métricas de uso IA",
          ruta: "/dashboards/coordinador/metricas",
          icono: "bi-graph-up",
        },
        {
          nombre: "Preguntas Frecuentes",
          ruta: "/dashboards/coordinador/faq",
          icono: "bi-question-circle",
        },
        {
          nombre: "Base de Conocimiento",
          ruta: "/dashboards/coordinador/conocimiento",
          icono: "bi-database",
        },
      ],
    },
  ];

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) setRol(savedRole);
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar titulo="Menu" menuEstructurado={menuCoordinadorEstructurado} />

      <div className="dashboard-viewport">
        <Header />
        <main className="main-content-body">
          <h2>Hola, bienvenido {rol}</h2>
          <p className="dashboard-subtitle">
            Panel de control para la coordinación del sistema de tutorías.
          </p>

          <div className="dashboard-grid">
            <section className="dashboard-card-panel">
              <h3>Resumen del sistema</h3>
              <div className="empty-state">
                No hay datos disponibles en este momento.
              </div>
            </section>

            <aside className="dashboard-card-panel">
              <h3>Acciones rápidas</h3>
              <div className="quick-actions-list">
                <button
                  className="btn-quick-action primary"
                  onClick={() => setModalAbierto("reportes")}
                >
                  Ver reportes de tutorías
                </button>
                <button
                  className="btn-quick-action"
                  onClick={() => setModalAbierto("usuarios")}
                >
                  Gestionar usuarios
                </button>
                <button
                  className="btn-quick-action"
                  onClick={() => setModalAbierto("metricas")}
                >
                  Métricas del Agente IA
                </button>
              </div>
            </aside>
          </div>
        </main>
      </div>

      <Modal
        isOpen={modalAbierto === "reportes"}
        onClose={() => setModalAbierto(null)}
        titulo="Reporte de Tutorías"
      >
        <ReporteTutorias onCancelar={() => setModalAbierto(null)} />
      </Modal>

      <Modal
        isOpen={modalAbierto === "usuarios"}
        onClose={() => setModalAbierto(null)}
        titulo="Gestión de Usuarios"
      >
        <GestionUsuarios onCancelar={() => setModalAbierto(null)} />
      </Modal>

      <Modal
        isOpen={modalAbierto === "metricas"}
        onClose={() => setModalAbierto(null)}
        titulo="Métricas del Agente IA"
      >
        <MetricasIA onCancelar={() => setModalAbierto(null)} />
      </Modal>
    </div>
  );
}
