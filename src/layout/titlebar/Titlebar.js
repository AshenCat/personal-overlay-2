import { CheckBoxOutlineBlank, Close, Minimize } from '@material-ui/icons';
import React from 'react';
import './titlebar.scss'

function Titlebar() {

    const onMinimize = () => {
        console.log('min')
        api.send('windowState','minimize')
    }
    const onMaximize = () => {
        console.log('max')
        api.send('windowState','maximize')
    }
    const onClose = () => {
        console.log('close')
        api.send('windowState','close')
    }

    return (
        <header className="titlebar">
            <h1 className="titlebar-appname">Personal Overlay</h1>
            <span className="titlebar-actions" onClick={onMinimize}><Minimize fontSize="small"/></span>
            <span className="titlebar-actions" onClick={onMaximize}><CheckBoxOutlineBlank fontSize="small"/></span>
            <span className="titlebar-actions" onClick={onClose}><Close fontSize="small"/></span>
        </header>
    )
}

export default Titlebar
