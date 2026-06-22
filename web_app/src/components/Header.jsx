import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const [rol, setRol] = useState('');

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      setRol(savedRole.toUpperCase());
    }
  }, []);

  const salir = () => {
    localStorage.clear();
    router.replace('/login');
  };

  return (
    <header className="main-header">
      <div className="header-title">
        Sistema de Gestión de Tutorías Académicas
      </div>
      <div className="header-user-zone">

        <span className="user-role-badge">{rol || 'CARGANDO...'}</span>
        <button className="btn-cerrar-sesion" onClick={salir}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}