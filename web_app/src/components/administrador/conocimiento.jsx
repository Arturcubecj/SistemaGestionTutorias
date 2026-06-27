import { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Modal from "../Modal";
import FormularioDocumento from "./agente/bdconocimiento/FormularioDocumento";
import EliminarDocumento from "./agente/bdconocimiento/EliminarDocumento";
import VistaDocumento from "./agente/bdconocimiento/VistaDocumento";

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

const documentosIniciales = [
  {
    id: 1,
    titulo: "Reglamento de Tutorías Académicas",
    descripcion:
      "Documento oficial con las normas y procedimientos para solicitar, confirmar y cancelar tutorías académicas.",
    categoria: "Reglamentos",
    contenido:
      "El presente reglamento establece las normas generales para la gestión de tutorías académicas. Todo estudiante podrá solicitar tutorías en las asignaturas en las que esté matriculado. Las solicitudes deberán realizarse con al menos 48 horas de anticipación. El docente tiene un plazo de 24 horas para confirmar o rechazar la solicitud. Las cancelaciones deberán realizarse con al menos 24 horas de anticipación para no generar registro de inasistencia.",
    estado: "Activo",
    fecha: "2026-05-10",
  },
  {
    id: 2,
    titulo: "Guía de uso del Sistema de Tutorías",
    descripcion:
      "Manual de usuario para estudiantes sobre cómo usar la plataforma de tutorías académicas.",
    categoria: "Manuales",
    contenido:
      'Para acceder al sistema de tutorías deberá ingresar con sus credenciales institucionales. Una vez autenticado, dirígase al módulo "Solicitar tutoría". Seleccione la asignatura, el docente y el horario disponible. Complete el campo de motivo y envíe su solicitud. Podrá hacer seguimiento desde el módulo "Historial".',
    estado: "Activo",
    fecha: "2026-05-12",
  },
  {
    id: 3,
    titulo: "Política de Asistencia a Tutorías",
    descripcion:
      "Política institucional sobre las consecuencias de inasistencias reiteradas a tutorías confirmadas.",
    categoria: "Políticas",
    contenido:
      "La inasistencia a una tutoría confirmada sin cancelación previa quedará registrada en el historial del estudiante. Tres inasistencias consecutivas sin justificación podrán derivar en la suspensión temporal del servicio de tutorías por el periodo académico en curso. El estudiante podrá apelar ante el coordinador académico.",
    estado: "Activo",
    fecha: "2026-05-15",
  },
  {
    id: 4,
    titulo: "Canales de Atención Académica",
    descripcion:
      "Información sobre los canales oficiales de atención y contacto para estudiantes y docentes.",
    categoria: "Información General",
    contenido:
      "Los estudiantes pueden comunicarse con el área académica a través del sistema de tutorías, el correo institucional o en persona en las oficinas de coordinación académica de cada facultad. El horario de atención es de lunes a viernes de 08:00 a 17:00.",
    estado: "Inactivo",
    fecha: "2026-04-20",
  },
];

const categoriasDisponibles = [
  "Reglamentos",
  "Manuales",
  "Políticas",
  "Información General",
  "Procesos",
  "Otros",
];

const colorCategoria = {
  Reglamentos: { bg: "#dbeafe", color: "#1d4ed8" },
  Manuales: { bg: "#dcfce7", color: "#16a34a" },
  Políticas: { bg: "#fef9c3", color: "#a16207" },
  "Información General": { bg: "#ede9fe", color: "#7c3aed" },
  Procesos: { bg: "#f0f9ff", color: "#0369a1" },
  Otros: { bg: "#f1f5f9", color: "#475569" },
};

const formVacio = {
  titulo: "",
  descripcion: "",
  categoria: "General",
  contenido: "",
  estado: "Activo",
};

export default function BaseConocimientoPage() {
  const [documentos, setDocumentos] = useState(documentosIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [modalAbierto, setModalAbierto] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);
  const [formData, setFormData] = useState(formVacio);

  const categorias = ["Todos", ...new Set(documentos.map((d) => d.categoria))];

  const documentosFiltrados = documentos.filter((d) => {
    const coincideBusqueda =
      d.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      d.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      d.contenido.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria =
      filtroCategoria === "Todos" || d.categoria === filtroCategoria;
    return coincideBusqueda && coincideCategoria;
  });

  const abrirCrear = () => {
    setFormData(formVacio);
    setModalAbierto("crear");
  };
  const abrirEditar = (d) => {
    setSeleccionado(d);
    setFormData({
      titulo: d.titulo,
      descripcion: d.descripcion,
      categoria: d.categoria,
      contenido: d.contenido,
      estado: d.estado,
    });
    setModalAbierto("editar");
  };
  const abrirEliminar = (d) => {
    setSeleccionado(d);
    setModalAbierto("eliminar");
  };
  const abrirVista = (d) => {
    setSeleccionado(d);
    setModalAbierto("vista");
  };
  const cerrarModal = () => {
    setModalAbierto(null);
    setSeleccionado(null);
    setFormData(formVacio);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const manejarCrear = (e) => {
    e.preventDefault();
    setDocumentos((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...formData,
        fecha: new Date().toISOString().split("T")[0],
      },
    ]);
    cerrarModal();
  };

  const manejarEditar = (e) => {
    e.preventDefault();
    setDocumentos((prev) =>
      prev.map((d) => (d.id === seleccionado.id ? { ...d, ...formData } : d)),
    );
    cerrarModal();
  };

  const manejarEliminar = () => {
    setDocumentos((prev) => prev.filter((d) => d.id !== seleccionado.id));
    cerrarModal();
  };

  return (
    <div className="dashboard-layout">
      <Sidebar titulo="Menu" menuEstructurado={menuAdminEstructurado} />

      <div className="dashboard-viewport" style={{ flex: 1, minWidth: 0, overflowX: "hidden" }}>
        <Header />
        <main className="main-content-body">
          {/* Encabezado */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "24px",
            }}
          >
            <div>
              <h2 style={{ margin: 0 }}>Base de Conocimiento</h2>
              <p
                style={{ color: "#64748b", marginTop: "4px", marginBottom: 0 }}
              >
                Documentos institucionales que usa el agente de IA para
                responder consultas.
              </p>
            </div>
            <button
              onClick={abrirCrear}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#d4af37",
                color: "#1e293b",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              <i className="bi bi-plus-lg"></i> Nuevo Documento
            </button>
          </div>

          {/* Toolbar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFiltroCategoria(cat)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "999px",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    border:
                      filtroCategoria === cat ? "none" : "1px solid #e2e8f0",
                    background: filtroCategoria === cat ? "#1a1740" : "white",
                    color: filtroCategoria === cat ? "white" : "#475569",
                    transition: "all 0.2s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "8px 14px",
                width: "280px",
                color: "#64748b",
              }}
            >
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Buscar documento..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  fontSize: "0.9rem",
                  color: "#334155",
                  background: "transparent",
                }}
              />
            </div>
          </div>

          {/* Tarjetas */}
          {documentosFiltrados.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "16px",
              }}
            >
              {documentosFiltrados.map((d) => (
                <div
                  key={d.id}
                  style={{
                    background: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {/* Header tarjeta */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          background: "#ede9fe",
                          color: "#7c3aed",
                          borderRadius: "8px",
                          width: "38px",
                          height: "38px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1rem",
                          flexShrink: 0,
                        }}
                      >
                        <i className="bi bi-file-earmark-text"></i>
                      </div>
                      <div>
                        <h4
                          style={{
                            margin: 0,
                            color: "#0f172a",
                            fontSize: "0.95rem",
                            fontWeight: 600,
                          }}
                        >
                          {d.titulo}
                        </h4>
                        <p
                          style={{
                            margin: "4px 0 0",
                            color: "#64748b",
                            fontSize: "0.82rem",
                          }}
                        >
                          {d.descripcion}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "999px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        background:
                          colorCategoria[d.categoria]?.bg || "#f1f5f9",
                        color: colorCategoria[d.categoria]?.color || "#475569",
                      }}
                    >
                      {d.categoria}
                    </span>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "999px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        background:
                          d.estado === "Activo" ? "#dcfce7" : "#fee2e2",
                        color: d.estado === "Activo" ? "#16a34a" : "#dc2626",
                      }}
                    >
                      {d.estado}
                    </span>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "999px",
                        fontSize: "0.75rem",
                        color: "#94a3b8",
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <i
                        className="bi bi-calendar3"
                        style={{ marginRight: "4px" }}
                      ></i>
                      {d.fecha}
                    </span>
                  </div>

                  {/* Vista previa contenido */}
                  <p
                    style={{
                      margin: 0,
                      color: "#475569",
                      fontSize: "0.85rem",
                      lineHeight: "1.5",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {d.contenido}
                  </p>

                  {/* Acciones */}
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginTop: "4px",
                      borderTop: "1px solid #f1f5f9",
                      paddingTop: "12px",
                    }}
                  >
                    <button
                      onClick={() => abrirVista(d)}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        padding: "8px",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        background: "white",
                        cursor: "pointer",
                        color: "#6366f1",
                        fontWeight: 600,
                        fontSize: "0.82rem",
                      }}
                    >
                      <i className="bi bi-eye"></i> Ver
                    </button>
                    <button
                      onClick={() => abrirEditar(d)}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        padding: "8px",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        background: "white",
                        cursor: "pointer",
                        color: "#3b82f6",
                        fontWeight: 600,
                        fontSize: "0.82rem",
                      }}
                    >
                      <i className="bi bi-pencil"></i> Editar
                    </button>
                    <button
                      onClick={() => abrirEliminar(d)}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        padding: "8px",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        background: "white",
                        cursor: "pointer",
                        color: "#ef4444",
                        fontWeight: 600,
                        fontSize: "0.82rem",
                      }}
                    >
                      <i className="bi bi-trash"></i> Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "60px",
                color: "#94a3b8",
                background: "white",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              No se encontraron documentos.
            </div>
          )}
        </main>
      </div>

      <Modal
        isOpen={modalAbierto === "crear"}
        onClose={cerrarModal}
        titulo="Nuevo Documento"
      >
        <FormularioDocumento
          formData={formData}
          onChange={manejarCambio}
          onSubmit={manejarCrear}
          onCancelar={cerrarModal}
          textoBoton="Guardar"
          categorias={categoriasDisponibles}
        />
      </Modal>

      <Modal
        isOpen={modalAbierto === "editar"}
        onClose={cerrarModal}
        titulo="Editar Documento"
      >
        <FormularioDocumento
          formData={formData}
          onChange={manejarCambio}
          onSubmit={manejarEditar}
          onCancelar={cerrarModal}
          textoBoton="Guardar Cambios"
          categorias={categoriasDisponibles}
        />
      </Modal>

      <Modal
        isOpen={modalAbierto === "eliminar"}
        onClose={cerrarModal}
        titulo="Eliminar Documento"
      >
        <EliminarDocumento
          documento={seleccionado}
          onConfirmar={manejarEliminar}
          onCancelar={cerrarModal}
        />
      </Modal>

      <Modal
        isOpen={modalAbierto === "vista"}
        onClose={cerrarModal}
        titulo="Vista del Documento"
      >
        <VistaDocumento documento={seleccionado} onCerrar={cerrarModal} />
      </Modal>
    </div>
  );
}
