import type { AppProps } from 'next/app'; 
import '../styles/Login.css'; 
import '../styles/Dashboard.css'; 
import '../styles/ModalGlobal.css'; 
import '../styles/Estudiante/FormularioEstudiante.css'; 
import '../styles/Estudiante/HistorialEstudiante.css';
import '../styles/Estudiante/ReporteEstudiante.css';
import '../styles/Estudiante/CalendarioEstudiante.css';
import '../styles/Administrador/agente.css'; 
import '../styles/Administrador/asignaturas.css'; 
import '../styles/Administrador/carreras.css'; 
import '../styles/Administrador/docentes.css'; 
import '../styles/Administrador/estudiantes.css'; 
import '../styles/Administrador/facultades.css';
import '../styles/Administrador/inicio.css';  
import '../styles/Administrador/periodos.css'; 
import '../styles/Administrador/tutorias.css'; 
import '../styles/Administrador/usuarios.css';
import '../styles/Coordinador/inicio.css';
import '../styles/Coordinador/asignaturas.css';
import '../styles/Coordinador/docentes.css';
import '../styles/Coordinador/estudiantes.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}