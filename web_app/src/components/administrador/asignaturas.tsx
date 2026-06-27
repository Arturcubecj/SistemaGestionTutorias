import { useState } from "react";
import Modal from "../Modal";
import FormularioAsignatura from "./academica/asignaturas/FormularioAsignatura";
import EliminarAsignatura from "./academica/asignaturas/EliminarAsignatura";


const asignaturasIniciales = [
  {
    id: 1,
    nombre: "Desarrollo de Aplicaciones Web",
    codigo: "DAWA",
    carrera: "Ingeniería en Software",
    creditos: 4,
    nivel: 7,
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Bases de Datos Relacionales",
    codigo: "BDR",
    carrera: "Ingeniería en Software",
    creditos: 3,
    nivel: 4,
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Calidad de Software",
    codigo: "CAS",
    carrera: "Ingeniería en Software",
    creditos: 3,
    nivel: 8,
    estado: "Activo",
  },
  {
    id: 4,
    nombre: "Sistemas Operativos",
    codigo: "SOP",
    carrera: "Ingeniería en Sistemas",
    creditos: 4,
    nivel: 5,
    estado: "Activo",
  },
  {
    id: 5,
    nombre: "Anatomía Humana",
    codigo: "ANH",
    carrera: "Medicina",
    creditos: 5,
    nivel: 1,
    estado: "Inactivo",
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
  codigo: "",
  carrera: "",
  creditos: "",
  nivel: "",
  estado: "Activo",
};

export default function AsignaturasPage() {
  const [asignaturas, setAsignaturas] = useState(asignaturasIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);
  const [formData, setFormData] = useState(formVacio);

  const asignaturasFiltradas = asignaturas.filter(
    (a) =>
      a.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.carrera.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const abrirCrear = () => {
    setFormData(formVacio);
    setModalAbierto("crear");
  };
  const abrirEditar = (a) => {
    setSeleccionado(a);
    setFormData({
      nombre: a.nombre,
      codigo: a.codigo,
      carrera: a.carrera,
      creditos: a.creditos,
      nivel: a.nivel,
      estado: a.estado,
    });
    setModalAbierto("editar");
  };
  const abrirEliminar = (a) => {
    setSeleccionado(a);
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
    setAsignaturas((prev) => [...prev, { 
      id: Date.now(), 
      nombre: formData.nombre,
      codigo: formData.codigo,
      carrera: formData.carrera,
      creditos: Number(formData.creditos),
      nivel: Number(formData.nivel),
      estado: formData.estado,
    }]);
    cerrarModal();
  };

  const manejarEditar = (e) => {
    e.preventDefault();
    setAsignaturas((prev) =>
      prev.map((a) => (a.id === seleccionado.id ? { 
        ...a, 
        nombre: formData.nombre,
        codigo: formData.codigo,
        carrera: formData.carrera,
        creditos: Number(formData.creditos),
        nivel: Number(formData.nivel),
        estado: formData.estado,
      } : a)),
    );
    cerrarModal();
  };

  const manejarEliminar = () => {
    setAsignaturas((prev) => prev.filter((a) => a.id !== seleccionado.id));
    cerrarModal();
  };

  return (
    <div className="dashboard-layout">
      <div className="dashboard-viewport">
        <main className="main-content-body">
          {/* Encabezado */}
          <div className="asignaturas-header">
            <div>
              <h2 className="asignaturas-title">Asignaturas</h2>
              <p className="asignaturas-subtitle">
                Gestión de asignaturas registradas en el sistema.
              </p>
            </div>

            <button onClick={abrirCrear} className="btn-nueva-asignatura">
              <i className="bi bi-plus-lg"></i>
              Nueva Asignatura
            </button>
          </div>

          {/* Buscador */}
          <div className="asignaturas-search-container">
            <div className="asignaturas-search-box">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Buscar asignatura..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="asignaturas-search-input"
              />
            </div>
          </div>

          {/* Tabla */}
          <div className="asignaturas-table-container">
            <table className="asignaturas-table">
              <thead>
                <tr className="asignaturas-table-header-row">
                  {[
                    "#",
                    "Nombre",
                    "Código",
                    "Carrera",
                    "Créditos",
                    "Nivel",
                    "Estado",
                    "Acciones",
                  ].map((h) => (
                    <th key={h} className="asignaturas-table-header">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {asignaturasFiltradas.length > 0 ? (
                  asignaturasFiltradas.map((a, i) => (
                    <tr key={a.id} className="asignaturas-table-row">
                      <td className="asignaturas-table-cell">{i + 1}</td>
                      <td className="asignaturas-table-cell">{a.nombre}</td>
                      <td className="asignaturas-table-cell">{a.codigo}</td>
                      <td className="asignaturas-table-cell">{a.carrera}</td>
                      <td className="asignaturas-table-cell">{a.creditos}</td>
                      <td className="asignaturas-table-cell">{a.nivel}</td>

                      <td className="asignaturas-table-cell">
                        <span
                          className={`estado-badge ${
                            a.estado === "Activo"
                              ? "estado-activo"
                              : "estado-inactivo"
                          }`}
                        >
                          {a.estado}
                        </span>
                      </td>

                      <td className="asignaturas-table-cell">
                        <div className="acciones-container">
                          <button
                            onClick={() => abrirEditar(a)}
                            title="Editar"
                            className="btn-accion btn-editar"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>

                          <button
                            onClick={() => abrirEliminar(a)}
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
                    <td colSpan={8} className="sin-registros">
                      No se encontraron asignaturas.
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
        titulo="Nueva Asignatura"
      >
        <FormularioAsignatura
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
        titulo="Editar Asignatura"
      >
        <FormularioAsignatura
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
        titulo="Eliminar Asignatura"
      >
        <EliminarAsignatura
          asignatura={seleccionado}
          onConfirmar={manejarEliminar}
          onCancelar={cerrarModal}
        />
      </Modal>
    </div>
  );
}
