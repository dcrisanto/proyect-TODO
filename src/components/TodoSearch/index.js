import React from 'react';
import './TodoSearch.css';

function TodoSearch({searchValue, setSearchValue, loading}) {
    const onSearchValueChange = (event) => {
        let value = event.target.value;
        setSearchValue(value);
    };

    return(
        <input 
        onChange = {onSearchValueChange}
        className="TodoSearch" placeholder='buscar tareas' 
        value={searchValue}
        disabled={loading}
        />
    );
}

export { TodoSearch };