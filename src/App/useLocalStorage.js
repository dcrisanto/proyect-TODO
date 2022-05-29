import React from 'react';

function  useLocalStorage(itemName, initialValue) {
    //estado para sincronizar
    const [sincronizedItem, setSincronizedItem] = React.useState(true);
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
  
    // Si no enviamos un segundo parámetro se llama cada 1s el useEffect
    React.useEffect(() => {
      setTimeout(()=>{
        try{
          //Consulta al localStorage
          const localStorageItem = localStorage.getItem(itemName);
  
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
          setSincronizedItem(true);
        } catch(error) {
          //Actualizando el estado de error
          setError(error);
        }
      }, 1000);
    }, [sincronizedItem]); //enviando un [] se ejecutará sólo una vez el effect
    // cada vez que halla un cambio en sincronizedItem se llamará a useEffect, es decir cuando se llame a setSincronizedItem.
  
    //Persistir la información en local storage, actualizando los items
    const saveItem = newItem => {
      try{
        const stringifyItem = JSON.stringify(newItem);
        localStorage.setItem(itemName, stringifyItem);
        //Modificar el estado, no recargue la página
        setItem(newItem);
        // setSincronizedItem(true);
      } catch(error) {
        setError(error);
      }
    };

    //Función para sincronizar
    const sincronizeItem = () => {
      setLoading(true);
      setSincronizedItem(false);
    };
  
    //cuando tenemos + de 1 estado se envía un objecto. Enviando a los componentes que se subscriban
    return {
      item,
      saveItem,
      loading,
      error,
      sincronizeItem,
    };
  }

  export { useLocalStorage };
  