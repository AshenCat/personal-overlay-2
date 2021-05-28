import React from 'react'

import './simplecheckbox.scss'

function SimpleCheckbox(props) {
    return (
        <input type="checkbox" value={props.value} checked={props.value} onClick={props.onClick}/>
    )
}

export default SimpleCheckbox
