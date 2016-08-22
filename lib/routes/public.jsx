import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

const publicRoutes = FlowRouter.group({
    name: 'public'
});

publicRoutes.route('/', {
    name: 'home',
    action() {
        mount(AppContainer, {yield: <Home />});
    }
});

publicRoutes.route('/login', {
    name: 'login',
    action() {
        mount(AppContainer, {yield: <Login />});
    }
});

publicRoutes.route('/tags', {
    name: 'tags',
    action() {
        mount(AppContainer, {yield: <Tags />});
    }
});

publicRoutes.route('/archive', {
    name: 'archive',
    action() {
        mount(AppContainer, {yield: <Archive />});
    }
});

// publicRoutes.route('/register', {
//     name: 'register',
//     action() {
//         mount(AppContainer, {yield: <Register />});
//     }
// });

publicRoutes.route('/requestpasswordreset', {
    name: 'requestpasswordreset',
    action() {
        mount(AppContainer, {yield: <RequestPasswordReset />});
    }
});

publicRoutes.route('/passwordreset/:token', {
    name: 'passwordreset',
    action(params, queryParams) {
        mount(AppContainer, {yield: <PasswordReset token={params.token}/>});
    }
});
