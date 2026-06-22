import { useRouter } from 'next/router';

export default function Admin() {
  const router = useRouter();
  return (
    <div className="dashboard-layout">
      <aside className="sidebar-simple">
        <h3>ADMIN</h3>
        <button className="btn-salir" onClick={() => { localStorage.clear(); router.replace('/login'); }}>Cerrar Sesión</button>
      </aside>
      <main className="main-simple">
        <h1>Panel de ADMIN</h1>
      </main>
    </div>
  );
}