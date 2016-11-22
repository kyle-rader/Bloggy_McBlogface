import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

Authed = class Authed extends React.Component {
  render() {
    if (this.props.canView()) {
      return this.props.children;
    } else {
      return <Login />;
    }
  }
};

Authed = createContainer(({ params }) => {
  const { accessLevel } = params;
  const user = Meteor.user();
  return {
    user,
    canView() {
      return user ? user.hasRole(accessLevel) : false;
    }
  };
}, Authed);
