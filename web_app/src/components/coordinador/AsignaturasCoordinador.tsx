import { useState } from 'react';
import Modal from '../Modal';

const asignaturas = [
  { id: 1, nombre: 'Desarrollo de Aplicaciones Web', codigo: 'DAWA', carrera: 'Ingeniería en Software', creditos: 4, nivel: 7, docente: 'Ing. Carlos Martínez', estado: 'Activo' },
  { id: 2, nombre: 'Bases de Datos Relacionales', codigo: 'BDR', carrera: 'Ingeniería en Software', creditos: 3, nivel: 4, docente: 'Dra. Laura Cedeño', estado: 'Activo' },
  { id: 3, nombre: 'Calidad de Software', codigo: 'CAS', carrera: 'Ingeniería en Software', creditos: 3, nivel: 8, docente: 'Ing. Carlos Martínez', estado: 'Activo' },
  { id: 4, nombre: 'Sistemas Operativos', codigo: 'SOP', carrera: 'Ingeniería en Sistemas', creditos: 4, nivel: 5, docente: 'Mg. Juan Mora', estado: 'Activo' },
  { id: 5, nombre: 'Anatomía Humana', codigo: 'ANH', carrera: 'Medicina', creditos: 5, nivel: 1, docente: 'Dr. Roberto Alvarado', estado: 'Inactivo' },
  { id: 6, nombre: 'Procesos Industriales', codigo: 'PIN', carrera: 'Ingeniería Industrial', creditos: 4, nivel: 3, docente: 'Ing. Sofía Reyes', estado: 'Activo' },
];

const carrerasDisponibles = ['Todas', ...new Set(asignaturas.map(a => a.carrera))];

export default function AsignaturasCoordinador({ onVolver }) {
  const [busqueda, setBusqueda] = useState('');
  const [filtroCarrera, setFiltroCarrera] = useState('Todas');
  const [seleccionado, setSeleccionado] = useState(null);

  const asignaturasFiltradas = asignaturas.filter(a => {
    const coincideBusqueda =
      a.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.docente.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCarrera = filtroCarrera === 'Todas' || a.carrera === filtroCarrera;
    return coincideBusqueda && coincideCarrera;
  });

  return (
    <div>

    {/* Encabezado */}
    <div className="asig-header">

        <div>
            <h2 className="asig-title">Asignaturas</h2>

            <p className="asig-subtitle">
                Listado de asignaturas registradas en el sistema.
            </p>
        </div>

        <button
            onClick={onVolver}
            className="asig-btn-volver"
        >
            <i className="bi bi-arrow-left"></i>
            Volver
        </button>

    </div>

    {/* Toolbar */}

    <div className="asig-toolbar">

        <div className="asig-filtros">

            {carrerasDisponibles.map(c => (

                <button
                    key={c}
                    onClick={() => setFiltroCarrera(c)}
                    className={`asig-filtro-btn ${filtroCarrera === c ? "activo" : ""}`}
                >
                    {c}
                </button>

            ))}

        </div>

        <div className="asig-search">

            <i className="bi bi-search"></i>

            <input
                type="text"
                placeholder="Buscar asignatura..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
            />

        </div>

    </div>

    {/* Tabla */}

    <div className="asig-table-container">

        <table className="asig-table">

            <thead>

                <tr>

                    {['#', 'Nombre', 'Código', 'Carrera', 'Docente', 'Créditos', 'Nivel', 'Estado', 'Detalle'].map(h => (

                        <th key={h}>{h}</th>

                    ))}

                </tr>

            </thead>

            <tbody>

                {asignaturasFiltradas.length > 0 ? (

                    asignaturasFiltradas.map((a, i) => (

                        <tr key={a.id}>

                            <td>{i + 1}</td>

                            <td className="asig-bold">{a.nombre}</td>

                            <td>{a.codigo}</td>

                            <td className="asig-muted">{a.carrera}</td>

                            <td className="asig-muted">{a.docente}</td>

                            <td>{a.creditos}</td>

                            <td>{a.nivel}</td>

                            <td>

                                <span className={`badge ${a.estado === 'Activo'
                                        ? 'badge-activo'
                                        : 'badge-inactivo'
                                    }`}
                                >
                                    {a.estado}
                                </span>

                            </td>

                            <td>

                                <button
                                    className="btn-detalle"
                                    title="Ver detalle"
                                    onClick={() => setSeleccionado(a)}
                                >
                                    <i className="bi bi-eye"></i>
                                </button>

                            </td>

                        </tr>

                    ))

                ) : (

                    <tr>

                        <td colSpan={9} className="asig-empty">
                            No se encontraron asignaturas.
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
        titulo="Detalle de Asignatura"
    >

        {seleccionado && (

            <div className="asig-modal">

                <div className="asig-modal-badges">

                    <span className={`badge ${seleccionado.estado === 'Activo'
                            ? 'badge-activo'
                            : 'badge-inactivo'
                        }`}
                    >
                        {seleccionado.estado}
                    </span>

                    <span className="badge badge-codigo">
                        {seleccionado.codigo}
                    </span>

                </div>

                <div className="asig-grid">

                    {[
                        { label: 'Nombre', valor: seleccionado.nombre, icono: 'bi-book' },
                        { label: 'Carrera', valor: seleccionado.carrera, icono: 'bi-diagram-3' },
                        { label: 'Docente', valor: seleccionado.docente, icono: 'bi-person-badge' },
                        { label: 'Créditos', valor: seleccionado.creditos, icono: 'bi-star' },
                        { label: 'Nivel', valor: seleccionado.nivel, icono: 'bi-layers' },
                        { label: 'Código', valor: seleccionado.codigo, icono: 'bi-hash' },
                    ].map((c, i) => (

                        <div
                            key={i}
                            className="asig-card"
                        >

                            <div className="asig-card-label">
                                <i className={`bi ${c.icono}`}></i>
                                {c.label}
                            </div>

                            <div className="asig-card-value">
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