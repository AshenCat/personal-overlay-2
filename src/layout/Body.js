import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Drawer from './drawer/Drawer'
import Titlebar from './titlebar/Titlebar'
import Welcome from './Welcome'

import './body.scss';
import Footer from './footer/Footer'
import Events from './body/events/Events'

function Body() {
    return (
        <div className="body">
            <HashRouter>
            <Titlebar />
            <div className="body-content">
                <Drawer />
                <main>
                    <Route exact path="/" component={Welcome} />
                    <Route path="events" component={Events} />
                </main>
            </div>
            <Footer />
            </HashRouter>
        </div>
    )
}

export default Body
