# 📝 MERN_example - Aplicación de Gestión de Tareas

Proyecto educativo que implementa un stack MERN completo (MongoDB, Express, React, Node.js) para gestionar tareas. Ideal para aprender despliegue de aplicaciones web modernas.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![Node.js](https://img.shields.io/badge/Node.js-20.x-brightgreen)
![React](https://img.shields.io/badge/React-18.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green)

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación Local](#instalación-local)
- [Despliegue en Servidor Ubuntu](#despliegue-en-servidor-ubuntu)
- [Configuración de Nginx](#configuración-de-nginx)
- [Variables de Entorno](#variables-de-entorno)
- [API Endpoints](#api-endpoints)
- [Solución de Problemas](#solución-de-problemas)

---

## ✨ Características

- ✅ CRUD completo de tareas (Crear, Leer, Actualizar, Eliminar)
- ✅ Interfaz React moderna con Vite
- ✅ API RESTful con Express
- ✅ Base de datos MongoDB
- ✅ Responsive design
- ✅ Gestión de estado con React Hooks
- ✅ Manejo de errores

---

## 🔧 Requisitos Previos

### Para desarrollo local:
- Node.js >= 18.x
- MongoDB >= 6.x
- npm >= 9.x

### Para despliegue en servidor:
- Ubuntu Server 22.04 LTS (o superior)
- Acceso SSH al servidor
- Usuario con permisos sudo

---

## 📁 Estructura del Proyecto

```
MERN_example/
├── backend/                    # Servidor Node.js + Express
│   ├── server.js              # Punto de entrada de la API
│   ├── package.json           # Dependencias del backend
│   └── .env                   # Variables de entorno (no incluido en repo)
│
├── frontend/                   # Aplicación React + Vite
│   ├── src/
│   │   ├── App.jsx           # Componente principal
│   │   ├── App.css           # Estilos
│   │   └── main.jsx          # Punto de entrada React
│   ├── package.json          # Dependencias del frontend
│   ├── vite.config.js        # Configuración de Vite
│   └── .env                  # Variables de entorno (no incluido en repo)
│
└── README.md                  # Este archivo
```

---

## 🚀 Instalación Local

```bash
git clone https://github.com/aviladotgibert/MERN_example.git
cd MERN_example
```

El resto del tutorial de despliegue lo puedes encontrar en el siguiente [enlace](https://apuntes-alex.gitbook.io/apuntes-sistemas-y-redes/servicios/web/mern-stack)

## ⚙️ Variables de Entorno

### Backend (.env)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor Express | `3000` |
| `MONGODB_URI` | Cadena de conexión a MongoDB | `mongodb://user:pass@localhost:27017/db` |
| `NODE_ENV` | Entorno de ejecución | `production` o `development` |

### Frontend (.env / .env.production)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL` | URL del backend | `http://localhost:3000` (dev) o `/api` (prod) |

---

## 🔌 API Endpoints

### Health Check
```http
GET /health
```
Respuesta:
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "database": "connected"
}
```

### Obtener todas las tareas
```http
GET /tareas
```
Respuesta:
```json
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k",
    "titulo": "Comprar leche",
    "descripcion": "En el supermercado",
    "completada": false,
    "fechaCreacion": "2024-01-15T10:00:00.000Z"
  }
]
```

### Crear nueva tarea
```http
POST /tareas
Content-Type: application/json

{
  "titulo": "Nueva tarea",
  "descripcion": "Descripción opcional"
}
```

### Actualizar tarea
```http
PUT /tareas/:id
Content-Type: application/json

{
  "titulo": "Tarea actualizada",
  "descripcion": "Nueva descripción",
  "completada": true
}
```

### Eliminar tarea
```http
DELETE /tareas/:id
```

---

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 👨‍💻 Autor

Proyecto educativo para enseñanza de Despliegue de Aplicaciones Web (DAW) y Administración de Sistemas Informáticos en Red (ASIR).

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📧 Soporte

Si encuentras algún problema o tienes preguntas, abre un [issue](https://github.com/aviladotgibert/MERN_example/issues) en GitHub.
