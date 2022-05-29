import React from "react";

function withStorageListener(WrappedComponent) {
    return function WrappedComponentWithStorageListener(props) {//recibiendo las props de nuestro WrappedComponent
        const [storageChange, setStorageChange] = React.useState(false);

        window.addEventListener('storage', (change) => {
            if (change.key == 'TODOS_V1') {
                console.log('Cambios en TODOS_V1');
                setStorageChange(true);
                //props.sincronize();
            }
        });

        const toggleShow = () => {
            props.sincronize();
            setStorageChange(false);
        }

        return (
            <WrappedComponent
                show={storageChange}
                toggleShow={toggleShow}
            />
        );
    }
}

export { withStorageListener };