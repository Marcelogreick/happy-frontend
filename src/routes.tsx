import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanegesMap from './pages/OrphanegesMap';
import Orphanege from './pages/Orphanage';
import CreateOrphanege from './pages/CreateOrphanage';


export default function Routes() {
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Landing}></Route>
            <Route path="/app" component={OrphanegesMap}></Route>

            <Route path="/orphanages/create" component={CreateOrphanege}></Route>
            <Route path="/orphanages/:id" component={Orphanege}></Route>
            
        </Switch>
        </BrowserRouter>
    );
}