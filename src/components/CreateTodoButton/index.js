import React from 'react';
import './CreateTodoButton.css';

function CreateTodoButton(props) {
    
    const onClickButton = () => {
        /*
        props.setOpenModal(!props.openModal);*/
        //función que devuelve el estado anterior a nuestra actualización
        props.setOpenModal(prevState => !prevState)
    }

    return (
        <button 
        className="CreateTodoButton"
        onClick = {onClickButton}
        >
        +
        </button>
    );
}

export { CreateTodoButton };