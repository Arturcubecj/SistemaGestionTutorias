import { useState } from 'react';
import { useRouter } from 'next/router';

export default function RestablecerPassword() {
  const router = useRouter();
  
  const [email, setEmail] = useState<string>('');
  const [mensaje, setMensaje] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [cargando, setCargando] = useState<boolean>(false);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    if (!email) {
      setError('Por favor, ingresa tu correo electrónico institucional.');
      return;
    }

    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setMensaje(`Te hemos enviado un enlace de recuperación a ${email}`);
      setEmail('');
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Recuperar Contraseña</h2>
        <p className="sub">Ingresa tu correo y te enviaremos las instrucciones para restablecer tu acceso.</p>

        {mensaje && <div className="alert alert-info">{mensaje}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={manejarEnvio}>
          <div className="field">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="ej. estudiante@ug.edu.ec"
              autoComplete="email"
            />
          </div>

          <button type="submit" className="btn btn-login" disabled={cargando}>
            {cargando ? 'Enviando...' : 'Enviar enlace de recuperación'}
          </button>
        </form>

        <div className="volver-container">
          <a 
            href="#" 
            className="link-reset"
            onClick={(e) => {
              e.preventDefault(); 
              router.push('/login'); 
            }}
          >
            <i className="bi bi-arrow-left"></i> Volver al inicio de sesión</a>
        </div>
      </div>
    </div>
  );
}