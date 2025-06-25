import { Link } from "react-router-dom";
import type { Subject } from "../types/student";
import Card from "./ui/Card";
import Button from "./ui/Button";

interface SubjectCardProps {
  subject: Subject;
  onEnroll?: (subjectId: string) => void;
  onDrop?: (subjectId: string) => void;
  showActions?: boolean;
}

function SubjectCard({ subject, onEnroll, onDrop, showActions = true }: SubjectCardProps) {
  const getStatusColor = (status: Subject['status']) => {
    switch (status) {
      case 'enrolled':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'dropped':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Subject['status']) => {
    switch (status) {
      case 'enrolled':
        return 'Inscrito';
      case 'completed':
        return 'Completado';
      case 'dropped':
        return 'Dado de baja';
      default:
        return 'Desconocido';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{subject.name}</h3>
          <p className="text-sm text-gray-600">{subject.code}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subject.status)}`}>
          {getStatusText(subject.status)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Profesor:</span>
          <span className="font-medium">{subject.teacher}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Créditos:</span>
          <span className="font-medium">{subject.credits}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Horario:</span>
          <span className="font-medium">{subject.schedule}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Aula:</span>
          <span className="font-medium">{subject.classroom}</span>
        </div>
        {subject.grade && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Calificación:</span>
            <span className="font-medium text-blue-600">{subject.grade}/100</span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Link
          to={`/subjects/${subject.id}`}
          className="flex-1"
        >
          <Button variant="secondary" className="w-full">
            Ver detalles
          </Button>
        </Link>
        
        {showActions && (
          <>
            {subject.status === 'enrolled' ? (
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDrop?.(subject.id)}
                className="flex-shrink-0"
              >
                Dar de baja
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => onEnroll?.(subject.id)}
                className="flex-shrink-0"
              >
                Inscribirse
              </Button>
            )}
          </>
        )}
      </div>
    </Card>
  );
}

export default SubjectCard; 