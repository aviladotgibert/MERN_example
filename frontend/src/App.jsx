// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';

// Configuración de la URL del backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', descripcion: '' });
  const [editando, setEditando] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Cargar tareas al inicio
  useEffect(() => {
    cargarTareas();
  }, []);

  // Función para obtener todas las tareas
  const cargarTareas = async () => {
    setCargando(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/tareas`);
      if (!response.ok) throw new Error('Error al cargar tareas');
      const data = await response.json();
      setTareas(data);
    } catch (err) {
      setError('No se pudieron cargar las tareas. ¿Está el backend ejecutándose?');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  // Crear nueva tarea
  const crearTarea = async (e) => {
    e.preventDefault();
    if (!nuevaTarea.titulo.trim()) return;

    try {
      const response = await fetch(`${API_URL}/tareas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaTarea)
      });
      
      if (!response.ok) throw new Error('Error al crear tarea');
      
      await cargarTareas();
      setNuevaTarea({ titulo: '', descripcion: '' });
    } catch (err) {
      setError('Error al crear la tarea');
      console.error(err);
    }
  };

  // Actualizar estado de completada
  const toggleCompletada = async (tarea) => {
    try {
      const response = await fetch(`${API_URL}/tareas/${tarea._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...tarea, completada: !tarea.completada })
      });
      
      if (!response.ok) throw new Error('Error al actualizar tarea');
      
      await cargarTareas();
    } catch (err) {
      setError('Error al actualizar la tarea');
      console.error(err);
    }
  };

  // Eliminar tarea
  const eliminarTarea = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta tarea?')) return;

    try {
      const response = await fetch(`${API_URL}/tareas/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Error al eliminar tarea');
      
      await cargarTareas();
    } catch (err) {
      setError('Error al eliminar la tarea');
      console.error(err);
    }
  };

  // Editar tarea
  const iniciarEdicion = (tarea) => {
    setEditando({
      id: tarea._id,
      titulo: tarea.titulo,
      descripcion: tarea.descripcion || ''
    });
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    if (!editando.titulo.trim()) return;

    try {
      const response = await fetch(`${API_URL}/tareas/${editando.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: editando.titulo,
          descripcion: editando.descripcion
        })
      });
      
      if (!response.ok) throw new Error('Error al actualizar tarea');
      
      await cargarTareas();
      setEditando(null);
    } catch (err) {
      setError('Error al guardar los cambios');
      console.error(err);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>📝 Gestor de Tareas MERN</h1>
          <p className="subtitle">Ejemplo de Stack MERN completo</p>
        </header>

        {error && (
          <div className="error-message">
            ⚠️ {error}
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        {/* Formulario para crear nueva tarea */}
        <form onSubmit={crearTarea} className="form-nueva-tarea">
          <h2>➕ Nueva Tarea</h2>
          <input
            type="text"
            placeholder="Título de la tarea"
            value={nuevaTarea.titulo}
            onChange={(e) => setNuevaTarea({ ...nuevaTarea, titulo: e.target.value })}
            required
          />
          <textarea
            placeholder="Descripción (opcional)"
            value={nuevaTarea.descripcion}
            onChange={(e) => setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })}
            rows="3"
          />
          <button type="submit" className="btn-primary">Crear Tarea</button>
        </form>

        {/* Lista de tareas */}
        <div className="tareas-container">
          <h2>📋 Mis Tareas ({tareas.length})</h2>
          
          {cargando ? (
            <p className="loading">Cargando tareas...</p>
          ) : tareas.length === 0 ? (
            <p className="empty-state">No hay tareas. ¡Crea una nueva!</p>
          ) : (
            <div className="tareas-lista">
              {tareas.map((tarea) => (
                <div key={tarea._id} className={`tarea-card ${tarea.completada ? 'completada' : ''}`}>
                  {editando && editando.id === tarea._id ? (
                    // Modo edición
                    <form onSubmit={guardarEdicion} className="form-editar">
                      <input
                        type="text"
                        value={editando.titulo}
                        onChange={(e) => setEditando({ ...editando, titulo: e.target.value })}
                        autoFocus
                      />
                      <textarea
                        value={editando.descripcion}
                        onChange={(e) => setEditando({ ...editando, descripcion: e.target.value })}
                        rows="2"
                      />
                      <div className="botones-edicion">
                        <button type="submit" className="btn-guardar">Guardar</button>
                        <button type="button" onClick={() => setEditando(null)} className="btn-cancelar">
                          Cancelar
                        </button>
                      </div>
                    </form>
                  ) : (
                    // Modo visualización
                    <>
                      <div className="tarea-contenido">
                        <div className="tarea-header">
                          <input
                            type="checkbox"
                            checked={tarea.completada}
                            onChange={() => toggleCompletada(tarea)}
                            className="checkbox"
                          />
                          <h3>{tarea.titulo}</h3>
                        </div>
                        {tarea.descripcion && (
                          <p className="tarea-descripcion">{tarea.descripcion}</p>
                        )}
                        <small className="tarea-fecha">
                          Creada: {new Date(tarea.fechaCreacion).toLocaleDateString('es-ES')}
                        </small>
                      </div>
                      <div className="tarea-acciones">
                        <button onClick={() => iniciarEdicion(tarea)} className="btn-editar">
                          ✏️ Editar
                        </button>
                        <button onClick={() => eliminarTarea(tarea._id)} className="btn-eliminar">
                          🗑️ Eliminar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <footer>
          <p>🔧 Backend: Express + MongoDB | 🎨 Frontend: React + Vite</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
