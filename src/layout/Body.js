import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Drawer from './drawer/Drawer'
import Titlebar from './titlebar/Titlebar'

import './body.scss';
import Footer from './footer/Footer'
import Events from './body/events/Events'
import Home from './body/home/Home';
import EventModalProvider from '../context/EventModal/EventModalContext';

function Body() {
    return (
        <div className="body">
            <HashRouter>
            <Titlebar />
            <div className="body-content">
                <EventModalProvider>
                    <Drawer />
                    <main>
                        <Route exact path="/" component={Home} />
                        <Route path="events" component={Events} />
                    </main>
                </EventModalProvider>
            </div>
            <Footer />
            </HashRouter>
        </div>
    )
}

export default Body
