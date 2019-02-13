import React, { Component } from 'react';
import {  Switch } from 'react-router-dom';

import Login from './Components/Login/login';

import Home from './Components/Home/home';
import Layout from './Components/hoc/Layout/layout'


import Dashboard from './Components/Dashboard/dashboard';
import Categories from './Components/Categories/categories';
import AddUser from './Components/Users/adduser';

import PrivateRoute from './Components/AuthRoutes/privateRoutes'
import PublicRoute from './Components/AuthRoutes/publicRoutes';

class Routes extends Component {
    render() {
        return (
            <div>
                <Layout user={this.props.user}>
                <Switch>
                   <PublicRoute {...this.props} restricted={false} path="/" exact component={Home} /> 
                   <PublicRoute {...this.props} restricted={true} path="/login/" exact component={Login} /> 
                   <PrivateRoute {...this.props} path = "/dashboard/" exact component = {Dashboard}/> 
                   <PrivateRoute {...this.props} path="/categories/" exact component={Categories}/> 
                        <PrivateRoute {...this.props} path="/adduser/" exact component={AddUser}/> 
                </Switch>
                </Layout>
            </div>
        );
    }
}

export default Routes;