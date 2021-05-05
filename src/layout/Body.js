import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Drawer from './drawer/Drawer'
import Titlebar from './titlebar/Titlebar'

import './body.scss';
import Footer from './footer/Footer'
import Events from './body/events/Events'
import Home from './body/Home/Home';
import EventModalProvider from '../context/EventModal/EventModalContext';

function Body() {
    return (
        <div className="body">
            <HashRouter>
            <Titlebar />
            <EventModalProvider>
                <div className="body-content">
                    <Drawer />
                    <main>
                        <Route exact path="/" component={Home} />
                        <Route path="events" component={Events} />
                    </main>
                </div>
            </EventModalProvider>
            <Footer />
            </HashRouter>
        </div>
    )
}

export default Body
