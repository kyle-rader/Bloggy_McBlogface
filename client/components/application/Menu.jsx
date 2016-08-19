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

  _logout(event) {
      event.preventDefault();
      return Meteor.logout(() => FlowRouter.go('/'));
  },

  _adminMenu() {
    return [
      (
      <a className="item" href="#" key="edit-btn">
        <i className="green pencil icon"></i>
        Editor
      </a>
      ),
      (
      <a className="item" href="#" key="settings-btn">
        <i className="blue settings icon"></i>
        Settings
      </a>
      ),
    ];
  },

  _logInLogOutBtn() {
    if (this.data.user) {
      return (
        <a className="item" onClick={this._logout}>
          <i className="sign out icon"></i>
          Leave
        </a>
      );
    } else {
      return (
        <a className="item" href="/login">
          <i className="sign in icon"></i>
          Enter
        </a>
      );
    }
  },

  componentDidMount() {
  },

  componentDidUpdate() {
    // Init Semantic-UI SideBar
    const reactRoot = $('#react-root > .app-root.pushable');
    const sideBar = reactRoot.find('> .ui.sidebar');

    sideBar.sidebar({
      context: reactRoot[0]
    });

    // Close Menu on item click.
    let items = sideBar.find('a.item');

    items.on('click', (elem) => {
      sideBar.sidebar('toggle');
    });
  },

  render() {
    const adminMenu = this.data.isAdmin ? this._adminMenu() : null;
    const logInLogOutBtn = this._logInLogOutBtn();

    return (
    <div className="ui inverted borderless sidebar vertical labeled icon menu">
      <a className="item" href="/">
        <img className="ui centered mini image" src="/img/logo-white-128.png"/>
        Home
      </a>
      {adminMenu}
      <div className="ui divider"></div>
      {logInLogOutBtn}
    </div>
    );
  }
});
