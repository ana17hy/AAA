import { useState, useEffect } from "react";
import { useStudent } from "../contexts/StudentContext";
import api from "../services/api";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Button from "./ui/Button";

function SubjectList() {
  const { student } = useStudent();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!student) return;
    setLoading(true);
    setError(null);
    api.getEnrollments(Number(student.id))
      .then(res => setEnrollments(res.data))
      .catch(() => setError("No se pudieron cargar las materias inscritas"))
      .finally(() => setLoading(false));
  }, [student]);

  const filtered = enrollments.filter((enr) => {
    const name = enr.subject_name || enr.subject?.name || "";
    const code = enr.subject_code || enr.subject?.code || "";
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            label="Buscar materias"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre o código..."
          />
        </div>
      </div>

      {error && (
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">{error}</div>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {enrollments.length > 2 && (
            <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded shadow text-sm flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
              <span><strong>Recordatorio:</strong> Solo puedes inscribir máximo 2 materias.</span>
            </div>
          )}
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No hay materias inscritas o no se encontraron con ese filtro.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((enr) => (
                <Card key={enr.id} className="p-6 shadow rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800 text-lg">{enr.subject_name || enr.subject?.name}</h3>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Inscrito
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{enr.subject_code || enr.subject?.code}</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ubicación:</span>
                      <span>{enr.subject?.location || "-"}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
          <div className="text-center text-sm text-gray-500 mt-4">
            Mostrando {filtered.length} de {enrollments.length} materias inscritas
          </div>
        </>
      )}
    </div>
  );
}

export default SubjectList; 