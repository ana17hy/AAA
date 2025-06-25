// Configuración de API para el examen
// 🔑 Tu API Key Personal: ed3ca6ac436a95811625b9a18f5b3265

export const API_CONFIG = {
  // URL del backend (cuando esté disponible)
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || "http://pc2-matricula-alb-2123051620.us-east-1.elb.amazonaws.com/",
  
  // API Key para autenticación
  API_KEY: import.meta.env.VITE_API_KEY || "ed3ca6ac436a95811625b9a18f5b3265",
  
  // Headers por defecto para las peticiones
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
    "X-API-Key": import.meta.env.VITE_API_KEY || "ed3ca6ac436a95811625b9a18f5b3265",
  },
  
  // Endpoints de la API
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/auth/login",
      LOGOUT: "/auth/logout",
      REGISTER: "/auth/register",
    },
    CHARACTERS: {
      LIST: "/characters",
      CREATE: "/characters",
      GET: (id: string) => `/characters/${id}`,
      UPDATE: (id: string) => `/characters/${id}`,
      DELETE: (id: string) => `/characters/${id}`,
    },
    DASHBOARD: {
      STATS: "/dashboard/stats",
    },
  },
};

// Función helper para crear headers con token de autorización
export const createAuthHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    ...API_CONFIG.DEFAULT_HEADERS,
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
};

// Función helper para manejar errores de API
export const handleApiError = (error: any) => {
  console.error("API Error:", error);
  
  if (error.response) {
    // El servidor respondió con un código de estado fuera del rango 2xx
    const { status } = error.response;
    
    switch (status) {
      case 400:
        return "Datos inválidos enviados al servidor";
      case 401:
        return "No autorizado. Verifica tus credenciales";
      case 403:
        return "Acceso prohibido. No tienes permisos para esta acción";
      case 404:
        return "Recurso no encontrado";
      case 409:
        return "Conflicto. El recurso ya existe";
      case 422:
        return "Datos de validación incorrectos";
      case 500:
        return "Error interno del servidor";
      default:
        return `Error del servidor: ${status}`;
    }
  } else if (error.request) {
    // La petición fue hecha pero no se recibió respuesta
    return "No se pudo conectar con el servidor. Verifica tu conexión a internet";
  } else {
    // Algo pasó al configurar la petición
    return "Error al configurar la petición";
  }
}; 