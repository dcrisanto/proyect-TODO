import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext();

//Puente para llegar al componente TodoContext.Provider
function  TodoProvider(props) {

    const {
        //recibiendo los estados
        //renombrar los elementos con :, es decir lo que antes se llama item se llamarĂ¡ todos, etc
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
      } = useLocalStorage('TODOS_V1', []);
    
      const [searchValue, setSearchValue] = React.useState('');
      
      const [openModal, setOpenModal] =  React.useState(false);

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
      };

      const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
          completed: false,
          text,
        });
        saveTodos(newTodos);
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
    
      /*
      console.log('Render: antes del user effect');
    
      //Para usar efectos
      React.useEffect(() => {
        console.log('use effect')
        // se renderizarĂ¡ cuando halla cambios en totalTodos
      }, [totalTodos]);
    
      console.log('Render: luego del use effect');
      */

    return(
        //retornarĂ¡ el componente TodoContext. Este componente envolverĂ¡ a toda la aplicaciĂ³n, por lo que necesitamos que tenga por dentro a cualquier componente donde llamaremos al Consumidor del contexto
        <TodoContext.Provider 
        //tenemos que dar al objeto value las propiedades que vamos a compartir
        value={{
            loading,
            error,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            addTodo,
            completeTodo,
            deleteTodo,
            openModal,
            setOpenModal,
        }}
        >
            {props.children}
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider };

//TodoContex tenemos 2 componentes
//TodoContext.Provider: lo vamos a utilizar para envolver toda nuestra aplicaciĂ³n en el componente App.js
//TodoContext.Consumer: Lo utilizaremos en todas partes siempre que necesitemos informaciĂ³n de ese estado compartido en cualquiera de nuestros componentes
