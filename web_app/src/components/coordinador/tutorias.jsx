import { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Modal from "../Modal";
import EliminarTutoria from "../administrador/tutorias/supervicion/EliminarTutoria";
import DetalleTutoria from "../administrador/tutorias/supervicion/DetalleTutoria";

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

const tutoriasIniciales = [
  {
    id: 1,
    estudiante: "Ana Torres",
    docente: "Ing. Carlos Martínez",
    asignatura: "Desarrollo de Aplicaciones Web",
    fecha: "2026-06-20",
    hora: "09:00",
    tipo: "Individual",
    estado: "Atendida",
    observaciones: "El estudiante comprendió los conceptos de React hooks.",
  },
  {
    id: 2,
    estudiante: "Luis Pérez",
    docente: "Dra. Laura Cedeño",
    asignatura: "Bases de Datos Relacionales",
    fecha: "2026-06-21",
    hora: "10:30",
    tipo: "Individual",
    estado: "Confirmada",
    observaciones: "",
  },
  {
    id: 3,
    estudiante: "María Gómez",
    docente: "Ing. Carlos Martínez",
    asignatura: "Calidad de Software",
    fecha: "2026-06-22",
    hora: "14:00",
    tipo: "Grupal",
    estado: "Pendiente",
    observaciones: "",
  },
  {
    id: 4,
    estudiante: "Jorge Lema",
    docente: "Dra. Laura Cedeño",
    asignatura: "Bases de Datos Relacionales",
    fecha: "2026-06-23",
    hora: "11:00",
    tipo: "Individual",
    estado: "Cancelada",
    observaciones:
      "El estudiante canceló con menos de 24 horas de anticipación.",
  },
  {
    id: 5,
    estudiante: "Carla Ríos",
    docente: "Mg. Juan Mora",
    asignatura: "Desarrollo de Aplicaciones Web",
    fecha: "2026-06-25",
    hora: "08:00",
    tipo: "Individual",
    estado: "Solicitada",
    observaciones: "",
  },
  {
    id: 6,
    estudiante: "Pedro Suárez",
    docente: "Ing. Carlos Martínez",
    asignatura: "Calidad de Software",
    fecha: "2026-06-18",
    hora: "15:00",
    tipo: "Grupal",
    estado: "No asistida",
    observaciones: "El estudiante no se presentó a la tutoría confirmada.",
  },
];

const todosEstados = [
  "Todos",
  "Solicitada",
  "Pendiente",
  "Confirmada",
  "Atendida",
  "Cancelada",
  "No asistida",
];

export default function TutoriasPage() {
  const [tutorias, setTutorias] = useState(tutoriasIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [modalAbierto, setModalAbierto] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);

  const tutoriasFiltradas = tutorias.filter((t) => {
    const coincideBusqueda =
      t.estudiante.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.docente.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.asignatura.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado =
      filtroEstado === "Todos" || t.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });

  const abrirDetalle = (t) => {
    setSeleccionado(t);
    setModalAbierto("detalle");
  };
  const abrirEliminar = (t) => {
    setSeleccionado(t);
    setModalAbierto("eliminar");
  };
  const cerrarModal = () => {
    setModalAbierto(null);
    setSeleccionado(null);
  };

  const manejarEliminar = () => {
    setTutorias((prev) => prev.filter((t) => t.id !== seleccionado.id));
    cerrarModal();
  };

  return (
    <div className="dashboard-layout">
      <Sidebar titulo="Menu" menuEstructurado={menuCoordinadorEstructurado} />

      <div className="dashboard-viewport">
        <Header />
        <main className="main-content-body">
          {/* Encabezado */}
          <div className="tutorias-header">
            <div>
              <h2 className="tutorias-title">Supervisar Tutorías</h2>

              <p className="tutorias-subtitle">
                Seguimiento y control de todas las tutorías del sistema.
              </p>
            </div>
          </div>

          {/* Toolbar */}
          <div className="tutorias-toolbar">
            {/* Filtros */}
            <div className="estado-filtros">
              {todosEstados.map((estado) => (
                <button
                  key={estado}
                  onClick={() => setFiltroEstado(estado)}
                  className={`filtro-estado-btn ${
                    filtroEstado === estado
                      ? `activo estado-${estado
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`
                      : ""
                  }`}
                >
                  {estado}
                </button>
              ))}
            </div>

            {/* Buscador */}
            <div className="tutorias-search-box">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Buscar tutoría..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="tutorias-search-input"
              />
            </div>
          </div>

          {/* Tabla */}
          <div className="tutorias-table-wrapper">
            <table className="tutorias-table">
              <thead>
                <tr>
                  {[
                    "#",
                    "Estudiante",
                    "Docente",
                    "Asignatura",
                    "Fecha",
                    "Hora",
                    "Tipo",
                    "Estado",
                    "Acciones",
                  ].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {tutoriasFiltradas.length > 0 ? (
                  tutoriasFiltradas.map((t, i) => (
                    <tr key={t.id}>
                      <td>{i + 1}</td>

                      <td className="estudiante-cell">{t.estudiante}</td>

                      <td>{t.docente}</td>
                      <td>{t.asignatura}</td>
                      <td>{t.fecha}</td>
                      <td>{t.hora}</td>

                      <td>
                        <span
                          className={`tipo-badge ${
                            t.tipo === "Individual"
                              ? "tipo-individual"
                              : "tipo-grupal"
                          }`}
                        >
                          {t.tipo}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`estado-badge estado-${t.estado
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {t.estado}
                        </span>
                      </td>

                      <td>
                        <div className="acciones-container">
                          <button
                            onClick={() => abrirDetalle(t)}
                            title="Ver detalle"
                            className="btn-icon btn-ver"
                          >
                            <i className="bi bi-eye"></i>
                          </button>

                          <button
                            onClick={() => abrirEliminar(t)}
                            title="Eliminar"
                            className="btn-icon btn-eliminar"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="empty-state-table">
                      No se encontraron tutorías.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <Modal
        isOpen={modalAbierto === "detalle"}
        onClose={cerrarModal}
        titulo="Detalle de Tutoría"
      >
        <DetalleTutoria tutoria={seleccionado} onCerrar={cerrarModal} />
      </Modal>

      <Modal
        isOpen={modalAbierto === "eliminar"}
        onClose={cerrarModal}
        titulo="Eliminar Tutoría"
      >
        <EliminarTutoria
          tutoria={seleccionado}
          onConfirmar={manejarEliminar}
          onCancelar={cerrarModal}
        />
      </Modal>
    </div>
  );
}
