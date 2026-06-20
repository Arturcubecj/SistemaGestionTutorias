import { useRouter } from 'next/router';

export default function Admin() {
  const router = useRouter();
  return (
    <div className="dashboard-layout">
      <aside className="sidebar-simple">
        <h3>Coordinador</h3>
        <button className="btn-salir" onClick={() => { localStorage.clear(); router.replace('/login'); }}>Cerrar Sesión</button>
      </aside>
      <main className="main-simple">
        <h1>Panel de coordinador</h1>
        <p>SOY Cordinador xd XDDDDDDDDDD.</p>
      </main>
    </div>
  );
}