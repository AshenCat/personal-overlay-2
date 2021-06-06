import React from 'react';
import './button.scss';

function Button(props) {
    // if(props.disabled) console.log('disabled')
    return (
        <button
            // onClick={props.onClick}
            // style={props.style}
            {...props}
            
            className={`button ${props.className ?? ""} ${props.disabled? 'btn-disabled': ''}`}>
                {props.children}
        </button>
    )
}

export default Button
