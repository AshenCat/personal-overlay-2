import React from 'react'
import './textarea.scss'

function Textarea(props) {
    const style = {
        ...props.style,
    }
    return (
        <textarea 
            className={`textarea ${props.className ?? '' }`}
            value={props.value} 
            onChange={props.onChange}
            style={style} />
    )
}

export default Textarea
