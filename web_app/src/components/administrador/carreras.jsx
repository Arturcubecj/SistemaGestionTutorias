import { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Modal from "../Modal";
import FormularioCarrera from "./academica/carreras/FormularioCarrera";
import EliminarCarrera from "./academica/carreras/EliminarCarrera";

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

const carrerasIniciales = [
  {
    id: 1,
    nombre: "Ingeniería en Software",
    codigo: "ISW",
    facultad: "Facultad de Ciencias Matemáticas y Físicas",
    duracion: 5,
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Ingeniería en Sistemas",
    codigo: "ISI",
    facultad: "Facultad de Ciencias Matemáticas y Físicas",
    duracion: 5,
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Ingeniería Industrial",
    codigo: "IIN",
    facultad: "Facultad de Ingeniería Industrial",
    duracion: 5,
    estado: "Activo",
  },
  {
    id: 4,
    nombre: "Medicina",
    codigo: "MED",
    facultad: "Facultad de Ciencias Médicas",
    duracion: 6,
    estado: "Activo",
  },
  {
    id: 5,
    nombre: "Biología",
    codigo: "BIO",
    facultad: "Facultad de Ciencias Naturales",
    duracion: 4,
    estado: "Inactivo",
  },
];

const facultadesDisponibles = [
  "Facultad de Ciencias Matemáticas y Físicas",
  "Facultad de Ciencias Naturales",
  "Facultad de Filosofía, Letras y Ciencias de la Educación",
  "Facultad de Ciencias Médicas",
  "Facultad de Ingeniería Industrial",
];

const formVacio = {
  nombre: "",
  codigo: "",
  facultad: "",
  duracion: "",
  estado: "Activo",
};

export default function CarrerasPage() {
  const [carreras, setCarreras] = useState(carrerasIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);
  const [formData, setFormData] = useState(formVacio);

  const carrerasFiltradas = carreras.filter(
    (c) =>
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.facultad.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const abrirCrear = () => {
    setFormData(formVacio);
    setModalAbierto("crear");
  };
  const abrirEditar = (c) => {
    setSeleccionado(c);
    setFormData({
      nombre: c.nombre,
      codigo: c.codigo,
      facultad: c.facultad,
      duracion: c.duracion,
      estado: c.estado,
    });
    setModalAbierto("editar");
  };
  const abrirEliminar = (c) => {
    setSeleccionado(c);
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
    setCarreras((prev) => [...prev, { id: Date.now(), ...formData }]);
    cerrarModal();
  };

  const manejarEditar = (e) => {
    e.preventDefault();
    setCarreras((prev) =>
      prev.map((c) => (c.id === seleccionado.id ? { ...c, ...formData } : c)),
    );
    cerrarModal();
  };

  const manejarEliminar = () => {
    setCarreras((prev) => prev.filter((c) => c.id !== seleccionado.id));
    cerrarModal();
  };

  return (
    <div className="dashboard-layout">
      <Sidebar titulo="Menu" menuEstructurado={menuAdminEstructurado} />

      <div className="dashboard-viewport">
        <Header />
        <main className="main-content-body">
          {/* Encabezado */}
          <div className="carreras-header">
            <div>
              <h2 className="carreras-title">Carreras</h2>
              <p className="carreras-subtitle">
                Gestión de carreras registradas en el sistema.
              </p>
            </div>

            <button onClick={abrirCrear} className="btn-nueva-carrera">
              <i className="bi bi-plus-lg"></i>
              Nueva Carrera
            </button>
          </div>

          {/* Buscador */}
          <div className="carreras-search-container">
            <div className="carreras-search-box">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Buscar carrera..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="carreras-search-input"
              />
            </div>
          </div>

          {/* Tabla */}
          <div className="carreras-table-container">
            <table className="carreras-table">
              <thead>
                <tr className="carreras-table-header-row">
                  {[
                    "#",
                    "Nombre",
                    "Código",
                    "Facultad",
                    "Duración (años)",
                    "Estado",
                    "Acciones",
                  ].map((h) => (
                    <th key={h} className="carreras-table-header">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {carrerasFiltradas.length > 0 ? (
                  carrerasFiltradas.map((c, i) => (
                    <tr key={c.id} className="carreras-table-row">
                      <td className="carreras-table-cell">{i + 1}</td>
                      <td className="carreras-table-cell">{c.nombre}</td>
                      <td className="carreras-table-cell">{c.codigo}</td>
                      <td className="carreras-table-cell">{c.facultad}</td>
                      <td className="carreras-table-cell">{c.duracion}</td>

                      <td className="carreras-table-cell">
                        <span
                          className={`estado-badge ${
                            c.estado === "Activo"
                              ? "estado-activo"
                              : "estado-inactivo"
                          }`}
                        >
                          {c.estado}
                        </span>
                      </td>

                      <td className="carreras-table-cell">
                        <div className="acciones-container">
                          <button
                            onClick={() => abrirEditar(c)}
                            title="Editar"
                            className="btn-accion btn-editar"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>

                          <button
                            onClick={() => abrirEliminar(c)}
                            title="Eliminar"
                            className="btn-accion btn-eliminar"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="sin-registros">
                      No se encontraron carreras.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <Modal
        isOpen={modalAbierto === "crear"}
        onClose={cerrarModal}
        titulo="Nueva Carrera"
      >
        <FormularioCarrera
          formData={formData}
          onChange={manejarCambio}
          onSubmit={manejarCrear}
          onCancelar={cerrarModal}
          textoBoton="Guardar"
          facultades={facultadesDisponibles}
        />
      </Modal>

      <Modal
        isOpen={modalAbierto === "editar"}
        onClose={cerrarModal}
        titulo="Editar Carrera"
      >
        <FormularioCarrera
          formData={formData}
          onChange={manejarCambio}
          onSubmit={manejarEditar}
          onCancelar={cerrarModal}
          textoBoton="Guardar Cambios"
          facultades={facultadesDisponibles}
        />
      </Modal>

      <Modal
        isOpen={modalAbierto === "eliminar"}
        onClose={cerrarModal}
        titulo="Eliminar Carrera"
      >
        <EliminarCarrera
          carrera={seleccionado}
          onConfirmar={manejarEliminar}
          onCancelar={cerrarModal}
        />
      </Modal>
    </div>
  );
}
