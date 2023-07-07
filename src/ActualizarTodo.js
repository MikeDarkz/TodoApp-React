import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom/dist';
import { useNavigate  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ActualizarTodo() {

  const { item } = useParams();
  const [ tarea, setTarea ] = useState([]);
  const tareaActualizar = JSON.parse(decodeURIComponent(item));
  const [ title, setTitle ] = useState(tareaActualizar.title);
  const [ completed, setCompleted ] = useState(tareaActualizar.completed);
  const navigate = useNavigate();

  
  useEffect(() => {
    setTarea(tareaActualizar);
  }, []);

  const handleTitle = (event) => {
    setTitle(event.target.value);
    console.log(title);
  };

  const handleCompleted = (event) => {
    setCompleted(event.target.checked ? 1 : 0);
  };

  const handleSubmit = async () => {
    try {
      if (camposValidos()) {
        const response = await fetch('http://35.87.80.23/index.php?id='+tarea.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, completed })
        });
        navigate("/");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }    
  };

  function camposValidos() {
    const titleValidate = document.querySelector('#title').value;
    if(titleValidate === ''){
      return false;
    }else{
      return true;
    }

  }

  return (
    <div className="container">
    <div className="form-container">
      <div className="form-group">
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" name="id" defaultValue={tarea.id} readOnly className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="title">Título:</label>
        <input type="text" id="title" name="title" defaultValue={tarea.title} onChange={handleTitle} required className="form-control" />
      </div>
      <div className="form-group">
        <div className="form-check">
          <input type="checkbox" id="completed" name="completed" onClick={handleCompleted} defaultChecked={tarea.completed} className="form-check-input" />
          <label className="form-check-label" htmlFor="completed">Completado</label>
        </div>
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Enviar</button>
      </div>
    </div>
  </div>
  );
}
  
export default ActualizarTodo;
  
