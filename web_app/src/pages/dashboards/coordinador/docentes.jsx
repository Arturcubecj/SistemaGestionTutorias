import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Modal from "../../../components/Modal";
import FormularioDocente from "../../../components/administrador/academica/docentes/FormularioDocente";
import EliminarDocente from "../../../components/administrador/academica/docentes/EliminarDocente";

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

const docentesIniciales = [
  {
    id: 1,
    nombre: "Carlos Martínez",
    titulo: "Ing.",
    email: "c.martinez@ug.edu.ec",
    facultad: "Facultad de Ciencias Matemáticas y Físicas",
    especialidad: "Desarrollo de Software",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Laura Cedeño",
    titulo: "Dra.",
    email: "l.cedeno@ug.edu.ec",
    facultad: "Facultad de Ciencias Matemáticas y Físicas",
    especialidad: "Bases de Datos",
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Juan Mora",
    titulo: "Mg.",
    email: "j.mora@ug.edu.ec",
    facultad: "Facultad de Filosofía, Letras y Ciencias de la Educación",
    especialidad: "Pedagogía",
    estado: "Activo",
  },
  {
    id: 4,
    nombre: "Roberto Alvarado",
    titulo: "Dr.",
    email: "r.alvarado@ug.edu.ec",
    facultad: "Facultad de Ciencias Matemáticas y Físicas",
    especialidad: "Matemáticas",
    estado: "Inactivo",
  },
  {
    id: 5,
    nombre: "Sofía Reyes",
    titulo: "Ing.",
    email: "s.reyes@ug.edu.ec",
    facultad: "Facultad de Ingeniería Industrial",
    especialidad: "Procesos Industriales",
    estado: "Activo",
  },
];

const facultadesDisponibles = [
  "Facultad de Ciencias Matemáticas y Físicas",
  "Facultad de Ciencias Naturales",
  "Facultad de Filosofía, Letras y Ciencias de la Educación",
  "Facultad de Ciencias Médicas",
  "Facultad de Ingeniería Industrial",
];

const titulosDisponibles = ["Ing.", "Lic.", "Mg.", "Dr.", "Dra.", "PhD."];

const formVacio = {
  nombre: "",
  titulo: "Ing.",
  email: "",
  facultad: "",
  especialidad: "",
  estado: "Activo",
};

export default function DocentesPage() {
  const [docentes, setDocentes] = useState(docentesIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);
  const [formData, setFormData] = useState(formVacio);

  const docentesFiltrados = docentes.filter(
    (d) =>
      d.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      d.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      d.especialidad.toLowerCase().includes(busqueda.toLowerCase()) ||
      d.facultad.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const abrirCrear = () => {
    setFormData(formVacio);
    setModalAbierto("crear");
  };
  const abrirEditar = (d) => {
    setSeleccionado(d);
    setFormData({
      nombre: d.nombre,
      titulo: d.titulo,
      email: d.email,
      facultad: d.facultad,
      especialidad: d.especialidad,
      estado: d.estado,
    });
    setModalAbierto("editar");
  };
  const abrirEliminar = (d) => {
    setSeleccionado(d);
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
    setDocentes((prev) => [...prev, { id: Date.now(), ...formData }]);
    cerrarModal();
  };

  const manejarEditar = (e) => {
    e.preventDefault();
    setDocentes((prev) =>
      prev.map((d) => (d.id === seleccionado.id ? { ...d, ...formData } : d)),
    );
    cerrarModal();
  };

  const manejarEliminar = () => {
    setDocentes((prev) => prev.filter((d) => d.id !== seleccionado.id));
    cerrarModal();
  };

  return (
    <div className="dashboard-layout">
      <Sidebar titulo="Menu" menuEstructurado={menuCoordinadorEstructurado} />

      <div className="dashboard-viewport">
        <Header />
        <main className="main-content-body">
          {/* Encabezado */}
          <div className="docentes-header">
            <div>
              <h2 className="docentes-title">Docentes</h2>
              <p className="docentes-subtitle">
                Gestión de docentes registrados en el sistema.
              </p>
            </div>

            <button onClick={abrirCrear} className="btn-nuevo-docente">
              <i className="bi bi-plus-lg"></i>
              Nuevo Docente
            </button>
          </div>

          {/* Buscador */}
          <div className="docentes-search-container">
            <div className="docentes-search-box">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Buscar docente..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="docentes-search-input"
              />
            </div>
          </div>

          {/* Tabla */}
          <div className="docentes-table-container">
            <table className="docentes-table">
              <thead>
                <tr className="docentes-table-head-row">
                  {[
                    "#",
                    "Nombre",
                    "Correo",
                    "Facultad",
                    "Especialidad",
                    "Estado",
                    "Acciones",
                  ].map((h) => (
                    <th key={h} className="docentes-table-head">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {docentesFiltrados.length > 0 ? (
                  docentesFiltrados.map((d, i) => (
                    <tr key={d.id} className="docentes-table-row">
                      <td className="docentes-table-cell">{i + 1}</td>

                      <td className="docentes-table-cell">
                        <div className="docente-nombre">
                          {d.titulo} {d.nombre}
                        </div>
                      </td>

                      <td className="docentes-table-email">{d.email}</td>

                      <td className="docentes-table-cell">{d.facultad}</td>

                      <td className="docentes-table-cell">{d.especialidad}</td>

                      <td className="docentes-table-cell">
                        <span
                          className={`estado-badge ${
                            d.estado === "Activo"
                              ? "estado-activo"
                              : "estado-inactivo"
                          }`}
                        >
                          {d.estado}
                        </span>
                      </td>

                      <td className="docentes-table-cell">
                        <div className="acciones-container">
                          <button
                            onClick={() => abrirEditar(d)}
                            title="Editar"
                            className="btn-accion btn-editar"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>

                          <button
                            onClick={() => abrirEliminar(d)}
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
                    <td colSpan="7" className="sin-resultados">
                      No se encontraron docentes.
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
        titulo="Nuevo Docente"
      >
        <FormularioDocente
          formData={formData}
          onChange={manejarCambio}
          onSubmit={manejarCrear}
          onCancelar={cerrarModal}
          textoBoton="Guardar"
          facultades={facultadesDisponibles}
          titulos={titulosDisponibles}
        />
      </Modal>

      <Modal
        isOpen={modalAbierto === "editar"}
        onClose={cerrarModal}
        titulo="Editar Docente"
      >
        <FormularioDocente
          formData={formData}
          onChange={manejarCambio}
          onSubmit={manejarEditar}
          onCancelar={cerrarModal}
          textoBoton="Guardar Cambios"
          facultades={facultadesDisponibles}
          titulos={titulosDisponibles}
        />
      </Modal>

      <Modal
        isOpen={modalAbierto === "eliminar"}
        onClose={cerrarModal}
        titulo="Eliminar Docente"
      >
        <EliminarDocente
          docente={seleccionado}
          onConfirmar={manejarEliminar}
          onCancelar={cerrarModal}
        />
      </Modal>
    </div>
  );
}
