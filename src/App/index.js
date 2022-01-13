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
import { EmptySearchResult } from "../components/EmptySearchResult";
import { useTodos } from "./useTodos";
import './App.css';

// useLocalStorage tiene toda la lógica para traer la información del localStorage y mantenernos informados

function App() {
  const {
    todos,
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
        <TodoHeader loading={loading}>
          <TodoCounter 
            totalTodos={totalTodos} 
            completedTodos={completedTodos}
            //loading={loading}
          />
          <TodoSearch 
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            //loading={loading}
          />
        </TodoHeader>

        <TodoList 
            totalTodos={totalTodos}
            todos={todos}
            error={error}
            loading={loading}
            searchedTodos={searchedTodos}
            onError={() => <TodosError />}
            onLoading={() => <TodosLoading />}
            onEmptyTodos={() => <EmptyTodos />}
            onEmptySearchResult={()=> <EmptySearchResult 
              searchValue={searchValue}
            />}
            render={todo => (
              <TodoItem 
              key={todo.text} 
              text={todo.text} 
              completed={todo.completed} 
              onComplete={() => completeTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
                  />
            )}
        >
         {/*  {todo => (
            <TodoItem 
              key={todo.text} 
              text={todo.text} 
              completed={todo.completed} 
              onComplete={() => completeTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
            />
           )} */}
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
