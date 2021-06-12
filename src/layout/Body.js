import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Drawer from './drawer/Drawer'
import Titlebar from './titlebar/Titlebar'

import './body.scss';
import Footer from './footer/Footer'
// import Events from './body/events/Events'
import Home from './body/home/Home';
// import Sprints from './body/sprints/Sprints';
import EventModalProvider from '../context/EventModal/EventModalContext';

// const HomeComponent = React.lazy(()=>import('./body/home/Home'));
// const EventsComponent = React.lazy(()=>import('./body/events/Events'));
const SprintsComponent = React.lazy(()=>import('./body/sprints/Sprints'));
const SprintDetailsComponent = React.lazy(()=>import('./body/sprints/details/SprintDetails'))
const todosComponent = React.lazy(()=>import('./body/todos/Todos'))

function Body() {
    return (
        <div className="body">
            <HashRouter>
                <Titlebar />
                <div className="body-content">
                    <EventModalProvider>
                        <Drawer />
                        <React.Suspense fallback={<div>loading...</div>}>
                            <main>
                                <Route exact path="/" component={Home} />
                                {/* <Route exact path="/events" component={EventsComponent} /> */}
                                <Route path="/todos" component={todosComponent} />
                                <Route exact path="/sprints" component={SprintsComponent} />
                                <Route exact path="/sprints/:id" component={SprintDetailsComponent} />
                            </main>
                        </React.Suspense>
                    </EventModalProvider>
                </div>
                <Footer />
            </HashRouter>
        </div>
    )
}

export default Body
