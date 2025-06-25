import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../contexts/TokenContext";

const DEFAULT_API_KEY = "ed3ca6ac436a95811625b9a18f5b3265";

function Login() {
  const { saveToken } = useToken();
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem("apiKey") || "");
  const [error, setError] = useState<string | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey) {
      setError("Por favor ingresa tu API Key");
      return;
    }
    setLoading(true);
    setError(null);
    setTimeout(() => {
      saveToken(apiKey);
      setLoading(false);
      navigate("/select-student");
    }, 800); // Simula carga
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dot-pattern bg-gray-50">
      <div className="w-full max-w-md mx-auto animate-fade-in">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300">
          {/* Header con gradiente y birrete */}
          <div className="bg-gradient-to-br from-blue-700 via-purple-600 to-fuchsia-500 p-8 text-center">
            <div className="flex justify-center mb-3">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white bg-opacity-20 shadow-lg">
                {/* Birrete SVG grande */}
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0c-4.418 0-8-1.79-8-4" />
                </svg>
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-1 drop-shadow">Bienvenido al Portal Académico</h1>
            <p className="text-blue-100 text-base font-medium">Ingresa tu API Key para acceder</p>
          </div>

          {/* Formulario */}
          <form className="p-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="apiKey" className="block text-sm font-semibold text-gray-700 mb-1">API Key</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 01-8 0m8 0V8a4 4 0 10-8 0v4m8 0a4 4 0 01-8 0" />
                  </svg>
                </span>
                <input
                  id="apiKey"
                  type={showKey ? "text" : "password"}
                  className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none"
                  placeholder="Ingresa tu API Key"
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  autoFocus
                  disabled={loading}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-blue-600 focus:outline-none"
                  onClick={() => setShowKey(v => !v)}
                  aria-label={showKey ? "Ocultar clave" : "Mostrar clave"}
                >
                  {showKey ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.062-4.675A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.675-.938" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.25 2.25l2.25 2.25m-2.25-2.25A9.956 9.956 0 0022 9c0-5.523-4.477-10-10-10a9.956 9.956 0 00-4.675.938" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Usa la API Key para autenticar las solicitudes</p>
            </div>
            {error && <div className="text-red-600 text-sm animate-shake">{error}</div>}
            <button
              type="submit"
              className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-700 via-purple-600 to-fuchsia-500 shadow-lg transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
              {loading ? "Accediendo..." : "Acceder"}
            </button>
          </form>

          {/* Ayuda / ejemplo de clave */}
          <div className="bg-gray-50 border-t px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            Prueba con la clave: <span className="font-mono bg-gray-100 px-2 py-1 rounded text-blue-700">{DEFAULT_API_KEY}</span>
          </div>
        </div>
      </div>
      {/* Fondo con patrón de puntos y animación fade-in */}
      <style>{`
        .bg-dot-pattern {
          background-image: radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(.39,.575,.565,1) both;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: none; }
        }
        .animate-shake {
          animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}

export default Login;
