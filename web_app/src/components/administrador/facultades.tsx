import { useState } from "react";
import Modal from "../Modal";
import FormularioFacultad from "./academica/facultades/FormularioFacultad";
import EliminarFacultad from "./academica/facultades/EliminarFacultad";



const facultadesIniciales = [
  {
    id: 1,
    nombre: "Facultad de Ciencias Matemáticas y Físicas",
    codigo: "FCMF",
    decano: "Dr. Roberto Alvarado",
    carreras: 5,
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Facultad de Ciencias Naturales",
    codigo: "FCN",
    decano: "Dra. Patricia Salinas",
    carreras: 3,
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Facultad de Filosofía, Letras y Ciencias de la Educación",
    codigo: "FFLCE",
    decano: "Mg. Juan Mora",
    carreras: 8,
    estado: "Activo",
  },
  {
    id: 4,
    nombre: "Facultad de Ciencias Médicas",
    codigo: "FCM",
    decano: "Dr. Carlos Vega",
    carreras: 4,
    estado: "Inactivo",
  },
  {
    id: 5,
    nombre: "Facultad de Ingeniería Industrial",
    codigo: "FII",
    decano: "Ing. Sofía Reyes",
    carreras: 6,
    estado: "Activo",
  },
];

const formVacio = { nombre: "", codigo: "", decano: "", estado: "Activo" };

export default function FacultadesPage() {
  const [facultades, setFacultades] = useState(facultadesIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);
  const [formData, setFormData] = useState(formVacio);

  const facultadesFiltradas = facultades.filter(
    (f) =>
      f.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      f.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
      f.decano.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const abrirCrear = () => {
    setFormData(formVacio);
    setModalAbierto("crear");
  };
  const abrirEditar = (f) => {
    setSeleccionado(f);
    setFormData({
      nombre: f.nombre,
      codigo: f.codigo,
      decano: f.decano,
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
    setFacultades((prev) => [
      ...prev,
      { id: Date.now(), ...formData, carreras: 0 },
    ]);
    cerrarModal();
  };

  const manejarEditar = (e) => {
    e.preventDefault();
    setFacultades((prev) =>
      prev.map((f) => (f.id === seleccionado.id ? { ...f, ...formData } : f)),
    );
    cerrarModal();
  };

  const manejarEliminar = () => {
    setFacultades((prev) => prev.filter((f) => f.id !== seleccionado.id));
    cerrarModal();
  };

  return (
    <div className="dashboard-layout">

      <div className="dashboard-viewport">
        <main className="main-content-body">
          {/* Encabezado */}
          <div className="facultades-header">
            <div>
              <h2 className="facultades-title">Facultades</h2>
              <p className="facultades-subtitle">
                Gestión de facultades registradas en el sistema.
              </p>
            </div>
            <button onClick={abrirCrear} className="btn-nueva-facultad">
              <i className="bi bi-plus-lg"></i> Nueva Facultad
            </button>
          </div>

          {/* Buscador */}
          <div className="facultades-search-container">
            <div className="facultades-search-box">
              <i className="bi bi-search"></i>
              <input
                type="text"
                className="facultades-search-input"
                placeholder="Buscar facultad..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>

          {/* Tabla */}
          <div className="facultades-table-wrapper">
            <table className="facultades-table">
              <thead>
                <tr style={{ background: "#f1f5f9" }}>
                  {[
                    "#",
                    "Nombre",
                    "Código",
                    "Decano",
                    "Carreras",
                    "Estado",
                    "Acciones",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "#475569",
                        fontSize: "0.82rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {facultadesFiltradas.length > 0 ? (
                  facultadesFiltradas.map((f, i) => (
                    <tr key={f.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "14px 16px", color: "#334155" }}>
                        {i + 1}
                      </td>
                      <td style={{ padding: "14px 16px", color: "#334155" }}>
                        {f.nombre}
                      </td>
                      <td style={{ padding: "14px 16px", color: "#334155" }}>
                        {f.codigo}
                      </td>
                      <td style={{ padding: "14px 16px", color: "#334155" }}>
                        {f.decano}
                      </td>
                      <td style={{ padding: "14px 16px", color: "#334155" }}>
                        {f.carreras}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span
                          className={`estado-badge ${
                            f.estado === "Activo"
                              ? "estado-activo"
                              : "estado-inactivo"
                          }`}
                        >
                          {f.estado}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div className="acciones-container">
                          <button
                            onClick={() => abrirEditar(f)}
                            title="Editar"
                            className="btn-icon btn-editar"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            onClick={() => abrirEliminar(f)}
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
                    <td colSpan={7} className="facultades-empty">
                      No se encontraron facultades.
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
        titulo="Nueva Facultad"
      >
        <FormularioFacultad
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
        titulo="Editar Facultad"
      >
        <FormularioFacultad
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
        titulo="Eliminar Facultad"
      >
        <EliminarFacultad
          facultad={seleccionado}
          onConfirmar={manejarEliminar}
          onCancelar={cerrarModal}
        />
      </Modal>
    </div>
  );
}
