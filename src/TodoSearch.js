import React from 'react';
import './TodoSearch.css';

function TodoSearch() {
    const [searchValue, setSearchValue] = React.useState('');

    const onSearchValueChange = (event) => {
        console.log(event.target.value);
        let value = event.target.value;
        setSearchValue(value);
    };

    return[
        <input 
        onChange = {onSearchValueChange}
        className="TodoSearch" placeholder='buscar tareas' 
        value={searchValue}
        />,
        <p>{searchValue}</p>
    ];
}

export { TodoSearch };