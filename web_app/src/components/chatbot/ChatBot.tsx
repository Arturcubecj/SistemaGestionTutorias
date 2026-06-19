"use client";

import { useState } from "react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-xl border flex flex-col">

          {/* Encabezado */}
          <div className="bg-blue-600 text-white p-4 rounded-t-xl flex justify-between items-center">
            <h2 className="font-semibold">
              🤖 Asistente Académico
            </h2>

            <button
              onClick={() => setIsOpen(false)}
              className="text-xl"
            >
              ✕
            </button>
          </div>

          {/* Contenido */}
          <div className="flex-1 p-4 overflow-y-auto">

            {/* Mensaje inicial */}
            <div className="bg-gray-100 p-3 rounded-lg text-gray-800 inline-block">
              Hola 👋 ¿En qué puedo ayudarte?
            </div>

            {/* Preguntas rápidas */}
            <div className="mt-4 flex flex-wrap gap-2">

              <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200">
                Solicitar tutoría
              </button>

              <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200">
                Ver horarios
              </button>

              <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200">
                Estado de solicitud
              </button>

            </div>
          </div>

          {/* Caja de texto */}
          <div className="border-t p-3">
            <input
              type="text"
              placeholder="Escribe tu consulta..."
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>
      )}

      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-600 text-white text-2xl shadow-lg hover:scale-105 transition"
      >
        🤖
      </button>
    </>
  );
}