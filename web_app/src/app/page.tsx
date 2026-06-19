import ChatBot from "@/components/chatbot/ChatBot";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="p-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Sistema de Gestión de Tutorías
        </h1>

        <p className="mt-4 text-gray-600">
          Bienvenido al sistema académico.
        </p>
      </div>

      <ChatBot />
    </main>
  );
}