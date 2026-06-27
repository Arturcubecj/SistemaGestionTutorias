import { useState } from "react";
import Modal from "../Modal";
import FormularioPeriodo from "./academica/periodos/FormularioPeriodo";
import EliminarPeriodo from "./academica/periodos/EliminarPeriodo";

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

const periodosIniciales = [
  {
    id: 1,
    nombre: "Periodo 2025-2026 CI",
    codigo: "2025-CI",
    fechaInicio: "2025-05-01",
    fechaFin: "2025-09-30",
    estado: "Cerrado",
  },
  {
    id: 2,
    nombre: "Periodo 2025-2026 CII",
    codigo: "2025-CII",
    fechaInicio: "2025-10-01",
    fechaFin: "2026-03-31",
    estado: "Cerrado",
  },
  {
    id: 3,
    nombre: "Periodo 2026-2027 CI",
    codigo: "2026-CI",
    fechaInicio: "2026-05-01",
    fechaFin: "2026-09-30",
    estado: "Activo",
  },
  {
    id: 4,
    nombre: "Periodo 2026-2027 CII",
    codigo: "2026-CII",
    fechaInicio: "2026-10-01",
    fechaFin: "2027-03-31",
    estado: "Planificado",
  },
];

const formVacio = {
  nombre: "",
  codigo: "",
  fechaInicio: "",
  fechaFin: "",
  estado: "Planificado",
};

const colorEstado = {
  Activo: { bg: "#dcfce7", color: "#16a34a" },
  Planificado: { bg: "#dbeafe", color: "#1d4ed8" },
  Cerrado: { bg: "#f1f5f9", color: "#475569" },
};

export default function PeriodosPage() {
  const [periodos, setPeriodos] = useState(periodosIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);
  const [formData, setFormData] = useState(formVacio);

  const periodosFiltrados = periodos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.codigo.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const abrirCrear = () => {
    setFormData(formVacio);
    setModalAbierto("crear");
  };
  const abrirEditar = (p) => {
    setSeleccionado(p);
    setFormData({
      nombre: p.nombre,
      codigo: p.codigo,
      fechaInicio: p.fechaInicio,
      fechaFin: p.fechaFin,
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
    setPeriodos((prev) => [...prev, { id: Date.now(), ...formData }]);
    cerrarModal();
  };

  const manejarEditar = (e) => {
    e.preventDefault();
    setPeriodos((prev) =>
      prev.map((p) => (p.id === seleccionado.id ? { ...p, ...formData } : p)),
    );
    cerrarModal();
  };

  const manejarEliminar = () => {
    setPeriodos((prev) => prev.filter((p) => p.id !== seleccionado.id));
    cerrarModal();
  };

  return (
    <div className="dashboard-layout">

      <div className="dashboard-viewport">
        <main className="main-content-body">
          {/* Encabezado */}
          <div className="periodos-header">
            <div>
              <h2 className="periodos-title">Periodos Académicos</h2>
              <p className="periodos-subtitle">
                Gestión de periodos académicos registrados en el sistema.
              </p>
            </div>

            <button onClick={abrirCrear} className="btn-nuevo-periodo">
              <i className="bi bi-plus-lg"></i>
              Nuevo Periodo
            </button>
          </div>

          {/* Buscador */}
          <div className="periodos-search-container">
            <div className="periodos-search-box">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Buscar periodo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="periodos-search-input"
              />
            </div>
          </div>

          {/* Tabla */}
          <div className="periodos-table-container">
            <table className="periodos-table">
              <thead>
                <tr className="periodos-table-header-row">
                  {[
                    "#",
                    "Nombre",
                    "Código",
                    "Fecha Inicio",
                    "Fecha Fin",
                    "Estado",
                    "Acciones",
                  ].map((h) => (
                    <th key={h} className="periodos-table-header">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {periodosFiltrados.length > 0 ? (
                  periodosFiltrados.map((p, i) => (
                    <tr key={p.id} className="periodos-table-row">
                      <td className="periodos-table-cell">{i + 1}</td>
                      <td className="periodos-table-cell">{p.nombre}</td>
                      <td className="periodos-table-cell">{p.codigo}</td>
                      <td className="periodos-table-cell">{p.fechaInicio}</td>
                      <td className="periodos-table-cell">{p.fechaFin}</td>

                      <td className="periodos-table-cell">
                        <span
                          className="estado-badge"
                          style={{
                            background: colorEstado[p.estado]?.bg,
                            color: colorEstado[p.estado]?.color,
                          }}
                        >
                          {p.estado}
                        </span>
                      </td>

                      <td className="periodos-table-cell">
                        <div className="acciones-container">
                          <button
                            onClick={() => abrirEditar(p)}
                            title="Editar"
                            className="btn-accion btn-editar"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>

                          <button
                            onClick={() => abrirEliminar(p)}
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
                    <td colSpan={7} className="sin-registros">
                      No se encontraron periodos.
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
        titulo="Nuevo Periodo Académico"
      >
        <FormularioPeriodo
          formData={formData}
          onChange={manejarCambio}
          onSubmit={manejarCrear}
          onCancelar={cerrarModal}
          textoBoton="Guardar"
        />
      </Modal>

      <Modal
        isOpen={modalAbierto === "editar"}
        onClose={cerrarModal}
        titulo="Editar Periodo Académico"
      >
        <FormularioPeriodo
          formData={formData}
          onChange={manejarCambio}
          onSubmit={manejarEditar}
          onCancelar={cerrarModal}
          textoBoton="Guardar Cambios"
        />
      </Modal>

      <Modal
        isOpen={modalAbierto === "eliminar"}
        onClose={cerrarModal}
        titulo="Eliminar Periodo Académico"
      >
        <EliminarPeriodo
          periodo={seleccionado}
          onConfirmar={manejarEliminar}
          onCancelar={cerrarModal}
        />
      </Modal>
    </div>
  );
}
