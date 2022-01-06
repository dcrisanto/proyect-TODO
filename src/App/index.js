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
  //estado de error
  const [error, setError] = React.useState(false);
  //simulación de api, creando estado de carga
  const [loading, setLoading] = React.useState(true);

  /* No se traerá la información
  guardada en localStorage
  const [item, setItem] = React.useState(parsedItem);
  */

  //Vamos a traer la información que hallamos definido en nuestros componentes
  const [item, setItem] = React.useState(initialValue);

  React.useEffect(() => {
    setTimeout(()=>{
      try{
        //Consulta al localStorage
        const localStorageItem = localStorage.getItem('itemName');

        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        //Actualice el valor del estado con lo del localStorage después de pasado el tiempo de setTimeout
        setItem(parsedItem);
        //Cuando ya hemos consultado al localStorage, es decir que ya cargó la información
        setLoading(false);
      } catch(error) {
        //Actualizando el estado de error
        setError(error);
      }
    }, 1000);
  });

  //Persistir la información en local storage, actualizando los items
  const saveItem = newItem => {
    try{
      const stringifyItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifyItem);
      //Modificar el estado, no recargue la página
      setItem(newItem);
    } catch(error) {
      setError(error);
    }
  };

  //cuando tenemos + de 1 estado se envía un objecto. Enviando a los componentes que se subscriban
  return {
    item,
    saveItem,
    loading,
    error,
  };
}

function App() {
  const {
    //recibiendo los estados
    //renombrar los elementos con :, es decir lo que antes se llama item se llamará todos, etc
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1', []);

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

  /*
  console.log('Render: antes del user effect');

  //Para usar efectos
  React.useEffect(() => {
    console.log('use effect')
    // se renderizará cuando halla cambios en totalTodos
  }, [totalTodos]);

  console.log('Render: luego del use effect');
  */

  return (
      <AppUI 
        loading = {loading}
        error = {error}
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
