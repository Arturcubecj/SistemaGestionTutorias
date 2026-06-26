import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Modal from "../../../components/Modal";
import FormularioParalelo from "../../../components/coordinador/academica/cursos/FormularioParalelo";
import EliminarParalelo from "../../../components/coordinador/academica/cursos/EliminarParalelo";

const menuCoordinadorEstructurado = [
  {
    categoria: "GENERAL",
    items: [
      { nombre: "Inicio", ruta: "/dashboards/coordinador", icono: "bi-house-door" },
    ],
  },
  {
    categoria: "ADMINISTRACIÓN ACADÉMICA",
    items: [
      { nombre: "Docentes", ruta: "/dashboards/coordinador/docentes", icono: "bi-person-badge" },
      { nombre: "Estudiantes", ruta: "/dashboards/coordinador/estudiantes", icono: "bi-people" },
      { nombre: "Asignaturas", ruta: "/dashboards/coordinador/asignaturas", icono: "bi-book" },
      { nombre: "Paralelos", ruta: "/dashboards/coordinador/paralelos", icono: "bi-diagram-3" },
      { nombre: "Periodos Académicos", ruta: "/dashboards/coordinador/periodos", icono: "bi-calendar3" },
    ],
  },
  {
    categoria: "TUTORÍAS",
    items: [
      { nombre: "Supervisar Tutorías", ruta: "/dashboards/coordinador/tutorias", icono: "bi-calendar-check" },
      { nombre: "Reportes", ruta: "/dashboards/coordinador/reportes", icono: "bi-file-earmark-bar-graph" },
      { nombre: "Casos Escalados", ruta: "/dashboards/coordinador/casos-escalados", icono: "bi-exclamation-circle" },
    ],
  },
  {
    categoria: "AGENTE IA",
    items: [
      { nombre: "Métricas de uso IA", ruta: "/dashboards/coordinador/metricas", icono: "bi-graph-up" },
      { nombre: "Preguntas Frecuentes", ruta: "/dashboards/coordinador/faq", icono: "bi-question-circle" },
      { nombre: "Base de Conocimiento", ruta: "/dashboards/coordinador/conocimiento", icono: "bi-database" },
    ],
  },
];

const asignaturasDisponibles = [
  "Desarrollo de Aplicaciones Web",
  "Base de Datos",
  "Programación Orientada a Objetos",
  "Estructuras de Datos",
  "Redes de Computadoras",
];

const docentesDisponibles = [
  "Dr. Carlos Mendoza",
  "Ing. Patricia Vega",
  "Msc. Roberto Alvarado",
  "Ing. Lucia Fernández",
];

const periodosDisponibles = [
  "2025-2026 CI",
  "2025-2026 CII",
  "2026-2027 CI",
];

const paralelosIniciales = [
  { id: 1, nombre: "Paralelo A", asignatura: "Desarrollo de Aplicaciones Web", docente: "Dr. Carlos Mendoza", periodo: "2026-2027 CI", capacidad: 35, estado: "Activo" },
  { id: 2, nombre: "Paralelo B", asignatura: "Base de Datos", docente: "Ing. Patricia Vega", periodo: "2026-2027 CI", capacidad: 30, estado: "Activo" },
  { id: 3, nombre: "Paralelo A", asignatura: "Estructuras de Datos", docente: "Msc. Roberto Alvarado", periodo: "2025-2026 CII", capacidad: 40, estado: "Inactivo" },
];

const formVacio = {
  nombre: "",
  asignatura: "",
  docente: "",
  periodo: "",
  capacidad: "",
  estado: "Activo",
};

export default function ParalelosPage() {
  const [paralelos, setParalelos] = useState(paralelosIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);
  const [formData, setFormData] = useState(formVacio);

  const paralelosFiltrados = paralelos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.asignatura.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.docente.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.periodo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const abrirCrear = () => {
    setFormData(formVacio);
    setModalAbierto("crear");
  };
  const abrirEditar = (p) => {
    setSeleccionado(p);
    setFormData({
      nombre: p.nombre,
      asignatura: p.asignatura,
      docente: p.docente,
      periodo: p.periodo,
      capacidad: p.capacidad,
      estado: p.estado,
    });
    setModalAbierto("editar");
  };
  const abrirEliminar = (p) => {
    setSeleccionado(p);
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
    setParalelos((prev) => [...prev, { id: Date.now(), ...formData }]);
    cerrarModal();
  };

  const manejarEditar = (e) => {
    e.preventDefault();
    setParalelos((prev) =>
      prev.map((p) => (p.id === seleccionado.id ? { ...p, ...formData } : p))
    );
    cerrarModal();
  };

  const manejarEliminar = () => {
    setParalelos((prev) => prev.filter((p) => p.id !== seleccionado.id));
    cerrarModal();
  };

  return (
    <div className="dashboard-layout">
      <Sidebar titulo="Menu" menuEstructurado={menuCoordinadorEstructurado} />

      <div className="dashboard-viewport">
        <Header />
        <main className="main-content-body">
          <div className="estudiantes-header">
            <div>
              <h2 className="estudiantes-title">Paralelos</h2>
              <p className="estudiantes-subtitle">
                Gestión de paralelos o cursos registrados en el sistema.
              </p>
            </div>
            <button onClick={abrirCrear} className="btn-nuevo-estudiante">
              <i className="bi bi-plus-lg"></i>
              Nuevo Paralelo
            </button>
          </div>

          <div className="estudiantes-search-container">
            <div className="estudiantes-search-box">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Buscar paralelo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="estudiantes-search-input"
              />
            </div>
          </div>

          <div className="estudiantes-table-container">
            <table className="estudiantes-table">
              <thead>
                <tr className="estudiantes-table-head-row">
                  {["#", "Nombre", "Asignatura", "Docente", "Periodo", "Capacidad", "Estado", "Acciones"].map((h) => (
                    <th key={h} className="estudiantes-table-head">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paralelosFiltrados.length > 0 ? (
                  paralelosFiltrados.map((p, i) => (
                    <tr key={p.id} className="estudiantes-table-row">
                      <td className="estudiantes-table-cell">{i + 1}</td>
                      <td className="estudiantes-table-cell estudiante-nombre">{p.nombre}</td>
                      <td className="estudiantes-table-cell">{p.asignatura}</td>
                      <td className="estudiantes-table-cell">{p.docente}</td>
                      <td className="estudiantes-table-cell">{p.periodo}</td>
                      <td className="estudiantes-table-cell">{p.capacidad}</td>
                      <td className="estudiantes-table-cell">
                        <span className={`estudiante-estado-badge ${p.estado === "Activo" ? "estudiante-estado-activo" : "estudiante-estado-inactivo"}`}>
                          {p.estado}
                        </span>
                      </td>
                      <td className="estudiantes-table-cell">
                        <div className="estudiantes-acciones-container">
                          <button onClick={() => abrirEditar(p)} title="Editar" className="estudiante-btn-accion estudiante-btn-editar">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button onClick={() => abrirEliminar(p)} title="Eliminar" className="estudiante-btn-accion estudiante-btn-eliminar">
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="estudiantes-sin-resultados">
                      No se encontraron paralelos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <Modal isOpen={modalAbierto === "crear"} onClose={cerrarModal} titulo="Nuevo Paralelo">
        <FormularioParalelo
          formData={formData}
          onChange={manejarCambio}
          onSubmit={manejarCrear}
          onCancelar={cerrarModal}
          textoBoton="Guardar"
          asignaturas={asignaturasDisponibles}
          docentes={docentesDisponibles}
          periodos={periodosDisponibles}
        />
      </Modal>

      <Modal isOpen={modalAbierto === "editar"} onClose={cerrarModal} titulo="Editar Paralelo">
        <FormularioParalelo
          formData={formData}
          onChange={manejarCambio}
          onSubmit={manejarEditar}
          onCancelar={cerrarModal}
          textoBoton="Guardar Cambios"
          asignaturas={asignaturasDisponibles}
          docentes={docentesDisponibles}
          periodos={periodosDisponibles}
        />
      </Modal>

      <Modal isOpen={modalAbierto === "eliminar"} onClose={cerrarModal} titulo="Eliminar Paralelo">
        <EliminarParalelo
          paralelo={seleccionado}
          onConfirmar={manejarEliminar}
          onCancelar={cerrarModal}
        />
      </Modal>
    </div>
  );
}