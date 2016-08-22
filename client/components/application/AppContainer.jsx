// App Container

import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';

AppContainer = createContainer(({ params }) => {
  return {
    user: Meteor.user(),
    isPublic(route) {
      const publicRoutes = [
        'home',
        'login',
        'requestpasswordreset',
        'passwordreset',
        'tags',
        'archive',
      ];
      return publicRoutes.indexOf(route) > -1;
    },
    canView() {
      return this.isPublic(FlowRouter.current().route.name);
    }
  };
}, App);
