import React from 'react';
import { TodoContext } from '../TodoContext';
import './TodoSearch.css';

function TodoSearch() {
    const {
        searchValue, 
        setSearchValue,
    } = React.useContext(TodoContext);

    const onSearchValueChange = (event) => {
        let value = event.target.value;
        setSearchValue(value);
    };

    return(
        <input 
        onChange = {onSearchValueChange}
        className="TodoSearch" placeholder='buscar tareas' 
        value={searchValue}
        />
    );
}

export { TodoSearch };