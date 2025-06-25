import { type ReactNode } from "react";
import useToken from "../contexts/TokenContext";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { token } = useToken();

  if (!token) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-red-500 text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Acceso Denegado
            </h2>
            <p className="text-gray-600 mb-6">
              necesitas iniciar sesión para acceder a esta página
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              ir al login
            </button>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute; 