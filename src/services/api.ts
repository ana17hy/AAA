import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Student, Subject, Absence, AcademicRecord, DashboardStats, AbsenceSummary } from "../types/student";

const BACKEND_URL = "http://pc2-matricula-alb-2123051620.us-east-1.elb.amazonaws.com/"; // ESTO SE CAMBIA CON EL ENDPOINT BASE

class ApiService {
  private api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  constructor() {
    // interceptor para agregar el header x-api-key
    // antes de cada petición, se agrega el token al header automaticamente
    this.api.interceptors.request.use(
      (config) => {
        const apiKey = localStorage.getItem("token"); // el token que se guarda en el localStorage
        if (apiKey) {
          config.headers["x-api-key"] = apiKey;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // interceptor para manejar errores de respuesta
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // token expirado o inválido
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  // métodos de información del estudiante
  // trae la información del estudiante que esta logeado desde el backend
  async getStudentProfile(id: number): Promise<AxiosResponse<Student>> {
    return this.api.get(`/students/${id}/`);
  }

  // actualiza la información del estudiante que esta logeado desde el backend
  async updateStudentProfile(id: number, student: Partial<Student>): Promise<AxiosResponse<Student>> {
    return this.api.put(`/students/${id}/`, student);
  }

  // trae la información de todas las materias
  async getSubjects(): Promise<AxiosResponse<Subject[]>> {
    return this.api.get("/subjects/"); // sin los parametros porque ahi sale no parameters
  }
  // trae la información de la materia que esta logeado desde el backend
  async getSubject(id: string): Promise<AxiosResponse<Subject>> {
    return this.api.get(`/subjects/${id}`);
  }  

  // se inscribe a la materia
  // se inscribe a la materia -> post
  async enrollSubject(studentId: number, subjectId: number): Promise<AxiosResponse> { 
    return this.api.post("/enrollments/", {
      student_id: studentId,
      subject_id: subjectId
    });
  }

  // se desinscribe de la materia segun el id del estudiante y el id de la materia
  async dropSubject(studentId: number, subjectId: number): Promise<AxiosResponse<void>> {
    return this.api.delete(`/enrollments/?student_id=${studentId}&subject_id=${subjectId}`); // se borra la inscripción de la materia
  }  

  // información de asistencias
  async createAbsence(absence: {
    student_id: number;
    subject_id: number;
    date: string; // formato "YYYY-MM-DD"
    reason: string;
    comment: string;
  }): Promise<AxiosResponse<Absence>> {
    return this.api.post("/absences/", absence);
  }  

  // trae la información de las asistencias de la materia segun el id del estudiante y el id de la materia
  async getAttendanceBySubject(studentId: number, subjectId: number): Promise<AxiosResponse<Absence[]>> {
    return this.api.get("/absences/", {
      params: {
        student_id: studentId,
        subject_id: subjectId
      }
    });
  }
  

  // método para verificar la salud de la api
  async healthCheck(): Promise<AxiosResponse> {
    return this.api.get("/health");
  }

  // trae la información de todos los estudiantes
  async getStudents(): Promise<AxiosResponse<Student[]>> {
    return this.api.get("/students/");
  }

  // trae la información del estudiante segun el id
  async getStudentProfileById(studentId: string): Promise<AxiosResponse<Student>> {
    return this.api.get(`/students/${studentId}/`);
  }

  // trae la información de las inscripciones del estudiante segun el id
  async getEnrollments(studentId: string) {
    return this.api.get(`/enrollments/?student_id=${studentId}`);
  }

  // trae la información de las faltas del estudiante segun el id -> un resumen
  async getAbsenceSummary(studentId: number): Promise<AxiosResponse<AbsenceSummary[]>> {
    return this.api.get(`/students/${studentId}/absence_summary/`);
  }

  // trae la información de las faltas del estudiante segun el id -> todas las faltas
  async getAbsences(studentId: string) {
    return this.api.get(`/absences/?student_id=${studentId}`);
  }
}

export default new ApiService(); 