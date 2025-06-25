import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useStudent } from "../contexts/StudentContext";
import type { Student } from "../contexts/StudentContext";

function StudentSelector() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setStudent } = useStudent();

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.getStudents()
      .then(res => setStudents(res.data))
      .catch(() => setError("No se pudo cargar la lista de estudiantes"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.studentId?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = async (student: Student) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getStudentProfileById(student.id);
      setStudent(res.data);
      navigate("/dashboard");
    } catch {
      setError("No se pudo cargar el perfil del estudiante");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dot-pattern bg-gray-50">
      <div className="w-full max-w-md mx-auto animate-fade-in">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300">
          {/* Header con gradiente */}
          <div className="bg-gradient-to-br from-blue-700 via-purple-600 to-fuchsia-500 p-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1 drop-shadow">Selecciona tu Perfil</h1>
            <p className="text-blue-100 text-base font-medium">Elige un estudiante para continuar</p>
          </div>

          {/* Input de búsqueda */}
          <div className="p-6 pb-2">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
                </svg>
              </span>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none"
                placeholder="Buscar estudiante..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {/* Lista de estudiantes */}
          <div className="px-2 pb-6 max-h-80 overflow-y-auto">
            {error && <div className="text-red-600 text-sm text-center mb-4 animate-shake">{error}</div>}
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center text-gray-400 py-8">No se encontraron estudiantes</div>
            ) : (
              <ul className="space-y-2">
                {filtered.map((student, idx) => (
                  <li
                    key={student.id}
                    className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm hover:bg-blue-50 cursor-pointer transition-all group"
                    onClick={() => handleSelect(student)}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow ${idx % 2 === 0 ? 'bg-blue-100 text-blue-600' : 'bg-cyan-100 text-cyan-600'}`}>
                      <svg className="w-5 h-5 mr-1 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {student.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-800 group-hover:text-blue-700 truncate">{student.name}</div>
                      <div className="text-xs text-gray-500">ID: {student.studentId || student.id}</div>
                    </div>
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </li>
                ))}
              </ul>
            )}
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

export default StudentSelector; 