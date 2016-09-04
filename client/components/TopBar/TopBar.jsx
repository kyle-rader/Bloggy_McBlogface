import React from 'react';

TopBar = class TopBar extends React.Component {

  _socialButton(socialApp) {
    return (
      <a className="item" href={Meteor.settings.public.social[socialApp]} target="_blank" key={`${socialApp}-btn`}>
        <i className={`large ${socialApp} ${socialApp}-color icon`}></i>
      </a>
    );
  }

  _renderSocialButtons() {
    const socialApps = Object.keys(Meteor.settings.public.social);
    return socialApps.map((app) => this._socialButton(app));
  }

  _logInLogOutBtn() {
    if (this.props.user) {
      return (
        <a className="item" onClick={(e) => this._logout(e)}>
          <i className="large green power icon"></i>
        </a>
      );
    } else {
      return (
        <a className="item" href="/login">
          <i className="large gray power icon"></i>
        </a>
      );
    }
  }

  _logout(event) {
    event.preventDefault();
    return Meteor.logout(() => FlowRouter.go('/'));
  }

  _initDropDownMenus() {
    $(this.refs.topbar).find('.ui.dropdown').dropdown();
  }

  componentDidMount() {
    this._initDropDownMenus();
  }

  componentDidUpdate(prevProps, prevState) {
    this._initDropDownMenus();
  }

  render() {
    return (
      <div className="ui fixed icon menu top-bar" ref="topbar">

        <div className="ui dropdown item" ref="menuDropdown">
          <i className="large content icon"></i>

          <div className="menu topbar-dropdown-menu">
            <a className="item" href="/">
              <img className="ui iamage" src="/img/logo-512.png"/>
              Home
            </a>
            <a className="item" href="/archive">
              <i className="green archive icon"></i>
              Archive
            </a>
            <a className="item" href="/contact">
              <i className="blue tag icon"></i>
              Tags
            </a>
            <a className="item" href="/resume">
              <i className="violet book icon"></i>
              CV
            </a>
            <a className="item" href="/info">
              <i className="red cubes icon"></i>
              Cool Stuff
            </a>
          </div>
        </div>

        { this._renderSocialButtons() }

        <div className="right menu">
          {this._logInLogOutBtn()}
        </div>
      </div>
    );
  }
}
