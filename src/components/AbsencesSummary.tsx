import { useEffect, useState } from "react";
import { useStudent } from "../contexts/StudentContext";
import api from "../services/api";
import Card from "./ui/Card";

function AbsencesSummary() {
  const { student } = useStudent();
  const [summary, setSummary] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!student) return;
    setLoading(true);
    setError(null);
    api.getAbsenceSummary(student.id)
      .then(res => setSummary(res.data))
      .catch(() => setError("No se pudo cargar el resumen de asistencias"))
      .finally(() => setLoading(false));
  }, [student]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-24">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <div className="text-red-600 mb-2">{error}</div>
      </div>
    );
  }

  // Calcular totales
  const total = Object.values(summary).reduce((acc: number, s: any) => acc + (s.total || 0), 0);
  const absences = Object.values(summary).reduce((acc: number, s: any) => acc + (s.absences || 0), 0);
  const justified = Object.values(summary).reduce((acc: number, s: any) => acc + (s.justified || 0), 0);
  const attendanceRate = total > 0 ? ((total - absences) / total) * 100 : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-blue-600">{total}</div>
        <div className="text-sm text-gray-600">Total</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-red-600">{absences}</div>
        <div className="text-sm text-gray-600">Ausentes</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-blue-800">{justified}</div>
        <div className="text-sm text-gray-600">Justificadas</div>
      </Card>
      <Card className="p-4 text-center col-span-2 md:col-span-2">
        <div className="text-lg font-bold text-purple-600">{attendanceRate.toFixed(1)}%</div>
        <div className="text-sm text-gray-600">Porcentaje de asistencia</div>
      </Card>
    </div>
  );
}

export default AbsencesSummary; 