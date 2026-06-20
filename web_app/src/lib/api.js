export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

export async function login(usuario, clave) {

  if (usuario === 'admin' && clave === 'admin123') {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', 'token-falso-admin');
    }
    return { result: true, rol: 'admin' }; 
  }

  if (usuario === 'coordinador' && clave === 'coord123') {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', 'token-falso-coordinador');
    }
    return { result: true, rol: 'coordinador' };
  }

  if (usuario === 'docente' && clave === 'docente123') {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', 'token-falso-docente');
    }
    return { result: true, rol: 'docente' };
  }


  if (usuario === 'estudiante' && clave === 'est123') {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', 'token-falso-estudiante');
    }
    return { result: true, rol: 'estudiante' };
  }

  return { result: false, message: 'Usuario o contraseña incorrectos' };
}