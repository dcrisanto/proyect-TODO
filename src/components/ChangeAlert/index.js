import React from "react";
import './ChangeAlert.css';
import { withStorageListener } from "./withStorageListener";

function ChangeAlert({show, toggleShow}) {
    if (show) {
        return (
            <div className="ChangeAlert-main-container">
                <div className="ChangeAlert-container">
                    <p>Cambiaste tus TODOS en otra pestaña o ventana del navegador.</p>
                    <p>¿Quieres sincronizar tus TODOS?</p>
                    <button className="BottonAlert"
                        onClick={toggleShow}
                    >
                        Actualizar...
                    </button>
            </div>
            </div>
        );
    } else {
        return <p>Sin cambios</p>
    }
}

const ChangeAlertWithStorageListener = withStorageListener(ChangeAlert);

export {ChangeAlertWithStorageListener};