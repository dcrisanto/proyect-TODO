import React from 'react';
import './TodoSearch.css';

function TodoSearch({searchValue, setSearchValue,}) {
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