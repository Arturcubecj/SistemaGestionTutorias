import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import ReporteTutorias from "../../components/administrador/inicio/ReporteTutorias";
import GestionUsuarios from "../../components/administrador/inicio/GestionUsuarios";
import MetricasIA from "../../components/administrador/inicio/MetricasIA";
//Componentes de cada página
import Facultades from "../../components/administrador/Facultades";
import Carreras from "../../components/administrador/Carreras";
import Asignaturas from "../../components/administrador/Asignaturas";
import Periodos from "../../components/administrador/periodos";
import Docentes from "../../components/administrador/docentes";
import Estudiantes from "../../components/administrador/Estudiantes";
import SupervisarTutorias from "../../components/administrador/Tutorias";
import Reportes from "../../components/administrador/Reportes";
import MetricasUsoIA from "../../components/administrador/Metricas";
import PreguntasFrecuentes from "../../components/administrador/Faq";
import BaseConocimiento from "../../components/administrador/Conocimiento";

export default function AdminDashboard() {
  const [rol, setRol] = useState("");
  const [modalAbierto, setModalAbierto] = useState(null);
  const [vistaActual, setVistaActual] = useState("inicio");

  const menuAdminEstructurado = [
    {
      categoria: "GENERAL",
      items: [
        {
          nombre: "Inicio",
          ruta: "#",
          icono: "bi-house-door",
          accion: () => setVistaActual("inicio"),
        },
      ],
    },
    {
      categoria: "ADMINISTRACIÓN ACADÉMICA",
      items: [
        {
          nombre: "Facultades",
          ruta: "#",
          icono: "bi-building",
          accion: () => setVistaActual("facultades"),
        },
        {
          nombre: "Carreras",
          ruta: "#",
          icono: "bi-diagram-3",
          accion: () => setVistaActual("carreras"),
        },
        {
          nombre: "Asignaturas",
          ruta: "#",
          icono: "bi-book",
          accion: () => setVistaActual("asignaturas"),
        },
        {
          nombre: "Periodos Académicos",
          ruta: "#",
          icono: "bi-calendar3",
          accion: () => setVistaActual("periodos"),
        },
        {
          nombre: "Docentes",
          ruta: "#",
          icono: "bi-person-badge",
          accion: () => setVistaActual("docentes"),
        },
        {
          nombre: "Estudiantes",
          ruta: "#",
          icono: "bi-people",
          accion: () => setVistaActual("estudiantes"),
        },
      ],
    },
    {
      categoria: "TUTORÍAS",
      items: [
        {
          nombre: "Supervisar Tutorías",
          ruta: "#",
          icono: "bi-calendar-check",
          accion: () => setVistaActual("supervisar"),
        },
        {
          nombre: "Reportes",
          ruta: "#",
          icono: "bi-file-earmark-bar-graph",
          accion: () => setVistaActual("reportes"),
        },
      ],
    },
    {
      categoria: "AGENTE IA",
      items: [
        {
          nombre: "Métricas de uso IA",
          ruta: "#",
          icono: "bi-graph-up",
          accion: () => setVistaActual("metricas-ia"),
        },
        {
          nombre: "Preguntas Frecuentes",
          ruta: "#",
          icono: "bi-question-circle",
          accion: () => setVistaActual("faq"),
        },
        {
          nombre: "Base de Conocimiento",
          ruta: "#",
          icono: "bi-database",
          accion: () => setVistaActual("conocimiento"),
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

          {vistaActual === "inicio" && (
            <>
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
            </>
          )}

          {vistaActual === "facultades" && <Facultades />}
          {vistaActual === "carreras" && <Carreras />}
          {vistaActual === "asignaturas" && <Asignaturas />}
          {vistaActual === "periodos" && <Periodos />}
          {vistaActual === "docentes" && <Docentes />}
          {vistaActual === "estudiantes" && <Estudiantes />}
          {vistaActual === "supervisar" && <SupervisarTutorias />}
          {vistaActual === "reportes" && <Reportes />}
          {vistaActual === "metricas-ia" && <MetricasUsoIA />}
          {vistaActual === "faq" && <PreguntasFrecuentes />}
          {vistaActual === "conocimiento" && <BaseConocimiento />}

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