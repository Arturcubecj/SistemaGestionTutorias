import { useRouter } from 'next/router';

export default function Admin() {
  const router = useRouter();
  return (
    <div className="dashboard-layout">
      <aside className="sidebar-simple">
        <h3>Estudiante</h3>
        <button className="btn-salir" onClick={() => { localStorage.clear(); router.replace('/login'); }}>Cerrar Sesión</button>
      </aside>
      <main className="main-simple">
        <h1>Panel de Estudiante</h1>
        <p>SOY Estudiante XDDDDDDDDDD.</p>
      </main>
    </div>
  );
}