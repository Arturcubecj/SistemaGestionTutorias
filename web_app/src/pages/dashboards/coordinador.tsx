import { useRouter } from 'next/router';

export default function Admin() {
  const router = useRouter();

  const cerrarSesion = (): void => {
    localStorage.clear();
    router.replace('/login');
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar-simple">
        <h3>COORDINADOR</h3>
        <button className="btn-salir" onClick={cerrarSesion}>
          Cerrar Sesión
        </button>
      </aside>
      <main className="main-simple">
        <h1>Panel de COORDINADOR</h1>
      </main>
    </div>
  );
}