import { createContext, useContext, useState, type ReactNode } from "react";
import type { Student, Subject, Attendance, DashboardStats } from "../types/student";

type MockDataContextType = {
  student: Student | null;
  subjects: Subject[];
  attendance: Attendance[];
  dashboardStats: DashboardStats | null;
  loading: boolean;
  error: string | null;
  fetchStudentProfile: () => Promise<void>;
  fetchSubjects: () => Promise<void>;
  fetchAttendance: () => Promise<void>;
  fetchDashboardStats: () => Promise<void>;
  enrollSubject: (subjectId: string) => Promise<void>;
  dropSubject: (subjectId: string) => Promise<void>;
};

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

type MockDataProviderProps = {
  children: ReactNode;
};

// Datos mock para desarrollo
const mockStudent: Student = {
  id: "1",
  name: "María García López",
  email: "maria.garcia@estudiante.edu",
  studentId: "2024001",
  major: "Ingeniería en Sistemas",
  semester: 6,
  gpa: 3.8,
  totalCredits: 85,
  enrollmentDate: "2022-08-15",
};

const mockSubjects: Subject[] = [
  {
    id: "1",
    code: "MAT301",
    name: "Cálculo Diferencial",
    credits: 4,
    teacher: "Dr. Carlos Mendoza",
    schedule: "Lun-Mié-Vie 8:00-10:00",
    classroom: "Aula 201",
    semester: 6,
    grade: 85,
    status: "enrolled",
  },
  {
    id: "2",
    code: "PRO302",
    name: "Programación Avanzada",
    credits: 3,
    teacher: "Ing. Ana Torres",
    schedule: "Mar-Jue 14:00-16:00",
    classroom: "Lab 105",
    semester: 6,
    grade: 92,
    status: "enrolled",
  },
  {
    id: "3",
    code: "BDD303",
    name: "Bases de Datos",
    credits: 4,
    teacher: "MSc. Roberto Silva",
    schedule: "Lun-Mié 10:00-12:00",
    classroom: "Aula 305",
    semester: 6,
    grade: 88,
    status: "enrolled",
  },
  {
    id: "4",
    code: "RED304",
    name: "Redes de Computadoras",
    credits: 3,
    teacher: "Dr. Patricia Ruiz",
    schedule: "Mar-Jue 16:00-18:00",
    classroom: "Lab 203",
    semester: 6,
    status: "enrolled",
  },
];

const mockAttendance: Attendance[] = [
  {
    id: "1",
    subjectId: "1",
    subjectName: "Cálculo Diferencial",
    date: "2024-01-15",
    status: "present",
  },
  {
    id: "2",
    subjectId: "1",
    subjectName: "Cálculo Diferencial",
    date: "2024-01-17",
    status: "present",
  },
  {
    id: "3",
    subjectId: "2",
    subjectName: "Programación Avanzada",
    date: "2024-01-16",
    status: "present",
  },
  {
    id: "4",
    subjectId: "2",
    subjectName: "Programación Avanzada",
    date: "2024-01-18",
    status: "late",
    notes: "Llegó 10 minutos tarde",
  },
  {
    id: "5",
    subjectId: "3",
    subjectName: "Bases de Datos",
    date: "2024-01-15",
    status: "present",
  },
  {
    id: "6",
    subjectId: "3",
    subjectName: "Bases de Datos",
    date: "2024-01-17",
    status: "absent",
    notes: "Justificación médica",
  },
];

const mockDashboardStats: DashboardStats = {
  totalSubjects: 4,
  totalCredits: 14,
  averageGrade: 88.3,
  attendanceRate: 85.7,
  upcomingClasses: mockSubjects.slice(0, 2),
  recentAttendance: mockAttendance.slice(0, 3),
};

export function MockDataProvider({ children }: MockDataProviderProps) {
  const [student, setStudent] = useState<Student | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStudentProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      setStudent(mockStudent);
    } catch (err) {
      setError("Error al cargar el perfil del estudiante");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setSubjects(mockSubjects);
    } catch (err) {
      setError("Error al cargar las materias");
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendance = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setAttendance(mockAttendance);
    } catch (err) {
      setError("Error al cargar las asistencias");
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setDashboardStats(mockDashboardStats);
    } catch (err) {
      setError("Error al cargar las estadísticas");
    } finally {
      setLoading(false);
    }
  };

  const enrollSubject = async (subjectId: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      // Simular inscripción
      console.log(`Inscrito en materia ${subjectId}`);
    } catch (err) {
      setError("Error al inscribirse en la materia");
    } finally {
      setLoading(false);
    }
  };

  const dropSubject = async (subjectId: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      // Simular baja
      console.log(`Baja de materia ${subjectId}`);
    } catch (err) {
      setError("Error al darse de baja de la materia");
    } finally {
      setLoading(false);
    }
  };

  const value = {
    student,
    subjects,
    attendance,
    dashboardStats,
    loading,
    error,
    fetchStudentProfile,
    fetchSubjects,
    fetchAttendance,
    fetchDashboardStats,
    enrollSubject,
    dropSubject,
  };

  return (
    <MockDataContext.Provider value={value}>{children}</MockDataContext.Provider>
  );
}

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (context === undefined) {
    throw new Error("useMockData must be used within a MockDataProvider");
  }
  return context;
};

export default useMockData; 