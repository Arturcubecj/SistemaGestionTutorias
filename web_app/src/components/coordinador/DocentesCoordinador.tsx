import { useState } from 'react';
import Modal from '../Modal';

const docentes = [
  { id: 1, nombre: 'Carlos Martínez', titulo: 'Ing.', email: 'c.martinez@ug.edu.ec', facultad: 'Facultad de Ciencias Matemáticas y Físicas', especialidad: 'Desarrollo de Software', tutoriasAtendidas: 12, estado: 'Activo' },
  { id: 2, nombre: 'Laura Cedeño', titulo: 'Dra.', email: 'l.cedeno@ug.edu.ec', facultad: 'Facultad de Ciencias Matemáticas y Físicas', especialidad: 'Bases de Datos', tutoriasAtendidas: 9, estado: 'Activo' },
  { id: 3, nombre: 'Juan Mora', titulo: 'Mg.', email: 'j.mora@ug.edu.ec', facultad: 'Facultad de Filosofía, Letras y Ciencias de la Educación', especialidad: 'Pedagogía', tutoriasAtendidas: 6, estado: 'Activo' },
  { id: 4, nombre: 'Roberto Alvarado', titulo: 'Dr.', email: 'r.alvarado@ug.edu.ec', facultad: 'Facultad de Ciencias Matemáticas y Físicas', especialidad: 'Matemáticas', tutoriasAtendidas: 0, estado: 'Inactivo' },
  { id: 5, nombre: 'Sofía Reyes', titulo: 'Ing.', email: 's.reyes@ug.edu.ec', facultad: 'Facultad de Ingeniería Industrial', especialidad: 'Procesos Industriales', tutoriasAtendidas: 4, estado: 'Activo' },
];

const facultadesDisponibles = ['Todas', ...new Set(docentes.map(d => d.facultad))];

export default function DocentesCoordinador({ onVolver }) {
  const [busqueda, setBusqueda] = useState('');
  const [filtroFacultad, setFiltroFacultad] = useState('Todas');
  const [seleccionado, setSeleccionado] = useState(null);

  const docentesFiltrados = docentes.filter(d => {
    const coincideBusqueda =
      d.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      d.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      d.especialidad.toLowerCase().includes(busqueda.toLowerCase());
    const coincideFacultad = filtroFacultad === 'Todas' || d.facultad === filtroFacultad;
    return coincideBusqueda && coincideFacultad;
  });

  return (
    <div>

    {/* Encabezado */}

    <div className="doc-header">

        <div>

            <h2 className="doc-title">Docentes</h2>

            <p className="doc-subtitle">
                Listado de docentes registrados en el sistema.
            </p>

        </div>

        <button
            onClick={onVolver}
            className="doc-btn-volver"
        >
            <i className="bi bi-arrow-left"></i>
            Volver
        </button>

    </div>

    {/* Toolbar */}

    <div className="doc-toolbar">

        <div className="doc-filtros">

            {facultadesDisponibles.map(f => (

                <button
                    key={f}
                    onClick={() => setFiltroFacultad(f)}
                    className={`doc-filtro-btn ${filtroFacultad === f ? "activo" : ""}`}
                >
                    {f === "Todas" ? f : f.replace("Facultad de ", "")}
                </button>

            ))}

        </div>

        <div className="doc-search">

            <i className="bi bi-search"></i>

            <input
                type="text"
                placeholder="Buscar docente..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
            />

        </div>

    </div>

    {/* Tabla */}

    <div className="doc-table-container">

        <table className="doc-table">

            <thead>

                <tr>

                    {['#', 'Nombre', 'Correo', 'Especialidad', 'Tutorías', 'Estado', 'Detalle'].map(h => (
                        <th key={h}>{h}</th>
                    ))}

                </tr>

            </thead>

            <tbody>

                {docentesFiltrados.length > 0 ? (

                    docentesFiltrados.map((d, i) => (

                        <tr key={d.id}>

                            <td>{i + 1}</td>

                            <td className="doc-bold">
                                {d.titulo} {d.nombre}
                            </td>

                            <td className="doc-muted">
                                {d.email}
                            </td>

                            <td>{d.especialidad}</td>

                            <td>
                                <span className="badge badge-purple">
                                    {d.tutoriasAtendidas}
                                </span>
                            </td>

                            <td>

                                <span className={`badge ${d.estado === "Activo"
                                        ? "badge-activo"
                                        : "badge-inactivo"
                                    }`}
                                >
                                    {d.estado}
                                </span>

                            </td>

                            <td>

                                <button
                                    className="btn-detalle"
                                    title="Ver detalle"
                                    onClick={() => setSeleccionado(d)}
                                >
                                    <i className="bi bi-eye"></i>
                                </button>

                            </td>

                        </tr>

                    ))

                ) : (

                    <tr>

                        <td colSpan={7} className="doc-empty">
                            No se encontraron docentes.
                        </td>

                    </tr>

                )}

            </tbody>

        </table>

    </div>

    {/* Modal */}

    <Modal
        isOpen={!!seleccionado}
        onClose={() => setSeleccionado(null)}
        titulo="Detalle del Docente"
    >

        {seleccionado && (

            <div className="doc-modal">

                <div className="doc-avatar-card">

                    <div className="doc-avatar">
                        <i className="bi bi-person-badge"></i>
                    </div>

                    <div className="doc-avatar-info">

                        <div className="doc-avatar-nombre">
                            {seleccionado.titulo} {seleccionado.nombre}
                        </div>

                        <div className="doc-avatar-email">
                            {seleccionado.email}
                        </div>

                    </div>

                    <span
                        className={`badge doc-estado ${seleccionado.estado === "Activo"
                                ? "badge-activo"
                                : "badge-inactivo"
                            }`}
                    >
                        {seleccionado.estado}
                    </span>

                </div>

                <div className="doc-grid">

                    {[
                        { label: 'Facultad', valor: seleccionado.facultad, icono: 'bi-building' },
                        { label: 'Especialidad', valor: seleccionado.especialidad, icono: 'bi-mortarboard' },
                        { label: 'Tutorías atendidas', valor: seleccionado.tutoriasAtendidas, icono: 'bi-calendar-check' },
                        { label: 'Título', valor: seleccionado.titulo, icono: 'bi-award' },
                    ].map((c, i) => (

                        <div
                            key={i}
                            className="doc-card"
                        >

                            <div className="doc-card-label">
                                <i className={`bi ${c.icono}`}></i>
                                {c.label}
                            </div>

                            <div className="doc-card-value">
                                {c.valor}
                            </div>

                        </div>

                    ))}

                </div>

                <div className="form-actions">

                    <button
                        type="button"
                        className="btn-form cancelar"
                        onClick={() => setSeleccionado(null)}
                    >
                        Cerrar
                    </button>

                </div>

            </div>

        )}

    </Modal>

</div>
  );
}