import { useEffect, useState } from "react";
import { useStudent } from "../contexts/StudentContext";
import api from "../services/api";
import Card from "./ui/Card";
import Button from "./ui/Button";

interface AbsenceSummary {
  [subjectName: string]: {
    absences: number;
    justified: number;
    total: number;
  };
}

function Dashboard() {
  const { student } = useStudent();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [absenceSummary, setAbsenceSummary] = useState<AbsenceSummary>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!student) return;
    setLoading(true);
    setError(null);
    Promise.all([
      api.getEnrollments(Number(student.id)),
      api.getAbsenceSummary(student.id)
    ])
      .then(([enrollmentsRes, summaryRes]) => {
        setEnrollments(enrollmentsRes.data);
        setAbsenceSummary(summaryRes.data);
      })
      .catch(() => setError("No se pudo cargar la información del dashboard"))
      .finally(() => setLoading(false));
  }, [student]);

  if (!student) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">Selecciona un estudiante para ver el dashboard</div>
      </div>
    );
  }

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

  // Resumen de materias
  const totalSubjects = enrollments.length;
  const subjectNames = enrollments.map((e) => e.subject_name || e.subject?.name).join(", ");

  // Resumen de asistencias
  const totalAbsences = Object.values(absenceSummary).reduce((acc, s) => acc + (s.absences || 0), 0);
  const totalJustified = Object.values(absenceSummary).reduce((acc, s) => acc + (s.justified || 0), 0);

  return (
    <div className="space-y-8">
      {/* Info básica */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">{student.name}</h1>
            <p className="text-blue-100">{student.email} | Matrícula: {student.studentId}</p>
            <p className="text-blue-100">Carrera: {student.major} | Semestre: {student.semester}</p>
          </div>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 shadow rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{totalSubjects}</div>
          <div className="text-sm text-gray-600">Materias inscritas</div>
          <div className="text-xs text-gray-500 mt-2 truncate">{subjectNames}</div>
        </Card>
        <Card className="p-6 shadow rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600">{totalAbsences}</div>
          <div className="text-sm text-gray-600">Total de inasistencias</div>
        </Card>
        <Card className="p-6 shadow rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{totalJustified}</div>
          <div className="text-sm text-gray-600">Justificadas</div>
        </Card>
      </div>

      {/* Resumen de asistencias por materia */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Resumen de asistencias por materia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(absenceSummary).map(([subject, summary]) => (
            <Card key={subject} className="p-4 shadow rounded-lg">
              <div className="font-semibold text-gray-800 mb-2">{subject}</div>
              <div className="flex justify-between text-sm">
                <span>Faltas:</span>
                <span className="font-bold text-red-600">{summary.absences}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Justificadas:</span>
                <span className="font-bold text-blue-800">{summary.justified}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total:</span>
                <span className="font-bold text-gray-700">{summary.total}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;