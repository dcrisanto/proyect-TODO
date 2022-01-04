import React from 'react';
import { TodoCounter } from './TodoCounter'
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';
import './App.css';

const defaultTodos = [
  {
    text: 'Curso de Introducción a React',
    completed: false
  },
  {
    text: 'Curso de React: Patrones de Render y Composición',
    completed: true
  },
  {
    text: 'Curso de React: Manejo Profesional del Estado',
    completed: true
  },
  {
    text: 'Curso Práctico de React',
    completed: true
  }
];

function App() {
  const [todos, setTodos] = React.useState(defaultTodos);

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
  
  return (
    <React.Fragment>
      {<TodoCounter 
        total = {totalTodos}
        completed ={completedTodos}
      />}
      {<TodoSearch 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />}
      {<TodoList>
        {searchedTodos.map(todo => (
          <TodoItem 
          key={todo.text} 
          text={todo.text} completed={todo.completed} 
          />
        ))}
      </TodoList>}
      {<CreateTodoButton />}
    </React.Fragment>
  );
}

export default App;
