'use client';
import { useState } from 'react'; 
import { useRouter } from 'next/router';

export interface MenuItem {
  nombre: string;
  ruta: string;
  icono: string;
  accion?: () => void;
}

export interface SeccionMenu {
  categoria: string;
  items: MenuItem[];
}

interface SidebarProps {
  titulo?: string;
  menuEstructurado: SeccionMenu[];
}

export default function Sidebar({ titulo = "", menuEstructurado = [] }: SidebarProps) {
  const router = useRouter();
  const [colapsado, setColapsado] = useState<boolean>(true);

  return (
    <aside className={`sidebar-container ${colapsado ? 'collapsed' : ''}`}>
      <div>
        
        {/* Cabecera del Sidebar */}
        <div className="sidebar-brand-container">
          <button 
            type="button"
            onClick={() => setColapsado(!colapsado)} 
            className="btn-toggle-sidebar"
          >
            <i className="bi bi-list"></i>
          </button>
          
          {!colapsado && titulo && <div className="sidebar-brand">{titulo}</div>}
        </div>
        
        <div className="sidebar-menu-wrapper">
          {menuEstructurado.map((seccion: SeccionMenu, sIdx: number) => (
            <div key={sIdx}>

              {/* Categoría */}
              {seccion.categoria && !colapsado && (
                <div className="sidebar-section-title">{seccion.categoria}</div>
              )}
              
              <ul className="sidebar-menu">
                {seccion.items.map((item: MenuItem, iIdx: number) => {
                  const estaActiva = router.pathname === item.ruta;
                  
                  const manejarClic = () => {
                    if (item.accion) {
                      item.accion(); 
                    } else if (item.ruta) {
                      router.push(item.ruta);
                    }
                  };
                  
                  return (
                    <li
                      key={iIdx}
                      className={`sidebar-item ${estaActiva ? 'active' : ''}`}
                      onClick={manejarClic}
                      title={colapsado ? item.nombre : ''}
                    >
                      {item.icono && <i className={`bi ${item.icono}`}></i>}
                      {!colapsado && <span>{item.nombre}</span>}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}