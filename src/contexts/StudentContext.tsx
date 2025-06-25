import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

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

interface StudentContextType {
  student: Student | null;
  setStudent: (student: Student) => void;
  clearStudent: () => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [student, setStudentState] = useState<Student | null>(
    localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")!) : null
  );

  const setStudent = (student: Student) => {
    setStudentState(student);
    localStorage.setItem("student", JSON.stringify(student));
  };

  const clearStudent = () => {
    setStudentState(null);
    localStorage.removeItem("student");
  };

  return (
    <StudentContext.Provider value={{ student, setStudent, clearStudent }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
} 