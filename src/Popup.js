import React from "react";
import "./Popup.css";

export const Popup = ({message, close}) => {
    return (
        <div className="container-popup">
            <div className="box-popup">
                <p className="text-popup">{message}</p>
                <button className="button-popup" onClick={close}>Zamknij</button>
            </div>
        </div>
    );
};