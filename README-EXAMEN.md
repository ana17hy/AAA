# 🎯 Plantilla para Examen - Gestor de Personajes D&D

## 📋 Descripción
Esta es una aplicación React + TypeScript para gestionar personajes de Dungeons & Dragons. La aplicación está configurada para funcionar **sin backend** usando datos simulados, perfecta para demostrar funcionalidades en un examen.

## 🚀 Características Implementadas

### ✅ Funcionalidades Completas
- **Autenticación simulada**: Login con cualquier email válido y contraseña de 6+ caracteres
- **Dashboard**: Estadísticas de personajes con datos simulados
- **Lista de personajes**: Ver todos los personajes con opciones de ver, editar y eliminar
- **Detalle de personaje**: Vista completa con atributos y estadísticas calculadas
- **Creación de personajes**: Formulario completo con validaciones
- **Eliminación de personajes**: Confirmación antes de eliminar

### 🎨 UI/UX
- Diseño responsive con Tailwind CSS
- Componentes reutilizables (Button, Card, Input, Table)
- Navegación intuitiva
- Estados de carga y error
- Validaciones de formularios

## 🔑 API Key para Backend Real

**Tu API Key Personal:** `ed3ca6ac436a95811625b9a18f5b3265`

### 📍 Dónde usar la API Key:

1. **Archivo de configuración**: `src/config/api.ts`
   ```typescript
   API_KEY: "ed3ca6ac436a95811625b9a18f5b3265"
   ```

2. **Variables de entorno**: Crear archivo `.env.local`
   ```env
   VITE_API_KEY=ed3ca6ac436a95811625b9a18f5b3265
   VITE_BACKEND_URL=http://tu-backend-url.com
   ```

3. **Headers de peticiones**: Se incluye automáticamente en todas las peticiones
   ```typescript
   headers: {
     "X-API-Key": "ed3ca6ac436a95811625b9a18f5b3265"
   }
   ```

## 🛠️ Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

### Acceso a la aplicación
- URL: `http://localhost:5173`
- **Login**: Usa cualquier email válido (ej: `test@test.com`) y contraseña de 6+ caracteres

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes de UI reutilizables
│   ├── Login.tsx       # Autenticación simulada
│   ├── Dashboard.tsx   # Panel principal
│   ├── CharacterList.tsx # Lista de personajes
│   ├── CharacterDetail.tsx # Detalle de personaje
│   └── CharacterForm.tsx # Formulario de creación
├── contexts/           # Contextos React
│   ├── TokenContext.tsx # Gestión de autenticación
│   └── MockDataContext.tsx # Datos simulados
├── types/              # Definiciones TypeScript
│   └── character.ts    # Tipo Character
├── config/             # Configuración
│   └── api.ts          # Configuración de API
└── services/           # Servicios (comentados)
    └── api.ts          # Servicio de API original
```

## 🔄 Cómo Conectar con Backend Real

### 1. Descomenta las líneas de backend
En cada componente, descomenta las líneas que están comentadas con `// COMENTADO - NO SE USA BACKEND`

### 2. Usa la configuración de API
```typescript
import { API_CONFIG, createAuthHeaders } from '../config/api';

// Ejemplo de petición
const response = await axios.get(`${API_CONFIG.BACKEND_URL}/characters`, {
  headers: createAuthHeaders(token)
});
```

### 3. Configura las variables de entorno
```env
VITE_API_KEY=ed3ca6ac436a95811625b9a18f5b3265
VITE_BACKEND_URL=http://tu-backend-url.com
```

## 🎯 Para el Examen

### ✅ Lo que está listo:
- **Frontend completo** con todas las funcionalidades
- **Datos simulados** que funcionan sin backend
- **API Key configurada** para conectar con backend real
- **Código comentado** mostrando dónde irían las llamadas al backend
- **Validaciones** y manejo de errores
- **UI responsive** y profesional

### 🔧 Lo que puedes hacer:
1. **Demostrar funcionalidades** sin necesidad de backend
2. **Conectar con tu backend** usando la API Key
3. **Modificar datos simulados** en `MockDataContext.tsx`
4. **Agregar nuevas funcionalidades** usando la estructura existente

### 📝 Notas importantes:
- Los datos se mantienen en memoria (se pierden al recargar)
- El login simulado acepta cualquier credencial válida
- Todas las operaciones CRUD están implementadas
- El código está bien documentado y comentado

## 🎨 Personalización

### Cambiar datos simulados:
Edita `src/contexts/MockDataContext.tsx`:
```typescript
const mockCharacters: Character[] = [
  // Agrega tus personajes aquí
];
```

### Cambiar estilos:
Modifica `src/index.css` o los componentes individuales.

### Agregar nuevas funcionalidades:
Sigue la estructura existente en `src/components/`.

---

## 🚀 ¡Listo para tu examen!

Esta plantilla te permite:
- ✅ Demostrar todas las funcionalidades sin backend
- ✅ Conectar fácilmente con un backend real
- ✅ Mostrar habilidades de React + TypeScript
- ✅ Tener una aplicación completa y funcional

**¡Buena suerte en tu examen! 🎯** 