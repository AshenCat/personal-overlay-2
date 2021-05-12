import React from 'react'
import './select.scss'

function Select(props) {
    return (
        <select 
            name={props.name}
            id={props.id}
            defaultValue={props.defaultValue} 
            onChange={props.onChange}
            style={props.style}
            className={`base-select ${props.className ?? ''}`}>
                {props.children}
        </select>
    )
}

export default Select
