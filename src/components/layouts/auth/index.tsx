import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="min-h-screen w-full flex">
      {/* Panel Izquierdo - Imagen */}
      <div className="hidden lg:flex flex-1 bg-white p-8">
        <div className="w-full h-full rounded-3xl relative overflow-hidden">
          <img
            src="/images/recepcion.jpg"
            alt="Recepción"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Panel Derecho */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-12 bg-white">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
