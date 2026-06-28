import { useState } from 'react';
import Modal from '../Modal';

const estudiantes = [
  { id: 1, nombre: 'Ana Torres', cedula: '0912345678', email: 'a.torres@ug.edu.ec', carrera: 'Ingeniería en Software', nivel: 7, tutoriasSolicitadas: 5, ultimaTutoria: '2026-06-20', estado: 'Activo' },
  { id: 2, nombre: 'Luis Pérez', cedula: '0923456789', email: 'l.perez@ug.edu.ec', carrera: 'Ingeniería en Sistemas', nivel: 5, tutoriasSolicitadas: 3, ultimaTutoria: '2026-06-21', estado: 'Activo' },
  { id: 3, nombre: 'María Gómez', cedula: '0934567890', email: 'm.gomez@ug.edu.ec', carrera: 'Ingeniería en Software', nivel: 3, tutoriasSolicitadas: 4, ultimaTutoria: '2026-06-22', estado: 'Activo' },
  { id: 4, nombre: 'Jorge Lema', cedula: '0945678901', email: 'j.lema@ug.edu.ec', carrera: 'Medicina', nivel: 2, tutoriasSolicitadas: 1, ultimaTutoria: '2026-06-18', estado: 'Inactivo' },
  { id: 5, nombre: 'Carla Ríos', cedula: '0956789012', email: 'c.rios@ug.edu.ec', carrera: 'Ingeniería Industrial', nivel: 8, tutoriasSolicitadas: 2, ultimaTutoria: '2026-06-25', estado: 'Activo' },
  { id: 6, nombre: 'Pedro Suárez', cedula: '0967890123', email: 'p.suarez@ug.edu.ec', carrera: 'Ingeniería en Software', nivel: 6, tutoriasSolicitadas: 1, ultimaTutoria: '2026-06-18', estado: 'Activo' },
];

const carrerasDisponibles = ['Todas', ...new Set(estudiantes.map(e => e.carrera))];

export default function EstudiantesCoordinador({ onVolver }) {
  const [busqueda, setBusqueda] = useState('');
  const [filtroCarrera, setFiltroCarrera] = useState('Todas');
  const [seleccionado, setSeleccionado] = useState(null);

  const estudiantesFiltrados = estudiantes.filter(e => {
    const coincideBusqueda =
      e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.cedula.includes(busqueda) ||
      e.email.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCarrera = filtroCarrera === 'Todas' || e.carrera === filtroCarrera;
    return coincideBusqueda && coincideCarrera;
  });

  return (
    <div>

    {/* Encabezado */}

    <div className="est-header">

        <div>
            <h2 className="est-title">Estudiantes</h2>

            <p className="est-subtitle">
                Listado de estudiantes registrados en el sistema.
            </p>
        </div>

        <button
            className="est-btn-volver"
            onClick={onVolver}
        >
            <i className="bi bi-arrow-left"></i>
            Volver
        </button>

    </div>

    {/* Toolbar */}

    <div className="est-toolbar">

        <div className="est-filtros">

            {carrerasDisponibles.map(c => (

                <button
                    key={c}
                    onClick={() => setFiltroCarrera(c)}
                    className={`est-filtro-btn ${filtroCarrera === c ? "activo" : ""}`}
                >
                    {c}
                </button>

            ))}

        </div>

        <div className="est-search">

            <i className="bi bi-search"></i>

            <input
                type="text"
                placeholder="Buscar estudiante..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
            />

        </div>

    </div>

    {/* Tabla */}

    <div className="est-table-container">

        <table className="est-table">

            <thead>

                <tr>

                    {['#', 'Nombre', 'Cédula', 'Carrera', 'Nivel', 'Tutorías', 'Estado', 'Detalle'].map(h => (
                        <th key={h}>{h}</th>
                    ))}

                </tr>

            </thead>

            <tbody>

                {estudiantesFiltrados.length > 0 ? (

                    estudiantesFiltrados.map((e, i) => (

                        <tr key={e.id}>

                            <td>{i + 1}</td>

                            <td className="est-bold">
                                {e.nombre}
                            </td>

                            <td className="est-muted">
                                {e.cedula}
                            </td>

                            <td>{e.carrera}</td>

                            <td>{e.nivel}</td>

                            <td>

                                <span className="badge badge-info">
                                    {e.tutoriasSolicitadas}
                                </span>

                            </td>

                            <td>

                                <span className={`badge ${e.estado === "Activo"
                                        ? "badge-activo"
                                        : "badge-inactivo"
                                    }`}
                                >
                                    {e.estado}
                                </span>

                            </td>

                            <td>

                                <button
                                    className="btn-detalle"
                                    title="Ver detalle"
                                    onClick={() => setSeleccionado(e)}
                                >
                                    <i className="bi bi-eye"></i>
                                </button>

                            </td>

                        </tr>

                    ))

                ) : (

                    <tr>

                        <td colSpan={8} className="est-empty">
                            No se encontraron estudiantes.
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
        titulo="Detalle del Estudiante"
    >

        {seleccionado && (

            <div className="est-modal">

                <div className="est-avatar-card">

                    <div className="est-avatar">
                        <i className="bi bi-person"></i>
                    </div>

                    <div className="est-avatar-info">

                        <div className="est-avatar-name">
                            {seleccionado.nombre}
                        </div>

                        <div className="est-avatar-email">
                            {seleccionado.email}
                        </div>

                    </div>

                    <span className={`badge est-estado ${seleccionado.estado === "Activo"
                            ? "badge-activo"
                            : "badge-inactivo"
                        }`}
                    >
                        {seleccionado.estado}
                    </span>

                </div>

                <div className="est-grid">

                    {[
                        { label: 'Cédula', valor: seleccionado.cedula, icono: 'bi-person-vcard' },
                        { label: 'Carrera', valor: seleccionado.carrera, icono: 'bi-diagram-3' },
                        { label: 'Nivel', valor: seleccionado.nivel, icono: 'bi-layers' },
                        { label: 'Tutorías solicitadas', valor: seleccionado.tutoriasSolicitadas, icono: 'bi-calendar-check' },
                        { label: 'Última tutoría', valor: seleccionado.ultimaTutoria, icono: 'bi-calendar3' },
                    ].map((c, i) => (

                        <div key={i} className="est-card">

                            <div className="est-card-label">
                                <i className={`bi ${c.icono}`}></i>
                                {c.label}
                            </div>

                            <div className="est-card-value">
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