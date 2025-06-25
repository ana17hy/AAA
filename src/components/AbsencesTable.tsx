import { useState, useEffect } from "react";
import { useStudent } from "../contexts/StudentContext";
import api from "../services/api";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Button from "./ui/Button";

function AbsencesTable() {
  const { student } = useStudent();
  const [absences, setAbsences] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState<string>("all");

  useEffect(() => {
    if (!student) return;
    setLoading(true);
    setError(null);
    Promise.all([
      api.getAbsences(student.id),
      api.getAbsenceSummary(student.id)
    ])
      .then(([absencesRes, summaryRes]) => {
        setAbsences(absencesRes.data);
        setSummary(summaryRes.data);
      })
      .catch(() => setError("No se pudieron cargar las asistencias"))
      .finally(() => setLoading(false));
  }, [student]);

  // Agrupar por materia
  const grouped = absences.reduce((acc, curr) => {
    const subject = curr.subject_name || curr.subject?.name || "Sin materia";
    if (!acc[subject]) acc[subject] = [];
    acc[subject].push(curr);
    return acc;
  }, {} as Record<string, any[]>);

  // Filtros
  const filteredGrouped = Object.entries(grouped).filter(([subject]) =>
    subject.toLowerCase().includes(searchTerm.toLowerCase()) || filterSubject === "all" || subject === filterSubject
  );

  const subjectOptions = Object.keys(grouped);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <Button onClick={() => window.location.reload()}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            label="Buscar materia"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por materia..."
          />
        </div>
        <div className="lg:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">Materia</label>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas las materias</option>
            {subjectOptions.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center shadow rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{absences.length}</div>
          <div className="text-sm text-gray-600">Total de registros</div>
        </Card>
        <Card className="p-4 text-center shadow rounded-lg">
          <div className="text-2xl font-bold text-red-600">{Object.values(summary).reduce((acc: number, s: any) => acc + (s.absences || 0), 0)}</div>
          <div className="text-sm text-gray-600">Ausencias</div>
        </Card>
        <Card className="p-4 text-center shadow rounded-lg">
          <div className="text-2xl font-bold text-blue-800">{Object.values(summary).reduce((acc: number, s: any) => acc + (s.justified || 0), 0)}</div>
          <div className="text-sm text-gray-600">Justificadas</div>
        </Card>
        <Card className="p-4 text-center shadow rounded-lg">
          <div className="text-2xl font-bold text-gray-700">{Object.values(summary).reduce((acc: number, s: any) => acc + (s.total || 0), 0)}</div>
          <div className="text-sm text-gray-600">Total por resumen</div>
        </Card>
      </div>

      {filteredGrouped.length === 0 ? (
        <Card className="p-6 text-center">
          <div className="text-gray-500 mb-4">
            {searchTerm || filterSubject !== "all"
              ? "No se encontraron asistencias con los filtros aplicados"
              : "No hay registros de asistencia disponibles"
            }
          </div>
          {(searchTerm || filterSubject !== "all") && (
            <Button variant="secondary" onClick={() => {
              setSearchTerm("");
              setFilterSubject("all");
            }}>
              Limpiar filtros
            </Button>
          )}
        </Card>
      ) : (
        filteredGrouped.map(([subject, records]) => (
          <Card key={subject} className="p-6 shadow rounded-lg mb-6">
            <div className="mb-2 flex justify-between items-center">
              <div className="font-semibold text-lg text-gray-800">{subject}</div>
              <div className="text-sm text-gray-500">Faltas: <span className="font-bold text-red-600">{summary[subject]?.absences || 0}</span> / Justificadas: <span className="font-bold text-blue-800">{summary[subject]?.justified || 0}</span></div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(records as any[]).map((record: any) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(record.date).toLocaleDateString('es-ES', {
                          weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{record.reason || record.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ))
      )}

      <div className="text-center text-sm text-gray-500">
        Mostrando {absences.length} registros de asistencia
      </div>
    </div>
  );
}

export default AbsencesTable; 