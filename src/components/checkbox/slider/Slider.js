import React from 'react'
import './slider.scss'

function Slider(props) {
    return (
        <label className="switch">
            <input type="checkbox" name={props.name} id={props.id} value={props.value} />
            <span className="round-slider" onClick={props.onClick}></span>
        </label>
    )
}

export default Slider
