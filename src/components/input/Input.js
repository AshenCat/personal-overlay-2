import React from 'react'
import './input.scss'

function Input(props) {
    return   <input 
        className={`base-input ${props.className ? props.className : ''} ${props.mAndP ? 'mAndP' : ''}`}
        placeholder={props.placeholder} 
        value={props.value} 
        onChange={props.onChange}
        style={props.style}/>
}

export default Input
