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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
    }}>
      <div style={{
        width: 370,
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        overflow: 'hidden',
      }}>
        <div style={{
          background: 'linear-gradient(90deg, #3b82f6 0%, #9333ea 100%)',
          padding: '32px 24px 24px 24px',
          textAlign: 'center',
        }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#fff',
            margin: '0 auto 16px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: 32, color: '#3b82f6' }}>🎓</span>
          </div>
            <h2 className="text-3xl font-extrabold text-white mb-1 drop-shadow">Bienvenido al Portal Académico</h2>
            <div className="text-blue-100 text-base font-medium">Ingresa tu API Key para acceder</div>
          </div>

          {/* Formulario */}
          <form className="p-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="apiKey" className="block text-sm font-semibold text-gray-700 mb-1">API Key</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <span role="img" aria-label="key" className="text-lg">🔑</span>
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
                  className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 hover:text-blue-600 focus:outline-none"
                  onClick={() => setShowKey(v => !v)}
                  aria-label={showKey ? "Ocultar clave" : "Mostrar clave"}
                >
                  {showKey ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12C3.5 7.5 7.5 4.5 12 4.5s8.5 3 9.75 7.5c-1.25 4.5-5.25 7.5-9.75 7.5s-8.5-3-9.75-7.5z"
                      />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 002.25 12c1.25 4.5 5.25 7.5 9.75 7.5 2.042 0 3.97-.492 5.617-1.357M6.53 6.53A9.956 9.956 0 0112 4.5c4.5 0 8.5 3 9.75 7.5a10.478 10.478 0 01-4.293 5.568M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3l18 18"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Usa la API Key para autenticar las solicitudes</p>
            </div>
            {error && <div className="text-red-600 text-sm animate-shake">{error}</div>}
            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(90deg, #3b82f6 0%, #9333ea 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 17,
                border: 'none',
                borderRadius: 8,
                padding: '12px 0',
                marginTop: 8,
                marginBottom: 8,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(59,130,246,0.08)',
                transition: 'background 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                letterSpacing: 1,
              }}
              disabled={loading}
            >
              {loading ? (
                <span style={{ fontSize: 18, marginRight: 8 }}>⏳</span>
              ) : (
                <span style={{ fontSize: 20, marginRight: 6 }}>➟</span>
              )}
              {loading ? "Accediendo..." : "Acceder"}
            </button>
          </form>

          {/* Ayuda / ejemplo de clave */}
          <div className="bg-blue-50 border border-blue-100 rounded px-2 py-1 text-[13px] text-gray-700 flex items-center gap-1 mt-2 font-medium">
            <span className="text-yellow-400 text-base">🐣</span>
            Prueba con la clave:
            <span className="bg-gray-100 text-blue-700 font-mono px-1.5 py-0.5 rounded font-semibold ml-1">
              {DEFAULT_API_KEY}
            </span>
          </div>
        </div>
      </div>
  
  );
}

export default Login;
