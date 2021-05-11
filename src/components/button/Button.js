import React from 'react';
import './button.scss';

function Button(props) {
    return (
        <button
            onClick={props.onClick}
            className={`button ${props.className ?? ""}`}
            style={props.style}>
                {props.children}
        </button>
    )
}

export default Button
