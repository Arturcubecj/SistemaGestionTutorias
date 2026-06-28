import { useState } from "react";
import Modal from "../Modal";
import FormularioDocumento from "./agente/bdconocimiento/FormularioDocumento";
import EliminarDocumento from "./agente/bdconocimiento/EliminarDocumento";
import VistaDocumento from "./agente/bdconocimiento/VistaDocumento";
 
const documentosIniciales = [
  {
    id: 1,
    titulo: "Reglamento de Tutorías Académicas",
    descripcion: "Documento oficial con las normas y procedimientos para solicitar, confirmar y cancelar tutorías académicas.",
    categoria: "Reglamentos",
    contenido: "El presente reglamento establece las normas generales para la gestión de tutorías académicas. Todo estudiante podrá solicitar tutorías en las asignaturas en las que esté matriculado. Las solicitudes deberán realizarse con al menos 48 horas de anticipación. El docente tiene un plazo de 24 horas para confirmar o rechazar la solicitud. Las cancelaciones deberán realizarse con al menos 24 horas de anticipación para no generar registro de inasistencia.",
    estado: "Activo",
    fecha: "2026-05-10",
  },
  {
    id: 2,
    titulo: "Guía de uso del Sistema de Tutorías",
    descripcion: "Manual de usuario para estudiantes sobre cómo usar la plataforma de tutorías académicas.",
    categoria: "Manuales",
    contenido: 'Para acceder al sistema de tutorías deberá ingresar con sus credenciales institucionales. Una vez autenticado, dirígase al módulo "Solicitar tutoría". Seleccione la asignatura, el docente y el horario disponible. Complete el campo de motivo y envíe su solicitud. Podrá hacer seguimiento desde el módulo "Historial".',
    estado: "Activo",
    fecha: "2026-05-12",
  },
  {
    id: 3,
    titulo: "Política de Asistencia a Tutorías",
    descripcion: "Política institucional sobre las consecuencias de inasistencias reiteradas a tutorías confirmadas.",
    categoria: "Políticas",
    contenido: "La inasistencia a una tutoría confirmada sin cancelación previa quedará registrada en el historial del estudiante. Tres inasistencias consecutivas sin justificación podrán derivar en la suspensión temporal del servicio de tutorías por el periodo académico en curso. El estudiante podrá apelar ante el coordinador académico.",
    estado: "Activo",
    fecha: "2026-05-15",
  },
  {
    id: 4,
    titulo: "Canales de Atención Académica",
    descripcion: "Información sobre los canales oficiales de atención y contacto para estudiantes y docentes.",
    categoria: "Información General",
    contenido: "Los estudiantes pueden comunicarse con el área académica a través del sistema de tutorías, el correo institucional o en persona en las oficinas de coordinación académica de cada facultad. El horario de atención es de lunes a viernes de 08:00 a 17:00.",
    estado: "Inactivo",
    fecha: "2026-04-20",
  },
];
 
const categoriasDisponibles = ["Reglamentos", "Manuales", "Políticas", "Información General", "Procesos", "Otros"];
 
const formVacio = { titulo: "", descripcion: "", categoria: "General", contenido: "", estado: "Activo" };
 
// Mapea categoría a clase CSS modificadora
const categoriaCssClass = {
  "Reglamentos":        "badge-cat--reglamentos",
  "Manuales":           "badge-cat--manuales",
  "Políticas":          "badge-cat--politicas",
  "Información General":"badge-cat--info-general",
  "Procesos":           "badge-cat--procesos",
  "Otros":              "badge-cat--otros",
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
    const coincideCategoria = filtroCategoria === "Todos" || d.categoria === filtroCategoria;
    return coincideBusqueda && coincideCategoria;
  });
 
  const abrirCrear = () => { setFormData(formVacio); setModalAbierto("crear"); };
  const abrirEditar = (d) => {
    setSeleccionado(d);
    setFormData({ titulo: d.titulo, descripcion: d.descripcion, categoria: d.categoria, contenido: d.contenido, estado: d.estado });
    setModalAbierto("editar");
  };
  const abrirEliminar = (d) => { setSeleccionado(d); setModalAbierto("eliminar"); };
  const abrirVista = (d) => { setSeleccionado(d); setModalAbierto("vista"); };
  const cerrarModal = () => { setModalAbierto(null); setSeleccionado(null); setFormData(formVacio); };
 
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const manejarCrear = (e) => {
    e.preventDefault();
    setDocumentos((prev) => [...prev, { id: Date.now(), ...formData, fecha: new Date().toISOString().split("T")[0] }]);
    cerrarModal();
  };
 
  const manejarEditar = (e) => {
    e.preventDefault();
    setDocumentos((prev) => prev.map((d) => (d.id === seleccionado.id ? { ...d, ...formData } : d)));
    cerrarModal();
  };
 
  const manejarEliminar = () => {
    setDocumentos((prev) => prev.filter((d) => d.id !== seleccionado.id));
    cerrarModal();
  };
 
  return (
    <div className="dashboard-layout">
      <div className="dashboard-viewport bc-viewport">
        <main className="main-content-body">
 
          {/* Encabezado */}
          <div className="bc-header">
            <div>
              <h2 className="bc-title">Base de Conocimiento</h2>
              <p className="bc-subtitle">Documentos institucionales que usa el agente de IA para responder consultas.</p>
            </div>
            <button className="btn-nuevo-doc" onClick={abrirCrear}>
              <i className="bi bi-plus-lg"></i> Nuevo Documento
            </button>
          </div>
 
          {/* Toolbar */}
          <div className="bc-toolbar">
            <div className="filtros-categoria">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFiltroCategoria(cat)}
                  className={`filtro-cat-btn ${filtroCategoria === cat ? "active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="search-box">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Buscar documento..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
 
          {/* Tarjetas */}
          {documentosFiltrados.length > 0 ? (
            <div className="doc-grid">
              {documentosFiltrados.map((d) => (
                <div key={d.id} className="doc-card">
 
                  {/* Header tarjeta */}
                  <div className="doc-card-header">
                    <div className="doc-card-info">
                      <div className="doc-card-icon">
                        <i className="bi bi-file-earmark-text"></i>
                      </div>
                      <div>
                        <h4 className="doc-card-titulo">{d.titulo}</h4>
                        <p className="doc-card-desc">{d.descripcion}</p>
                      </div>
                    </div>
                  </div>
 
                  {/* Badges */}
                  <div className="doc-badges">
                    <span className={`badge ${categoriaCssClass[d.categoria] || "badge-cat--otros"}`}>
                      {d.categoria}
                    </span>
                    <span className={`badge ${d.estado === "Activo" ? "badge-estado--activo" : "badge-estado--inactivo"}`}>
                      {d.estado}
                    </span>
                    <span className="badge-fecha">
                      <i className="bi bi-calendar3"></i>{d.fecha}
                    </span>
                  </div>
 
                  {/* Vista previa contenido */}
                  <p className="doc-preview">{d.contenido}</p>
 
                  {/* Acciones */}
                  <div className="doc-actions">
                    <button className="btn-accion btn-accion--ver" onClick={() => abrirVista(d)}>
                      <i className="bi bi-eye"></i> Ver
                    </button>
                    <button className="btn-accion btn-accion--editar" onClick={() => abrirEditar(d)}>
                      <i className="bi bi-pencil"></i> Editar
                    </button>
                    <button className="btn-accion btn-accion--eliminar" onClick={() => abrirEliminar(d)}>
                      <i className="bi bi-trash"></i> Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bc-empty">No se encontraron documentos.</div>
          )}
 
        </main>
      </div>
 
      <Modal isOpen={modalAbierto === "crear"} onClose={cerrarModal} titulo="Nuevo Documento">
        <FormularioDocumento formData={formData} onChange={manejarCambio} onSubmit={manejarCrear} onCancelar={cerrarModal} textoBoton="Guardar" categorias={categoriasDisponibles} />
      </Modal>
 
      <Modal isOpen={modalAbierto === "editar"} onClose={cerrarModal} titulo="Editar Documento">
        <FormularioDocumento formData={formData} onChange={manejarCambio} onSubmit={manejarEditar} onCancelar={cerrarModal} textoBoton="Guardar Cambios" categorias={categoriasDisponibles} />
      </Modal>
 
      <Modal isOpen={modalAbierto === "eliminar"} onClose={cerrarModal} titulo="Eliminar Documento">
        <EliminarDocumento documento={seleccionado} onConfirmar={manejarEliminar} onCancelar={cerrarModal} />
      </Modal>
 
      <Modal isOpen={modalAbierto === "vista"} onClose={cerrarModal} titulo="Vista del Documento">
        <VistaDocumento documento={seleccionado} onCerrar={cerrarModal} />
      </Modal>
    </div>
  );
}