import { useState, useEffect, useRef } from 'react';

const respuestasAutomaticas = [
  {
    palabras: ['horario', 'horarios', 'disponibilidad'],
    respuesta: 'Los horarios de tutoría dependen de la disponibilidad de cada docente. Puedes consultarlos al momento de realizar una solicitud desde el módulo de tutorías.',
  },
  {
    palabras: ['cancelar', 'cancelación', 'cancelar tutoría'],
    respuesta: 'Para cancelar una tutoría confirmada, el estudiante debe hacerlo con al menos 24 horas de anticipación. Cancelaciones tardías quedan registradas en el historial.',
  },
  {
    palabras: ['solicitar', 'solicitud', 'pedir tutoría'],
    respuesta: 'El estudiante puede solicitar una tutoría desde su panel, seleccionando la asignatura, el docente y el horario disponible. La solicitud queda en estado "Solicitada" hasta que el docente confirme.',
  },
  {
    palabras: ['inasistencia', 'no asistió', 'no asistir', 'faltó'],
    respuesta: 'Si un estudiante no asiste a una tutoría confirmada sin cancelar previamente, queda registrada como "No asistida". Acumular inasistencias puede limitar futuras solicitudes.',
  },
  {
    palabras: ['cambiar docente', 'cambio de docente', 'otro docente'],
    respuesta: 'El cambio de docente tutor debe ser gestionado por el coordinador académico. Esta consulta ha sido registrada para su seguimiento.',
  },
  {
    palabras: ['reporte', 'reportes', 'estadísticas'],
    respuesta: 'Puedes consultar los reportes de tutorías por docente, estudiantes atendidos y temas recurrentes desde el módulo de Reportes en tu panel.',
  },
  {
    palabras: ['requisito', 'requisitos', 'para solicitar'],
    respuesta: 'Para solicitar una tutoría el estudiante debe estar matriculado en la asignatura correspondiente y el docente debe tener disponibilidad en el horario seleccionado.',
  },
  {
    palabras: ['estado', 'estados', 'estado tutoría'],
    respuesta: 'Las tutorías manejan los siguientes estados: Solicitada, Pendiente, Confirmada, Atendida, Cancelada y No asistida.',
  },
];

const mensajeBienvenida = {
  id: 1,
  tipo: 'ia',
  texto: '¡Hola! Soy el asistente académico del sistema de tutorías. Puedo ayudarte con consultas sobre horarios, solicitudes, cancelaciones, reportes y más. ¿En qué puedo ayudarte?',
  fecha: new Date().toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' }),
};

function obtenerRespuesta(mensaje) {
  const texto = mensaje.toLowerCase();
  for (const item of respuestasAutomaticas) {
    if (item.palabras.some(p => texto.includes(p))) {
      return item.respuesta;
    }
  }
  return 'No encontré información específica sobre tu consulta. Esta pregunta ha sido escalada al coordinador académico para su atención. 📋';
}

export default function AsistenteIACoordinador({ onVolver }) {
  const [mensajes, setMensajes] = useState([mensajeBienvenida]);
  const [input, setInput] = useState('');
  const [escribiendo, setEscribiendo] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes, escribiendo]);

  const enviarMensaje = () => {
    if (!input.trim() || escribiendo) return;

    const nuevoMensaje = {
      id: Date.now(),
      tipo: 'usuario',
      texto: input.trim(),
      fecha: new Date().toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' }),
    };

    setMensajes(prev => [...prev, nuevoMensaje]);
    setInput('');
    setEscribiendo(true);

    setTimeout(() => {
      const respuesta = obtenerRespuesta(nuevoMensaje.texto);
      setMensajes(prev => [...prev, {
        id: Date.now() + 1,
        tipo: 'ia',
        texto: respuesta,
        fecha: new Date().toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' }),
      }]);
      setEscribiendo(false);
    }, 1200);
  };

  const manejarTecla = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje();
    }
  };

  const limpiarChat = () => {
    setMensajes([mensajeBienvenida]);
  };

  const sugerencias = [
    '¿Cuáles son los horarios de tutoría?',
    '¿Cómo cancelo una tutoría?',
    '¿Cuáles son los estados de una tutoría?',
    '¿Qué pasa si un estudiante no asiste?',
  ];

  return (
    <div className="ia-container">

      {/* Encabezado */}
      <div className="ia-header">
        <div>
          <h2 className="ia-title">Asistente IA</h2>
          <p className="ia-subtitle">Chat académico con el agente de inteligencia artificial.</p>
        </div>
        <div className="ia-header-actions">
          <button onClick={limpiarChat} className="ia-btn ia-btn--outline">
            <i className="bi bi-trash"></i> Limpiar
          </button>
          <button onClick={onVolver} className="ia-btn ia-btn--outline">
            <i className="bi bi-arrow-left"></i> Volver
          </button>
        </div>
      </div>

      {/* Contenedor del chat */}
      <div className="ia-chat-box">

        {/* Mensajes */}
        <div className="ia-messages">
          {mensajes.map(m => (
            <div
              key={m.id}
              className={`ia-msg-row ${m.tipo === 'usuario' ? 'ia-msg-row--user' : ''}`}
            >
              {/* Avatar IA */}
              {m.tipo === 'ia' && (
                <div className="ia-avatar ia-avatar--ia">
                  <i className="bi bi-cpu"></i>
                </div>
              )}
              {/* Avatar usuario */}
              {m.tipo === 'usuario' && (
                <div className="ia-avatar ia-avatar--user">
                  <i className="bi bi-person"></i>
                </div>
              )}

              {/* Burbuja */}
              <div className={`ia-bubble-wrapper ${m.tipo === 'usuario' ? 'ia-bubble-wrapper--user' : ''}`}>
                <div className={`ia-bubble ${m.tipo === 'usuario' ? 'ia-bubble--user' : 'ia-bubble--ia'}`}>
                  {m.texto}
                </div>
                <span className="ia-timestamp">{m.fecha}</span>
              </div>
            </div>
          ))}

          {/* Indicador escribiendo */}
          {escribiendo && (
            <div className="ia-msg-row">
              <div className="ia-avatar ia-avatar--ia">
                <i className="bi bi-cpu"></i>
              </div>
              <div className="ia-typing">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="ia-typing-dot"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef}></div>
        </div>

        {/* Sugerencias */}
        {mensajes.length === 1 && (
          <div className="ia-suggestions">
            {sugerencias.map((s, i) => (
              <button
                key={i}
                onClick={() => setInput(s)}
                className="ia-suggestion-btn"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Aviso IA */}
        <div className="ia-disclaimer">
          <i className="bi bi-info-circle"></i>
          Las respuestas del asistente son orientativas y no constituyen decisiones académicas definitivas.
        </div>

        {/* Input */}
        <div className="ia-input-bar">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={manejarTecla}
            placeholder="Escribe tu consulta aquí... (Enter para enviar)"
            rows={1}
            className="ia-textarea"
            onInput={(e) => {
              e.currentTarget.style.height = 'auto';
              e.currentTarget.style.height = Math.min(e.currentTarget.scrollHeight, 120) + 'px';
            }}
          />
          <button
            onClick={enviarMensaje}
            disabled={!input.trim() || escribiendo}
            className={`ia-send-btn ${input.trim() && !escribiendo ? 'ia-send-btn--active' : ''}`}
          >
            <i className="bi bi-send"></i>
          </button>
        </div>
      </div>
    </div>
  );
}