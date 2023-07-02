import React from 'react';
function ActualizarTodo() {
    return (
        <div class="form-container">
        <form>
          <div class="form-group">
            <label for="id">ID:</label>
            <input type="text" id="id" name="id" required/>
          </div>
          <div class="form-group">
            <label for="title">Título:</label>
            <input type="text" id="title" name="title" required/>
          </div>
          <div class="form-group">
            <label for="completed">Completado:</label>
            <input type="checkbox" id="completed" name="completed"/>
          </div>
          <div class="form-group">
            <input type="submit" value="Enviar"/>
          </div>
        </form>
      </div>
    );
  }
  
  export default ActualizarTodo;
  