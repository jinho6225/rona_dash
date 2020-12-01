import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import RacingChartHome from './routes/RacingChartHome';
import Home from './routes/Home';
import Navigation from './components/Navigation';
import Detail from './routes/Detail';


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
                    <Route path='/detail/:state'>
                        <Detail />
                    </Route>
                </>
            </Switch>
        </Router>
    )
}

export default AppRouter