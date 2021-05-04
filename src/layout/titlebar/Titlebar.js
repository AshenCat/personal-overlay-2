import { CheckBoxOutlineBlank, Close, Minimize } from '@material-ui/icons';
import React from 'react';
import './titlebar.scss'

function Titlebar() {
    return (
        <header className="titlebar">
            <h1 className="titlebar-appname">Personal Overlay</h1>
            <span className="titlebar-actions"><Minimize fontSize="small"/></span>
            <span className="titlebar-actions"><CheckBoxOutlineBlank fontSize="small"/></span>
            <span className="titlebar-actions"><Close fontSize="small"/></span>
        </header>
    )
}

export default Titlebar
