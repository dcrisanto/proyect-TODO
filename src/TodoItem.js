import React from 'react';
import './TodoItem.css';

function TodoItem(props) {
    const onCompleted = () => {
        alert('ckeck: Completaste el Todo ' + props.text);
    };

    const onDelete = () => {
        alert('delete: Eliminaste la tarea ' + props.text);
    };

    return(
        <li className="TodoItem">
            <span 
            onClick = {onCompleted}
            className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}>
                √
            </span>
            <p className={`TodoItem-p ${props.completed && 'TodoItem-p--completed'}`}>{props.text}</p>
            <span 
            onClick = {onDelete}
            className="Icon Icon-delete"
            >
                X
            </span>
        </li>
    );
}

export { TodoItem };