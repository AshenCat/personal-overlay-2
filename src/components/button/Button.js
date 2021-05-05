import React from 'react';
import './button.scss';

function Button(props) {
    return (
        <button
            onClick={props.onClick}
            className={`button ${props.className ? props.className : ""}`}
            style={{
                backgroundColor: props.backgroundColor ? props.backgroundColor : "",
                color: props.color ? props.color : "",
            }}>
                {props.children}
        </button>
    )
}

export default Button
