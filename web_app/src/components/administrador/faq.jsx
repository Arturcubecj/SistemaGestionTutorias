import { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Modal from "../Modal";
import FormularioFAQ from "./agente/preguntas/FormularioFAQ";
import EliminarFAQ from "./agente/preguntas/EliminarFAQ";

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

const faqIniciales = [
  {
    id: 1,
    pregunta: "¿Cómo puedo solicitar una tutoría?",
    respuesta:
      'Puedes solicitar una tutoría ingresando al módulo "Solicitar tutoría" desde tu panel de estudiante, seleccionando la asignatura, el docente y el horario disponible.',
    categoria: "Tutorías",
    estado: "Activo",
  },
  {
    id: 2,
    pregunta: "¿Cuántas tutorías puedo solicitar por periodo?",
    respuesta:
      "No existe un límite fijo, sin embargo se recomienda no exceder las 3 tutorías por asignatura por mes para garantizar la disponibilidad de los docentes.",
    categoria: "Tutorías",
    estado: "Activo",
  },
  {
    id: 3,
    pregunta: "¿Puedo cancelar una tutoría ya confirmada?",
    respuesta:
      "Sí, puedes cancelar una tutoría confirmada siempre que lo hagas con al menos 24 horas de anticipación. Cancelaciones tardías quedarán registradas en tu historial.",
    categoria: "Tutorías",
    estado: "Activo",
  },
  {
    id: 4,
    pregunta: "¿Qué pasa si no asisto a una tutoría?",
    respuesta:
      'La tutoría quedará registrada como "No asistida" en tu historial. Acumular inasistencias puede limitar futuras solicitudes de tutoría.',
    categoria: "Tutorías",
    estado: "Activo",
  },
  {
    id: 5,
    pregunta: "¿Cómo sé si mi tutoría fue confirmada?",
    respuesta:
      "Recibirás una notificación interna en el sistema cuando el docente confirme tu solicitud. También puedes revisar el estado en tu historial de tutorías.",
    categoria: "Notificaciones",
    estado: "Activo",
  },
  {
    id: 6,
    pregunta: "¿Puedo cambiar de docente tutor?",
    respuesta:
      "Para cambiar de docente tutor debes comunicarte con el coordinador académico de tu carrera. El agente de IA escalará esta solicitud automáticamente.",
    categoria: "Docentes",
    estado: "Inactivo",
  },
  {
    id: 7,
    pregunta: "¿En qué horarios están disponibles las tutorías?",
    respuesta:
      "Los horarios de tutoría dependen de la disponibilidad de cada docente. Puedes consultar los horarios disponibles al momento de realizar tu solicitud.",
    categoria: "Horarios",
    estado: "Activo",
  },
];

const categoriasDisponibles = [
  "Tutorías",
  "Docentes",
  "Horarios",
  "Notificaciones",
  "Requisitos",
  "General",
];

const formVacio = {
  pregunta: "",
  respuesta: "",
  categoria: "General",
  estado: "Activo",
};

export default function FAQPage() {
  const [faqs, setFaqs] = useState(faqIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [modalAbierto, setModalAbierto] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);
  const [formData, setFormData] = useState(formVacio);
  const [expandido, setExpandido] = useState(null);

  const categorias = ["Todos", ...new Set(faqs.map((f) => f.categoria))];

  const faqsFiltradas = faqs.filter((f) => {
    const coincideBusqueda =
      f.pregunta.toLowerCase().includes(busqueda.toLowerCase()) ||
      f.respuesta.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria =
      filtroCategoria === "Todos" || f.categoria === filtroCategoria;
    return coincideBusqueda && coincideCategoria;
  });

  const abrirCrear = () => {
    setFormData(formVacio);
    setModalAbierto("crear");
  };
  const abrirEditar = (f) => {
    setSeleccionado(f);
    setFormData({
      pregunta: f.pregunta,
      respuesta: f.respuesta,
      categoria: f.categoria,
      estado: f.estado,
    });
    setModalAbierto("editar");
  };
  const abrirEliminar = (f) => {
    setSeleccionado(f);
    setModalAbierto("eliminar");
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
    setFaqs((prev) => [...prev, { id: Date.now(), ...formData }]);
    cerrarModal();
  };

  const manejarEditar = (e) => {
    e.preventDefault();
    setFaqs((prev) =>
      prev.map((f) => (f.id === seleccionado.id ? { ...f, ...formData } : f)),
    );
    cerrarModal();
  };

  const manejarEliminar = () => {
    setFaqs((prev) => prev.filter((f) => f.id !== seleccionado.id));
    cerrarModal();
  };

  const toggleExpandido = (id) => {
    setExpandido((prev) => (prev === id ? null : id));
  };

  return (
    <div className="dashboard-layout">
      <Sidebar titulo="Menu" menuEstructurado={menuAdminEstructurado} />

      <div className="dashboard-viewport">
        <Header />
        <main className="main-content-body">
          {/* Encabezado */}
          <div className="faq-header">
            <div>
              <h2 className="faq-title">Preguntas Frecuentes</h2>

              <p className="faq-subtitle">
                Configuración de preguntas y respuestas para el agente de IA.
              </p>
            </div>

            <button onClick={abrirCrear} className="faq-btn-nuevo">
              <i className="bi bi-plus-lg"></i>
              Nueva Pregunta
            </button>
          </div>

          {/* Toolbar */}
          <div className="faq-toolbar">
            {/* Categorías */}
            <div className="faq-categorias">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFiltroCategoria(cat)}
                  className={`faq-categoria-btn ${
                    filtroCategoria === cat ? "activo" : ""
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Buscador */}
            <div className="faq-search-box">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Buscar pregunta..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="faq-search-input"
              />
            </div>
          </div>

          {/* Lista */}
          <div className="faq-lista">
            {faqsFiltradas.length > 0 ? (
              faqsFiltradas.map((f) => (
                <div key={f.id} className="faq-card">
                  {/* Cabecera */}
                  <div
                    className="faq-card-header"
                    onClick={() => toggleExpandido(f.id)}
                  >
                    <div className="faq-card-info">
                      <i className="bi bi-question-circle faq-icono"></i>

                      <span className="faq-pregunta">{f.pregunta}</span>
                    </div>

                    <div className="faq-card-actions">
                      <span className="faq-badge faq-badge-categoria">
                        {f.categoria}
                      </span>

                      <span
                        className={`faq-badge ${
                          f.estado === "Activo" ? "faq-activo" : "faq-inactivo"
                        }`}
                      >
                        {f.estado}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          abrirEditar(f);
                        }}
                        className="faq-btn-icon faq-editar"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          abrirEliminar(f);
                        }}
                        className="faq-btn-icon faq-eliminar"
                      >
                        <i className="bi bi-trash"></i>
                      </button>

                      <i
                        className={`bi ${
                          expandido === f.id
                            ? "bi-chevron-up"
                            : "bi-chevron-down"
                        } faq-chevron`}
                      ></i>
                    </div>
                  </div>

                  {/* Respuesta */}
                  {expandido === f.id && (
                    <div className="faq-respuesta">
                      <p>{f.respuesta}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="faq-empty">
                No se encontraron preguntas frecuentes.
              </div>
            )}
          </div>
        </main>
      </div>

      <Modal
        isOpen={modalAbierto === "crear"}
        onClose={cerrarModal}
        titulo="Nueva Pregunta Frecuente"
      >
        <FormularioFAQ
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
        titulo="Editar Pregunta Frecuente"
      >
        <FormularioFAQ
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
        titulo="Eliminar Pregunta Frecuente"
      >
        <EliminarFAQ
          faq={seleccionado}
          onConfirmar={manejarEliminar}
          onCancelar={cerrarModal}
        />
      </Modal>
    </div>
  );
}
