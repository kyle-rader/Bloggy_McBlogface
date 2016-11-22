import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory, Link } from 'react-router';
import { Icon } from 'semantic-ui-react';

TopBar = class TopBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isMobile: $(window).width() < 375 };
  }

  _updateScreenSize() {
    this.setState({ isMobile: $(window).width() < 375 });
  }

  _socialButton(link, socialApp, labeled = false) {
    return (
      <a className="item" href={link} target="_blank" key={`${socialApp}-btn`}>
        <Icon className={`large ${socialApp}-color`} name={socialApp}/>
        { labeled ? `${socialApp.slice(0,1).toUpperCase()}${socialApp.slice(1)}` : '' }
      </a>
    );
  }

  _renderSocialButtons() {
    const appButtons = _(Meteor.settings.public.social);

    if (this.state.isMobile) {
      return (
      <div className="ui dropdown item">
        <Icon className="large dark-blue pointing down icon"></Icon>
        <div className="menu topbar-dropdown-menu">
          { appButtons.map((link, app) => this._socialButton(link, app, true)) }
        </div>
      </div>
      );
    } else {
      return appButtons.map((link, app) => this._socialButton(link, app, false));
    }
  }

  _logInLogOutBtn() {
    if (this.props.user) {
      return (
        <a className="item" onClick={(e) => this._logout(e)}>
          <Icon className="large green power icon"></Icon>
        </a>
      );
    } else {
      return (
        <Link className="item" to="/login">
          <Icon className="large gray power icon"></Icon>
        </Link>
      );
    }
  }

  _logout(event) {
    event.preventDefault();
    return Meteor.logout(() => browserHistory.push('/'));
  }

  _renderAdminMenu() {
    if (this.props.isAdmin()) {
      return [
        (<div className="divider" key="admin-div"></div>),
        (<div className="header" key="admin-header">Admin</div>),
        (<Link className="item" to="/editor" key="admin-editor"><Icon className="large green edit icon"></Icon> Editor</Link>),
        (<Link className="item" to="/settings" key="admin-settings"><Icon className="large dark-red settings icon"></Icon> Settings</Link>),
      ];
    } else {
      return null;
    }
  }

  _initDropDownMenus() {
    $(this.refs.topbar).find('.ui.dropdown').dropdown();
  }

  componentDidMount() {
    this._initDropDownMenus();
    window.addEventListener('resize', () => this._updateScreenSize());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this._updateScreenSize());
  }

  componentDidUpdate(prevProps, prevState) {
    this._initDropDownMenus();
  }

  render() {
    return (
      <div className="ui fixed icon menu top-bar" ref="topbar">

        <div className="ui dropdown item" ref="menuDropdown">
          <Icon className="large" color="green" name="content"></Icon>

          <div className="menu topbar-dropdown-menu">
            <Link className="item" to="/">
              <img className="ui iamage" src="/img/logo-512.png"/>
              Home
            </Link>
            <Link className="item" to="/archive">
              <Icon color="red" name="archive"></Icon>
              Archive
            </Link>
            <Link className="item" to="/tags">
              <Icon color="orange" name="tag"></Icon>
              Tags
            </Link>
            <Link className="item" to="/puzzles">
              <Icon color="violet" name="puzzle"></Icon>
              Puzzles
            </Link>
            <Link className="item" to="/coolstuff">
              <Icon color="blue" name="cubes"></Icon>
              Cool Stuff
            </Link>
            <Link className="item" to="/resume">
              <Icon color="green"  name="book"></Icon>
              CV
            </Link>
            { this._renderAdminMenu() }
          </div>
        </div>

        { this._renderSocialButtons() }

        <div className="right menu">
          {this._logInLogOutBtn()}
        </div>
      </div>
    );
  }
};

TopBar = createContainer(({ params }) => {
  const user = Meteor.user();
  return {
    user,
    isAdmin() {
      return user ? user.hasRole('admin') : false;
    }
  };
}, TopBar);
