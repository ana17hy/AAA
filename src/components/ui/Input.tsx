import type { ChangeEvent, InputHTMLAttributes } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
}

function Input({
  label,
  error,
  onChange,
  helperText,
  className = "",
  ...props
}: InputProps) {
  const baseClasses = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200";
  const errorClasses = error 
    ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500";
  
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`${baseClasses} ${errorClasses} ${className}`}
        onChange={onChange}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}

export default Input; 