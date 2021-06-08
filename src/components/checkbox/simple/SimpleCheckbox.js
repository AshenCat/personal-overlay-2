import React from 'react'

import './simplecheckbox.scss'

function SimpleCheckbox(props) {
    return (
        <input type="checkbox" value={props.value} defaultChecked={props.value} onChange={props.onClick}/>
    )
}

export default SimpleCheckbox
