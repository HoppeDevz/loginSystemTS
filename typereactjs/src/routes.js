import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import SendMail from './pages/SendMail';
import ResetPassword from './pages/ResetPassword';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/register' exact component={Register} />
                <Route path='/forgotpassword' exact component={SendMail} />
                <Route path='/ResetPassword/:token' exact component={ResetPassword} />
            </Switch>
        </BrowserRouter>
    )
}