import { Link, useNavigate } from "react-router-dom";
import useToken from "../contexts/TokenContext";
import { useStudent } from "../contexts/StudentContext";
import Button from "./ui/Button";

function Navbar() {
  const { removeToken } = useToken();
  const { student, clearStudent } = useStudent();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    clearStudent();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4">
        <div className="font-bold text-blue-700 text-xl">Portal Académico</div>
        <div className="flex items-center gap-4">
          {student && (
            <>
              <span className="font-medium text-gray-700 hidden sm:block">{student.name}</span>
              <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                {student.name?.[0]}
              </div>
            </>
          )}
          <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Dashboard</Link>
          <Link to="/subjects" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Materias</Link>
          <Link to="/absences" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Asistencias</Link>
          <Button variant="secondary" size="sm" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 