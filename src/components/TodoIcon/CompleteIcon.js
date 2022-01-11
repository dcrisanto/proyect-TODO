import React from 'react';
import { TodoIcon } from './';

function CompleteIcon({completed, onComplete}) {
    return(
        <TodoIcon 
            type="check"
            color={completed ? '#06FF00' : 'black'}
            onClick={onComplete}
        />
    );
}

export { CompleteIcon };