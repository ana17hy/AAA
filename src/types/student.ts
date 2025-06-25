export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  major: string;
  semester: number;
  gpa: number;
  totalCredits: number;
  enrollmentDate: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  teacher: string;
  schedule: string;
  classroom: string;
  semester: number;
  grade?: number;
  status: 'enrolled' | 'completed' | 'dropped';
}

export interface Attendance {
  id: string;
  subjectId: string;
  subjectName: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

export interface AcademicRecord {
  student: Student;
  subjects: Subject[];
  attendance: Attendance[];
  totalSubjects: number;
  totalCredits: number;
  averageGrade: number;
  attendanceRate: number;
}

export interface DashboardStats {
  totalSubjects: number;
  totalCredits: number;
  averageGrade: number;
  attendanceRate: number;
  upcomingClasses: Subject[];
  recentAttendance: Attendance[];
} 