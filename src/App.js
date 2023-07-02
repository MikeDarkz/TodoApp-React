import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Redirect, Link, useNavigate } from 'react-router-dom';
import ActualizarTodo from './ActualizarTodo';


function App() {
  const [data, setData] = useState([]);
  // const history = useHistory();
  const navigate = useNavigate();

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

  function handleRedirect() {
    navigate('/actualizar-todo');
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={App} />
          <Route path="/actualizar-todo" element={<ActualizarTodo/>} />
          <Route path="/actualizar-todo:id" element={<ActualizarTodo/>} />
        </Routes>

        <form>
            <div class="form-group">
              <label for="id">Ingresa nueva tarea:</label>
              <input type="text" id="tarea" name="tarea" required/>
            </div>
            <div class="form-group">
              <input type="submit" value="Enviar"/>
            </div>
        </form>

        <table>
          <thead>
            <tr class="table-header">
              <th>ID</th>
              <th>Título tarea</th>
              <th>Completada</th>
              <th>//</th>
            </tr>
          </thead>
          <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td class="table-data">{item.id}</td>
              <td class="table-data">{item.title}</td>
              <td class="table-data">{item.completed !== 0? 'Si':'No'}</td>
              <button onClick={handleRedirect}>Redirigir</button>
            </tr>
          ))}          
          </tbody>
        </table>
      </Router>      
    </div>
  );
}

export default App;
