import React from 'react';
import { TodoHeader } from "../components/TodoHeader";
import { TodoCounter } from "../components/TodoCounter";
import { TodoSearch } from "../components/TodoSearch";
import { TodoList } from '../components/TodoList';
import { TodoItem } from '../components/TodoItem';
import { CreateTodoButton } from '../components/CreateTodoButton';
import { Modal } from '../components/Modal';
import { TodoForm } from '../components/TodoForm';
import { TodosError } from '../components/TodosError';
import { TodosLoading } from "../components/TodosLoading";
import { EmptyTodos } from '../components/EmptyTodos';
import { useTodos } from "./useTodos";
import './App.css';

// useLocalStorage tiene toda la lógica para traer la información del localStorage y mantenernos informados

function App() {
  const {
    totalTodos,
    completedTodos,
    searchValue, 
    setSearchValue,
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    addTodo,
    openModal,
    setOpenModal,
  } = useTodos();

  return (
    <React.Fragment>
        <TodoHeader>
          <TodoCounter 
            totalTodos={totalTodos} 
            completedTodos={completedTodos}
          />
          <TodoSearch 
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </TodoHeader>
        <TodoList>
          {error && <TodosError error={error} />}
          {loading && <TodosLoading />}
          {(!loading && !searchedTodos.length) && <EmptyTodos />}
    
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

        {!!openModal && (
          <Modal>
            <TodoForm 
              addTodo={addTodo}
              setOpenModal={setOpenModal}
            />
          </Modal>
        )}

        <CreateTodoButton 
          openModal = {openModal}
          setOpenModal = {setOpenModal}
        />
    </React.Fragment>
  );
}

export default App;
