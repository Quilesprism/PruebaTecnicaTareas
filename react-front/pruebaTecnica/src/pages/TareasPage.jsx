import React, { useEffect, useState } from "react";
import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000/api/';

export default function ListarTareas() {
    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', descripcion: '', fecha_limite: '', prioridad: 'Media' });
    const [tareaAEditar, setTareaAEditar] = useState(null);
    const [editando, setEditando] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTareas();
    }, []);

    const fetchTareas = async () => {
        try {
            const res = await axios.get(`${API_URL}tareas/`);
            setTareas(res.data);
        } catch (err) {
            console.error("Error fetching tareas:", err);
            setError("Error al cargar las tareas.");
        }
    };

    const crearTarea = async () => {
        try {
            await axios.post(`${API_URL}tareas/`, nuevaTarea);
            setNuevaTarea({ titulo: '', descripcion: '', fecha_limite: '', prioridad: 'Media' });
            fetchTareas();
        } catch (err) {
            console.error("Error creating tarea:", err);
            setError("Error al crear la tarea.");
        }
    };

    const actualizarTarea = async (id, tareaActualizada) => {
        try {
            await axios.put(`${API_URL}tarea/${id}/`, tareaActualizada);
            setEditando(false);
            setTareaAEditar(null);
            fetchTareas();
        } catch (err) {
            console.error("Error updating tarea:", err);
            setError("Error al actualizar la tarea.");
        }
    };

    const eliminarTarea = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
            try {
                await axios.delete(`${API_URL}tarea/${id}/`);
                fetchTareas();
            } catch (err) {
                console.error("Error deleting tarea:", err);
                setError("Error al eliminar la tarea.");
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevaTarea(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditar = (tarea) => {
        setTareaAEditar({ ...tarea });
        setEditando(true);
    };

    const handleEditarInputChange = (e) => {
        const { name, value } = e.target;
        setTareaAEditar(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmitEditar = (id) => {
        actualizarTarea(id, tareaAEditar);
    };

    return (
        <div className="container mt-4">
        <h1>Tareas</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <h2>Crear Nueva Tarea</h2>
        <div className="mb-3">
            <div className="row g-3">
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        name="titulo"
                        placeholder="Título"
                        value={nuevaTarea.titulo}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <textarea
                        className="form-control"
                        name="descripcion"
                        placeholder="Descripción"
                        value={nuevaTarea.descripcion}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="datetime-local"
                        className="form-control"
                        name="fecha_limite"
                        value={nuevaTarea.fecha_limite}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-2">
                    <select className="form-select" name="prioridad" value={nuevaTarea.prioridad} onChange={handleInputChange}>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                    </select>
                </div>
            </div>
            <button onClick={crearTarea} className="btn btn-primary mt-2">Crear Tarea</button>
        </div>

        <h2>Lista de Tareas</h2>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Prioridad</th>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Fecha de Creación</th>
                    <th>Fecha Límite</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {tareas.map(tarea => (
                    <tr key={tarea.id}>
                        {editando && tareaAEditar?.id === tarea.id ? (
                            <>
                                <td>
                                    <select
                                        className="form-select"
                                        name="prioridad"
                                        value={tareaAEditar.prioridad}
                                        onChange={handleEditarInputChange}
                                    >
                                        <option value="Alta">Alta</option>
                                        <option value="Media">Media</option>
                                        <option value="Baja">Baja</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="titulo"
                                        value={tareaAEditar.titulo}
                                        onChange={handleEditarInputChange}
                                    />
                                </td>
                                <td>
                                    <textarea
                                        className="form-control"
                                        name="descripcion"
                                        value={tareaAEditar.descripcion}
                                        onChange={handleEditarInputChange}
                                    />
                                </td>
                                <td>{new Date(tarea.fecha_creacion).toLocaleString()}</td>
                                <td>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        name="fecha_limite"
                                        value={tareaAEditar.fecha_limite ? tareaAEditar.fecha_limite.slice(0, 16) : ''}
                                        onChange={handleEditarInputChange}
                                    />
                                </td>
                                <td>
                                    <button onClick={() => handleSubmitEditar(tarea.id)} className="btn btn-sm btn-success me-2">Guardar</button>
                                    <button onClick={() => setEditando(false)} className="btn btn-sm btn-secondary">Cancelar</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td>{tarea.prioridad}</td>
                                <td>{tarea.titulo}</td>
                                <td>{tarea.descripcion}</td>
                                <td>{new Date(tarea.fecha_creacion).toLocaleString()}</td>
                                <td>{new Date(tarea.fecha_limite).toLocaleString()}</td>
                                <td>
                                    <button onClick={() => handleEditar(tarea)} className="btn btn-sm btn-primary me-2">Editar</button>
                                    <button onClick={() => eliminarTarea(tarea.id)} className="btn btn-sm btn-danger">Eliminar</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
}