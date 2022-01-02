import React from 'react';

function TodoItem(props) {
    return(
        <li>
            <span>Curso</span>
            <p>{props.text}</p>
            <span>Avance</span>
        </li>
    );
}

export { TodoItem };