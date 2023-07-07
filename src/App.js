import './App.css';
import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://35.87.80.23/index.php');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://35.87.80.23/index.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: inputValue })
      });
      setInputValue('');
      fetchData();
    } catch (error) {
      console.error('Error fetching data:', error);
    }    
  };

  const eliminarTarea = async(id) => {
    try {
      const response = await fetch('http://35.87.80.23/index.php?id='+id, {
        method: 'DELETE',
      });
      fetchData();
    } catch (error) {
      console.error('Error eliminanding data:', error);
    }
  }

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="tarea">Ingresa nueva tarea:</label>
          <input type="text" id="tarea" defaultValue={inputValue} name="tarea" onChange={handleInputChange} required className="form-control" />
        </div>
        <div className="form-group">
          <input type="button" className="btn btn-primary" onClick={handleSubmit} value="Enviar" />
        </div>
      </form>

      <table className="table">
        <thead className="thead-dark">
          <tr className="table-header">
            <th>ID</th>
            <th>Título tarea</th>
            <th>Completada</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td className="table-data">{item.id}</td>
              <td className="table-data">{item.title}</td>
              <td className="table-data">{item.completed !== 0 ? 'Si' : 'No'}</td>
              <td>
                <Link to={`/actualizar-todo/${encodeURIComponent(JSON.stringify(item))}`} className="btn btn-primary">Actualizar tarea</Link>
              </td>
              <td className="table-data">
                <button className="btn btn-danger" onClick={() => eliminarTarea(item.id)}>Eliminar tarea</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
