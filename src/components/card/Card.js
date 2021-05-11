import React from 'react'
import './card.scss'

function Card(props) {
    return (
        <div className="card-container m-1px">
            <span onClick={props.onButtonClick} className="circular-button"/>
            {props.children}
        </div>
    )
}

export default Card
