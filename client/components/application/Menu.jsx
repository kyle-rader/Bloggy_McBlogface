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
      <div className="ui divider" key="admin-divider"></div>,
      (
      <a className="item" href="/editor" key="edit-btn">
        <i className="green edit icon"></i>
        Editor
      </a>
      ),
      (
      <a className="item" href="/settings" key="settings-btn">
        <i className="violet settings icon"></i>
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

  _initSideBarMenu() {
    // Init Semantic-UI SideBar
    const reactRoot = $('.app-root.ui.pushable');
    const sideBar = reactRoot.find('> .ui.sidebar');

    sideBar.sidebar({
      context: reactRoot[0]
    })
    .sidebar('attach events', 'a.item');
  },

  componentDidMount() {
    this._initSideBarMenu();
  },

  componentDidUpdate() {
    this._initSideBarMenu();
  },

  render() {
    const adminMenu = this.data.isAdmin ? this._adminMenu() : null;
    const logInLogOutBtn = this._logInLogOutBtn();

    return (
    <div className="ui inverted borderless sidebar vertical labeled icon menu">
      <a className="item" href="/">
        <img className="ui centered mini menu-logo image" src="/img/logo-white-128.png"/>
        Home
      </a>
      <a className="item" href="/tags">
        <i className="blue tags icon"></i>
        Tags
      </a>
      <a className="item" href="/archive">
        <i className="teal archive icon"></i>
        Archive
      </a>
      {adminMenu}
      <div className="ui divider"></div>
      {logInLogOutBtn}
    </div>
    );
  }
});
