import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useMockData from "../contexts/MockDataContext";
import Card from "./ui/Card";
import Button from "./ui/Button";

type TabType = 'profile' | 'subjects' | 'attendance';

function StudentProfile() {
  const { student, subjects, attendance, loading, error, fetchStudentProfile, fetchSubjects, fetchAttendance } = useMockData();
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  useEffect(() => {
    fetchStudentProfile();
    fetchSubjects();
    fetchAttendance();
  }, [fetchStudentProfile, fetchSubjects, fetchAttendance]);

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
        <Button onClick={fetchStudentProfile}>
          Reintentar
        </Button>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">No se pudo cargar la información del estudiante</div>
      </div>
    );
  }

  const enrolledSubjects = subjects.filter(s => s.status === 'enrolled');
  const completedSubjects = subjects.filter(s => s.status === 'completed');
  const totalAttendance = attendance.length;
  const presentAttendance = attendance.filter(a => a.status === 'present').length;
  const attendanceRate = totalAttendance > 0 ? (presentAttendance / totalAttendance) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header del perfil */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold">
            {student.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{student.name}</h1>
            <p className="text-blue-100">{student.email}</p>
            <p className="text-blue-100">Matrícula: {student.studentId}</p>
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-blue-600">{student.semester}</div>
          <div className="text-sm text-gray-600">Semestre</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-green-600">{student.gpa}</div>
          <div className="text-sm text-gray-600">GPA</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-purple-600">{student.totalCredits}</div>
          <div className="text-sm text-gray-600">Créditos</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-orange-600">{attendanceRate.toFixed(1)}%</div>
          <div className="text-sm text-gray-600">Asistencia</div>
        </Card>
      </div>

      {/* Tabs de navegación */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'profile', label: 'Información Personal' },
            { id: 'subjects', label: 'Materias' },
            { id: 'attendance', label: 'Asistencias' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenido de las tabs */}
      <div className="mt-6">
        {activeTab === 'profile' && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Información Académica</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Carrera</label>
                  <p className="mt-1 text-sm text-gray-900">{student.major}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Semestre actual</label>
                  <p className="mt-1 text-sm text-gray-900">{student.semester}° semestre</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha de inscripción</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(student.enrollmentDate).toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Promedio general (GPA)</label>
                  <p className="mt-1 text-sm text-gray-900">{student.gpa}/4.0</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Créditos acumulados</label>
                  <p className="mt-1 text-sm text-gray-900">{student.totalCredits} créditos</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Activo
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'subjects' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Materias Inscritas</h2>
              <Link to="/subjects">
                <Button variant="secondary">Ver todas las materias</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrolledSubjects.map(subject => (
                <Card key={subject.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Inscrito
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{subject.code}</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Profesor:</span>
                      <span>{subject.teacher}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Créditos:</span>
                      <span>{subject.credits}</span>
                    </div>
                    {subject.grade && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Calificación:</span>
                        <span className="font-medium text-blue-600">{subject.grade}/100</span>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
            {enrolledSubjects.length === 0 && (
              <Card className="p-6 text-center">
                <p className="text-gray-500">No tienes materias inscritas actualmente</p>
                <Link to="/subjects" className="mt-4 inline-block">
                  <Button>Ver materias disponibles</Button>
                </Link>
              </Card>
            )}
            {/* Materias completadas */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Materias Completadas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedSubjects.length > 0 ? completedSubjects.map(subject => (
                  <Card key={subject.id} className="p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Completada
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{subject.code}</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Profesor:</span>
                        <span>{subject.teacher}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Créditos:</span>
                        <span>{subject.credits}</span>
                      </div>
                      {subject.grade && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Calificación:</span>
                          <span className="font-medium text-blue-600">{subject.grade}/100</span>
                        </div>
                      )}
                    </div>
                  </Card>
                )) : (
                  <Card className="p-6 text-center">
                    <p className="text-gray-500">No tienes materias completadas aún</p>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Registro de Asistencias</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Materia
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notas
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendance.slice(0, 10).map(record => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(record.date).toLocaleDateString('es-ES')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.subjectName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          record.status === 'present' ? 'bg-green-100 text-green-800' :
                          record.status === 'absent' ? 'bg-red-100 text-red-800' :
                          record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {record.status === 'present' ? 'Presente' :
                           record.status === 'absent' ? 'Ausente' :
                           record.status === 'late' ? 'Tardanza' :
                           'Justificado'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {record.notes || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {attendance.length === 0 && (
              <Card className="p-6 text-center">
                <p className="text-gray-500">No hay registros de asistencia disponibles</p>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentProfile; 