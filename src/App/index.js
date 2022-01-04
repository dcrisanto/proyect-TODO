import React from 'react';
import { AppUI } from './AppUI'
import './App.css';

/*
const defaultTodos = [
  {
    text: 'Curso de Introducción a React',
    completed: false
  },
  {
    text: 'Curso de React: Patrones de Render y Composición',
    completed: false
  },
  {
    text: 'Curso de React: Manejo Profesional del Estado',
    completed: false
  },
  {
    text: 'Curso Práctico de React',
    completed: false
  }
];
*/

function App() {
  const localStorageTodos = localStorage.getItem('TODOS_V1');

  let parsedTodos;

  if (!localStorageTodos) {
    localStorage.setItem('TODOS_V1', JSON.stringify([]));
    parsedTodos = [];
  } else {
    parsedTodos = JSON.parse(localStorageTodos);
  }

  const [todos, setTodos] = React.useState(parsedTodos);

  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter(todo => !!todo.completed).length;

  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length > 0) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  //Persistir la información en local storage
  const saveTodos = newTodos => {
    const stringifyTodos = JSON.stringify(newTodos);
    localStorage.setItem('TODOS_V1', stringifyTodos);
    //Modificar el estado, no recargue la página
    setTodos(newTodos);
  };

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text == text);
    //Enviar los cambios 
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    //Actualizar nuestro estado
    saveTodos(newTodos);
    //todos[todoIndex] = {
      //text:todos[todoIndex].///text,
      //completed: true,
    //};
  }

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text == text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  }
  
  return (
      <AppUI 
        totalTodos = {totalTodos}
        completedTodos ={completedTodos}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchedTodos={searchedTodos}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
      />
  );
}

export default App;
