import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

const authedRoutes = FlowRouter.group({
    name: 'authed'
});

authedRoutes.route('/settings', {
    name: 'settings',
    action() {
        mount(App, {yield: <Settings />});
    }
});

authedRoutes.route('/editor', {
    name: 'editor',
    action() {
        mount(App, {yield: <BlogEditor />});
    }
});
