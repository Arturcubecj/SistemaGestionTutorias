'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; 
import { login, getToken } from '../lib/api';



function LoginForm() {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [cargando, setCargando] = useState(false);
  const [verClave, setVerClave] = useState(false);

  useEffect(() => {
    if (router.query.expirado) {
      setInfo('Tu sesión expiró. Inicia sesión nuevamente.');
    }
  }, [router.query]);

  const entrar = async () => {
    setError('');
    setInfo('');
    if (!usuario || !clave) {
      setError('Ingresa tu usuario y contraseña.');
      return;
    }
    setCargando(true);
    const res = await login(usuario.trim(), clave);
    setCargando(false);

    if (res.result) {
      localStorage.setItem('role', res.rol); 

      if (res.rol === 'admin') {
        router.replace('/dashboards/admin');
      } else if (res.rol === 'coordinador') {
        router.replace('/dashboards/coordinador');
      } else if (res.rol === 'docente') {
        router.replace('/dashboards/docente');
      } else if (res.rol === 'estudiante') {
        router.replace('/dashboards/estudiante');
      } else {
        setError('Rol no reconocido en el sistema.');
      }
    } else {
      setError(res.message || 'Credenciales no válidas.');
    }
  };

  return (
    <div className="login-container"> 
      <div className="login-card">
        <h2>Iniciar sesión</h2>
        <p className="sub">Inicia sesión para acceder al sistema.</p>

        {info && <div className="alert alert-info">{info}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        <div className="field">
          <label htmlFor="usuario">Usuario</label>
          <input
            id="usuario"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="ej. aespinosa"
            autoComplete="username"
          />
        </div>

        <div className="field">
          <label htmlFor="clave">Contraseña</label>
          <div className="password-container">
            <input
              id="clave"
              type={verClave ? 'text' : 'password'}
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && entrar()}
              autoComplete="current-password"
              className="password-input"
            />
            <span 
              className="password-toggle-icon" 
              onClick={() => setVerClave(!verClave)}
            >
              <i className={verClave ?  "bi bi-eye ojoabierto" : "bi bi-eye-slash ojocerrado"}></i>
            </span>
          </div>
        </div>

        <button className="btn btn-login" onClick={entrar} disabled={cargando}>
          {cargando ? 'Verificando…' : 'Entrar al sistema'}
        </button>

        <button className="btn btn-reset">Restablecer contraseña</button>

        <div className="login-demo">
          Cuentas de demostración:<br />
          <b>admin / admin123</b> · <b>coordinador / coord123</b><br />
          <b>docente / docente123</b> · <b>estudiante / est123</b>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <LoginForm />;
}