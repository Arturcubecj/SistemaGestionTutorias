import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import ReporteTutorias from "../../components/administrador/inicio/ReporteTutorias";
import GestionUsuarios from "../../components/administrador/inicio/GestionUsuarios";
import MetricasIA from "../../components/administrador/inicio/MetricasIA";

export default function AdminDashboard() {
  const [rol, setRol] = useState("");
  const [modalAbierto, setModalAbierto] = useState(null); // 'reportes' | 'usuarios' | 'metricas'

  const menuAdminEstructurado = [
    {
      categoria: "GENERAL",
      items: [
        {
          nombre: "Inicio",
          ruta: "/dashboards/administrador",
          icono: "bi-house-door",
        },
      ],
    },
    {
      categoria: "ADMINISTRACIÓN ACADÉMICA",
      items: [
        {
          nombre: "Facultades",
          ruta: "/dashboards/administrador/facultades",
          icono: "bi-building",
        },
        {
          nombre: "Carreras",
          ruta: "/dashboards/administrador/carreras",
          icono: "bi-diagram-3",
        },
        {
          nombre: "Asignaturas",
          ruta: "/dashboards/administrador/asignaturas",
          icono: "bi-book",
        },
        {
          nombre: "Periodos Académicos",
          ruta: "/dashboards/administrador/periodos",
          icono: "bi-calendar3",
        },
        {
          nombre: "Docentes",
          ruta: "/dashboards/administrador/docentes",
          icono: "bi-person-badge",
        },
        {
          nombre: "Estudiantes",
          ruta: "/dashboards/administrador/estudiantes",
          icono: "bi-people",
        },
      ],
    },
    // {
    //   categoria: 'SEGURIDAD',
    //   items: [
    //     { nombre: 'Usuarios', ruta: '/dashboards/administrador/usuarios', icono: 'bi-person-gear' },
    //     { nombre: 'Roles y Permisos', ruta: '/dashboards/administrador/roles', icono: 'bi-shield-lock' },
    //     { nombre: 'Auditoría', ruta: '/dashboards/administrador/auditoria', icono: 'bi-journal-text' },
    //   ]
    // },
    {
      categoria: "TUTORÍAS",
      items: [
        {
          nombre: "Supervisar Tutorías",
          ruta: "/dashboards/administrador/tutorias",
          icono: "bi-calendar-check",
        },
        {
          nombre: "Reportes",
          ruta: "/dashboards/administrador/reportes",
          icono: "bi-file-earmark-bar-graph",
        },
      ],
    },
    {
      categoria: "AGENTE IA",
      items: [
        {
          nombre: "Métricas de uso IA",
          ruta: "/dashboards/administrador/metricas",
          icono: "bi-graph-up",
        },
        {
          nombre: "Preguntas Frecuentes",
          ruta: "/dashboards/administrador/faq",
          icono: "bi-question-circle",
        },
        {
          nombre: "Base de Conocimiento",
          ruta: "/dashboards/administrador/conocimiento",
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
      <Sidebar titulo="Menu" menuEstructurado={menuAdminEstructurado} />

      <div className="dashboard-viewport">
        <Header />
        <main className="main-content-body">
          <h2>Hola, bienvenido {rol}</h2>
          <p className="dashboard-subtitle">
            Panel de control para la administración del sistema de tutorías.
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
