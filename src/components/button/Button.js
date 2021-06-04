import React from 'react';
import './button.scss';

function Button(props) {
    return (
        <button
            // onClick={props.onClick}
            className={`button ${props.className ?? ""} ${props.disabled? 'btn-disabled': ''}`}
            // style={props.style}
            {...props}>
                {props.children}
        </button>
    )
}

export default Button
