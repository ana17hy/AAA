# PC2 - Aplicación React

Una aplicación React moderna para gestionar personajes de rol con todas las mejores prácticas implementadas.

## 🚀 Características Implementadas

### ✅ React con Componentes Funcionales
- Todos los componentes están implementados como funciones usando hooks
- Uso de `useState` y `useEffect` para manejo de estado
- Componentes puros y reutilizables

### ✅ React Router para Navegación
- Navegación basada en URL con React Router v6
- Rutas protegidas con autenticación
- Navegación programática con `useNavigate`
- Rutas anidadas y parámetros dinámicos

### ✅ Manejo de Estado
- `useState` para estado local de componentes
- `useEffect` para efectos secundarios y llamadas a API
- Context API para estado global (TokenContext)
- Persistencia en localStorage

### ✅ Consumo de API
- Servicio centralizado con Axios
- Interceptores para manejo automático de tokens
- Protección con API Key en headers
- Manejo de errores global
- Tipado fuerte con TypeScript

### ✅ Protección de Rutas
- Componente `ProtectedRoute` para rutas privadas
- Verificación de token JWT
- Redirección automática al login
- Manejo de sesiones expiradas

### ✅ Validación de Formularios
- Validación en tiempo real
- Mensajes de error visuales
- Validación del lado del cliente
- Estados de carga y error

### ✅ Componentes Reutilizables
- **Button**: Botones con variantes, estados y loading
- **Input**: Campos de entrada con validación y errores
- **Card**: Contenedores con header y acciones
- **Table**: Tablas dinámicas con columnas configurables
- **CharacterCard**: Tarjeta específica para personajes
- **Navbar**: Navegación principal con estado activo

## 🛠️ Tecnologías Utilizadas

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **React Router v6** - Navegación
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework de estilos
- **Vite** - Build tool y dev server

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── ui/                 # Componentes reutilizables
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── Table.tsx
│   ├── CharacterCard.tsx   # Tarjeta de personaje
│   ├── CharacterForm.tsx   # Formulario de personaje
│   ├── CharacterList.tsx   # Lista de personajes
│   ├── CharacterDetail.tsx # Detalle de personaje
│   ├── Dashboard.tsx       # Panel principal
│   ├── Login.tsx          # Página de login
│   ├── Navbar.tsx         # Navegación
│   └── ProtectedRoute.tsx # Ruta protegida
├── contexts/
│   └── TokenContext.tsx   # Contexto de autenticación
├── services/
│   └── api.ts            # Servicio de API
├── types/
│   └── character.ts      # Tipos compartidos
├── App.tsx              # Componente principal
└── main.tsx            # Punto de entrada
```

## 🔧 Configuración

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_KEY=your-api-key-here
VITE_BACKEND_URL=http://localhost:8080
```

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build
npm run preview
```

## 🎯 Funcionalidades

### Autenticación
- Login con email y contraseña
- Validación de formularios
- Manejo de errores de autenticación
- Persistencia de sesión

### Gestión de Personajes
- Crear nuevos personajes
- Listar personajes existentes
- Ver detalles de personajes
- Editar personajes
- Eliminar personajes

### Dashboard
- Estadísticas de personajes
- Actividad reciente
- Navegación rápida

### Validaciones
- Campos requeridos
- Validación de email
- Rango de atributos (3-18)
- Nivel de personaje (1-20)
- Longitud mínima de nombres

## 🔒 Seguridad

- Protección con API Key en headers
- Tokens JWT para autenticación
- Rutas protegidas
- Interceptores para manejo de errores
- Validación del lado del cliente y servidor

## 📱 Responsive Design

- Diseño mobile-first
- Grid system adaptativo
- Componentes responsivos
- Navegación optimizada para móviles

## 🎨 UI/UX

- Diseño moderno con Tailwind CSS
- Estados de carga y error
- Feedback visual inmediato
- Navegación intuitiva
- Componentes accesibles