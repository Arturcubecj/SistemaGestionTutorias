import type { AppProps } from 'next/app'; 
import '../styles/Login.css'; 
import '../styles/Dashboard.css'; 
import '../styles/ModalGlobal.css'; 
import '../styles/Estudiante/FormularioEstudiante.css'; 
import '../styles/Estudiante/HistorialEstudiante.css';
import '../styles/Estudiante/ReporteEstudiante.css';
import '../styles/Estudiante/CalendarioEstudiante.css';
import '../styles/Docente/GestionSolicitudes.css';
import '../styles/Docente/GestionHorarios.css';
import '../styles/Docente/Bitacoras.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}