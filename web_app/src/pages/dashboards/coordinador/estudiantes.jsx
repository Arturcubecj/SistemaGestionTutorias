import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Modal from "../../../components/Modal";
import FormularioEstudiante from "../../../components/administrador/academica/estudiantes/FormularioEstudiante";
import EliminarEstudiante from "../../../components/administrador/academica/estudiantes/EliminarEstudiante";

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

const estudiantesIniciales = [
  {
    id: 1,
    nombre: "Ana Torres",
    cedula: "0912345678",
    email: "a.torres@ug.edu.ec",
    carrera: "Ingeniería en Software",
    nivel: 7,
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Luis Pérez",
    cedula: "0923456789",
    email: "l.perez@ug.edu.ec",
    carrera: "Ingeniería en Sistemas",
    nivel: 5,
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "María Gómez",
    cedula: "0934567890",
    email: "m.gomez@ug.edu.ec",
    carrera: "Ingeniería en Software",
    nivel: 3,
    estado: "Activo",
  },
  {
    id: 4,
    nombre: "Jorge Lema",
    cedula: "0945678901",
    email: "j.lema@ug.edu.ec",
    carrera: "Medicina",
    nivel: 2,
    estado: "Inactivo",
  },
  {
    id: 5,
    nombre: "Carla Ríos",
    cedula: "0956789012",
    email: "c.rios@ug.edu.ec",
    carrera: "Ingeniería Industrial",
    nivel: 8,
    estado: "Activo",
  },
];

const carrerasDisponibles = [
  "Ingeniería en Software",
  "Ingeniería en Sistemas",
  "Ingeniería Industrial",
  "Medicina",
  "Biología",
];

const formVacio = {
  nombre: "",
  cedula: "",
  email: "",
  carrera: "",
  nivel: "",
  estado: "Activo",
};

export default function EstudiantesPage() {
  const [estudiantes, setEstudiantes] = useState(estudiantesIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);
  const [formData, setFormData] = useState(formVacio);

  const estudiantesFiltrados = estudiantes.filter(
    (e) =>
      e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.cedula.includes(busqueda) ||
      e.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.carrera.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const abrirCrear = () => {
    setFormData(formVacio);
    setModalAbierto("crear");
  };
  const abrirEditar = (e) => {
    setSeleccionado(e);
    setFormData({
      nombre: e.nombre,
      cedula: e.cedula,
      email: e.email,
      carrera: e.carrera,
      nivel: e.nivel,
      estado: e.estado,
    });
    setModalAbierto("editar");
  };
  const abrirEliminar = (e) => {
    setSeleccionado(e);
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
    setEstudiantes((prev) => [...prev, { id: Date.now(), ...formData }]);
    cerrarModal();
  };

  const manejarEditar = (e) => {
    e.preventDefault();
    setEstudiantes((prev) =>
      prev.map((e) => (e.id === seleccionado.id ? { ...e, ...formData } : e)),
    );
    cerrarModal();
  };

  const manejarEliminar = () => {
    setEstudiantes((prev) => prev.filter((e) => e.id !== seleccionado.id));
    cerrarModal();
  };

  return (
    <div className="dashboard-layout">
      <Sidebar titulo="Menu" menuEstructurado={menuCoordinadorEstructurado} />

      <div className="dashboard-viewport">
        <Header />
        <main className="main-content-body">
          {/* Encabezado */}
          <div className="estudiantes-header">
            <div>
              <h2 className="estudiantes-title">Estudiantes</h2>
              <p className="estudiantes-subtitle">
                Gestión de estudiantes registrados en el sistema.
              </p>
            </div>

            <button onClick={abrirCrear} className="btn-nuevo-estudiante">
              <i className="bi bi-plus-lg"></i>
              Nuevo Estudiante
            </button>
          </div>

          {/* Buscador */}
          <div className="estudiantes-search-container">
            <div className="estudiantes-search-box">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Buscar estudiante..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="estudiantes-search-input"
              />
            </div>
          </div>

          {/* Tabla */}
          <div className="estudiantes-table-container">
            <table className="estudiantes-table">
              <thead>
                <tr className="estudiantes-table-head-row">
                  {[
                    "#",
                    "Nombre",
                    "Cédula",
                    "Correo",
                    "Carrera",
                    "Nivel",
                    "Estado",
                    "Acciones",
                  ].map((h) => (
                    <th key={h} className="estudiantes-table-head">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {estudiantesFiltrados.length > 0 ? (
                  estudiantesFiltrados.map((e, i) => (
                    <tr key={e.id} className="estudiantes-table-row">
                      <td className="estudiantes-table-cell">{i + 1}</td>

                      <td className="estudiantes-table-cell estudiante-nombre">
                        {e.nombre}
                      </td>

                      <td className="estudiantes-table-cell">{e.cedula}</td>

                      <td className="estudiantes-table-email">{e.email}</td>

                      <td className="estudiantes-table-cell">{e.carrera}</td>

                      <td className="estudiantes-table-cell">{e.nivel}</td>

                      <td className="estudiantes-table-cell">
                        <span
                          className={`estudiante-estado-badge ${
                            e.estado === "Activo"
                              ? "estudiante-estado-activo"
                              : "estudiante-estado-inactivo"
                          }`}
                        >
                          {e.estado}
                        </span>
                      </td>

                      <td className="estudiantes-table-cell">
                        <div className="estudiantes-acciones-container">
                          <button
                            onClick={() => abrirEditar(e)}
                            title="Editar"
                            className="estudiante-btn-accion estudiante-btn-editar"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>

                          <button
                            onClick={() => abrirEliminar(e)}
                            title="Eliminar"
                            className="estudiante-btn-accion estudiante-btn-eliminar"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="estudiantes-sin-resultados">
                      No se encontraron estudiantes.
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
        titulo="Nuevo Estudiante"
      >
        <FormularioEstudiante
          formData={formData}
          onChange={manejarCambio}
          onSubmit={manejarCrear}
          onCancelar={cerrarModal}
          textoBoton="Guardar"
          carreras={carrerasDisponibles}
        />
      </Modal>

      <Modal
        isOpen={modalAbierto === "editar"}
        onClose={cerrarModal}
        titulo="Editar Estudiante"
      >
        <FormularioEstudiante
          formData={formData}
          onChange={manejarCambio}
          onSubmit={manejarEditar}
          onCancelar={cerrarModal}
          textoBoton="Guardar Cambios"
          carreras={carrerasDisponibles}
        />
      </Modal>

      <Modal
        isOpen={modalAbierto === "eliminar"}
        onClose={cerrarModal}
        titulo="Eliminar Estudiante"
      >
        <EliminarEstudiante
          estudiante={seleccionado}
          onConfirmar={manejarEliminar}
          onCancelar={cerrarModal}
        />
      </Modal>
    </div>
  );
}
