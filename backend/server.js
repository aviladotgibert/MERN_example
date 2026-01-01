/* server.js - Backend con Express y MongoDB
DEPENDENCIAS: 
dotenv: permite usar variables del archivo .env sin escribirlas directamente en el código.
express: el framework que crea el servidor HTTP.
mongoose: un conector entre Node.js y MongoDB (la base de datos).
cors: permite que el frontend de REACT pueda acceder al backend aunque estén en dominios diferentes.*/
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//app es mi servidor de express
const app = express();
//Para el puerto coje el del .env o el 300 por defecto
const PORT = process.env.PORT || 3000;
//Habilita peticiones desde otros orígenes y permite recibir y leer formatos json
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mi_aplicacion')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

/* Modelo de ejemplo: Tareas
Aquí se define cómo luce cada documento (o registro) de la colección tareas en MongoDB */
const tareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: String,
  completada: { type: Boolean, default: false },
  fechaCreacion: { type: Date, default: Date.now }
});

const Tarea = mongoose.model('Tarea', tareaSchema);

// ========== RUTAS API ==========

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Obtener todas las tareas
app.get('/tareas', async (req, res) => {
  try {
    const tareas = await Tarea.find().sort({ fechaCreacion: -1 });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo tareas' });
  }
});

// Obtener una tarea por ID
app.get('/tareas/:id', async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo tarea' });
  }
});

// Crear nueva tarea
app.post('/tareas', async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    
    if (!titulo) {
      return res.status(400).json({ error: 'El título es obligatorio' });
    }

    const nuevaTarea = new Tarea({ titulo, descripcion });
    await nuevaTarea.save();
    
    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ error: 'Error creando tarea' });
  }
});

// Actualizar tarea
app.put('/tareas/:id', async (req, res) => {
  try {
    const { titulo, descripcion, completada } = req.body;
    
    const tareaActualizada = await Tarea.findByIdAndUpdate(
      req.params.id,
      { titulo, descripcion, completada },
      { new: true, runValidators: true }
    );

    if (!tareaActualizada) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json(tareaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando tarea' });
  }
});

// Eliminar tarea
app.delete('/tareas/:id', async (req, res) => {
  try {
    const tareaEliminada = await Tarea.findByIdAndDelete(req.params.id);
    
    if (!tareaEliminada) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando tarea' });
  }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📊 Entorno: ${process.env.NODE_ENV || 'development'}`);
});
