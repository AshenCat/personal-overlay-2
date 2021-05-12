import React from 'react'
import './textarea.scss'

function Textarea(props) {
    return (
        <textarea 
            className={`textarea ${props.classname ?? '' }`}
            value={props.value} 
            onChange={props.onChange} />
    )
}

export default Textarea
