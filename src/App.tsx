import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import useToken from "./contexts/TokenContext";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import SubjectList from "./components/SubjectList";
import StudentSelector from "./components/StudentSelector";
import AbsencesTable from "./components/AbsencesTable";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { token } = useToken();

  if (!token) {
    return <Login />;
  }

  return (
    <Route>
      {token ? (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 p-4">
            <Routes>
              {/* ✅ Esta ruta muestra el panel principal del sistema */}
              {/* 🧠 CAMBIAR si el tema no es académico: por ejemplo, MovieDashboard, ProductDashboard */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

              {/* ✅ Lista principal: materias, productos, películas, etc. */}
              {/* 🧠 CAMBIAR <SubjectList /> si estás listando otra cosa, como <ProductList />, <MovieList /> */}
              <Route path="/subjects" element={<ProtectedRoute><SubjectList /></ProtectedRoute>} />

              {/* ✅ Tabla detallada: asistencias, pedidos, reservas... */}
              {/* 🧠 CAMBIAR <AbsencesTable /> si estás mostrando otra entidad */}
              <Route path="/absences" element={<ProtectedRoute><AbsencesTable /></ProtectedRoute>} />

              {/* ✅ Pantalla de selección de estudiante (solo si aplica) */}
              {/* 🧠 ELIMINAR o CAMBIAR si tu app no tiene estudiantes */}
              <Route path="/select-student" element={<ProtectedRoute><StudentSelector /></ProtectedRoute>} />

              {/* Redirección general si la ruta no existe */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      ) : (
        // Si no hay token, solo mostrar el login
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </Route>
  );
}

export default App;
