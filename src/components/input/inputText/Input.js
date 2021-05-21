import React from 'react'
import './input.scss'

function Input(props) {
    const style = {
        ...props.style
    }
    return   <input 
        className={`base-input ${props.className ?? ''} ${props.mAndP ? 'mAndP' : ''}`}
        placeholder={props.placeholder} 
        value={props.value} 
        onChange={props.onChange}
        style={style}/>
}

export default Input
