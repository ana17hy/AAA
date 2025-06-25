import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  headerActions?: ReactNode;
}

function Card({ children, title, className = "", headerActions }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {(title || headerActions) && (
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          {title && (
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          )}
          {headerActions && (
            <div className="flex space-x-2">
              {headerActions}
            </div>
          )}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

export default Card; 