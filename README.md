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

### 1. Clonar el repositorio

```bash
git clone https://github.com/aviladotgibert/MERN_example.git
cd MERN_example
```

### 2. Configurar e iniciar MongoDB

```bash
# En Ubuntu/Debian
sudo systemctl start mongod
sudo systemctl status mongod

# Crear base de datos y usuario
mongosh
```

Dentro de mongosh:
```javascript
use mi_aplicacion
db.createUser({
  user: "app_user",
  pwd: "password_app",
  roles: [{role: "readWrite", db: "mi_aplicacion"}]
})
exit
```

### 3. Configurar Backend

```bash
cd backend
npm install
```

Crear archivo `.env`:
```bash
nano .env
```

Contenido:
```env
PORT=3000
MONGODB_URI=mongodb://app_user:password_app@localhost:27017/mi_aplicacion
NODE_ENV=development
```

Iniciar backend:
```bash
npm start
```

El backend estará en: `http://localhost:3000`

### 4. Configurar Frontend

Abrir una nueva terminal:

```bash
cd frontend
npm install
```

Crear archivo `.env`:
```bash
nano .env
```

Contenido:
```env
VITE_API_URL=http://localhost:3000
```

Iniciar frontend:
```bash
npm run dev
```

El frontend estará en: `http://localhost:5173`

### 5. Probar la aplicación

Abre tu navegador en `http://localhost:5173` y verifica que puedes:
- Crear tareas
- Marcar como completadas
- Editar tareas
- Eliminar tareas

---

## 🌐 Despliegue en Servidor Ubuntu

### Paso 1: Preparar el servidor

```bash
# Conectar al servidor
ssh usuario@tu-servidor

# Actualizar sistema
sudo apt update && sudo apt upgrade -y
```

### Paso 2: Instalar Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar instalación
node --version
npm --version
```

### Paso 3: Instalar MongoDB

```bash
# Importar clave GPG
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Añadir repositorio
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Instalar
sudo apt update
sudo apt install -y mongodb-org

# Iniciar servicio
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Paso 4: Configurar MongoDB

```bash
mongosh

# Crear usuario administrador
use admin
db.createUser({
  user: "admindb",
  pwd: "TU_PASSWORD_SEGURO",
  roles: ["root"]
})

# Crear usuario de aplicación
use mi_aplicacion
db.createUser({
  user: "app_user",
  pwd: "PASSWORD_APLICACION",
  roles: [{role: "readWrite", db: "mi_aplicacion"}]
})
exit
```

### Paso 5: Instalar PM2 (gestor de procesos)

```bash
sudo npm install -g pm2
```

### Paso 6: Clonar y configurar el proyecto

```bash
# Crear directorio
sudo mkdir -p /var/www/mi-app-mern
sudo chown -R $USER:$USER /var/www/mi-app-mern

# Clonar repositorio
cd /var/www/mi-app-mern
git clone https://github.com/TU_USUARIO/MERN_example.git .
```

### Paso 7: Configurar Backend

```bash
cd /var/www/mi-app-mern/backend

# Instalar dependencias
npm install

# Crear archivo .env
nano .env
```

Contenido `.env` del backend:
```env
PORT=3000
MONGODB_URI=mongodb://app_user:PASSWORD_APLICACION@localhost:27017/mi_aplicacion
NODE_ENV=production
```

Iniciar con PM2:
```bash
pm2 start server.js --name "backend-api"
pm2 save
pm2 startup
# Copiar y ejecutar el comando que te muestra
```

Verificar:
```bash
pm2 status
pm2 logs backend-api
curl http://localhost:3000/health
```

### Paso 8: Construir Frontend

```bash
cd /var/www/mi-app-mern/frontend

# Instalar dependencias
npm install

# Crear .env para producción
nano .env.production
```

Contenido `.env.production`:
```env
VITE_API_URL=/api
```

Construir para producción:
```bash
npm run build
```

Esto genera la carpeta `dist/` con los archivos estáticos.

### Paso 9: Instalar y configurar Nginx

```bash
sudo apt install -y nginx
```

Crear configuración del sitio:
```bash
sudo nano /etc/nginx/sites-available/mi-app-mern
```

Contenido:
```nginx
server {
    listen 80;
    server_name tu-dominio.com;  # Cambiar por tu dominio o IP

    # Servir frontend (archivos estáticos)
    location / {
        root /var/www/mi-app-mern/frontend/dist;
        try_files $uri $uri/ /index.html;
        index index.html;
        
        # Headers de caché
        add_header Cache-Control "public, max-age=3600";
    }

    # Proxy al backend API
    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Logs
    access_log /var/log/nginx/mi-app-access.log;
    error_log /var/log/nginx/mi-app-error.log;
}
```

Activar sitio:
```bash
sudo ln -s /etc/nginx/sites-available/mi-app-mern /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Paso 10: Configurar Firewall (opcional pero recomendado)

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status
```

---

## 🔄 Actualizar la Aplicación

### Actualizar Backend

```bash
cd /var/www/mi-app-mern/backend
git pull origin main
npm install  # Si hay nuevas dependencias
pm2 restart backend-api
pm2 logs backend-api  # Verificar que arrancó correctamente
```

### Actualizar Frontend

```bash
cd /var/www/mi-app-mern/frontend
git pull origin main
npm install  # Si hay nuevas dependencias
npm run build
# No es necesario reiniciar Nginx, automáticamente sirve los nuevos archivos
```

---

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
