import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

const authedRoutes = FlowRouter.group({
    name: 'authed'
});

authedRoutes.route('/profile', {
    name: 'profile',
    action() {
        mount(App, {yield: <Login />});
    }
});
