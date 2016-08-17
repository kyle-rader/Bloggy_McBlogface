// Application header

import React from 'react';

Menu = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      user: Meteor.user(),
      isAdmin: Meteor.user() && Meteor.user().roles && (Meteor.user().roles.indexOf('admin') > -1)
    };
  },

  logout(event) {
      event.preventDefault();
      return Meteor.logout(() => FlowRouter.go('/'));
  },

  componentDidMount() {
    // Init Semantic-UI SideBar
    const reactRoot = $('#react-root > .app-root.pushable');
    const sideBar = reactRoot.find('> .ui.sidebar');

    sideBar.sidebar({
      context: reactRoot[0]
    });
  },

  componentDidUpdate() {
  },

  render() {
    return (
    <div className="ui inverted sidebar vertical labeled icon menu">
      <a className="item" href="/">
        <i className="inverted blue home icon"></i>
        Home
      </a>
    </div>
    );
  }
});
