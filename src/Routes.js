import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./components/Home'));

const Routes = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path='/' component={Home} />
                </Switch>
            </Suspense>
        </Router>
    )
}

export default Routes;