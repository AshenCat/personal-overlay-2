import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Drawer from './drawer/Drawer'
import Titlebar from './titlebar/Titlebar'

import './body.scss';
import Footer from './footer/Footer'
// import Events from './body/events/Events'
import Home from './body/home/Home';
import EventModalProvider from '../context/EventModal/EventModalContext';

// const HomeComponent = React.lazy(()=>import('./body/home/Home'));
const EventsComponent = React.lazy(()=>import('./body/events/Events'));
const SprintsComponent = React.lazy(()=>import('./body/sprints/Sprints'));
const SprintDetailsComponent = React.lazy(()=>import('./body/sprints/details/SprintDetails'))
const TodosComponent = React.lazy(()=>import('./body/todos/Todos'))
const OverdueComponent = React.lazy(()=>import('./body/overdue/Overdue'))

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
                                <Route path="/todos" component={TodosComponent} />
                                <Route exact path="/sprints" component={SprintsComponent} />
                                <Route exact path="/sprints/:id" component={SprintDetailsComponent} />
                                <Route exact path="/events" component={EventsComponent} />
                                <Route exact path="/overdue" component={OverdueComponent} />
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
