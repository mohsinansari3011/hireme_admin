import React, { Component } from 'react';
import { Route , Switch } from 'react-router-dom'

import Login from './Components/Login/login';
import Dashboard from './Components/Dashboard/dashboard'
import Home from './Components/Home/home'


class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/dashboard" exact component={Dashboard} />
                </Switch>
            </div>
        );
    }
}

export default Routes;