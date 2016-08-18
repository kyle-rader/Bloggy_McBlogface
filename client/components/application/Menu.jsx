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
    console.log(items);

    items.on('click', (elem) => {
      sideBar.sidebar('toggle');
    });
  },

  adminMenu() {
    return [
      (
      <a className="item" href="#" key="edit-btn">
        <i className="blue pencil icon"></i>
        Editor
      </a>
      ),
      (
      <a className="item" href="#" key="settings-btn">
        <i className="orange settings icon"></i>
        Settings
      </a>
      ),
    ];
  },

  render() {
    const adminMenu = this.data.isAdmin ? this.adminMenu() : null;

    return (
    <div className="ui inverted sidebar vertical labeled icon menu">
      <a className="item" href="/">
        <img className="ui centered mini image" src="/img/logo-white-128.png"/>
        Home
      </a>
      {adminMenu}
    </div>
    );
  }
});
