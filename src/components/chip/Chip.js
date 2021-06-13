import React from 'react'
import './chip.scss'

function Chip(props) {
    return (
        <div 
            {...props}
            className={`chip ${props.className}`}>
            {props.children}
        </div>
    )
}

export default Chip
