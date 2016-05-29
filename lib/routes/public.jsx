import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

const publicRoutes = FlowRouter.group({
    name: 'public'
});

publicRoutes.route('/', {
    name: 'home',
    action() {
        mount(App, {yield: <Home />});
    }
});

publicRoutes.route('/login', {
    name: 'login',
    action() {
        mount(App, {yield: <Login />});
    }
});

publicRoutes.route('/register', {
    name: 'register',
    action() {
        mount(App, {yield: <Register />});
    }
});

publicRoutes.route('/requestpasswordreset', {
    name: 'requestpasswordreset',
    action() {
        mount(App, {yield: <RequestPasswordReset />});
    }
});

publicRoutes.route('/passwordreset/:token', {
    name: 'passwordreset',
    action(params, queryParams) {
        mount(App, {yield: <PasswordReset token={params.token}/>});
    }
});
