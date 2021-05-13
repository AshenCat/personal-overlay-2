import React from 'react'
import './card.scss'

function Card(props) {
    return (
        <div className={`card-container m-1px ${props.className ?? ''}`}>
            {!props.noButton ? <span onClick={props.onButtonClick} className={`circular-button ${props.isOpen ? 'card-body-open' : ''}`}/> : null}
            {props.children}
        </div>
    )
}

export default Card
