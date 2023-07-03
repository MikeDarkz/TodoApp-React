import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom/dist';
function ActualizarTodo() {

  const { item } = useParams();
  const [ tarea, setTarea ] = useState([]);
  const tareaActualizar = JSON.parse(decodeURIComponent(item));
  
  useEffect(() => {
    setTarea(tareaActualizar);
  }, []);

  const handleId = (event) => {
    tarea.id = event.target.value
  };

  const handleTitle = (event) => {
    tarea.tile = event.target.value
  };

  const handleCompleted = (event) => {
    tarea.completed = event.target.value
  };

  return (
      <div className="form-container">
      <form>
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" name="id" value={tarea.id} onChange={() => handleId} required/>
        </div>
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input type="text" id="title" name="title" value={tarea.title} onChange={() => handleTitle} required/>
        </div>
        <div className="form-group">
          <label htmlFor="completed">Completado:</label>
          <input type="checkbox" id="completed" name="completed" onChange={() => handleCompleted} checked={tarea.completed === 1}/>
        </div>
        <div className="form-group">
          <input type="submit" value="Enviar"/>
        </div>
      </form>
    </div>
  );
}
  
export default ActualizarTodo;
  
