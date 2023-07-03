import './App.css';
import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';


function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://35.165.197.25/index.php');
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
      const response = await fetch('http://35.165.197.25/index.php', {
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

  return (
    <div>
        <form>
            <div className="form-group">
              <label htmlFor="id">Ingresa nueva tarea:</label>
              <input type="text" id="tarea" value={inputValue} name="tarea" onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <input className="enviar" onClick={handleSubmit} value="Enviar"/>
            </div>
        </form>

        <table>
          <thead>
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
              <td className="table-data">{item.completed !== 0? 'Si':'No'}</td>
              <td>
                <Link to={`/actualizar-todo/${encodeURIComponent(JSON.stringify(item))}`}>Actualizar tarea</Link>
              </td>
              <td className="table-data">Eliminar tarea</td>
            </tr>
          ))}          
          </tbody>
        </table>
    </div>
  );
}

export default App;
