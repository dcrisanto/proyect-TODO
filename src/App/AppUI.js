import React from 'react';
import { TodoContext } from '../components/TodoContext'
import { TodoCounter } from '../components/TodoCounter'
import { TodoSearch } from '../components/TodoSearch';
import { TodoList } from '../components/TodoList';
import { TodoItem } from '../components/TodoItem';
import { CreateTodoButton } from '../components/CreateTodoButton';


function AppUI() {
    //value el que guardamos en el provaider
    const {
      error,
      loading,
      searchedTodos,
      completeTodo,
      deleteTodo,
    } = React.useContext(TodoContext);

    return(
      <React.Fragment>
        <TodoCounter />
        <TodoSearch />
        <TodoList>
          {error && <p>Estamos presentando un error...</p>}
          {loading && <p>Estamos cargando...</p>}
          {(!loading && !searchedTodos.length) && <p>Crea tu primer todo...</p>}
    
          {searchedTodos.map(todo => (
            <TodoItem 
              key={todo.text} 
              text={todo.text} 
              completed={todo.completed} 
              onComplete={() => completeTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
                  />
                ))}
        </TodoList>
        <CreateTodoButton />
      </React.Fragment>
    );
}

export { AppUI };