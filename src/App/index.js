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

function  useLocalStorage(itemName, initialValue) {
  const localStorageItem = localStorage.getItem('itemName');

  let parsedItem;

  if (!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItem = initialValue;
  } else {
    parsedItem = JSON.parse(localStorageItem);
  }

  const [item, setItem] = React.useState(parsedItem);

  //Persistir la información en local storage
  const saveItem = newItem => {
    const stringifyItem = JSON.stringify(newItem);
    localStorage.setItem(itemName, stringifyItem);
    //Modificar el estado, no recargue la página
    setItem(newItem);
  };

  return [
    item,
    saveItem,
  ];
}

function App() {
  const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);

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
