import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Home from './routes/Home';
import Contact from './routes/Contact';


const AppRouter = () => {
    
    return (
        <Router>
            <Switch>
                    <>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route path='/contact'>
                            <Contact />
                        </Route>
                        {/* <Route path='/privacy-policy'>
                            <Privacy />
                        </Route>                        
                        <Route path='/bar-date-detail/:id'>
                            <BarDateDetail />
                        </Route>
                        <Route path='/bar-day-detail/:id'>
                            <BarDayDetail />
                        </Route> */}
                    </>
            </Switch>
        </Router>
    )
}

export default AppRouter