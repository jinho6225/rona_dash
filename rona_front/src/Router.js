import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import RacingChartHome from './routes/RacingChartHome';
import Home from './routes/Home';
import Navigation from './components/Navigation';


const AppRouter = () => {
    
    return (
        <Router>
            <Navigation />
            <Switch>
                <>

                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route path='/racing'>
                        <RacingChartHome />
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