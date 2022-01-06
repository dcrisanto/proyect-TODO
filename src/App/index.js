import React from 'react';
import { TodoProvider } from '../components/TodoContext';
import { AppUI } from './AppUI'
import './App.css';

// useLocalStorage tiene toda la lógica para traer la información del localStorage y mantenernos informados

function App() {

  return (
      //enviando las propiedades al componente AppUI
      <TodoProvider>
              <AppUI />
      </TodoProvider>
  );
}

export default App;
