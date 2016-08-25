import React from 'react';

TopBar = class TopBar extends React.Component {
  toggleSidebar() {
      $('.app-root > .ui.sidebar').sidebar('toggle');
  }

  socialButton(socialApp) {
    return (
      <a className="item" href={Meteor.settings.public.social[socialApp]} target="_blank" key={`${socialApp}-btn`}>
        <i className={`large ${socialApp} ${socialApp}-color icon`}></i>
      </a>
    );
  }

  renderSocialButtons() {
    const socialApps = Object.keys(Meteor.settings.public.social);
    return socialApps.map((app) => this.socialButton(app));
  }

  render() {
    return (
      <div className="ui fixed icon menu">
        <a className="item" onClick={this.toggleSidebar}>
          <i className="large green content icon"></i>
        </a>
        {this.renderSocialButtons()}
      </div>
    );
  }
}
