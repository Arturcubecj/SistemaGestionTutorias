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

export default function Admin() {
  const router = useRouter();

  const cerrarSesion = (): void => {
    localStorage.clear();
    router.replace('/login');
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar-simple">
        <h3>DOCENTE</h3>
        <button className="btn-salir" onClick={cerrarSesion}>
          Cerrar Sesión
        </button>
      </aside>
      <main className="main-simple">
        <h1>Panel de DOCENTE</h1>
      </main>
    </div>
  );
}
