// Define our main App component

import React from 'react';
import ReactDOM from 'react-dom';

App = React.createClass({

  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      user: Meteor.user(),
      isPublic(route) {
        let publicRoutes = ['home', 'login', 'requestpasswordreset', 'passwordreset'];

        return publicRoutes.indexOf(route) > -1;
      },
      canView() {
        return this.isPublic(FlowRouter.current().route.name) || !!Meteor.user();
      }
    };
  },

  componentDidMount() {
    document.title = Meteor.settings.public.siteName || 'Meteor Blog';
  },

  getView() {
    return this.data.canView() ? this.props.yield : <Login />;
  },

  render() {
    return (
    <div className="app-root pushable">
      <Menu />
      <div className="pusher">
        {this.getView()}
      </div>
    </div>
    );
  }
});
